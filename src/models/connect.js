import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'db_food',
    'root',
    '1234',
    {
        host:'localhost',
        port:3308,
        dialect:'mysql'
    }  
);

export default sequelize;