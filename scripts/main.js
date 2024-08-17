import logger from 'custom-logger';
import { jsonFetcher, textFetcher, blobFetcher } from 'custom-fetcher';
import HtmlRepositoryImpl from 'html-repository-impl';
import JsonRepositoryImpl from 'json-repository-impl';
import MarkdownRepositoryImpl from 'markdown-repository-impl';
import WavRepositoryImpl from 'wav-repository-impl';
import HtmlServiceImpl from 'html-service-impl';

const baseUrl = window.location.origin;

const htmlRepository = new HtmlRepositoryImpl(baseUrl, textFetcher);
const jsonRepository = new JsonRepositoryImpl(baseUrl, jsonFetcher);
const markdownRepository = new MarkdownRepositoryImpl(baseUrl, textFetcher);
const wavRepository = new WavRepositoryImpl(baseUrl, blobFetcher);

// const htmlService = new HtmlServiceImpl(htmlRepository);

class App {

    constructor() {
        logger.debug('', 'App constructor');
        this.layouts = {
            header: document.createElement('header'),
            menu: document.createElement('menu'),
            contents: Object.assign(document.createElement('div'), {
                id: 'contents'
            }),
            footer: document.createElement('footer')
        };
        // this.data = {
        //     layouts: {
        //         header: undefined,
        //         menu: undefined,
        //         contents: undefined,
        //         footer: undefined
        //     },
        //     baseUrl: window.location.origin
        // }
        // this.parser = new DOMParser();
    }

    loadDefaultPage() {
        this.loadLayouts();
        // this.loadHeader();
        // this.loadFooter();
        // this.loadMenu();
    }

    loadLayouts() {
        const topContainer = Object.assign(document.createElement('div'), {
            id: 'top-container'
        });
        topContainer.append(this.layouts.header, this.layouts.menu);

        document.body.append(topContainer, this.layouts.contents, this.layouts.footer);
    }

    async loadHeader() {
        // try {
        //     const response = await fetch(`${baseUrl}/templates/header.html`);
        //     if (!response.ok) {
        //         throw new Error("http error");
        //     }
        //     const htmlText = await response.text();

        //     const document = this.parser.parseFromString(htmlText, "text/html");

        //     const template = document.querySelector("template");
        //     const content = document.importNode(template.content, true);
        //     this.layouts.header.append(content);
        // } catch (error) {
        //     console.error(error);
        // }
    }

    async loadFooter() {
        // try {
        //     const response = await fetch(`${baseUrl}/templates/footer.html`);
        //     if (!response.ok) {
        //         throw new Error("http error");
        //     }
        //     const htmlText = await response.text();
            
        //     const document = this.parser.parseFromString(htmlText, "text/html");
        //     const template = document.querySelector("template");
        //     const content = document.importNode(template.content, true);
        //     this.layouts.footer.append(content);
        // } catch (error) {
        //     console.error(error);
        // }
    }

    async loadMenu() {
        // try {
        //     const response = await fetch(`${baseUrl}/templates/menu.html`);
        //     if (!response.ok) {
        //         throw new Error("http error");
        //     }
        //     const htmlText = await response.text();
            
        //     const document = this.parser.parseFromString(htmlText, "text/html");
        //     const template = document.querySelector("template");
        //     const content = document.importNode(template.content, true);
        //     this.layouts.menu.append(content);
        // } catch (error) {
        //     console.error(error);
        // }
    }
}

const app = new App();
app.loadDefaultPage();