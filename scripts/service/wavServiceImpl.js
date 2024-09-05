import { WavService } from 'service';
import logger from 'custom-logger';

class WavServiceImpl extends WavService {

    constructor(wavRepository) {
        logger.debug('', 'WavServiceImpl constructor', wavRepository);

        super();
        this.wavRepository = wavRepository;
    }

    async findAudioSource(topic, questionNo) {
        logger.debug('', 'WavServiceImpl findAudioSource', topic, questionNo);

        try {
            return this.wavRepository.findByTopicAndFilename(topic, questionNo);
        } catch (error) {
            logger.error(error, error.message, 'WavServiceImpl findAudioSource', topic, questionNo);
        }
        return null;
    }
}

export default WavServiceImpl;