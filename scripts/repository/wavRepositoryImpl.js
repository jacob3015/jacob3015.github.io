import logger from 'custom-logger';
import { WavRepository } from 'repository';

class WavRepositoryImpl extends WavRepository {

    constructor(baseUrl, fetcher) {
        logger.debug('', 'WavRepository constructor', baseUrl, fetcher);
        super(`${baseUrl}/assets/wav`, fetcher);

        this.cache = new Map();
    }

    /**
     * Find data with the specified filename and returns a promise that resolves to blob.
     * 
     * @param {string} filename The filename to find the data.
     * @returns {Promise<Blob>} A promise that resolves to blob.
     * @throws {HttpError} if response status is not ok.
     * @throws {NetworkError} if there is a network issue.
     * @throws {TypeError} if there is a decoding issue with the body content.
     */
     async findByFilename(filename) {
        logger.debug('', 'WavRepositoryImpl findByFilename', filename);

        const url = `${this.baseUrl}/${filename}.wav`;

        if (this.cache.has(url)) {
            logger.debug('cache hit', 'WavRepositoryImpl findByFilename', filename);
            return this.cache.get(url);
        }

        try {
            const data = this.fetcher.fetch(url);
            this.cache.set(url, data);
            return data;
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'WavRepositoryImpl findByFilename', filename);
            throw error;
        }
    }

    /**
     * Find data with the specified topic and filename and returns a promise that resolves to blob.
     * 
     * @param {string} topic The topic to find the data.
     * @param {string} filename The filename to find the data.
     * @returns {Promise<Blob>} A promise that resolves to blob.
     * @throws {HttpError} if response status is not ok.
     * @throws {NetworkError} if there is a network issue.
     * @throws {TypeError} if there is a decoding issue with the body content.
     */
     async findByTopicAndFilename(topic, filename) {
        logger.debug('', 'WavRepositoryImpl findByTopicAndFilename', topic, filename);

        const url = `${this.baseUrl}/${topic}/${filename}.wav`;

        if (this.cache.has(url)) {
            logger.debug('cache hit', 'WavRepositoryImpl findByTopicAndFilename', filename);
            return this.cache.get(url);
        }

        try {
            const data = this.fetcher.fetch(url);
            this.cache.set(url, data);
            return data;
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'WavRepositoryImpl findByTopicAndFilename', topic, filename);
            throw error;
        }
    }

    // async findSpeechByTopicAndNo(topic, no) {
    //     logger.debug('', 'WavRepository findSpeechByTopicAndNo', topic, no);

    //     const url = `${this.baseUrl}/${topic}/${no}.wav`;
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new HttpError(`failed to fetch ${url}`, response.status);
    //         }
    //         return await response.blob();
    //     } catch (error) {
    //         if (error instanceof TypeError) {
    //             logger.error(error, `failed to parse ${url} to blob`, 'WavRepository findSpeechByTopicAndNo', topic, no);
    //         } else if (error instanceof HttpError) {
    //             logger.error(error, `failed to fetch ${url}`, 'WavRepository findSpeechByTopicAndNo', topic, no);
    //         } else {
    //             logger.error(error, 'failed to connet network', 'WavRepository findSpeechByTopicAndNo', topic, no);
    //         }
    //         throw error;
    //     }
    // }
}

export default WavRepositoryImpl;