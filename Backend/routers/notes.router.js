const express=require("express");
const { reset } = require("nodemon");
const NoteRoute=express.Router();
const {NoteModel}=require("../model/notes");
const {authentication}=require("../middleware/authenication")
NoteRoute.use(authentication);
const cors=require("cors");
const { response } = require("express");
NoteRoute.use(cors())



NoteRoute.get("/posts/get",async(req,res)=>{
    try {
        let userid=req.body.userid
        let data=await NoteModel.find({userid});
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"you are not logged in"}) 
    }
})
NoteRoute.get("/posts",async(req,res)=>{
    try {
       let id=req.body.useid;
       let data=await NoteModel.find()
       let ans=data.filter((item)=>{
        return item.id==id
       })
       let device1=req.query.device1;
       let device2=req.query.device2;
       if(device1||device2){
        let filtedata=await NoteModel.find({$or:[{device:device1},{device:device2}]})
        res.send(filtedata);
       }
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"you are not logged in"}) 
    }
})

NoteRoute.post("/posts",async(req,res)=>{
    try {
        let  {title,body,device}=req.body;
        let id=req.body.userid;
        console.log(id);
        let data={title,body,device,userid:id}
        let notes=NoteModel(data)
        await notes.save()
        res.send({"msg":"your Post successful"})
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"you are not logged in"}) 
    }
});

NoteRoute.patch("/posts/update/:id",async(req,res)=>{
    try {
        let  {title,body,device}=req.body;
      
        let data={title,body,device}
        console.log(data);
        let userid=req.body.userid;
        console.log(userid);
        if(userid==req.params.id){
            let notes=await NoteModel.find({userid});
            let objectid=notes[0]._id
            await NoteModel.findByIdAndUpdate({_id:objectid},data);
            res.send({"msg":"Your Post has been updated"})
        }else{
            res.status(200).send({"msg":"You are not authorized"})
        }
       
       
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"you are not logged in"}) 
    }
});

NoteRoute.delete("/posts/delete/:id",async(req,res)=>{
    try {
        let userid=req.body.userid;
        if(userid==req.params.id){
            let notes=await NoteModel.find({userid});
            let objectid=notes[0]._id
            await NoteModel.findByIdAndDelete({_id:objectid})
            res.send({"msg":"your Post has been deleted"})
        }
      
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"you are not logged in"}) 
    }
});

module.exports={
    NoteRoute
}