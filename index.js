const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projects/project_index');
const userRoutes = require('./routes/users/user_index');

app.use(express.urlencoded({extended:true,limit:'50mb'}));
app.use(express.json({limit:'50mb'}));

require('dotenv').config();


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to Mongodb...');
})
.catch(err => {
    console.log(err);
    console.log('Error connecting to Mongodb...');
})

app.use(cors());

const port = process.env.PORT || 5000;

app.use('/api/v1/projects',projectRoutes);
app.use('/api/v1/users',userRoutes);

app.get('/',(req,res) => {
    res.send('Hello world');
})

app.listen(port,() => {
    console.log(`Listening on port ${process.env.PORT}`);
})