import logger from 'custom-logger';
import ElementNotFoundError from 'element-not-found-error';

class App {
    constructor(router, layoutComponent) {
        logger.debug('', 'App constructor', router, layoutComponent);
        
        this.router = router;
        this.layoutComponent = layoutComponent;

        this.rootElem = document.querySelector('div');
        if (!this.rootElem) {
            throw new ElementNotFoundError('root element not found', 'div');
        }

        this.rootElem.addEventListener('updatehash', (e) => {
            this.router.updateHash(e.detail.hash);
        });

        this.loadHome();
    }

    loadHome() {
        this.layoutComponent.render(this.rootElem).then(()=> {
            this.router.updateHash('/about');
        });
    }
}

export default App;