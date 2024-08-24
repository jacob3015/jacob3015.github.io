import MethodNotImplementedError from 'method-not-implemented-error';

class HtmlService {
    async findContentFromTemplateByFilename(filename) { throw new MethodNotImplementedError('findTemplateByFilename is not implemented', 'HtmlService'); }
    parseFromText(text) { throw new MethodNotImplementedError('parseFromText is not implemented', 'HtmlService'); }
    findBySelector(html, selector) { throw new MethodNotImplementedError('findBySelector is not implemented', 'HtmlService'); }
}

class ImageService {
}

class JsonService {
    async findTopics() { throw new MethodNotImplementedError('findTopics is not implemented', 'JsonService'); }
    async findQuestionsByTopic(topic) { throw new MethodNotImplementedError('findQuestionsByTopic is not implemented', 'JsonService'); }
    getRandomIndices(list, number) { throw new MethodNotImplementedError('getRandomIndices is not implemented', 'JsonService'); }
}

class MarkdownService {
    async findAbout() { throw new MethodNotImplementedError('findAbout is not implemented', 'MarkdownService'); }
}

class WavService {
}

export {
    HtmlService,
    ImageService,
    JsonService,
    MarkdownService,
    WavService
}