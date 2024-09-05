import { MarkdownService } from 'service';
import logger from 'custom-logger';
import { marked } from 'marked';

class MarkdownServiceImpl extends MarkdownService {

    constructor(markdownRepository) {
        logger.debug('', 'MarkdownServiceImpl constructor', markdownRepository);

        super();
        this.markdownRepository = markdownRepository;
    }

    async findAbout() {
        logger.debug('', 'MarkdownServiceImpl findAbout');

        try {
            const mdText = await this.markdownRepository.findByFilename('about');
            return marked.parse(mdText);
        } catch (error) {
            logger.error(error, error.message, 'MarkdownServiceImpl findAbout');
        }
        return null;
    }
}

export default MarkdownServiceImpl;