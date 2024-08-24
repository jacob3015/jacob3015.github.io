import ElementNotFoundError from 'element-not-found-error';

const eventDispatcher = {
    dispatch: function(event, element = document.querySelector('div')) {
        if (element) {
            element.dispatchEvent(event);
        } else {
            throw new ElementNotFoundError('app not found', 'div');
        }
    }
}

export default eventDispatcher;