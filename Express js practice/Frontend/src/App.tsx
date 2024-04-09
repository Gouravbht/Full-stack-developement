import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [postText, setPostText] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/feed/");
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.log("Not able to fetch the data", error);
      }
    };
    fetchData();
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, post: postText }),
      });

      if (response.ok) {
        await fetchData();
        setUser();
        setPostText();
      } else {
        console.error("failed to submit the form");
      }
    } catch (error) {
      console.log("Error submitting the form", error);
    }
  };

  const handleNameChange = (event) => {
    setUser(event.target.value);
  };
  const handleChangePost = (event) => {
    setPostText(event.target.value);
  };

  const handleDelete = async(postId)=>{
    try {
      const response = await fetch(`http://localhost:3000/feed/${postId}`,{
        method:"DELETE",

      });
      if(response.ok){
        fetchData();
      }else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post", error);
    }
  }
  return (
    <>
      <div className=" w-full  flex justify-center flex-col items-center p-5 ">
        <h1 className=" text-4xl p-2 font-medium">Post feed</h1>
        <h2 className=" text-2xl  text-gray-500 font-semibold mb-4">
          Post anything here
        </h2>
        <form
          action="http://localhost:3000/feed"
          method="post"
          className=" p-5 text-lg font-medium"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={user}
            onChange={handleNameChange}
            className="  rounded-md p-1 bg-gray-200 border-2 border-gray-500"
          />
          <div></div>
          <label htmlFor="post" className=" text-2xl">
            Post text:{" "}
          </label>
          <textarea
            contentEditable
            id="post"
            value={postText}
            onChange={handleChangePost}
            placeholder="Type Post Here..."
            className=" bg-gray-200 w-[400px] h-fit rounded-md border-2 border-gray-500 font-normal p-1 "
          ></textarea>
          <button className=" bg-black text-white hover:bg-transparent hover:border hover:border-black hover:text-black py-1 px-6 rounded-md mt-2">
            Post
          </button>
        </form>
      </div>
      {data && data.posts.length > 0 ? (
        data.posts.map((post, index) => (
          <div
            key={post.id}
            className=" flex flex-wrap w-full gap-3 items-center  justify-center p-2 text-lg text-gray-500 border font-medium"
          >
            <h3>{post.user}: </h3>
            <p>{post.post}</p>
            <button onClick={()=> handleDelete(post.id)} className=" text-black bg-red-400 px-2 rounded-md">
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className=" flex justify-center text-4xl text-gray-400 p-5">Loading...</p>
      )}
    </>
  );
}

export default App;
