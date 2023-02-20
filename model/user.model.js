const mongoosee = require("mongoose");

// name ==> String
// email ==> String
// gender ==> String
// password ==> String
// age ==> Number
// city ==> String

const userSchema = mongoosee.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    gender:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    city:{
        type:String
    }
});

const userModel= mongoosee.model("user",userSchema);

module.exports=userModel;