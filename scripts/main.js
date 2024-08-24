import logger from 'custom-logger';
import { jsonFetcher, textFetcher, blobFetcher } from 'custom-fetcher';
import HtmlRepositoryImpl from 'html-repository-impl';
import JsonRepositoryImpl from 'json-repository-impl';
import MarkdownRepositoryImpl from 'markdown-repository-impl';
import WavRepositoryImpl from 'wav-repository-impl';
import HtmlServiceImpl from 'html-service-impl';
import MarkdownServiceImpl from 'markdown-service-impl';
import LayoutComponent from 'layout-component';
import AboutComponent from 'about-component';
import ProjectListComponent from 'project-list-component';
import Router from 'router';
import App from 'app';

const baseUrl = window.location.origin;

const htmlRepository = new HtmlRepositoryImpl(baseUrl, textFetcher);
const jsonRepository = new JsonRepositoryImpl(baseUrl, jsonFetcher);
const markdownRepository = new MarkdownRepositoryImpl(baseUrl, textFetcher);
const wavRepository = new WavRepositoryImpl(baseUrl, blobFetcher);

const htmlService = new HtmlServiceImpl(htmlRepository);
const markdownService = new MarkdownServiceImpl(markdownRepository);

const layoutComponent = new LayoutComponent(htmlService);
const aboutComponent = new AboutComponent(markdownService);
const projectListComponent = new ProjectListComponent(htmlService);

const router = new Router([
    {
        path: '/',
        target: 'contents-container',
        component: aboutComponent
    },
    {
        path: '/about',
        target: 'contents-container',
        component: aboutComponent
    },
    {
        path: '/project-list',
        target: 'contents-container',
        component: projectListComponent
    },
    {
        path: '/project-list/esp',
        target: 'contents-container',
        component: aboutComponent
    }
]);

const app = new App(router, layoutComponent);

// const router = new CustomRouter({
//     '': this.loadHome,
//     '/404': this.loadNotFound,
//     '/home': this.loadHome,
//     '/about': this.loadAbout,
//     '/project': this.project
// });

// const layout = new LayoutComponent({
//     container: document.body
// });

// router.onRouteChangeCallback(content => {
//     layout.updateContents(content);
// })

// router.handleNavigation();
// class App {

//     constructor() {
//         logger.debug('', 'App constructor');
        
//         this.router = new CustomRouter({
//             routes: {
//                 '': this.loadHome,
//                 '/404': this.loadNotFound,
//                 '/home': this.loadHome,
//                 '/about': this.loadAbout,
//                 '/project': this.loadProject
//             }
//         })
//         this.layout = new LayoutComponent({
//             container: document.body,
//             router: this.router
//         });
//         this.router.navigate('/home')().then(content => {
//             this.layout.updateContents(content);
//         })
//         window.addEventListener('hashchange', () => {
//             const path = location.hash.replace('#', '');
//             this.router.route[path]().then(content => {
//                 this.layout.updateContents(content);
//             })
//         });
//     }

//     async loadHome() {
//         const home = document.createElement('p');
//         home.textContent = 'Welcome to Jaimin Pak Landing Page!!';
//         return home;
//     }

//     async loadAbout() {
//         const about = document.createElement('p');
//         about.textContent = `Back-end developer`;
//         return about;
//     }

//     async loadProject() {
//         const orderedListElem = document.createElement('ol');
//         const questions = await jsonRepository.findQuestionsByFilename('reading');

//         for (const data of questions) {
//             const listElem = document.createElement('li');
//             orderedListElem.appendChild(listElem);

//             const audioBlob = await wavRepository.findByTopicAndFilename(data['topic'], data['no']);
//             const questionComponent = new QuestionComponent({
//                 container: listElem,
//                 topic: data['topic'],
//                 question: data['question'],
//                 audioBlob: audioBlob
//             });
//         }
//         return orderedListElem;
//     }

//     async loadNotFound() {
//         const notFound = document.createElement('p');
//         notFound.textContent = 'Page not found';
//         return notFound;
//     }
// }