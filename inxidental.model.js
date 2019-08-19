const mongoose=require ('mongoose');
const Schema=mongoose.Schema;
let incidents=new Schema({
    date:{
        type: String},
    user:{
        type: String},
    dept:{
        type: String},
    incident:{
        type:String},
    category:{
        type:String
    },
    descri:{
            type: String},
    priority:{
        type: String}, 
     
    reso:{
        type: String}, 
    status:{
        type: String}});

module.exports=mongoose.model('incidents',incidents)