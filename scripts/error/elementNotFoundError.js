class ElementNotFoundError extends Error {

    /**
     * represents can't find the element
     * @param {*} message error message
     * @param {*} selector element selector
     */
    constructor(message, selector) {
        super(message);
        this.name = 'ElementNotFoundError';
        this.selector = selector;
    }
}

export default ElementNotFoundError;