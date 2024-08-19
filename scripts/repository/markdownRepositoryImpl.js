import logger from 'custom-logger';
import { MarkdownRepository } from 'repository';

class MarkdownRepositoryImpl extends MarkdownRepository {

    constructor(baseUrl, fetcher) {
        logger.debug('', 'MarkdownRepository constructor', baseUrl, fetcher);
        super(`${baseUrl}/assets/md`, fetcher);
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
        logger.debug('', 'MarkdownRepositoryImpl findByFilename', filename);

        const url = `${this.baseUrl}/${filename}.md`;
        try {
            return this.fetcher.fetch(url);
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'MarkdownRepositoryImpl findByFilename', filename);
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
    async findPostByFilename(filename) {
        logger.debug('', 'MarkdownRepositoryImpl findPostByFilename', filename);

        const url = `${this.baseUrl}/posts/${filename}.md`;
        try {
            return this.fetcher.fetch(url);
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'MarkdownRepositoryImpl findPostByFilename', filename);
            throw error;
        }
    }

    // async getMarkdownByFilename(filename) {
    //     logger.debug('', 'MarkdownRepository getMarkdownByFilename', filename);

    //     const url = `${this.baseUrl}/${filename}.md`;
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new HttpError(`failed to fetch ${url}`, response.status);
    //         }
    //         const htmlText = await response.text();
    //         return marked(htmlText);
    //     } catch (error) {
            
    //     }
    // }
}

export default MarkdownRepositoryImpl;