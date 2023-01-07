import { Router } from 'express';
import {
  LoginUser,
  LogoutUser,
  RegistrationUser,
} from '../controllers/auth.js';
import {
  CreateItem,
  DeleteItem,
  GetItems,
  PutItem,
} from '../controllers/items.js';

const router = Router();

const methods = {
  CreateItem,
  DeleteItem,
  GetItems,
  PutItem,
  LoginUser,
  LogoutUser,
  RegistrationUser,
};

router
  .route('/router')
  .get((req, res) => {
    try {
      const method = req.query.action;
      methods[method](req, res);
    } catch (e) {
      res.status(404).json({ error: 'Not Found' });
    }
  })
  .post((req, res) => {
    try {
      if (Object.keys(req.query).length === 0) return LogoutUser(req, res);
      const method = req.query.action;
      methods[method](req, res);
    } catch (e) {
      res.status(404).json({ error: 'Not Found' });
    }
  })
  .put((req, res) => {
    try {
      const method = req.query.action;
      methods[method](req, res);
    } catch (e) {
      res.status(404).json({ error: 'Not Found' });
    }
  })
  .delete((req, res) => {
    try {
      const method = req.query.action;
      methods[method](req, res);
    } catch (e) {
      res.status(404).json({ error: 'Not Found' });
    }
  });

export default router;
