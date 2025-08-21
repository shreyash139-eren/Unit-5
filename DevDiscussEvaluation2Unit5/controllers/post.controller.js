const PostModel = require("../models/post.model");
const TagModel = require("../models/tag.model");

const addPost = async (req, res) => {
  try {
    const user = req.user;
    const { title, content, tags } = req.body;
    let tag = await TagModel.findOne({ name: tags });
    if (!tag) {
      await TagModel.create({ name: tags });
      tag = await TagModel.findOne({ name: tags });
    }
    await PostModel.create({ title, content, author: user, tags: tag._id });
    res.status(201).json({ message: "Post created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const getPosts = async (req, res) => {
  try {
    let { tag } = req.query;
    if (tag) {
      let tags = await TagModel.find({ name: tag });
      let tagId = tags.map((ele) => ele._id);
      let posts = await PostModel.find().populate("author", {
        username: 1,
        role: 1,
        email: 1,
      });
      posts = posts.filter((ele) =>
        JSON.stringify(ele.tags).includes(JSON.stringify(tagId))
      );
      // console.log(JSON.stringify(tagId[0]),tags,posts)
      return res.status(200).json({ message: "Posts", posts });
    }
    let posts = await PostModel.find().populate("author", {
      username: 1,
      role: 1,
      email: 1,
    });
    res.status(200).json({ message: "Posts List", posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const getPostsById = async (req, res) => {
  try {
    const { postId } = req.params;
    let post = await PostModel.findById(postId)
      .populate("author", { password: 0, _id: 0 })
      .populate("comments");
    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }
    res.status(200).json({ message: "Post found", post });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const deletePost = async (req, res) => {
  try {
    let { postId } = req.params;
    let role = req.role;
    let post = await PostModel.findById(postId);
    if (role === "User") {
      // console.log(post,JSON.stringify(post.author),req.user)
      if (JSON.stringify(post.author) === JSON.stringify(req.user)) {
        await PostModel.findByIdAndDelete(postId);
        return res.status(200).json({ message: "Post deleted" });
      } else {
        return res.status(401).json({ message: "Unauthorized action" });
      }
    }
    await PostModel.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const addComment = async (req, res) => {
  try {
    const { user, text } = req.body;
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }
    post.comments.push({ user: req.user, text });
    await post.save();
    res.status(201).json({ message: "Comment added" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const addUpvote = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }
    if (post.upvotes.includes(req.user)) {
      return res.status(409).json({ message: "Already upvoted" });
    }
    post.upvotes.push(req.user);
    await post.save();
    res.status(201).json({ message: "Upvote added" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports = {
  addPost,
  getPosts,
  getPostsById,
  deletePost,
  addComment,
  addUpvote,
};
