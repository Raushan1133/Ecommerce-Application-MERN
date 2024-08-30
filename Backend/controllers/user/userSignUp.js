const userModel = require('../../models/userModel')
const bcrypt = require('bcryptjs');

async function userSignUp (req,res){
    try {
        const { email , password,name, profilePic} = req.body;
        const user= await userModel.findOne({email})
        if(user){
            throw new Error("User Already Exists!");
        }
        if(!email){
            throw new Error("Please provide email!");
        }
        if(!password){
            throw new Error("Please provide password!");
        }
        if(!name){
            throw new Error("Please provide name!");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password,salt);
        if(!hashedPassword){
            throw new Error("Something went wrong");
        }
        const payload = { 
            ...req.body,
            role:"GENERAL",
            password:hashedPassword
        }
        const userData =new  userModel(payload);
        const saveUser = await userData.save();
        res.status(201).json({
            data: saveUser,
            success:true,
            error:false,
            message:"User created successfully!"
        })
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

module.exports = userSignUp