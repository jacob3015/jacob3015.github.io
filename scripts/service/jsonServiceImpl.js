import { JsonService } from 'service';
import logger from 'custom-logger';

class JsonServiceImpl extends JsonService {

    constructor(jsonRepository) {
        logger.debug('', 'JsonServiceImpl constructor', jsonRepository);

        super()
        this.jsonRepository = jsonRepository;
    }

    async findTopics() {
    }

    async findQuestionsByTopic(topic) {
    }

    /**
     * randomly draws a given number of indices from the given array and returns them in a set.
     * @param {object} array
     * @param {number} number
     * @returns {Set<number>} set of numbers, empty set if an array is not an array or is empty or number is not positive
     */
    getRandomIndices(array, number) {
        logger.debug('', 'JsonServiceImpl getRandomIndices', array, number);

        const selectedIndices = new Set();

        if (!Array.isArray(array) || array.length === 0 || number <= 0) {
            return selectedIndices;
        }

        while (selectedIndices.size < number) {
            const randomIndex = Math.floor(Math.random() * array.length);
            if (!selectedIndices.has(randomIndex)) {
                selectedIndices.add(randomIndex);
            }
        }
        return selectedIndices;
    }
}

export default JsonServiceImpl;