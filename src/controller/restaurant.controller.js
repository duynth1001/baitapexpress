import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

//create model
const model = initModels(sequelize);

const postLike = async (req, res) => {
  try {
    //extract query params
    const { user_id, res_id } = req.query;

    //find record
    let record = await model.like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });

    //if not exits create new record
    if (!record) {
      let newRecord = await model.like_res.create({
        user_id,
        res_id,
        date_like: new Date().toISOString().slice(0, 19).replace("T", " "),
      });
      return res.status(201).json(newRecord);
    }

    //if exits
    return res.status(400).json({ message: "user liked already" });
  } catch (error) {

    // Check for ForeignKeyConstraintError
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res
        .status(400)
        .json({
          message:
            "Invalid foreign key: either user_id or res_id does not exist",
        });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postUnlike = async (req, res) => {
  try {
    //extract query params
    const { user_id, res_id } = req.query;

    //find record
    const record = await model.like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });

    //If not exitst send 400
    if (!record) {
      return res.status(400).json({ message: "Can not find a record" });
    }

    //If exist delete
    record.destroy();
    return res.status(200).json({ message: "User unlike successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Interal server error" });
  }
};

const getLike = async (req, res) => {
  try {
    //extract query params
    const { user_id, res_id } = req.query;

    //find record
    const record = await model.like_res.findOne({
      where: {
        user_id,
        res_id,
      },
      include: [
        {
          model: model.user,
          as: "user",
        },
        {
          model: model.restaurant,
          as: "re",
        },
      ],
    });

    //if no exist return 404
    if (!record) {
        return res.status(404).json({message:"Can't find a record"})
    }
    return res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postRate = async (req,res)=>{
    try {
        //extract from body
        const {user_id,res_id,amount}= req.body;
        
        //find record
        const record = await model.rate_res.findOne({
            where:{
                user_id,
                res_id
            }
        })

        //if not exist
        if (!record) {
            let newRecord = await model.rate_res.create({
                user_id,
                res_id,
                amount,
                date_rate: new Date().toISOString().slice(0, 19).replace("T", " "),
            })
            return res.status(201).json(newRecord);
        }
        
        //if exist
        return res.status(400).json({message:"User rated already"});

    } catch (error) {
        // Check for ForeignKeyConstraintError
    if (error.name === "SequelizeForeignKeyConstraintError") {
        return res
          .status(400)
          .json({
            message:
              "Invalid foreign key: either user_id or res_id does not exist",
          });
      }
       return res.status(500).json({message:"Internal server error"}); 
    }
}

const getRate= async(req,res)=>{
    try {
        const {user_id,res_id}=req.query;
        
        //find record
        const record = await model.rate_res.findOne({
            where:{
                user_id,
                res_id
            },
            include:[
                {
                model:model.user,
                as:'user'
               },
               {
                model:model.restaurant,
                as:'re'
               }
        ]
        })
        
        //if not exist return 404
        if (!record) {
            return res.status(404).json({message:'Can not find a record'});
        }
        return res.status(200).json(record);
    } catch (error) {
        return res.status(500).json({message:"Interal server error"})
    }
}

export { postLike, postUnlike, getLike,postRate,getRate };
