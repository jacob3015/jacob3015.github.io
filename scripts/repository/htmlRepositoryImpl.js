import logger from 'custom-logger';
import { HtmlRepository } from 'repository';

class HtmlRepositoryImpl extends HtmlRepository {

    constructor(baseUrl, fetcher) {
        logger.debug('', 'HtmlRepositoryImpl constructor', baseUrl, fetcher);
        super(`${baseUrl}/assets/html`, fetcher);
        this.cache = new Map();
    }

    /**
     * Find data with the specified filename and returns a promise that resolves to string.
     * 
     * @param {string} filename The filename to find the data.
     * @returns {Promise<string>} A promise that resolves to string.
     * @throws {HttpError} if response status is not ok.
     * @throws {NetworkError} if there is a network issue.
     * @throws {TypeError} if there is a decoding issue with the body content.
     */
    async findByFilename(filename) {
        logger.debug('', 'HtmlRepositoryImpl findByFilename', filename);

        const url = `${this.baseUrl}/${filename}.html`;

        const cachedData = this.cache.get(url);
        if (cachedData) {
            logger.debug('cache hit', 'HtmlRepositoryImpl findByFilename', filename);
            return cachedData;
        }

        try {
            const data = this.fetcher.fetch(url);
            this.cache.set(url, data);
            return data;
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'HtmlRepositoryImpl findByFilename', filename);
            throw error;
        }
    }

    /**
     * Find data with the specified filename and returns a promise that resolves to string.
     * 
     * @param {string} filename The filename to find the data.
     * @returns {Promise<string>} A promise that resolves to string.
     * @throws {HttpError} if response status is not ok.
     * @throws {NetworkError} if there is a network issue.
     * @throws {TypeError} if there is a decoding issue with the body content.
     */
    async findTemplateByFilename(filename) {
        logger.debug('', 'HtmlRepositoryImpl findTemplateByFilename', filename);

        const url = `${this.baseUrl}/templates/${filename}.html`;

        const cachedData = this.cache.get(url);
        if (cachedData) {
            logger.debug('cache hit', 'HtmlRepositoryImpl findByFilename', filename);
            return cachedData;
        }

        try {
            const data = this.fetcher.fetch(url);
            this.cache.set(url, data);
            return data;
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'HtmlRepositoryImpl findTemplateByFilename', filename);
            throw error;
        }
    }

    // TODO: move the parsing and querying code to service layer, HtmlService
    // async findTemplateByFilename(filename) {
    //     logger.debug('', 'HtmlRepository findTemplateByFilename', filename);

    //     const url = `${this.baseUrl}/templates/${filename}.html`;
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new HttpError(`failed to fetch ${url}`, response.status);
    //         }
    //         const htmlText = await response.text();
    //         const node = this.parser.parseFromString(htmlText, 'text/html');

    //         const selector = 'template';
    //         const template = node.querySelector(selector);
    //         if (!template) {
    //             throw new ElementNotFoundError(`${selector} not found`, selector);
    //         }
    //         return document.importNode(template.content, true);
    //     } catch (error) {
    //         if (error instanceof ElementNotFoundError) {
    //             logger.error(error, `failed to find ${error.selector} in ${url}`, 'HtmlRepository findTemplateByFilename', filename);
    //         } else if (error instanceof TypeError) {
    //             logger.error(error, `failed to parse ${url} to dom`, 'HtmlRepository findTemplateByFilename', filename);
    //         } else if (error instanceof HttpError) {
    //             logger.error(error, `failed to fetch ${url}`, 'HtmlRepository findTemplateByFilename', filename);
    //         } else {
    //             logger.error(error, 'failed to connet network', 'HtmlRepository findTemplateByFilename', filename);
    //         }
    //         throw error;
    //     }
    // }
}

export default HtmlRepositoryImpl;