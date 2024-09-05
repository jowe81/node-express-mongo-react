const DEFAULT_LOGGER_NAME = 'serve';
const loggers = {};

function getLogger(name = DEFAULT_LOGGER_NAME) {
    const loggerName = name;

    // If the logger already exists, return it.
    if (loggers[loggerName]) {
        return loggers[loggerName];
    }

    const buffer = [];

    function getLine(msg, context, level= 'INFO') {
        context = context ?? 'backend';
        const now = new Date();
        return `${level} ${context ? `[${context}] ` : ``}${loggerName} ${msg}`;
    }

    function log(msg, context, level) {
        const line = getLine(msg, context, level);
        const now = new Date();
        buffer.push({
            now,
            line
        });
        
        console.log(`${now.toLocaleString()}: ${line}`);
    }

    buffer.push(getLine('Starting...'));

    const debug = (msg, context) => log(msg, context, "DEBUG");
    const info = (msg, context) => log(msg, context, "INFO");
    const warn = (msg, context) => log(msg, context, "WARN");
    const error = (msg, context) => log(msg, context, "ERROR");

    const getBuffer = () => buffer;

    const logger = {
        debug,
        info,
        warn,
        warning: warn,
        error,
        getBuffer,
    };

    loggers[loggerName] = logger;

    return logger;
}



export default getLogger;