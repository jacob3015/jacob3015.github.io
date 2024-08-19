/**
 * Layout component.
 * 
 * <body>
 *      <header>
 *          <p>Jaimin</p>
 *          <menu>
 *              <li>About</li>
 *              <li>Blog</li>
 *              <li>Project</li>
 *              <li>
 *                  <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
 *                      <img src="github-icon.svg" alt="GitHub Icon" width="24" height="24">
 *                  </a>
 *              </li>
 *          </menu>
 *      </header>
 *      <div id="contents">
 *      </div>
 *      <footer>
 *          <p>© 2024 Jaimin Pak. All rights reserved.</p>
 *      </footer>
 * </body>
 */

class LayoutComponent {

    constructor(properties) {
        this.updateProperties(properties);
        this.buildDomElement();
        this.render();
    }

    updateProperties(properties) {
        this.container = properties.container;
        this.about = properties.about,
        this.project = properties.project
    }

    buildDomElement() {
        this.headerElem = document.createElement('header');

        this.titleElem = document.createElement('p');
        this.titleElem.textContent = 'Jaimin Pak';

        this.menuElem = document.createElement('menu');

        this.contentsElem = document.createElement('div');

        this.footerElem = document.createElement('footer');

        this.aboutElem = document.createElement('li');
        this.aboutElem.textContent = 'About';
        this.aboutElem.addEventListener('click', () => {
            this.about().then(content => {
                this.updateContents(content);
            });
        });

        this.blogElem = document.createElement('li');
        this.blogElem.textContent = 'Blog'

        this.projectElem = document.createElement('li');
        this.projectElem.textContent = 'Project';
        this.projectElem.addEventListener('click', () => {
            this.project().then(content => {
                this.updateContents(content);
            });
        });

        this.githubElem = document.createElement('li');

        this.githubLinkElem = document.createElement('a');
        this.githubLinkElem.textContent = 'Github'
        this.githubLinkElem.href = 'https://github.com/jacob3015';
        this.githubLinkElem.target = '_blank';
        this.githubLinkElem.rel = 'noopener noreferrer';

        // TODO: Add github icon for githubElem

        this.copyrightElem = document.createElement('p');
        this.copyrightElem.textContent = '© 2024 Jaimin Pak. All rights reserved.';
    }

    render() {
        this.container.append(this.headerElem, this.contentsElem, this.footerElem);
        this.headerElem.append(this.titleElem, this.menuElem);
        this.menuElem.append(this.aboutElem, this.blogElem, this.projectElem, this.githubElem);
        this.githubElem.appendChild(this.githubLinkElem);
        this.footerElem.appendChild(this.copyrightElem);
    }

    updateContents(element) {
        this.contentsElem.replaceChildren(element);
    }
}

export default LayoutComponent;