import logger from 'custom-logger';

class LayoutComponent {

    constructor(htmlService) {
        logger.debug('', 'LayoutComponent constructor', htmlService);
        this.htmlService = htmlService;
    }
    
    async buildDomElement() {
        logger.debug('', 'LayoutComponent buildDomElement');
        
        return await this.htmlService.findContentFromTemplateByFilename('layout');
    }

    async render(target) {
        logger.debug('', 'LayoutComponent render', target);

        const component = await this.buildDomElement();
        target.replaceChildren(component);
    }
}

export default LayoutComponent;