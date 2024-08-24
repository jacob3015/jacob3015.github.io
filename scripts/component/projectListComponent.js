import logger from 'custom-logger';
import eventFactory from 'event-factory';
import eventDispatcher from 'event-dispatcher';

class ProjectListComponent {

    constructor(htmlService) {
        logger.debug('', 'ProjectListComponent constructor', htmlService);
        this.htmlService = htmlService;
    }

    async buildDomElement() {
        logger.debug('', 'ProjectListComponent buildDomElement');

        this.projectList = await this.htmlService.findContentFromTemplateByFilename('projects');

        this.startEspBtn = this.projectList.getElementById('start-esp-btn');
        this.startEspBtn.addEventListener('click', () => {
            logger.debug('dispatch updatehash event', 'ProjectListComponent buildDomEvent startEspBtn');
            eventDispatcher.dispatch(eventFactory.create('updatehash', { hash: '/project-list/esp' }));
        });

        return this.projectList;
    }

    render(target) {
        logger.debug('', 'ProjectListComponent render', target);

        this.buildDomElement().then(component => {
            target.replaceChildren(component);
        });
    }
}

export default ProjectListComponent;