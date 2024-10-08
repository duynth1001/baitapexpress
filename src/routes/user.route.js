import express from 'express'
import { postOrder } from '../controller/user.controller.js';

const userRoutes = express.Router();

//user order
userRoutes.post("/post-order",postOrder)
//example :http://localhost:8080/user/post-order
/**
 * body
 * {
    "user_id":"1",
    "food_id":"30",
    "amount":"30",
    "code":"abc",
    "arr_sub_id":"test"   
}
 */
export default userRoutes;