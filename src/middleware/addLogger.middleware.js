const { logger, prodLogger, devLogger } = require("../utils/loggers");

const addLogger = (req, res, next)=>{

    if(process.env.NODE_ENV === 'production'){
        req.logger = prodLogger
    }else{
        req.logger = devLogger;
    }
    req.logger.info(`NODE_ENV ${process.env.NODE_ENV}`)
    req.logger.http(`${req.method} to ${req.url} - ${new Date().toLocaleDateString()}`)
    //req.logger.http(`${req.method} to ${req.url} - ${new Date().toLocaleDateString()}`)
    next(); 
}

module.exports = addLogger; 