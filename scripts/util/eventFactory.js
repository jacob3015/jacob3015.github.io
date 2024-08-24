class EventFactory {

    createEvent(eventName, detail = {}) {
        return new CustomEvent(eventName, {
            detail: detail
        });
    }

    dispatchEvent(eventName, detail = {}, element = document) {
        const event = this.createEvent(eventName, detail);
        element.dispatchEvent(event);
    }
}

const eventFactory = new EventFactory();
export default eventFactory;