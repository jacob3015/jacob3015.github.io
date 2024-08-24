import logger from 'custom-logger';
import eventFactory from 'event-factory';

class LayoutComponent {

    constructor(htmlService) {
        logger.debug('', 'LayoutComponent constructor', htmlService);
        this.htmlService = htmlService;
    }
    
    async buildDomElement() {
        logger.debug('', 'LayoutComponent buildDomElement');
        
        this.layout = await this.htmlService.findContentFromTemplateByFilename('layout');

        this.homeBtn = this.layout.getElementById('home-btn');
        this.homeBtn.addEventListener('click', () => {
            logger.debug('dispatch updatehash event', 'LayoutComponent buildDomElement homeBtn');
            eventFactory.dispatchEvent('updatehash', {
                hash: '/about'
            });
        });

        this.aboutBtn = this.layout.getElementById('about-btn');
        this.aboutBtn.addEventListener('click', () => {
            logger.debug('dispatch updatehash event', 'LayoutComponent buildDomElement aboutBtn');
            eventFactory.dispatchEvent('updatehash', {
                hash: '/about'
            });
        });

        this.blogBtn = this.layout.getElementById('blog-btn');

        this.projectBtn = this.layout.getElementById('project-btn');
        this.projectBtn.addEventListener('click', () => {
            logger.debug('dispatch updatehash event', 'LayoutComponent buildDomElement projectBtn');
            eventFactory.dispatchEvent('updatehash', {
                hash: '/project-list'
            });
        })

        return this.layout;
    }

    async render(target) {
        logger.debug('', 'LayoutComponent render', target);

        const component = await this.buildDomElement();
        target.replaceChildren(component);
    }
}

export default LayoutComponent;