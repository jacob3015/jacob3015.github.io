import logger from 'custom-logger';
import { jsonFetcher, textFetcher, blobFetcher } from 'custom-fetcher';
import HtmlRepositoryImpl from 'html-repository-impl';
import JsonRepositoryImpl from 'json-repository-impl';
import MarkdownRepositoryImpl from 'markdown-repository-impl';
import WavRepositoryImpl from 'wav-repository-impl';
import QuestionComponent from 'question-component';
import LayoutComponent from 'layout-component';

const baseUrl = window.location.origin;

const htmlRepository = new HtmlRepositoryImpl(baseUrl, textFetcher);
const jsonRepository = new JsonRepositoryImpl(baseUrl, jsonFetcher);
const markdownRepository = new MarkdownRepositoryImpl(baseUrl, textFetcher);
const wavRepository = new WavRepositoryImpl(baseUrl, blobFetcher);

class App {

    constructor() {
        logger.debug('', 'App constructor');
    }

    async loadDefaultPage() {
        this.loadLayouts();
        this.loadAbout().then(content => {
            this.layout.updateContents(content);
        });
    }

    loadLayouts() {
        this.layout = new LayoutComponent({
            container: document.body,
            about: this.loadAbout,
            project: this.loadProject
        });
    }

    async loadAbout() {
        const about = document.createElement('p');
        about.textContent = 'Welcome to Jaimin Pak Landing Page!!';
        return about;
    }

    async loadProject() {
        const orderedListElem = document.createElement('ol');
        const questions = await jsonRepository.findQuestionsByFilename('reading');

        for (const data of questions) {
            const listElem = document.createElement('li');
            orderedListElem.appendChild(listElem);

            const audioBlob = await wavRepository.findByTopicAndFilename(data['topic'], data['no']);
            const questionComponent = new QuestionComponent({
                container: listElem,
                topic: data['topic'],
                question: data['question'],
                audioBlob: audioBlob
            });
        }
        return orderedListElem;
    }
}

const app = new App();
app.loadDefaultPage();