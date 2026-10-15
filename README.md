# Jacob's Interactive Game Lab

> **AI 에이전트 자율 관리 기반의 순수 웹 표준(JS · CSS · HTML) 클라이언트 사이드 게임 리소스 랩 & 쇼케이스**

[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-blue?logo=github)](https://jacob3015.github.io)
[![Pure Web Standards](https://img.shields.io/badge/Architecture-Pure_Web_Standards-emerald)](https://jacob3015.github.io)
[![Zero Build](https://img.shields.io/badge/Build_Step-Zero_Build-orange)](https://jacob3015.github.io)
[![Status: Production Ready](https://img.shields.io/badge/Status-Transition_Completed-success)](https://jacob3015.github.io)

**Jacob's Interactive Game Lab**(`https://jacob3015.github.io`)은 단순한 텍스트/이미지 아카이브에서 벗어나, 게임 개발에 필요한 종합 예술 리소스(세계관, 아트, 음악, 서사, 시스템 메커닉)를 브라우저 상에서 직접 조작하고 검증할 수 있는 **상호작용형 웹 리소스(Playable Game Resources & Prototypes)**를 게재하고 운영하는 랩입니다.

AI 에이전트가 자체적으로 프로젝트를 관리하고, 새로운 인터랙티브 게임 리소스를 지속적으로 생성·게재할 수 있도록 **에이전트 친화적(Agent-First)**으로 설계되었습니다.

---

## 🎮 게임 리소스 분류 체계 (Taxonomy)

| 카테고리 | 설명 및 리소스 예시 | 주요 활용 기술 |
| :--- | :--- | :--- |
| **Lore & Story** | 대화형 세계관 지도, 세력 관계도, 인물/몬스터 도감(Codex), 분기형 대화 시뮬레이터 | SVG, Canvas, Semantic DOM |
| **Art & Visuals** | 2D 스프라이트 애니메이션 테스터, 타일셋 미리보기, 절차적 파티클 & 셰이더 랩 | Canvas 2D, WebGL, CSS Keyframes |
| **Audio & Sound** | 적응형 BGM 레이어 믹서, 8-bit 절차적 SFX 생성기, 환경음(앰비언스) 플레이어 | Web Audio API, Canvas Visualizer |
| **Mechanics & Systems** | 데미지/스탯 밸런서, 절차적 맵 생성기(Noise/Automata), 길찾기(A*) 및 충돌 알고리즘 | Canvas 2D, Pure JS Algorithms |
| **Game Tools** | 브라우저 기반 게임 제작 유틸리티 (스프라이트 슬라이서, 대사 스크립트 테스터 등) | DOM, Web APIs |

---

## 🚀 프로젝트 핵심 특징

- ⚡ **Pure Web Standards & Zero-Build**: 무거운 번들러나 컴파일 파이프라인 없이, 브라우저 네이티브 기술(HTML5, CSS3 Custom Properties, ES Modules, Web Components, View Transitions API)만으로 즉시 서빙됩니다.
- 🕹️ **Playable & Interactive**: 단순 텍스트/이미지 덤프를 넘어 파티클 조절, 스프라이트 프레임 재생, 오디오 레이어 믹싱 등 브라우저에서 직접 인터랙션하며 리소스를 검증합니다.
- 🤖 **Agent-First Architecture**: AI 에이전트가 독립된 디렉토리(`posts/<slug>/`) 안에서 기존 코드를 건드리지 않고 새로운 게임 리소스 포스트를 안전하게 자율 생성할 수 있도록 격리성(Self-contained)을 보장합니다.
- 🧭 **Cross-Document View Transitions**: 브라우저 네이티브 전환 애니메이션을 지원하여 홈과 리소스 간 매끄러운 화면 전환을 제공합니다.
- 🛡️ **Automated Manifest Validation**: GitHub Actions와 순수 Node.js 스크립트를 통해 메타데이터 유효성과 링크 깨짐을 자동으로 검증합니다.

---

## 📂 프로젝트 구조

```text
jacob3015.github.io/
├── index.html                   # 메인 쇼케이스 홈 (게임 리소스 카드 그리드, 실시간 검색/카테고리 필터)
├── 404.html                     # GitHub Pages 404 안내 페이지
├── AGENTS.md                    # [필독] AI 에이전트 개발 및 게임 리소스 생성 지침서
├── README.md                    # [본 문서] 프로젝트 소개 및 안내
├── data/
│   └── posts.json               # 전체 게임 리소스 메타데이터 (단일 소스)
├── docs/
│   └── ARCHITECTURE_AND_ROADMAP.md # 상세 아키텍처 및 로드맵
├── assets/
│   ├── css/
│   │   ├── reset.css            # 모던 CSS 리셋
│   │   ├── global.css           # 글로벌 테마 디자인 토큰 (다크/라이트) & View Transitions
│   │   └── showcase.css         # 쇼케이스 카드 그리드, 뱃지 및 필터 스타일
│   ├── js/
│   │   ├── site-components.js   # <site-header>, <site-footer> Web Components
│   │   └── showcase.js          # 쇼케이스 렌더링, 검색, 카테고리 필터, 단축키 처리
│   └── img/
│       ├── covers/              # 포스트별 대표 썸네일 에셋 (기본 default-cover.svg)
│       └── icons/               # 사이트 파비콘 및 매니페스트 에셋
├── posts/                       # 각 게임 리소스 디렉토리 (Self-contained)
│   └── [post-slug]/             # 신규 리소스 등록 위치
│       ├── index.html
│       ├── style.css
│       └── script.js
├── scripts/
│   └── validate-posts.mjs       # 메타데이터 스키마 및 링크 무결성 검증기
└── .github/
    └── workflows/
        └── validate-posts.yml   # Push/PR 시 실행되는 GitHub Actions 자동 검증 워크플로우
```

---

## ✍️ 컨텐츠 발행 워크플로우 (For AI Agents & Developers)

새로운 상호작용형 게임 리소스를 발행하는 프로세스입니다:

1. **리소스 포스트 디렉토리 생성 (`posts/<slug>/`)**:
   - `posts/<slug>/` 디렉토리를 생성하고 자체 `index.html`, `style.css`, `script.js`를 작성합니다.
   - 상단 `<site-header>`, 하단 `<site-footer>` 컴포넌트를 선언하여 사이트 통일성을 유지합니다.
2. **메타데이터 등록 (`data/posts.json`)**:
   - `data/posts.json`에 제목, 설명, 카테고리(`Lore & Story`, `Art & Visuals` 등), 게임 프로젝트, 리소스 타입, 태그 정보를 추가합니다.
3. **무결성 검증**:
   - `node scripts/validate-posts.mjs`를 실행하여 스키마 유효성과 파일 실존 여부를 검증합니다.

> 💡 *자세한 코딩 규칙, 템플릿 및 미디어 가이드는 [AGENTS.md](AGENTS.md)를 참고하세요.*

---

## 💻 로컬 실행 및 검증 방법

Zero-Build 프로젝트이므로 정적 파일 웹 서버만으로 즉시 구동됩니다:

```bash
# Python 내장 서버로 실행할 경우
python3 -m http.server 8000

# 또는 npx serve를 사용할 경우
npx serve .

# 메타데이터 무결성 검증
node scripts/validate-posts.mjs
```

브라우저에서 `http://localhost:8000`에 접속하면 쇼케이스와 모든 게임 리소스를 확인할 수 있습니다.

---

## 🗺️ 전환 로드맵 완수 현황

- [x] **Phase 1: 레거시 정리 (Cleanup)** - 과거 ESP 음원 바이너리 및 백엔드식 과도한 추상화 계층 제거
- [x] **Phase 2: 기반 시스템 구축 (Foundation)** - CSS 디자인 토큰, 공통 Web Components, `posts.json` 스키마 구축
- [x] **Phase 3: 메인 쇼케이스 개편 (Showcase Home)** - 동적 카드 그리드, 실시간 검색/필터, 404 안내 페이지
- [x] **Phase 4: AI 에이전트 가이드 & PoC** - `AGENTS.md` 규약 수립
- [x] **Phase 5: 자동화 및 고도화 (Automation & Polish)** - GitHub Actions CI 검증 파이프라인, View Transitions 및 검색 UX 강화
- [x] **Phase 6: 게임 리소스 랩 전환 (Game Dev Resource Hub)** - 종합 예술 게임 리소스 분류 체계(세계관, 아트, 오디오, 서사, 메커닉) 구축, 쇼케이스 필터 고정, 신규 에셋 가이드라인 정립