import logger from 'custom-logger';
import HttpError from 'http-error';

class WavRepository {

    constructor(baseUrl) {
        logger.debug('', 'WavRepository constructor', baseUrl);
        this.baseUrl = `${baseUrl}/assets/wav`;
    }

    async findSpeechByTopicAndNo(topic, no) {
        logger.debug('', 'WavRepository findSpeechByTopicAndNo', topic, no);

        const url = `${this.baseUrl}/${topic}/${no}.wav`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new HttpError(`failed to fetch ${url}`, response.status);
            }
            return await response.blob();
        } catch (error) {
            if (error instanceof TypeError) {
                logger.error(error, `failed to parse ${url} to blob`, 'WavRepository findSpeechByTopicAndNo', topic, no);
            } else if (error instanceof HttpError) {
                logger.error(error, `failed to fetch ${url}`, 'WavRepository findSpeechByTopicAndNo', topic, no);
            } else {
                logger.error(error, 'failed to connet network', 'WavRepository findSpeechByTopicAndNo', topic, no);
            }
            throw error;
        }
    }
}

export default WavRepository;