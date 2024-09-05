const eventFactory = {
    create: function(eventName, detail = {}) {
        return new CustomEvent(eventName, {
            detail: detail
        });
    }
}

export default eventFactory;