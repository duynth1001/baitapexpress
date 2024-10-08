import express from 'express'
import restaurantRoutes from './restaurant.route.js';
import userRoutes from './user.route.js';

//create root router
const rootRouter = express.Router();

//mount restaurant router
rootRouter.use('/restaurant',restaurantRoutes);

//mount user router
rootRouter.use('/user',userRoutes);

export default rootRouter;