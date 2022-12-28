const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const projectRoutes = require('./routes/projects/project_index');
const userRoutes = require('./routes/users/user_index');
const taskRoutes = require('./routes/tasks/task_index');
const setEnvValue = require('./utils/envUpdator');

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

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

app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Hello world');
})

let a = ()=>{
    axios.post(`https://accounts.zoho.in/oauth/v2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&refresh_token=${process.env.REFRESH_TOKEN}&grant_type=refresh_token`).then((e)=>{
        console.log(e.data.access_token);
        setEnvValue("ACCESS_TOKEN",e.data.access_token);
    }).catch((err)=>{
        console.log(err);
    })
};
a();
setInterval(a,260000);

app.listen(port, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})