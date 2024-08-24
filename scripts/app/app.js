import logger from 'custom-logger';

class App {
    constructor(router, layoutComponent) {
        logger.debug('', 'App constructor', router, layoutComponent);
        
        this.router = router;
        this.layoutComponent = layoutComponent;

        document.addEventListener('updatehash', (e) => {
            this.router.updateHash(e.detail.hash);
        });

        this.loadHome();
    }

    loadHome() {
        this.layoutComponent.render(document.body).then(()=> {
            this.router.updateHash('/about');
        });
    }
}

export default App;