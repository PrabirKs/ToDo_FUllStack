const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://duummmyyyy1323:yxaq42XwIqwymbqp@cluster0.xz21jt1.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("connnected to DB"))
  .catch(console.error);

const Todo = require("./models/Todo");

// default checking for deploy
app.get("/",(req,res) => {
    res.json("hello prabir") ;
})

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});
//post
app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});

//delete
app.delete("/todo/delete/:id", async (req, res) => {
    try{
        const result = await Todo.findByIdAndDelete(req.params.id);
        if(!result){
            return res.status(404).json({error: "Todo not found"});
        }
        return res.json(result)
    }catch(error){
        console.error("Error deleting todo:",error) ;
        return res.status(500).json({error : "Internal server eroor"});
    }
  
});

//put
app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
});

app.listen(3001, () => console.log("server started on port 3001"));
