import logger from 'custom-logger';

class AboutComponent {

    constructor(markdownService) {
        logger.debug('', 'AboutComponent constructor', markdownService);
        this.markdownService = markdownService;
    }

    async buildDomElement() {
        logger.debug('', 'AboutComponent buildDomElement');

        const container = document.createElement('div');
        container.innerHTML = await this.markdownService.findAbout();

        return container;
    }

    render(target) {
        logger.debug('', 'AboutComponent render', target);

        this.buildDomElement().then(component => {
            target.replaceChildren(component);
        });
    }
}

export default AboutComponent;