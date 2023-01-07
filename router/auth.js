import { Router } from 'express';
import {
  LoginUser,
  LogoutUser,
  RegistrationUser,
} from '../controllers/auth.js';

const routerAuth = Router();

routerAuth.route('/login').post(LoginUser);
routerAuth.route('/register').post(RegistrationUser);
routerAuth.route('/logout').post(LogoutUser);

export default routerAuth;
