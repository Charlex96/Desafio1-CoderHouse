const mongoose = require( "mongoose");
require ("dotenv/config");

const config = {
    mongoDB: {
        URL: `mongodb+srv://fimacharles:lE8oqWVO44hcDsJu@dbcoder.bpexbss.mongodb.net/ecommerce`,
        
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
};

const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.mongoDB.URL, config.mongoDB.options);
        console.log("Connected to Mongo Atlas");
    } catch (error) {
        console.log("Error en la conexión con Mongo Atlas", error);
    }
};

module.exports = {
    connectMongoDB: connectMongoDB
};
