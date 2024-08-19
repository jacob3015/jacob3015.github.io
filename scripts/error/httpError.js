class HttpError extends Error {

    /**
     * represents http error
     * @param {*} message error message
     * @param {*} statusCode http status code
     */
    constructor(message, statusCode) {
        super(message);
        this.name = "HttpError";
        this.statusCode = statusCode;
    }
}

export default HttpError;