import { Router } from "express";
import { authSignUp, authSignIn } from "../controllers/auth.controller.js";
const AuthRouter = Router();

/* GET users listing. */
AuthRouter.get('/', function(req, res, next) {
  res.send('test passed');
});
AuthRouter.post('/sign-up', authSignUp);
AuthRouter.post('/sign-in', authSignIn);


export default AuthRouter;