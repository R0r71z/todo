const mongoose = require('mongoose');

const connect = () => 
mongoose.connect(process.env.MONGO_DB_URI)
.catch(
    e => console.log(`Error connecting to URI: ${process.env.MONGO_DB_URI} / ${e}`
));

module.exports = {
    mongoose,
    connect,
};
