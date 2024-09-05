import { EspService } from 'service';
import logger from 'custom-logger';

class EspServiceImpl extends EspService {

    constructor(jsonService) {
        logger.debug('', 'EspServiceImpl constructor', jsonService);
        
        super();
        this.jsonService = jsonService;
    }

    async createQuestionList() {
        logger.debug('', 'EspServiceImpl createQuestionList');

        const questionList = [];

        const topics = await this.jsonService.findTopics();
        const selectedTopicIndices = this.getRandomIndices(topics, 2);

        for (const topicIndex of selectedTopicIndices) {
            const questions = await this.jsonService.findQuestionsByTopic(topics[topicIndex]);
            const selectedQuestionIndices = this.getRandomIndices(questions, 1);

            for (const questionIndex of selectedQuestionIndices) {
                questionList.push(questions[questionIndex]);
            }
        }

        return questionList;
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

export default EspServiceImpl;