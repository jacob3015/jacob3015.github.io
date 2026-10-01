# Jacob's Interactive Web Lab

> **AI 에이전트 자율 관리 기반의 순수 웹 표준(JS · CSS · HTML) 정적 인터랙티브 블로그**

GitHub Pages(`https://jacob3015.github.io`)를 통해 서빙되는 정적 웹 프로젝트입니다.  
텍스트 중심의 정적 블로그에서 탈피하여, 별도의 백엔드 서버 없이 브라우저 상에서 동작하는 **상호작용형 정적 웹 컨텐츠(Explorable Web Applets)**를 게재하고 운영합니다.

---

## 🚀 프로젝트 핵심 특징

- **Pure Web Standards**: 무거운 프레임워크나 빌드 도구 없이 브라우저 네이티브 기술(HTML5, CSS3, ES Modules, Web Components)만으로 동작하는 Zero-Build 프로젝트입니다.
- **Client-Side Interactivity**: 시각화, 시뮬레이션, 오디오/비주얼 실험 등 클라이언트 사이드에서 즉각 반응하는 인터랙티브 웹 컨텐츠를 제공합니다.
- **Agent-First Architecture**: AI 에이전트가 직접 컨텐츠를 작성하고 사이트를 유지보수하기에 최적화된 독립 완결형(Self-Contained) 디렉토리 구조와 단일 메타데이터(`posts.json`) 체계를 갖추고 있습니다.

---

## 📂 프로젝트 구조 요약

```text
jacob3015.github.io/
├── index.html                   # 메인 쇼케이스 홈 (인터랙티브 컨텐츠 카드 목록)
├── 404.html                     # 404 안내 페이지
├── AGENTS.md                    # AI 에이전트 컨텐츠 생성 규약
├── docs/
│   └── ARCHITECTURE_AND_ROADMAP.md # 상세 아키텍처 및 단계별 전환 로드맵
├── data/
│   └── posts.json               # 전체 컨텐츠 메타데이터 (단일 소스)
├── assets/
│   ├── css/                     # 공통 리셋 및 글로벌 테마 스타일
│   ├── js/                      # 공통 Web Components (<site-header>, <site-footer>)
│   └── img/                     # 파비콘 및 포스트 썸네일
└── posts/                       # 독립된 상호작용형 웹 포스트 모음
    └── [slug]/                  # 개별 인터랙티브 포스트 (index.html, style.css, script.js)
```

---

## 📖 상세 설계 및 전환 계획

프로젝트의 상세 리서치 결과, 불필요한 레거시 파일 선별 목록, 새로운 아키텍처 설계 및 단계별 전환 로드맵은 다음 문서에서 확인하실 수 있습니다:

👉 **[상세 아키텍처 및 단계별 전환 로드맵 (ARCHITECTURE_AND_ROADMAP.md)](file:///Users/jacob/IdeaProjects/jacob3015-github-io/docs/ARCHITECTURE_AND_ROADMAP.md)**

---

## 🗺️ 전환 로드맵 요약

1. **Phase 1: 레거시 정리 (Cleanup)** - 과거 ESP 전용 음원/데이터 및 오버엔지니어링된 백엔드식 스크립트 정리
2. **Phase 2: 기반 시스템 구축 (Foundation)** - 글로벌 CSS 토큰, 공통 Web Components, `posts.json` 메타데이터 구조 수립
3. **Phase 3: 메인 쇼케이스 개편 (Showcase Home)** - 시맨틱 마크업 및 동적 포스트 갤러리 카드 렌더링
4. **Phase 4: AI 에이전트 가이드 & PoC** - `AGENTS.md` 작성 및 첫 번째 인터랙티브 포스트 발행
5. **Phase 5: 자동화 및 고도화 (Automation)** - GitHub Actions 기반 메타데이터 유효성 검증 자동화