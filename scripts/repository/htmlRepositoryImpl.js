import logger from 'custom-logger';
import { HtmlRepository } from 'repository';
import HttpError from 'http-error';
import NetworkError from 'network-error';

class HtmlRepositoryImpl extends HtmlRepository {

    constructor(baseUrl) {
        logger.debug('', 'HtmlRepositoryImpl constructor', baseUrl);
        super(`${baseUrl}/assets/html`);
    }

    /**
     * fetch file from {domain}/assets/html/
     * @param {string} filename
     * @returns html as text
     * @throws HttpError if response is not ok, NetworkError if its network failure
     */
    async findByFilename(filename) {
        logger.debug('', 'HtmlRepositoryImpl findByFilename', filename);

        const url = `${this.baseUrl}/${filename}.html`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new HttpError('response is not ok', response.status);
            }
            return await response.text();
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'HtmlRepositoryImpl findByFilename', filename);
            if (error instanceof TypeError) {
                throw new NetworkError('');
            }
            throw error;
        }
    }

    /**
     * fetch file from {domain}/assets/html/templates/
     * @param {string} filename 
     * @returns html as text
     * @throws HttpError if response is not ok, NetworkError if its network failure
     */
    async findTemplateByFilename(filename) {
        logger.debug('', 'HtmlRepositoryImpl findTemplateByFilename', filename);

        const url = `${this.baseUrl}/templates/${filename}.html`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new HttpError('response is not ok', response.status);
            }
            return await response.text();
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'HtmlRepositoryImpl findTemplateByFilename', filename);
            if (error instanceof TypeError) {
                throw new NetworkError('');
            }
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