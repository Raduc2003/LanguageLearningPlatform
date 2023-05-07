const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.get('/', (req,res)=>{
    res.render('index');
});
const signinRouter = require('./routes/signin');
app.use("/signin", signinRouter);
app.listen(3000); 
