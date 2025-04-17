import { aj, isSpoofedBot } from '../config/arcjet.js';
import { ARCJET_ENV } from '../config/config.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
        // Skip Arcjet for development environment
        if (ARCJET_ENV === 'development') {
            return next();
        }

        const decision = await aj.protect(req, { 
            requested: 5,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        });
        
        console.log("Arcjet decision:", {
            isDenied: decision.isDenied(),
            reason: decision.reason,
            results: decision.results
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ 
                    message: "Too Many Requests",
                    retryAfter: decision.reason.retryAfter
                });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ 
                    message: "Bot traffic not allowed",
                    details: decision.reason
                });
            } else {
                return res.status(403).json({ 
                    message: "Request denied by security rules",
                    details: decision.reason
                });
            }
        } else if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({ 
                message: "Spoofed bot detected",
                details: decision.results
            });
        }
        
        next();
    } catch (error) {
        console.error('Arcjet error:', {
            message: error.message,
            stack: error.stack,
            request: {
                method: req.method,
                path: req.path,
                ip: req.ip,
                userAgent: req.headers['user-agent']
            }
        });
        
        // Don't block requests if Arcjet fails
        next();
    }
};

export default arcjetMiddleware;