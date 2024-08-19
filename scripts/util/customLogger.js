class CustomLogger {

    /**
     * print debug log on the console;
     * args: message, caller, ...params;
     * log = {
     *      "message" : message,
     *      "caller" : caller,
     *      "params" : params
     * };
     */
    debug() {
        const [message, caller, ...params] = arguments;
        const log = {
            "message" : message,
            "caller" : caller,
            "params" : params
        };
        console.debug(log);
    }

    /**
     * print info log on the console;
     * args: message, caller, ...params;
     * log = {
     *      "message" : message,
     *      "caller" : caller,
     *      "params" : params
     * };
     */
    info() {
        const [message, caller, ...params] = arguments;
        const log = {
            "message" : message,
            "caller" : caller,
            "params" : params
        };
        console.info(log);
    }

    /**
     * print error log on the console;
     * args: error, message, caller, ...params;
     * log = {
     *      "error" : error,
     *      "message" : message,
     *      "caller" : caller,
     *      "params" : params
     * };
     */
    error() {
        const [error, message, caller, ...params] = arguments;
        const log = {
            "error" : error,
            "message" : message,
            "caller" : caller,
            "params" : params
        };
        console.error(log);
    }
}

const logger = new CustomLogger();
export default logger;