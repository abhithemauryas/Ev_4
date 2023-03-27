const mongoose=require("mongoose")

const notesSchema=mongoose.Schema({
    tittle:{type:String,require:true},
    body:{type:String,require:true},
    device:{type:String,require:true},
    no_of_comments:{type:Number,require:true}
})

const NodeModel=mongoose.model("notes",notesSchema);
module.exports={
    NodeModel
}