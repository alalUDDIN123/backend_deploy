
const mongoose=require("mongoose")

// title ==> String
// body ==> String
// device ==> String
// no_if_comments ==> Number

const postSchema= mongoose.Schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    device:{
        type:String,
        enum:{
            values:["Laptop","Tablet","Mobile"],
            message:"The value you provided is not supported, Please provide Laptop, Tablet or Mobile"
        }
    },
    no_if_comments:{
        type:Number
    },
    userId:{
        type:String 
    }
})

const postModel= mongoose.model("post",postSchema);

module.exports=postModel