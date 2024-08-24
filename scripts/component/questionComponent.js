import logger from 'custom-logger';

class QuestionComponent {

    constructor(properties) {
        logger.debug('', 'QuestionComponent constructor');
        
        this.updateProperties(properties);
        this.buildDomElement();
        this.render();
    }

    updateProperties(properties) {
        this.container = properties.container;
        this.topic = properties.topic;
        this.question = properties.question;
        this.audioBlob = properties.audioBlob;
    }

    buildDomElement() {
        this.topicElem = document.createElement('p');
        this.topicElem.textContent = `Topic: ${this.topic}`;

        this.questionElem = document.createElement('p');
        this.questionElem.textContent = `Question: ${this.question}`;

        this.audioElem = document.createElement('audio');
        this.audioElem.controls = true;
        this.audioElem.preload = 'none';
        this.audioElem.autoplay = false;

        this.audioSrcElem = document.createElement('source');
        this.audioSrcElem.src = window.URL.createObjectURL(this.audioBlob);
        this.audioSrcElem.type = 'audio/wav';
    }

    render() {
        this.container.append(this.topicElem, this.questionElem, this.audioElem);
        this.audioElem.appendChild(this.audioSrcElem);
    }
}

export default QuestionComponent;