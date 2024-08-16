import { HtmlService } from 'service';
import logger from 'custom-logger';
import ElementNotFoundError from 'element-not-found-error';

class HtmlServiceImpl extends HtmlService {

    constructor(htmlRepository) {
        logger.debug('', 'HtmlServiceImpl constructor', htmlRepository);

        super();
        this.parser = new DOMParser();
        this.htmlRepository = htmlRepository;
    }

    /**
     * fetch the html file with given filename and retrieve the content inside of <template>
     * @param {string} filename without .html
     * @returns copied node that can import to document, null if occurs error
     */
    async findContentFromTemplateByFilename(filename) {
        logger.debug('', 'HtmlServiceImpl findTemplateByFilename', filename);

        try {
            // TODO: need to handle NetworkError, HttpError
            const htmlText = await this.htmlRepository.findTemplateByFilename(filename);

            // TODO: need to handle TypeError
            const htmlDom = this.parseFromText(htmlText);

            // TODO: need to handle ElementNotFoundError
            return this.findBySelector(htmlDom, 'template');
        } catch (error) {
            logger.error(error, error.message, 'HtmlServiceImpl findTemplateByFilename', filename);
        }
        return null;
    }

    /**
     * parse text to text/html
     * @param {string} text
     * @returns html dom
     * @throws TypeError if text is invalid
     */
    parseFromText(text) {
        logger.debug('', 'HtmlServiceImpl parseFromText', text);

        try {
            return this.parser.parseFromString(text, 'text/html');
        } catch (error) {
            logger.error(error, 'failed to parse text to text/html', 'HtmlServiceImpl parseFromText', text);
            throw error;
        }
    }

    /**
     * find element with given dom and selector
     * @param {*} dom
     * @param {*} selector
     * @returns copied node that can import to document
     * @throws ElementNotFoundError if it can't find the element with given dom and selector
     */
    findBySelector(dom, selector) {
        logger.debug('', 'HtmlServiceImpl findBySelector', dom, selector);

        try {
            const elem = dom.querySelector(selector);
            if (!elem) {
                throw new ElementNotFoundError(`${selector} not found`, selector);
            }
            return document.importNode(elem.content, true);
        } catch (error) {
            logger.error(error, `failed to find ${selector}`, 'HtmlServiceImpl findBySelector', dom, selector);
            throw error;
        }
    }
}

export default HtmlServiceImpl;