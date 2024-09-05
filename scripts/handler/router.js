import logger from 'custom-logger';

class Router {

    constructor(routes) {
        logger.debug('', 'Router constructor', routes);

        this.routes = routes;
        this.isRendering = false;
        this.debounceTimeout = undefined;
        this.DEBOUNCE_DELAY = 300;

        window.addEventListener('popstate', () => {
            this.isRendering = true;
            clearTimeout(this.debounceTimeout);

            this.debounceTimeout = setTimeout(() => {
                this.renderBaseOnHash();
                this.isRendering = false;
            }, this.DEBOUNCE_DELAY);
        });

        window.addEventListener('hashchange', () => {
            if (!this.isRendering) {
                this.renderBaseOnHash();
            }
        });

        this.currentComponent = undefined;
    }

    updateHash(hash) {
        logger.debug('', 'Router updateHash', hash);

        history.pushState(null, null, `#${hash}`);
        this.renderBaseOnHash();
    }

    renderBaseOnHash() {
        logger.debug('', 'Router renderBaseOnHash');

        if (this.hasCleanBuffer()) {
            this.currentComponent.cleanBuffer();
        }
        
        const path = location.hash.replace('#', '');
        const route = this.routes.filter((route) => route.path === path);
        const target = document.getElementById(route[0].target);
        if (target) {
            route[0].component.render(target);
            this.currentComponent = route[0].component;
        } else {
            logger.info('target not found', 'Router renderBaseOnHash');
        }
    }

    // TODO: check more strictly
    hasCleanBuffer() {
        return this.currentComponent && this.currentComponent.cleanBuffer;
    }
}

export default Router;