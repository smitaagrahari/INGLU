const express= require("express");
const mongoose= require("mongoose");
const cors= require("cors");
require("dotenv").config();
const app=express();
app.use(cors());// Allows frontend to talk to backend
app.use(express.json());  // for parsing data.
// conection with mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=> console.log(err));

// now schema creation///
const ContactSch= new mongoose.Schema({
    name:String,
    email:String,
    phone:String
})
/// model is created///
const Contact = mongoose.model("Contact",ContactSch);
// fetch the url and get the data
app.get("/contacts",async(req,res)=>{
    const contacts= await Contact.find();
    res.json(contacts);
})

//it  helpt to store the data in the mongoose
app.post("/contacts",async(req,res)=>{
    const newContact= new Contact(req.body);
    await newContact.save();
    res.json(newContact);
})


// delete the contact by particular id ....
app.delete("/contacts/:id",async(req,res)=>{
    await Contact.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));



