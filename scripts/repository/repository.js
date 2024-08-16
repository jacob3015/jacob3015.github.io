import MethodNotImplementedError from 'method-not-implemented-error';

class Repository {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
}

/**
 * repository for fetch html as text
 */
class HtmlRepository extends Repository {
    constructor(baseUrl) {
        super(baseUrl);
    }
    async findByFilename(filename) { throw new MethodNotImplementedError('findByFileName is not implemented', 'HtmlRepository'); }
    async findTemplateByFilename(filename) { throw new MethodNotImplementedError('findTemplateByFilename is not implemented', 'HtmlRepository'); }
}

/**
 * repository for fetch json
 */
class JsonRepository extends Repository {
    constructor(baseUrl) {
        super(baseUrl);
    }
    async findByFilename(filename) { throw new MethodNotImplementedError('findByFileName is not implemented', 'JsonRepository'); }
}

/**
 * repository for fetch markdown as text
 */
class MarkdownRepository extends Repository {
    constructor(baseUrl) {
        super(baseUrl);
    }
    async findByFileName(filename) { throw new MethodNotImplementedError('findByFileName is not implemented', 'MarkdownRepository'); }
}

/**
 * repository for fetch wav as blob
 */
class WavRepository extends Repository {
    constructor(baseUrl) {
        super(baseUrl);
    }
    async findByFileName(filename) { throw new MethodNotImplementedError('findByFileName is not implemented', 'WavRepository'); }
}

export {
    HtmlRepository,
    JsonRepository,
    MarkdownRepository,
    WavRepository
}