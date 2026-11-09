# Jacob's Novel Drill — 판타지 웹 소설 집필 훈련 아카이브

> **1차원적 서술을 넘어 오감·행동 지문·모바일 호흡이 살아있는 3차원 판타지 장면을 연마하고 아카이빙하는 Medium 스타일 블로그**

[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-1a8917?logo=github)](https://jacob3015.github.io)
[![Pure Web Standards](https://img.shields.io/badge/Architecture-Pure_HTML_CSS_JS-242424)](https://jacob3015.github.io)
[![Editorial Design](https://img.shields.io/badge/Style-Medium_Editorial-serif)](https://jacob3015.github.io)

**Jacob's Novel Drill**(`https://jacob3015.github.io`)은 판타지 웹 소설(검과 마법, 던전, 몬스터, 이능력) 본 원고 집필과 병행하여, **1시간 단위의 집중 묘사 훈련(600~1,000자)**과 **AI 코치의 1차원 → 3차원 입체화 교정 피드백**을 기록하고 본편 집필용 장면 에셋으로 관리하는 아카이브입니다.

---

## 🎯 핵심 훈련 테마 (Drill Taxonomy)

| 테마 코드 | 훈련 영역 | 핵심 목표 |
| :--- | :--- | :--- |
| **Action** (`Drill A`) | 전투 / 마법 연출 | 단순 행동 나열을 탈피하고 타격감, 마력의 감각(오감), 속도감 있는 문장 호흡 연출 |
| **Psychology** (`Drill B`) | 심리 / 대사 티키타카 | 감정 직접 서술(Tell)을 금지하고 행동 지문(손동작, 시선)과 서브텍스트로 심리 표현(Show) |
| **Worldbuilding** (`Drill C`) | 역동적 배경 / 분위기 | 정적인 풍경 설명서 대신 인물의 움직임과 오감(청각, 후각, 촉각)이 결합된 공간 묘사 |
| **Pacing** (`Drill D`) | 급반전과 절단신공 | 긴장감의 고조, 문단 길이 조절, 모바일 스크롤에 최적화된 절단신공 연출 |

---

## 📂 프로젝트 구조

```text
jacob3015.github.io/
├── index.html                   # Medium 스타일 메인 아카이브 피드 & 작가 훈련 대시보드
├── 404.html                     # 404 안내 페이지
├── draft.md                     # [집필 워크시트] 1시간 훈련 과제를 수행하고 원고를 작성하는 마크다운 파일
├── AGENTS.md                    # [필독] AI 코치 역할, 4단계 훈련 워크플로우 및 포스트 규격 지침서
├── README.md                    # 프로젝트 소개 및 아키텍처 안내
├── _posts/                      # 완료된 훈련 원본 마크다운 아카이브 (YAML Frontmatter 포함)
│   └── YYYY-MM-DD-drill-XX-slug.md
├── posts/                       # _posts/*.md로부터 자동 변환된 정적 HTML 페이지
│   └── YYYY-MM-DD-drill-XX-slug/
│       └── index.html           # 모바일 뷰어 폭(390px) 미리보기 및 서체 전환 지원
├── data/
│   └── posts.json               #_posts/*.md 기반으로 자동 생성되는 포스트 매니페스트
├── assets/
│   ├── css/
│   │   ├── reset.css            # @layer reset 기반 모던 CSS 리셋
│   │   ├── global.css           # Medium 에디토리얼 디자인 토큰, 타이포그래피, 다크/라이트 테마
│   │   ├── showcase.css         # 메인 피드 및 우측 스티키 대시보드 레이아웃
│   │   └── post.css             # 포스트 상세 리더기, 모바일 뷰어 프레임, Before/After 피드백 스타일
│   ├── js/
│   │   ├── site-components.js   # <site-header>, <site-footer> Web Components
│   │   └── showcase.js          # 피드 렌더링, 테마 탭, 태그 필터, 실시간 훈련 통계 계산
│   └── img/
│       └── icons/               # 파비콘 및 매니페스트 에셋
└── scripts/
    ├── build-posts.mjs          # _posts/*.md → posts/<slug>/index.html & data/posts.json 자동 변환기
    └── validate-posts.mjs       # 마크다운 Frontmatter 규격 및 HTML/JSON 동기화 무결성 검증기
```

---

## ⏱️ 1시간 집필 훈련 & 퍼블리싱 워크플로우

1. **Step 1 — 과제 부여 (5분):**
   - 에이전트에게 *"오늘의 과제 줘"* 또는 *"전투 묘사 과제 줘"*라고 요청하면, 에이전트가 시추에이션·필수 키워드 3개·제약 조건을 출제하고 `draft.md`에 자동으로 세팅합니다.
2. **Step 2 — 마크다운 집필 및 회고 (35~40분):**
   - 작가는 `draft.md`의 `## 2. 작성 원고`와 `## 3. 3줄 셀프 회고`를 작성한 후 완료를 알립니다.
3. **Step 3 — AI 코치 정밀 피드백 (10분):**
   - 제약 조건 달성도(O/X), Best Line, **1차원 → 3차원 입체화 교정(Before & After)**, 모바일 가독성 코멘트를 제공합니다.
4. **Step 4 — 마크다운 아카이빙 및 정적 HTML 빌드·배포 (5분):**
   - `_posts/YYYY-MM-DD-drill-[회차]-[영문슬러그].md`로 저장한 뒤 아래 명령어로 정적 HTML 및 매니페스트를 빌드합니다:

```bash
# _posts/*.md 파일을 읽어 posts/<slug>/index.html 및 data/posts.json 자동 생성
node scripts/build-posts.mjs

# 메타데이터 및 파일 동기화 검증
node scripts/validate-posts.mjs
```
