# Jacob's Interactive Web Lab

> **AI 에이전트 자율 관리 기반의 순수 웹 표준(JS · CSS · HTML) 클라이언트 사이드 인터랙티브 블로그**

[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-blue?logo=github)](https://jacob3015.github.io)
[![Pure Web Standards](https://img.shields.io/badge/Architecture-Pure_Web_Standards-emerald)](https://jacob3015.github.io)
[![Zero Build](https://img.shields.io/badge/Build_Step-Zero_Build-orange)](https://jacob3015.github.io)
[![Status: Production Ready](https://img.shields.io/badge/Status-Transition_Completed-success)](https://jacob3015.github.io)

**Jacob's Interactive Web Lab**(`https://jacob3015.github.io`)은 텍스트/마크다운 중심의 정적 블로그에서 탈피하여, 별도의 백엔드 서버 없이 브라우저 상에서 동작하는 **상호작용형 정적 웹 애플리케이션(Explorable Web Applets)**을 게재하고 운영하는 블로그입니다.

AI 에이전트가 자체적으로 프로젝트를 관리하고, 새로운 인터랙티브 컨텐츠를 지속적으로 생성·게재할 수 있도록 **에이전트 친화적(Agent-First)**으로 설계되었습니다.

---

## 🚀 프로젝트 핵심 특징

- ⚡ **Pure Web Standards & Zero-Build**: 무거운 번들러(Vite, Webpack)나 컴파일 파이프라인 없이, 브라우저 네이티브 기술(HTML5, CSS3 Custom Properties, ES Modules, Web Components, View Transitions API)만으로 즉시 서빙됩니다.
- 🎮 **Client-Side Interactivity**: 단순 읽기용 텍스트를 넘어 알고리즘 시각화, 그래픽스, 시뮬레이션, 오디오/비주얼 실험 등 클라이언트 사이드에서 즉각 반응하는 대화형 경험을 제공합니다.
- 🤖 **Agent-First Architecture**: AI 에이전트가 독립된 디렉토리 안에서 기존 코드를 건드리지 않고 새로운 인터랙티브 포스트를 안전하게 자율 생성할 수 있도록 격리성(Self-contained)을 보장합니다.
- 🧭 **Cross-Document View Transitions**: 브라우저 네이티브 전환 애니메이션을 지원하여 홈과 포스트 간 이동 시 매끄러운 화면 전환을 제공합니다.
- 🛡️ **Automated Manifest Validation**: GitHub Actions와 순수 Node.js 스크립트를 통해 메타데이터 유효성과 링크 깨짐을 자동으로 검증합니다.

---

## 🕹️ 게시된 인터랙티브 컨텐츠 (Live Applets)

현재 쇼케이스에 배포되어 직접 체험할 수 있는 상호작용형 포스트입니다:

* 📊 **[Interactive Sorting Algorithm Visualizer](/posts/sorting-visualizer/)**
  * 버블, 선택, 삽입, 퀵, 병합 정렬 알고리즘의 동작 과정을 HTML5 Canvas에서 실시간으로 시각화.
  * 크기/속도 조절, 일시정지, Generator 기반 단계별(Step-by-step) 실행 및 실시간 비교/교환 통계 카운팅.
  * 알고리즘별 시간/공간 복잡도 및 안정성 비교 테이블 제공.

---

## 📂 프로젝트 구조

```text
jacob3015.github.io/
├── index.html                   # 메인 쇼케이스 홈 (카드 그리드, 실시간 검색/필터, View Transitions)
├── 404.html                     # GitHub Pages 404 안내 페이지
├── AGENTS.md                    # [필독] AI 에이전트 개발 및 컨텐츠 발행 지침서
├── README.md                    # [본 문서] 프로젝트 소개 및 안내
├── data/
│   └── posts.json               # 전체 인터랙티브 포스트 메타데이터 (단일 소스)
├── docs/
│   └── ARCHITECTURE_AND_ROADMAP.md # 상세 아키텍처 및 전환 로드맵 (Phase 1~5 완료)
├── assets/
│   ├── css/
│   │   ├── reset.css            # 모던 CSS 리셋
│   │   ├── global.css           # 글로벌 테마 디자인 토큰 (다크/라이트) & View Transitions
│   │   └── showcase.css         # 쇼케이스 카드 그리드 및 필터 스타일
│   ├── js/
│   │   ├── site-components.js   # <site-header>, <site-footer> Web Components
│   │   └── showcase.js          # 쇼케이스 렌더링, 검색, 필터, 단축키 처리
│   └── img/
│       ├── covers/              # 포스트별 SVG 썸네일 에셋
│       └── icons/               # 사이트 파비콘 및 매니페스트 에셋
├── posts/                       # 각 인터랙티브 컨텐츠 디렉토리 (Self-contained)
│   └── sorting-visualizer/      # 정렬 알고리즘 시각화 포스트
│       ├── index.html
│       ├── style.css
│       └── script.js
├── scripts/
│   └── validate-posts.mjs       # 로컬 및 CI 겸용 메타데이터 무결성 검증기
└── .github/
    └── workflows/
        └── validate-posts.yml   # Push/PR 시 실행되는 GitHub Actions 자동 검증 워크플로우
```

---

## ✍️ 컨텐츠 발행 워크플로우 (For AI Agents & Developers)

새로운 상호작용형 포스트를 발행하는 2-Step 프로세스입니다:

1. **포스트 디렉토리 생성 (`posts/<slug>/`)**:
   - `posts/<slug>/` 디렉토리를 생성하고 자체 `index.html`, `style.css`, `script.js`를 작성합니다.
   - 상단 `<site-header>`, 하단 `<site-footer>` 컴포넌트를 선언하여 사이트 통일성을 유지합니다.
2. **메타데이터 등록 (`data/posts.json`)**:
   - `data/posts.json`에 제목, 설명, 카테고리, 태그, 썸네일, 인터랙티브 기능 요약 정보를 추가합니다.
3. **무결성 검증**:
   - `node scripts/validate-posts.mjs`를 실행하여 스키마 유효성과 파일 실존 여부를 검증합니다.

> 💡 *자세한 코딩 규칙, 템플릿 및 주의사항은 [AGENTS.md](AGENTS.md)를 참고하세요.*

---

## 💻 로컬 실행 및 검증 방법

Zero-Build 프로젝트이므로 별도의 `npm install`이나 빌드 과정 없이 정적 파일 웹 서버만으로 즉시 구동됩니다:

```bash
# Python 내장 서버로 실행할 경우
python3 -m http.server 8000

# 또는 npx serve를 사용할 경우
npx serve .

# 메타데이터 무결성 검증 (Broken link 검사)
node scripts/validate-posts.mjs
```

브라우저에서 `http://localhost:8000`에 접속하면 쇼케이스와 모든 인터랙티브 컨텐츠를 확인할 수 있습니다.

---

## 🗺️ 전환 로드맵 완수 현황

프로젝트는 기획된 5단계 전환 로드맵을 모두 완료하였습니다:

- [x] **Phase 1: 레거시 정리 (Cleanup)** - 과거 ESP 음원 바이너리 및 백엔드식 과도한 추상화 계층 제거
- [x] **Phase 2: 기반 시스템 구축 (Foundation)** - CSS 디자인 토큰, 공통 Web Components, `posts.json` 스키마 구축
- [x] **Phase 3: 메인 쇼케이스 개편 (Showcase Home)** - 동적 카드 그리드, 실시간 검색/필터, 404 안내 페이지
- [x] **Phase 4: AI 에이전트 가이드 & PoC** - `AGENTS.md` 규약 수립 및 제1호 인터랙티브 포스트(`sorting-visualizer`) 발행
- [x] **Phase 5: 자동화 및 고도화 (Automation & Polish)** - GitHub Actions CI 검증 파이프라인, View Transitions 및 검색 UX 강화

전체 기획 배경 및 상세 설계는 **[상세 아키텍처 및 로드맵 문서 (docs/ARCHITECTURE_AND_ROADMAP.md)](docs/ARCHITECTURE_AND_ROADMAP.md)**에 기록되어 있습니다.