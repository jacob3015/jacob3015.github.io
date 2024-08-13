import logger from 'custom-logger';
import HttpError from 'http-error';
import ElementNotFoundError from 'element-not-found-error';

class HtmlRepository {

    constructor(baseUrl) {
        logger.debug('', 'HtmlRepository constructor', baseUrl);
        this.baseUrl = `${baseUrl}/assets/html`;
        this.parser = new DOMParser();
    }

    async findTemplateByFilename(filename) {
        logger.debug('', 'HtmlRepository findTemplateByFilename', filename);

        const url = `${this.baseUrl}/templates/${filename}.html`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new HttpError(`failed to fetch ${url}`, response.status);
            }
            const htmlText = await response.text();
            const node = this.parser.parseFromString(htmlText, 'text/html');

            const selector = 'template';
            const template = node.querySelector(selector);
            if (!template) {
                throw new ElementNotFoundError(`${selector} not found`, selector);
            }
            return document.importNode(template.content, true);
        } catch (error) {
            if (error instanceof ElementNotFoundError) {
                logger.error(error, `failed to find ${error.selector} in ${url}`, 'HtmlRepository findTemplateByFilename', filename);
            } else if (error instanceof TypeError) {
                logger.error(error, `failed to parse ${url} to dom`, 'HtmlRepository findTemplateByFilename', filename);
            } else if (error instanceof HttpError) {
                logger.error(error, `failed to fetch ${url}`, 'HtmlRepository findTemplateByFilename', filename);
            } else {
                logger.error(error, 'failed to connet network', 'HtmlRepository findTemplateByFilename', filename);
            }
            throw error;
        }
    }
}

export default HtmlRepository;