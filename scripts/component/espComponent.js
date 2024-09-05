import logger from 'custom-logger';

class EspComponent {

    constructor(espService, wavService) {
        logger.debug('', 'EspComponent constructor', espService, wavService);
        this.espService = espService;
        this.wavService = wavService;
        this.objectUrlBuffer = [];
    }

    async buildDomElement() {
        logger.debug('', 'EspComponent buildDomElement');

        const orderedListElem = document.createElement('ol');
        orderedListElem.id = 'question-list-container';

        const questionList = await this.espService.createQuestionList();

        for (const item of questionList) {
            const listElem = document.createElement('li');

            const topicElem = document.createElement('p');
            topicElem.textContent = `Topic: ${item.topic}`;

            const questionElem = document.createElement('p');
            questionElem.textContent = `Question: ${item.question}`;

            const audioElem = document.createElement('audio');
            audioElem.controls = true;
            audioElem.preload = 'none';
            audioElem.autoplay = false;

            const audioSrcElem = document.createElement('source');

            const audioSource = await this.wavService.findAudioSource(item.topic, item.no);
            const audioSourceUrl = URL.createObjectURL(audioSource);

            this.objectUrlBuffer.push(audioSourceUrl);

            audioSrcElem.src = audioSourceUrl;
            audioSrcElem.type = 'audio/wav';
            audioElem.appendChild(audioSrcElem);

            listElem.append(topicElem, questionElem, audioElem);
            orderedListElem.appendChild(listElem);
        }

        return orderedListElem;
    }

    render(target) {
        logger.debug('', 'EspComponent render', target);

        this.buildDomElement().then(component => {
            target.replaceChildren(component);
        });
    }

    // TODO: define abstract class for the components
    // all components need to implement buildDomElement, render, cleanBuffer
    // in this case abstract class is for write strict code and prevent the human errors
    cleanBuffer() {
        logger.debug('', 'EspComponent cleanBuffer');

        this.objectUrlBuffer.forEach(url => URL.revokeObjectURL(url));
    }
}

export default EspComponent;