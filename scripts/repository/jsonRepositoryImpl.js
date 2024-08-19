import logger from 'custom-logger';
import { JsonRepository } from 'repository';

class JsonRepositoryImpl extends JsonRepository {

    constructor(baseUrl, fetcher) {
        logger.debug('', 'JsonRepositoryImpl constructor', baseUrl, fetcher);
        super(`${baseUrl}/assets/json`, fetcher);
    }

    /**
     * Find data with the specified filename and returns a promise that resolves to json.
     * 
     * @param {string} filename The filename to find the data.
     * @returns {Promise<Object>} A promise that resolves to json.
     * @throws {HttpError} if response status is not ok.
     * @throws {NetworkError} if there is a network issue.
     * @throws {TypeError} if there is a decoding issue with the body content.
     * @throws {SyntaxError} if the response body cannot be parsed as json.
     */
    async findByFilename(filename) {
        logger.debug('', 'JsonRepositoryImpl findByFilename', filename);

        const url = `${this.baseUrl}/${filename}.json`;
        try {
            return this.fetcher.fetch(url);
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'JsonRepositoryImpl findByFilename', filename);
            throw error;
        }
    }

    /**
     * Find data with the specified filename and returns a promise that resolves to json.
     * 
     * @param {string} filename The filename to find the data.
     * @returns {Promise<Object>} A promise that resolves to json.
     * @throws {HttpError} if response status is not ok.
     * @throws {NetworkError} if there is a network issue.
     * @throws {TypeError} if there is a decoding issue with the body content.
     * @throws {SyntaxError} if the response body cannot be parsed as json.
     */
    async findQuestionsByFilename(filename) {
        logger.debug('', 'JsonRepositoryImpl findQuestionsByFilename', filename);

        const url = `${this.baseUrl}/questions/${filename}.json`;
        try {
            return this.fetcher.fetch(url);
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'JsonRepositoryImpl findQuestionsByFilename', filename);
            throw error;
        }
    }

    // async findAllTopics() {
    //     logger.debug('', 'JsonRepository findAllTopics');

    //     const url = `${this.baseUrl}/topics.json`;
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new HttpError(`failed to fetch ${url}`, response.status);
    //         }
    //         return await response.json();
    //     } catch (error) {
    //         if (error instanceof SyntaxError) {
    //             logger.error(error, `failed to parse ${url} to json`, 'JsonRepository findAllTopics');
    //         } else if (error instanceof HttpError) {
    //             logger.error(error, `failed to fetch ${url}`, 'JsonRepository findAllTopics');
    //         } else {
    //             logger.error(error, 'failed to connect network', 'JsonRepository findAllTopics');
    //         }
    //         throw error;
    //     }
    // }

    // async findAllQuestionsByTopic(topic) {
    //     logger.debug('', 'JsonRepository findAllQuestionsByTopic', topic);

    //     const url = `${this.baseUrl}/questions/${topic}.json`;
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new HttpError(`failed to fetch ${url}`, response.status);
    //         }
    //         return response.json();
    //     } catch (error) {
    //         if (error instanceof SyntaxError) {
    //             logger.error(error, `failed to parse ${url} to json`, 'JsonRepository findAllQuestionsByTopic', topic);
    //         } else if (error instanceof HttpError) {
    //             logger.error(error, `failed to fetch ${url}`, 'JsonRepository findAllQuestionsByTopic', topic);
    //         } else {
    //             logger.error(error, 'failed to connect network', 'JsonRepository findAllQuestionsByTopic', topic);
    //         }
    //         throw error;
    //     }
    // }
}

export default JsonRepositoryImpl;