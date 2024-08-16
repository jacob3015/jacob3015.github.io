import MethodNotImplementedError from 'method-not-implemented-error';

class HtmlService {
    async findContentFromTemplateByFilename(filename) { throw new MethodNotImplementedError('findTemplateByFilename is not implemented', 'HtmlService'); }
    parseFromText(text) { throw new MethodNotImplementedError('parseFromText is not implemented', 'HtmlService'); }
    findBySelector(html, selector) { throw new MethodNotImplementedError('findBySelector is not implemented', 'HtmlService'); }
}

class ImageService {
}

class JsonService {
}

class MarkdownService {
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