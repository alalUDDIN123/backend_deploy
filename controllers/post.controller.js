
// creating post 👍👍👍

const postModel = require("../model/post.model");

const createPost = async (req, res) => {
    const { title, body, device, no_if_comments, userId } = req.body;

    // console.log(userId)
    const addPost = new postModel({
        title,
        body,
        device,
        no_if_comments,
        userId
    })

    try {
        const newPost = await addPost.save();

        res.status(201).send({ msg: "Post added succes", posts: newPost })
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong", err: error.message })
    }
}

// getting post 

const getPost = async (req, res) => {
    const { userId } = req.body;
    // console.log(userId)

    const device = req.query.device

    // console.log(device)

    let query = { userId: userId }; 

    if (device) {
        query.device = { $in: device }
    }

    const posts = await postModel.find(query);

    if (posts.length === 0) {
        return res.status(404).send({ msg: "post not found in the database" })
    }

    try {
        res.status(200).send({ posts: posts,length:posts.length })
    } catch (error) {
        res.status(500).send({ msg: "something went wrong", err: error })
    }




}

// update post 👍👍👍👍

const updatePost = async (req, res) => {
    const { userId } = req.body;
    const id = req.params.id

    const findPosts = await postModel.findOne({ _id: id })
 
    if (!findPosts) {
        return res.status(404).send({ msg: `post not found in the database with id : ${id}` })
    }


    let user = findPosts.userId;



    try {

        if (userId !== user) {
            return res.status(401).send({ msg: `You are not allowed` })
        } else {
            await postModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).send({msg:"Updated success"})
        }

    } catch (error) {
        res.status(500).send({ msg: "something went wrong", err: error })
    }


}

// delete post 👍👍👍👍

const deletePost = async (req, res) => {
    const { userId } = req.body;
    const id = req.params.id

    const findPosts = await postModel.findOne({ _id: id })
 
    if (!findPosts) {
        return res.status(404).send({ msg: `post not found in the database with id : ${id}` })
    }


    let user = findPosts.userId;
    try {

        if (userId !== user) {
            return res.status(401).send({ msg: `You are not allowed` })
        } else {
            await postModel.findByIdAndDelete({_id:id})
            res.status(200).send({msg:"Deleted success"})
        }

    } catch (error) {
        res.status(500).send({ msg: "something went wrong", err: error })
    }


}

module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost
}