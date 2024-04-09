const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 3000;

const posts = [
  { id: 1, user: "Gourav", post: "Can't wait to post my first post" },
  { id: 2, user: "Rohan", post: "Hey there" },
  { id: 3, user: "Keyur", post: "lmao" },
  { id: 4, user: "Chaitanya", post: "Jai hind" },
  { id: 5, user: "Puneet", post: "bangalore was fun" },
];
app.use(cors());
app.listen(PORT);
app.use(express.json());
app.get("/feed", (req, res) => {
  const data = {posts};
  res.json(data);
  return
  console.log(`Running on port ${PORT}`);
});

app.post("/feed", (req, res) => {

    const {user, post}= req.body;
    const newPost ={
        id: posts.length +1,
        user,
        post,
    }
    posts.push(newPost);
    res.status(200).json(newPost);
});

app.delete("/feed/:id", (req, res) => {
    const postId = parseInt(req.params.id)
    const index = posts.findIndex((post)=>post.id=== postId);
    if(index !== -1){
        posts.splice(index,1);
        res.status(200).json({message: "Post deleted succesfully"})
    }
    else{
        res.status(404).json({message:"Not found"})
    }
});
