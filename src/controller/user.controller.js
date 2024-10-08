import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

//create model
const model = initModels(sequelize);

const postOrder = async (req,res)=>{
    try {
        const {user_id,food_id,amount,code,arr_sub_id}=req.body;

        //find record
        let record = await model.order.findOne({
            where:{
                user_id,
                food_id
            }
        })
        
        //if not exist create new record
        if (!record) {
            let newRecord = await model.order.create({
                user_id,
                food_id,
                amount,
                code,
                arr_sub_id
            })
            return res.status(201).json(newRecord)
        }
        
        //if exist
        return res.status(400).json({message:"Order already exist"})
    } catch (error) {
           // Check for ForeignKeyConstraintError
    if (error.name === "SequelizeForeignKeyConstraintError") {
        return res
          .status(400)
          .json({
            message:
              "Invalid foreign key: either user_id or food_id does not exist",
          });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
}

export {postOrder}