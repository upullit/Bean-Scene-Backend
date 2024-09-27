const express = require('express');
const app = express();
const port = 3000;

const menuRoutes = require('./routes/menuRoutes');

app.use(express.json());


// Use the menu routes
app.use('/api', menuRoutes);

//Root route
app.get('/', (req,res) =>{
    res.send('Api running')
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})