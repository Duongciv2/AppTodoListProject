const express =  require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const moment = require("moment")


mongoose.connect("mongodb+srv://thanh123:thanh123@cluster0.n7pfwhu.mongodb.net/").then(() => {
    console.log("Connect to MongoDb");
  })
  .catch((error) => {
    console.log("Error connect",error)
  });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const User = require("./models/User");
const Todo = require("./models/Todo");

app.post("/register",async(req,res) =>{
    try{
        const {name, email, password} = req.body;

        //check if email is already registed
        const existUser = await User.findOne({email});
        if (existUser){
            console.log("Exist email");
        }

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();
        res.status(202).json({message: "Registed successfully"})

    } catch(error){
        console.log("Error register user",error);
        res.status(500).json({message:"Registration failed"})
    }
});


const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
  
    return secretKey;
  };
  
const secretKey = generateSecretKey();

//login
app.post("/login", async(req,res) =>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
          return res.status(401).json({ message: "Invalid Email or pass" });
        }
        if (user.password !==password){
            return res.status(401).json({ message:"Invalid Email or pass"});
        }

        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({token});
    }catch(error){
        console.log("Login failed", error);
        res.status(500).json({message:"Login Failed"})
    }
});

//Đưa list lên mongodb
app.post("/todos/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const { title, category } = req.body;
  
      const newTodo = new Todo({
        title,
        category,
        dueDate: moment().format("YYYY-MM-DD"),
      });
  
      await newTodo.save();
  
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      }
  
      user?.todos.push(newTodo._id);
      await user.save();
  
      res.status(200).json({ message: "Todo added sucessfully", todo: newTodo });
    } catch (error) {
      res.status(200).json({ message: "Todo not added" });
    }
  });

  //Trả về todo lists
app.get("/users/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.patch("/todos/:todoId/complete", async (req, res) => {
    try {
      const todoId = req.params.todoId;
  
      const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        {
          status: "completed",
        },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
  
      res
        .status(200)
        .json({ message: "Todo marked as complete", todo: updatedTodo });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
});