const express = require('express'); 
// const app = express.express();
const app = express();
const cors = require('cors'); 

app.use(cors())
app.get('/',(req,res) => {
    // console.log('req,res',req,res);
    res.send('Hello');
    // res.send(req);
})




// app.listen('3005');
app.listen(3005,() => {
    console.log('serwer Node działa - listen')
    
});