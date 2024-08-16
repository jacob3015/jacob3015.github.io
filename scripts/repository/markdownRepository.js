import logger from 'custom-logger';
import HttpError from 'http-error';
import { marked } from 'marked';

class MarkdownRepository {

    constructor(baseUrl) {
        logger.debug('', 'MarkdownRepository constructor', baseUrl);
        this.baseUrl = `${baseUrl}/assets/md`;
    }

    async getMarkdownByFilename(filename) {
        logger.debug('', 'MarkdownRepository getMarkdownByFilename', filename);

        const url = `${this.baseUrl}/${filename}.md`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new HttpError(`failed to fetch ${url}`, response.status);
            }
            const htmlText = await response.text();
            return marked(htmlText);
        } catch (error) {
            
        }
    }

    // TODO: implement getPostByTitle
}