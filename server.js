import express from 'express'
const app = express();
import connectDB from './config/db.js'
import User from './model/userSchema.js';
import bcrypt from "bcrypt"
import cors from 'cors'
connectDB()
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("HEllo")
})
app.post('/register', async (req, res) => {
    const { email, name, password } = req.body
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.send({ message: "User Already Exist" })
        }
        const harshpassword = await bcrypt.hash(password,5)
        const userData = await User({ email, name, password:harshpassword })
        userData.save();
        res.send({ message: "User Created Successfully" })
    }
    catch (err) {
        res.send(err)
    }

})
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const userExist=await User.findOne({email})
        if(!userExist){
          return   res.send({message:"User Not Found"})
        }
        if(password===userExist.password){
            return res.send({message:"Login Successfully"})
        }
        const compare = await bcrypt.compare(password,User.password)
        console.log(compare)
       res.send({message:"Invalid Credentials"})
    }
    catch(err){
        res.send(err)
    }
})
app.delete('/delete/:id',async (req,res)=>{
    const {email}=req.params
    try{
        const userExist=await User.findOneAndDelete({email:email})
        if(!userExist){
                return res.send({message:"User not found "})
        }
       return res.send({message:"User Deleted Successfully "})
    }
    catch(err){
        res.send(err)
    }
})
app.put("/update/:email",async(req,res)=>{
    const {email}=req.params
    const {name,password}= req.body
    try{
        const userExist=await User.findOneAndUpdate({email:email},{name,password} )
        if(!userExist){
                return res.send({message:"User not found "})
        }
       return res.send({message:"User updated Successfully "})
    }
    catch(err){
        res.send(err)
    }  
})
app.listen(4000, (req, res) => {
    console.log("Server is running")
})