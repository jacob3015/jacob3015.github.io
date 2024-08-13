import logger from 'custom-logger';
import HttpError from 'http-error';

class JsonRepository {

    constructor(baseUrl) {
        logger.debug('', 'JsonRepository constructor', baseUrl);
        this.baseUrl = `${baseUrl}/assets/json`;
    }

    async findAllTopics() {
        logger.debug('', 'JsonRepository findAllTopics');

        const url = `${this.baseUrl}/topics.json`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new HttpError(`failed to fetch ${url}`, response.status);
            }
            return await response.json();
        } catch (error) {
            if (error instanceof SyntaxError) {
                logger.error(error, `failed to parse ${url} to json`, 'JsonRepository findAllTopics');
            } else if (error instanceof HttpError) {
                logger.error(error, `failed to fetch ${url}`, 'JsonRepository findAllTopics');
            } else {
                logger.error(error, 'failed to connect network', 'JsonRepository findAllTopics');
            }
            throw error;
        }
    }

    async findAllQuestionsByTopic(topic) {
        logger.debug('', 'JsonRepository findAllQuestionsByTopic', topic);

        const url = `${this.baseUrl}/questions/${topic}.json`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new HttpError(`failed to fetch ${url}`, response.status);
            }
            return response.json();
        } catch (error) {
            if (error instanceof SyntaxError) {
                logger.error(error, `failed to parse ${url} to json`, 'JsonRepository findAllQuestionsByTopic', topic);
            } else if (error instanceof HttpError) {
                logger.error(error, `failed to fetch ${url}`, 'JsonRepository findAllQuestionsByTopic', topic);
            } else {
                logger.error(error, 'failed to connect network', 'JsonRepository findAllQuestionsByTopic', topic);
            }
            throw error;
        }
    }
}

export default JsonRepository;