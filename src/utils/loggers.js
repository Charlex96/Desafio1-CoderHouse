const winston = require('winston');


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'http',
            format: winston.format.cli()
        }),
        new winston.transports.File({ 
            level: 'warn', 
            filename: './errors.log', 
            format: winston.format.combine(
                winston.format.timestamp(), //<----optional
                winston.format.errors({stack:true}),  //<----optional
                winston.format.json()) 
        })
    ]
})

const devLogger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:'verbose', format: winston.format.combine(winston.format.timestamp(), winston.format.cli() ) })
    ]
})

const prodLogger = winston.createLogger({
    transports:[
        new winston.transports.Console({level: 'http', format: winston.format.cli()}),
        new winston.transports.File({level:'warn', filename:'./prodError.log'})
    ]
})



module.exports = {
    logger,
    devLogger,
    prodLogger
}; 