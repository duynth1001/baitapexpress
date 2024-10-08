import express from 'express'
import { getLike, getRate, postLike, postRate, postUnlike } from '../controller/restaurant.controller.js';

const restaurantRoutes = express.Router();

// like restaurant
restaurantRoutes.post('/post-like',postLike);
//example : http://localhost:8080/restaurant/post-like?user_id=3&res_id=2

// unlike restaurant
restaurantRoutes.delete('/post-unlike',postUnlike);
//example : http://localhost:8080/restaurant/post-unlike?user_id=3&res_id=5

//get like according to restaurant and user
restaurantRoutes.get("/get-like",getLike);
//example : http://localhost:8080/restaurant/get-like?user_id=1&res_id=2

// rate restaurant
restaurantRoutes.post('/post-rate',postRate)
//example:http://localhost:8080/restaurant/post-rate
//body 
/**
 {
    "user_id":"1",
    "res_id":"2",
    "amount":"30"    
}
 */

//get rate according to restaurant and user
restaurantRoutes.get("/get-rate",getRate);
//example : http://localhost:8080/restaurant/get-rate?user_id=5&res_id=3

export default restaurantRoutes;