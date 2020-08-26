const winston = require('winston')
myFormat = () => {
    return new Date(Date.now()).toUTCString()
}
class LoggerService {
    constructor(route) {
        this.log_data = null
        this.route = route
        const loggerInfo = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: `./logs/actions.log`
                })
            ],
            format: winston.format.printf((info) => {
                let message = `${myFormat()} | ${info.level.toUpperCase()} | actions.log | ${info.message} | `
                    message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
                    message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
                return message
            })
        });
        this.loggerInfo = loggerInfo  
        const loggerError = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: `./logs/errors.log`
                })
            ],
            format: winston.format.printf((info) => {
                let message = `${myFormat()} | ${info.level.toUpperCase()} | errors.log | ${info.message} | `
                    message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
                    message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
                return message
            })
        });
        this.loggerError = loggerError  
    }
    setLogData(log_data) {
        this.log_data = log_data
    }
    async info(message) {
        this.loggerInfo.log('info', message);
    }
    async info(message, obj) {
        this.loggerInfo.log('info', message, {
            obj
        })
    }
    async debug(message) {
        this.loggerInfo.log('debug', message);
    }
    async debug(message, obj) {
        this.loggerInfo.log('debug', message, {
            obj
        })
    }
    async error(message) {
        this.loggerError.log('error', message);
    }
    async error(message, obj) {
        this.loggerError.log('error', message, {
            obj
        })
    }
}
module.exports = LoggerService





/*var winston = require('winston');
var path = require('path');

// Set this to whatever, by default the path of the script.
var logPath = __dirname;

const tsFormat = () => (new Date().toISOString());

const errorLog = winston.createLogger({
  transports: [
    new winston.transports.Console({
        json: true,
        colorize: true,
        level: 'error',
        handleExceptions: true
    }),
    new winston.transports.File({
      filename: path.join(logPath, 'errors.log'),
      timestamp: tsFormat,
      level: 'error'})
  ]
});

const accessLog = winston.createLogger({
  transports: [
    new winston.transports.Console({
        json: true,
        colorize: true,
        level: 'info',
        handleExceptions: true
    }),
    new winston.transports.File({
      filename: path.join(logPath, 'access.log'),
      timestamp: tsFormat,
      level: 'info'})
  ]
});

module.exports = {
    errorLog: errorLog,
    accessLog: accessLog
};

/*
const expressWinston = require('express-winston');
const winston = require('winston');

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

const log = name => expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true,
            level: 'info',
            handleExceptions: true
        }),
        new winston.transports.File({
            filename: './src/logs/info.log',
            level: 'debug',
            maxsize: 5242880,
            maxFiles: 10,
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: './src/logs/error.log',
            level: 'error',
            maxsize: 5242880,
            maxFiles: 10,
            json: true,
            colorize: true
        })
    ]
});
/*
const logger = expressWinston.logger({
    level: 'info',
    format: winston.format.json(),
    transports: [ //transports ao invés de transport
        new winston.transports.File({ filename: 'error.log', level: 'error', json: true, level: 'debug', colorize: true }),
        new winston.transports.File({ filename: 'info.log', json: true, level: 'debug', colorize: true }),
        new winston.transports.Console()
      ]
  });


module.exports = log;*/