import logger from 'custom-logger';
import { JsonRepository } from 'repository';
import HttpError from 'http-error';
import NetworkError from 'network-error';

class JsonRepositoryImpl extends JsonRepository {

    constructor(baseUrl) {
        logger.debug('', 'JsonRepositoryImpl constructor', baseUrl);
        super(`${baseUrl}/assets/json`);
    }

    /**
     * fetch json file from {domain}/assets/json/
     * @param {string} filename without .json
     * @returns json
     * @throws TypeError if its network failure, HttpError if response is not ok, SyntaxError if json is invalid
     */
    async findByFilename(filename) {
        logger.debug('', 'JsonRepositoryImpl findByFilename', filename);

        const url = `${this.baseUrl}/${filename}.json`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new HttpError('response is not ok', response.status);
            }
            return await response.json();
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'JsonRepositoryImpl findByFilename', filename);
            if (error instanceof TypeError) {
                throw new NetworkError('');
            }
            throw error;
        }
    }

    /**
     * fetch json file from {domain}/assets/json/questions/
     * @param {*} filename without .json
     * @returns json
     * @throws TypeError if its network failure, HttpError if response is not ok, SyntaxError if json is invalid
     */
    async findQuestionsByFilename(filename) {
        logger.debug('', 'JsonRepositoryImpl findQuestionsByFilename', filename);

        const url = `${this.baseUrl}/questions/${filename}.json`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new HttpError('response is not ok', response.status);
            }
            return response.json();
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'JsonRepositoryImpl findQuestionsByFilename', filename);
            if (error instanceof TypeError) {
                throw new NetworkError('');
            }
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