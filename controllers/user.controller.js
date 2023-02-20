const userModel = require("../model/user.model");
const bcrypt= require("bcrypt");
const generateToken = require("../geneterateToken");
// creating user 👍👍👍👍

const createUser=async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body;

    // userExits

    const userExits= await userModel.findOne({email})

    if(userExits){
        return res.status(400).send({msg:"User already exist, please login"})
    }

    const gensalt=5;
    const salt=bcrypt.genSaltSync(gensalt);
    const hashPassword= bcrypt.hashSync(password,salt)

    const user= new userModel({
        name,
        email,
        gender,
        password:hashPassword,
        age,
        city
    })

    try {
       const newUser= await user.save();
       res.status(201).send({msg:"New user added success",users:newUser})
    } catch (error) {
        res.status(500).send({msg:"Something went wrong",err:error})
    }
}

// login user 👍👍👍👍👍

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "email and password required" })
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).send({ message: `This email : ${email} is not found in our database` })
    }

    //   res.send(user)

    const passWordMatch = bcrypt.compareSync(password, user.password)
    if (!passWordMatch) {
        res.status(400).send({ message: `Password does not match with used email` })
    }
    else {
        try {
            // res.send(passWordMatch)
            const token = generateToken(user);
          
            res.status(200).send({ messssage: "Login Successful", token: token })

        } catch (error) {
            res.status(500).send({ message: "Internel server error", error: `${error}` })
        }
    }
}

module.exports={
    createUser,
    loginUser
}