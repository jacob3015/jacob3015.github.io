class MethodNotImplementedError extends Error {

    /**
     * represents method that extends from interface is not implemented
     * @param {*} message error message
     * @param {*} interfaceName name of the interface class
     */
    constructor(message, interfaceName) {
        super(message);
        this.name = 'MethodNotImplementedError';
        this.interfaceName = interfaceName;
    }
}

export default MethodNotImplementedError;