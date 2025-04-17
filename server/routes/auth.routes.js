import { Router } from "express";

const AuthRouter = Router();

/* GET users listing. */
AuthRouter.get('/', function(req, res, next) {
  res.send('test passed');
});

export default AuthRouter;