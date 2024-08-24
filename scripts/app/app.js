import logger from 'custom-logger';

class App {
    constructor(router, layoutComponent) {
        logger.debug('', 'App constructor', layoutComponent);
        
        this.router = router;
        this.layoutComponent = layoutComponent;
        this.loadHome();
    }

    loadHome() {
        this.layoutComponent.render(document.body).then(()=> {
            this.router.updateHash('/about');
        });
    }
}

export default App;