const express=require("express");
const userRoute=express.Router();
const {UserModel}=require("../model/user");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cors=require("cors");
userRoute.use(cors())

userRoute.get("/user",async(req,res)=>{
    try {
        let data= await UserModel.find();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"something went wrong"})
    }
})

userRoute.post("/users/register",async(req,res)=>{
    try {
      let {name,email,pass,gender}=req.body;
      bcrypt.hash(pass,5,async(err,hash)=>{
        if(err){
            console.log(err);
            res.status(200).send({"msg":err})

        }
        else{
            const user= UserModel({name,email,pass:hash,gender});
            await user.save();
            res.send({"msg":"User hass been signed up"})
        }
       
      })

    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Something went wrong"})
    }
})

userRoute.post("/users/login",async(req,res)=>{
    try {
      let {email,pass}=req.body;
      let data=await UserModel.find({email});
      if(data.length>0){
        bcrypt.compare(pass,data[0].pass,async(err,result)=>{
            if(result){
                var dataid=data[0]._id;
                var name=data[0].name
                var token = jwt.sign({dataid,name}, 'masai');
                res.status(200).send({"msg":"You have been logged in",token})
            }else{
                console.log(err);
                res.send({"msg":"Something went wrong"})
            }
        })
      }
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Something went wrong"})
    }
})
userRoute.patch("posts/update",async(req,res)=>{
    try {
        let data_id =req.body.userid;
        console.log(data_id)
        let updatedata=req.body
        await UserModel.findByIdAndUpdate({_id:data_id},updatedata)
        req.status(200).send({"msg":"data has been updated"})
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg":"Something went wrong"})
        
    }
})
userRoute.get("/delete/:id", async (req, res) => {
    try {
      const params = req.params.id;
      const user = await UserModel.findByIdAndDelete({ _id: params });
      res.status(200).send("User has been deleted");
      console.log(user);
    } catch (error) {
      console.log(error);
      res.status(400).send({"msg":"Something went wrong"})
    }
  });
module.exports={
    userRoute
}