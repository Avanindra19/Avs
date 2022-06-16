const mongoose=require('mongoose');

const todoListSchema= new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required: true
    },
    dd:{
        type:String,
        required:true
    }
});

const list =mongoose.model('todoList',todoListSchema);

module.exports=list;