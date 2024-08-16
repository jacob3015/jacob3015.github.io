class NetworkError extends Error {

    /**
     * represents network error
     * @param {*} message error message
     */
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}

export default NetworkError;