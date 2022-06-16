//setting up the server at port 8000

const express=require('express');
const app=express();
const port=8000;

//************************************** 


// connection to db

const db=require('./config/mongoose');
const list=require('./models/todoList');

//************************************** 

// setting up the view engine 
app.set('view engine','ejs');
app.set('views','./views');

//*************************************** 


//middlewares used to parse body parameters and setup folder for static files

app.use(express.urlencoded());
app.use(express.static('assets'));

//********************************************** 


// controller for the home page
app.get('/',function(req,res){
    list.find({ },function(err,tasks){
        if (err){
            console.log('error in fetching taks from db');
            return;
        }
        return res.render('new',{
            title:'Todo App',
            todo_list:tasks
        });
    });
});
//******************************************** 


//controller to handle the add task event 
app.post('/create-task',function(req,res){
    list.create({
        desc:req.body.desc,
        category:req.body.category,
        dd:req.body.dd
    },function(err,newTask){
        if(err){
            console.log('Error in creating a contact!')
            return;
        }
        console.log('******',newTask);
        return res.redirect('back');
    });
});
//************************************

//controller to handle delete task event
app.get('/delete-task/',function(req,res){
    console.log(req.query);
    let id=req.query.id;
    list.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })
});
//****************************************



// App listening at port number 8000
app.listen(port,function(err){
    if (err){
        console.log(`Error while loading the server:${err}`);
        return;
    }
    console.log(`server loaded successfully at port:${port}`);
});