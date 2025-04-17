import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
const AuthRouter = Router();

/* GET users listing. */
AuthRouter.get('/', function(req, res, next) {
  res.send('test passed');
});
AuthRouter.post('/sign-up', AuthController.register);
AuthRouter.post('/sign-in', AuthController.login);


export default AuthRouter;
