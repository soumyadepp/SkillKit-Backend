const mongoose = require('mongoose');

const testConnection = mongoose.createConnection(process.env.MONGO_URI,{dbName:'test'});
const userConnection = mongoose.createConnection(process.env.MONGO_URI,{dbName:'db-name'});

module.exports = {testConnection,userConnection};