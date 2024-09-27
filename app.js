const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

//Root route
app.get('/', (req,res =>{
    res.setEncoding('Api running')
}))

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})