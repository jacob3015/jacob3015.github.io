import { JsonService } from 'service';
import logger from 'custom-logger';

class JsonServiceImpl extends JsonService {

    constructor(jsonRepository) {
        logger.debug('', 'JsonServiceImpl constructor', jsonRepository);

        super();
        this.jsonRepository = jsonRepository;
    }

    async findTopics() {
        logger.debug('', 'JsonServiceImpl findTopics');

        try {
            return this.jsonRepository.findByFilename('topics');
        } catch (error) {
            logger.error(error, error.message, 'JsonServiceImpl findTopics');
        }
        return [];
    }

    async findQuestionsByTopic(topic) {
        logger.debug('', 'JsonServiceImpl findQuestionsByTopic', topic);

        try {
            return this.jsonRepository.findQuestionsByFilename(topic);
        } catch (error) {
            logger.error(error, error.message, 'JsonServiceImpl findQuestionsByTopic', topic);
        }
        return [];
    }
}

export default JsonServiceImpl;