import { Router } from 'express';
import {
  CreateItem,
  DeleteItem,
  GetItems,
  PutItem,
} from '../controllers/items.js';

const routerApp = Router();

routerApp
  .route('/items')
  .get(GetItems)
  .post(CreateItem)
  .delete(DeleteItem)
  .put(PutItem);

export default routerApp;
