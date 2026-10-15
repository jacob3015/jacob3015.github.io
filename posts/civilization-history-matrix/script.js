/**
 * Script for Civilization History Matrix Codex
 * Features:
 * 1. Interactive Era Timeline & Roadmap Display
 * 2. 6-Domain Civilization Research Matrix Switcher
 * 3. Interactive System Convergence Tech Tree Canvas
 */

/* ==========================================================================
   Data: Era Timeline & Roadmap
   ========================================================================== */
const ERA_DATA = [
  {
    id: 0,
    title: '태고 / 원시 신화 시대 (The Primordial Age)',
    tagline: '자연과 마수의 위협 속에서 살아남기 위한 인류의 첫 번째 사냥과 신앙',
    desc: '문명의 불씨가 지펴지기 전, 인류는 자연과 거대 마수(Beast)의 압도적인 힘 앞에 미약한 존재였습니다. 생존을 위해 무리를 짓고, 맹수의 습성을 관찰하며, 뼈와 돌로 첫 무기를 벼려내던 시대입니다.',
    gameTitle: 'Sim 1: 원시 수렵 부족 생존 시뮬레이터 (Primal Hunters)',
    gameDesc: '부족민을 이끌고 거대 마수의 흔적을 추적하며, 계절의 변화와 기근 속에서 식량을 확보하고 원시 토템을 세우는 부족 경영 생존 시뮬레이션.',
    techs: [
      '마수 AI 생태계 & 무리 습성 알고리즘',
      '발자국/체취 기반 시야 & 추적(Tracking) 판정',
      '뼈·가죽 가공 및 생가죽 무두질(Tanning) 메커닉',
      '고기 염장·훈제 보존 및 부패 타이머'
    ],
    legacy: [
      '고대 거대 마수의 화석 골짜기 (3D RPG의 주요 필드 지형)',
      '태초의 샤머니즘 성소와 토템 유적 (던전 보스 룸)',
      '원시 투창술과 야수 해체 비법서 (희귀 패시브 스킬)'
    ]
  },
  {
    id: 1,
    title: '문명 태동기 (The Age of Dawn)',
    tagline: '흙과 불, 청동과 철을 다루며 정착지를 일구어낸 장인들의 시대',
    desc: '농경을 통해 잉여 식량이 발생하고 부족이 정착하면서 첫 번째 마을과 성벽이 솟아오릅니다. 불의 온도를 극복하며 구리와 주석을 섞어 청동을 만들고, 마침내 풀무질로 철을 녹여내며 인류는 도구의 지배자가 됩니다.',
    gameTitle: 'Sim 2: 고대 정착지 & 대장장이 공방 (Dawn of Forge)',
    gameDesc: '정착지를 방어하고 확장하며, 고유 광맥을 탐사하고 용광로의 불길 온도를 조절해 전설적인 합금 무기를 제작하는 공방 경영 시뮬레이션.',
    techs: [
      '용광로 온도(송풍 풀무질) 및 합금 배합비 연산',
      '장비 내구도, 담금질 횟수에 따른 품질(Grade) 시스템',
      '격자 기반 주거지 & 방어 성벽 건설 알고리즘',
      '작물 수확 주기 및 가공 식량(빵, 발효주) 생산망'
    ],
    legacy: [
      '지하 고대 제련소 유적 (Dungeon Forge & 특수 제작대)',
      '초대 대장장이 장로가 남긴 전설의 청동 명검 (유니크 무기)',
      '붕괴된 고대 성곽 및 관개 수로 지하 미궁'
    ]
  },
  {
    id: 2,
    title: '도시 & 교역로 시대 (The Age of Caravans)',
    tagline: '사막과 바다를 건너는 대상인과 에센스를 탐구하는 연금술사의 번영기',
    desc: '각지에서 고유한 문화를 꽃피운 도시 국가들이 거대한 무역로(실크로드, 소금길)로 연결됩니다. 금과 은으로 주조된 표준 화폐가 통용되고, 향신료와 특이 광물, 신비한 약초를 정제하는 연금술이 최고조에 달합니다.',
    gameTitle: 'Sim 3: 고대 대상인 무역 & 연금 공방 (Silk & Alchemy)',
    gameDesc: '대륙을 횡단하는 카라반을 이끌고 도시 간 시세 차익을 노리며, 비밀 연금 공방에서 비약과 마법 포션을 제조하고 용병을 고용해 상단을 지키는 상업 시뮬레이션.',
    techs: [
      '수요/공급 및 이벤트 기반 동적 물가 경제 시스템',
      '알렘빅(증류기) 기반 에센스 추출 & 포션 조합 공식',
      '마차 적재 무게/부피 및 도로 이동 속도 계산',
      '호위 용병 고용 및 턴제/자동 전술 전투 루프'
    ],
    legacy: [
      '모래 속에 묻힌 황금 교역 도시의 유적 (대형 레이드 던전)',
      '잃어버린 현자의 돌 배합비가 적힌 연금술 비전서 (최상급 포션 레시피)',
      '대륙 횡단 상인 길드의 숨겨진 비밀 지부 및 암시장'
    ]
  },
  {
    id: 3,
    title: '영웅 & 모험의 시대 (The Age of Heroes - Destination)',
    tagline: '이전 세 시대의 역사와 유적이 살아 숨 쉬는 세계를 직접 탐험하는 모험가',
    desc: '수천 년 동안 흥망성쇠를 거듭한 문명의 유적 위에 마법과 몬스터가 도사리는 대망의 무대입니다. 플레이어는 이전 세 게임에서 유저들이 직접 개척하고 축적했던 역사적 유적과 전설의 비기를 직접 탐험하게 됩니다.',
    gameTitle: 'Final Goal: 3D 액션 판타지 RPG (Chronicles Universe)',
    gameDesc: 'Sim 1의 생태계 사냥 액션, Sim 2의 대장간 크래프팅, Sim 3의 연금·무역 경제가 하나의 심리스 3D 오픈월드로 집대성된 장대한 모험.',
    techs: [
      '실시간 논타겟팅 3D 액션 & 부위 파괴 헌팅',
      'Sim 2에서 계승된 물리 기반 커스텀 무기 단조 시스템',
      'Sim 3에서 계승된 살아있는 NPC 경제 및 상단 생태계',
      'Sim 1에서 계승된 생태계 기반 몬스터 추적 및 캠핑 요리'
    ],
    legacy: [
      '플레이어가 "내가 예전 시뮬레이션에서 지었던 마을이 유적이 되었구나!"를 체감하는 궁극의 내러티브적 쾌감',
      '수년에 걸쳐 완성된 완벽하게 검증된 게임 시스템 아키텍처',
      '세계관과 함께 성장해 온 탄탄한 팬덤과 IP 파워'
    ]
  }
];

/* ==========================================================================
   Data: 6-Domain Research Matrix
   ========================================================================== */
const DOMAIN_DATA = {
  hunting: {
    name: '사냥 & 생태계',
    icon: '🏹',
    history: {
      title: '실제 인류사적 기원 & 기술 진화',
      items: [
        '구석기 시대 메가파우나(매머드, 검치호) 수렵: 무리의 협동 작전과 절벽 몰이 함정',
        '투창기(아틀라틀)의 탄생: 지레의 원리를 이용한 관통력과 사거리의 비약적 혁명',
        '올가미, 덫, 활의 발명: 위험한 대형 야수와의 직접 대면을 피하는 기술적 진화',
        '원시 추적술: 발자국 깊이, 체온, 배설물 건조도로 동물의 상태를 읽어내는 관찰 과학'
      ]
    },
    lore: {
      title: '판타지 세계관 기획적 치환',
      items: [
        '몬스터는 무작위 스폰 대상이 아닌, 고유한 먹이사슬과 번식 주기를 가진 생태계의 일부',
        '원시 마수는 체내에 마력 핵(Core)을 품고 있어, 이를 안전하게 적출하는 특별한 해체 기술 필요',
        '원시 부족민들은 마수의 영혼을 달래기 위해 뼈로 가면을 만들고 토템 춤을 춤'
      ]
    },
    sim: {
      title: '소형 시뮬레이션 구현 메커닉',
      items: [
        '바람 방향과 냄새 확산에 따른 몬스터 경계도 AI',
        '함정 내구도 및 야수 크기에 따른 구속 시간 공식',
        '생가죽 무두질(식물 타닌 수지 농도 조절) 미니게임',
        '고기 훈제 시간과 염분 농도에 따른 보존 기한 시스템'
      ]
    },
    rpg: {
      title: '최종 3D 액션 RPG에서의 경험',
      items: [
        '몬스터 헌터 스타일의 부위 파괴 및 행동 패턴 파악 전투',
        '위쳐 스타일의 흔적 추적(Detective Vision) 및 약점 공략',
        '사냥한 마수의 뼈와 가죽으로 직접 방어구를 짜맞추는 현장 크래프팅'
      ]
    }
  },
  gastronomy: {
    name: '요리 & 식문화',
    icon: '🍲',
    history: {
      title: '실제 인류사적 기원 & 기술 진화',
      items: [
        '화식(火食)의 기원: 익힌 고기가 소화 효율을 높여 뇌 용량 폭발과 언어 발달 견인',
        '신석기 농업 혁명: 야생 밀·보리 작물화와 토기 발명으로 인한 국·죽 문화 태동',
        '원시 보존 과학: 소금 염장, 연기 훈제, 햇볕 건조, 그리고 미생물 발효의 우연한 발견',
        '향신료의 가치: 부패취 억제와 소독 효과로 인해 고대부터 금보다 귀하게 교역'
      ]
    },
    lore: {
      title: '판타지 세계관 기획적 치환',
      items: [
        '마수의 고기는 질기고 마력 독성이 있어, 정화 약초와 함께 푹 고아야만 섭취 가능',
        '특정 계절에만 피는 영약 식물로 빚은 발효주는 모험가의 마나 회복 속도를 영구 증대시킴',
        '사막 부족의 건조 향신료 육포와 북방 부족의 발효 생선 기름 요리의 뚜렷한 문화 대비'
      ]
    },
    sim: {
      title: '소형 시뮬레이션 구현 메커닉',
      items: [
        '신선도 게이지: 시간에 따른 영양가 하락 및 식중독 확률',
        '재료 궁합(Synergy) 매트릭스에 따른 보너스 스탯 산출 공식',
        '계절별 수확량 변동과 겨울철 식량 비축 창고 관리 루프'
      ]
    },
    rpg: {
      title: '최종 3D 액션 RPG에서의 경험',
      items: [
        '모험 도중 안전지대 캠프파이어에서 모닥불 요리를 통한 파티 버프 부여',
        '희귀 몬스터 토벌 후 전설의 요리 레시피 획득 및 미식 도감 완성',
        '특정 혹한/혹서 기후 지역 돌파를 위한 내한/내열 요리 준비'
      ]
    }
  },
  metallurgy: {
    name: '제작 & 야금학',
    icon: '⚒️',
    history: {
      title: '실제 인류사적 기원 & 기술 진화',
      items: [
        '도구 재료의 도약: 뗀석기 → 간석기 → 순동(구리) 단조 → 청동(구리+주석 합금)',
        '풀무(Bellows)와 목탄의 역사: 철의 녹는점(1,538℃) 달성을 위한 송풍 기술의 벽',
        '담금질(Quenching)과 뜨임(Tempering): 물과 기름의 급랭을 통한 강도와 인성 조율',
        '가죽 무두질(Tanning): 동물의 단백질을 식물 타닌산으로 고정하여 썩지 않게 가공'
      ]
    },
    lore: {
      title: '판타지 세계관 기획적 치환',
      items: [
        '미스릴/오리하르콘 같은 환상의 금속은 일반 불길이 아닌 마력 용광로에서만 용해',
        '고대 제련 장인들은 담금질 시 성수(Holy Water)나 용의 피를 사용하여 무기에 영혼을 불어넣음',
        '청동기 시대의 고대 무기는 현대의 철검보다 마력 전도율이 높아 마법사들이 선호'
      ]
    },
    sim: {
      title: '소형 시뮬레이션 구현 메커닉',
      items: [
        '목탄 공급량과 풀무질 템포에 따른 실시간 용광로 온도 게이지',
        '구리-주석-철-희귀 광물 비율에 따른 강도/무게/내구도 결정 공식',
        '망치질 타이밍 미니게임 및 장인의 숙련도 경험치 테이블'
      ]
    },
    rpg: {
      title: '최종 3D 액션 RPG에서의 경험',
      items: [
        '자신만의 커스텀 무기 외형 조합(칼날, 코등이, 자루) 및 금속 색상 커스터마이징',
        '보스 드롭 희귀 주괴를 들고 고대 유적의 모루를 찾아가는 크래프팅 퀘스트',
        '무기 손상도에 따른 성능 저하와 숫돌을 이용한 현장 유지보수'
      ]
    }
  },
  alchemy: {
    name: '연금술 & 의약',
    icon: '🧪',
    history: {
      title: '실제 인류사적 기원 & 기술 진화',
      items: [
        '헬레니즘 알렉산드리아의 원시 연금술: 금속의 색을 바꾸며 물질의 본질을 탐구',
        '이슬람 황금기: 자비르 이븐 하이얀의 증류기(Alembic) 발명 및 순수 알코올/산 추출',
        '본초학과 약초원의 역사: 투구꽃, 벨라도나, 양귀비 등 독과 마취제의 의학적 활용',
        '금지된 비전과 불로불사: 수은, 비소 등 중금속 엘릭서의 비극과 화학의 맹아'
      ]
    },
    lore: {
      title: '판타지 세계관 기획적 치환',
      items: [
        '연금술은 마법과 화학의 경계: 마나 입자를 흡수한 식물 에센스를 증류·농축하는 과학',
        '물·불·바람·흙의 4원소 에테르 촉매를 이용해 칼날에 속성 인챈트 오일 부여',
        '연금술 학파의 대립: 생명을 연장하려는 온건파 vs 인조생명(호문쿨루스)을 창조하려는 급진파'
      ]
    },
    sim: {
      title: '소형 시뮬레이션 구현 메커닉',
      items: [
        '증류탑 온도/압력 제어 및 불순물 필터링 퍼즐',
        '약초의 상극/상생 원소 배합에 따른 부작용(Poisoning) 리스크 계산',
        '도시 내 유행병 발생 시 맞춤형 치료제 개발 및 대량 납품 계약'
      ]
    },
    rpg: {
      title: '최종 3D 액션 RPG에서의 경험',
      items: [
        '전투 직전 적의 속성에 맞춰 칼날에 독이나 화염 오일을 바르는 전략적 준비',
        '다양한 전술 포션(투명화, 투시, 괴력, 마나 폭주)을 조합해 보스전 난이도 극복',
        '미지의 식물을 채집해 냄새를 맡고 맛을 보며 새로운 연금술 효능 해금'
      ]
    }
  },
  trade: {
    name: '교역 & 화폐',
    icon: '⚖️',
    history: {
      title: '실제 인류사적 기원 & 기술 진화',
      items: [
        '물물교환에서 주화로: 무게 측정 금/은 덩어리에서 리디아의 호박금 표준 주화 탄생',
        '고대 실크로드와 소금길: 희소성이 높은 고부가가치 사치품(비단, 향신료, 소금)의 장거리 교역',
        '카라반(Caravan)과 위험 관리: 사막과 도적떼를 뚫기 위한 무장 상단과 오아시스 숙소',
        '지리적 요충지: 하천 합류지, 산악 고갯길, 천연 항구가 거대 상업 제국으로 도약'
      ]
    },
    lore: {
      title: '판타지 세계관 기획적 치환',
      items: [
        '산악 엘프는 마법 목재가 풍부하고, 지하 드워프는 금속이 넘쳐 필연적으로 무역로 발생',
        '대륙의 모든 상단을 통제하는 거대 상인 연합과 그들이 발행하는 금화의 순도 전쟁',
        '과거 무역로가 몬스터의 습격으로 끊어지면서 고립된 마을들의 흥망성쇠'
      ]
    },
    sim: {
      title: '소형 시뮬레이션 구현 메커닉',
      items: [
        '도시별 거리, 자원 희소도, 계절 이벤트에 따른 실시간 시세 차익 알고리즘',
        '마차 적재 무게/부피 한도와 경비병 고용 비용의 손익분기점(BEP) 시뮬레이션',
        '도적 출몰 확률과 날씨 재난에 따른 리스크 헷징 및 보험 계약'
      ]
    },
    rpg: {
      title: '최종 3D 액션 RPG에서의 경험',
      items: [
        'A 도시에서 싸게 산 특산품을 B 도시에 비싸게 팔아 모험 자금을 마련하는 행상 플레이',
        '필드에서 마주치는 조난당한 상단을 구출하고 특별한 암시장 할인 혜택 획득',
        '상단의 호위 무사로 계약하여 미지의 대륙 횡단 마차를 타고 이동하는 여정'
      ]
    }
  },
  mythology: {
    name: '신화 & 제의',
    icon: '🏛️',
    history: {
      title: '실제 인류사적 기원 & 기술 진화',
      items: [
        '애니미즘과 샤머니즘: 거대한 거목, 바위, 폭풍, 맹수에게 영혼과 신성이 깃들어 있다는 믿음',
        '대홍수와 자연재해 설화: 제어할 수 없는 자연의 공포를 달래기 위한 인신공양과 제단 축조',
        '다신교 판테온: 직업과 사회 계급이 분화되며 농경신, 전쟁신, 대장장이 신의 역할 분담',
        '신화적 영웅담(길가메시 서사시 등): 죽음의 공포를 극복하려는 인간의 서사적 투쟁'
      ]
    },
    lore: {
      title: '판타지 세계관 기획적 치환',
      items: [
        '마법은 학문이 아니라, 태초에 세계를 빚었던 고대 신들의 언어(고대어 루네)의 잔재',
        '타락한 고대 신들이 봉인된 지하 성소가 수천 년 뒤 몬스터가 솟구치는 던전으로 변모',
        '신들의 축복을 받는 성직자 세력과 마법 지식을 독점하려는 상아탑 학파의 정치적 대립'
      ]
    },
    sim: {
      title: '소형 시뮬레이션 구현 메커닉',
      items: [
        '부족민의 신앙심(Faith)과 공물 바치기에 따른 자연재해 방어 버프',
        '신전 건축 단계에 따른 제사장 계급 분화 및 사회 규약(Law) 제정',
        '이교도 침략 시 신성 기적(Miracle) 발동 자원 관리'
      ]
    },
    rpg: {
      title: '최종 3D 액션 RPG에서의 경험',
      items: [
        '신전 유적 깊은 곳에 봉인된 고대 신화 속 거대 보스와의 다단계 페이즈 전투',
        '어느 신을 주신으로 섬기느냐에 따른 종교 평판 및 고유 신성 기적 스킬 획득',
        '폐허 속 부서진 벽화를 판독하여 고대 문명의 멸망 원인을 파헤치는 메인 퀘스트'
      ]
    }
  }
};

/* ==========================================================================
   App Controller
   ========================================================================== */
class CodexApp {
  constructor() {
    this.currentEra = 0;
    this.currentDomain = 'hunting';

    // Elements
    this.timelineNav = document.getElementById('timeline-nav');
    this.eraCard = document.getElementById('era-card');
    this.domainTabs = document.getElementById('domain-tabs');
    this.matrixGrid = document.getElementById('matrix-grid');
    this.canvas = document.getElementById('tech-canvas');
    this.tooltip = document.getElementById('canvas-tooltip');
  }

  init() {
    this.setupEraTimeline();
    this.setupDomainTabs();
    this.renderEra(this.currentEra);
    this.renderMatrix(this.currentDomain);
    this.setupCanvas();
  }

  /* ---------------- Era Timeline ---------------- */
  setupEraTimeline() {
    if (!this.timelineNav) return;
    const buttons = this.timelineNav.querySelectorAll('.timeline-step');
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        this.currentEra = index;
        this.renderEra(index);
      });
    });
  }

  renderEra(index) {
    if (!this.eraCard) return;
    const data = ERA_DATA[index];
    if (!data) return;

    this.eraCard.innerHTML = `
      <div class="era-main-info">
        <h3>${data.title}</h3>
        <div class="era-tagline">${data.tagline}</div>
        <p class="era-desc">${data.desc}</p>

        <div class="era-game-concept">
          <h4>🕹️ 단계별 개발 컨셉</h4>
          <p><strong>${data.gameTitle}</strong></p>
          <p>${data.gameDesc}</p>
        </div>
      </div>

      <div class="era-side-info">
        <div class="info-block">
          <h5>⚙️ 축적되는 핵심 시스템</h5>
          <ul>
            ${data.techs.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>

        <div class="info-block">
          <h5>🏛️ 미래 3D RPG로 이어지는 유산 (Legacy)</h5>
          <ul>
            ${data.legacy.map(l => `<li>${l}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  /* ---------------- Domain Matrix ---------------- */
  setupDomainTabs() {
    if (!this.domainTabs) return;
    this.domainTabs.innerHTML = '';

    Object.keys(DOMAIN_DATA).forEach((key, index) => {
      const domain = DOMAIN_DATA[key];
      const btn = document.createElement('button');
      btn.className = `domain-tab ${key === this.currentDomain ? 'active' : ''}`;
      btn.innerHTML = `${domain.icon} ${domain.name}`;
      btn.dataset.domain = key;
      btn.setAttribute('role', 'tab');

      btn.addEventListener('click', () => {
        const allTabs = this.domainTabs.querySelectorAll('.domain-tab');
        allTabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        this.currentDomain = key;
        this.renderMatrix(key);
      });

      this.domainTabs.appendChild(btn);
    });
  }

  renderMatrix(domainKey) {
    if (!this.matrixGrid) return;
    const data = DOMAIN_DATA[domainKey];
    if (!data) return;

    this.matrixGrid.innerHTML = `
      <!-- Card 1: History -->
      <div class="matrix-card">
        <div class="matrix-card-header">
          <div class="matrix-card-title">
            <span>📜</span>
            <span>${data.history.title}</span>
          </div>
          <span class="matrix-badge badge-history">인류사 팩트</span>
        </div>
        <div class="matrix-card-body">
          <ul>
            ${data.history.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Card 2: Lore -->
      <div class="matrix-card">
        <div class="matrix-card-header">
          <div class="matrix-card-title">
            <span>🧙</span>
            <span>${data.lore.title}</span>
          </div>
          <span class="matrix-badge badge-lore">판타지 월드빌딩</span>
        </div>
        <div class="matrix-card-body">
          <ul>
            ${data.lore.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Card 3: Simulation -->
      <div class="matrix-card">
        <div class="matrix-card-header">
          <div class="matrix-card-title">
            <span>🕹️</span>
            <span>${data.sim.title}</span>
          </div>
          <span class="matrix-badge badge-sim">소형 시뮬레이션 메커닉</span>
        </div>
        <div class="matrix-card-body">
          <ul>
            ${data.sim.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Card 4: RPG -->
      <div class="matrix-card">
        <div class="matrix-card-header">
          <div class="matrix-card-title">
            <span>⚔️</span>
            <span>${data.rpg.title}</span>
          </div>
          <span class="matrix-badge badge-rpg">3D 액션 RPG 경험</span>
        </div>
        <div class="matrix-card-body">
          <ul>
            ${data.rpg.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  /* ---------------- Convergence Canvas ---------------- */
  setupCanvas() {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    // Nodes structure
    const nodes = [
      // Sim 1: Primal
      { id: 'sim1_hunt', label: '마수 AI & 추적', group: 'sim1', x: 0.16, y: 0.25, color: '#10b981', desc: 'Sim 1에서 확립되는 생태계 기반 몬스터 추적 및 행동 트리' },
      { id: 'sim1_mat', label: '뼈/가죽 가공', group: 'sim1', x: 0.16, y: 0.50, color: '#10b981', desc: '야수 해체 후 생가죽 무두질과 뼈 가공 기술' },
      { id: 'sim1_food', label: '염장/훈제 보존', group: 'sim1', x: 0.16, y: 0.75, color: '#10b981', desc: '음식의 부패 방지와 휴대용 생존 식량 조리' },

      // Sim 2: Dawn
      { id: 'sim2_temp', label: '용광로 온도 제어', group: 'sim2', x: 0.40, y: 0.28, color: '#f59e0b', desc: 'Sim 2에서 정립되는 풀무질 송풍과 열역학적 제련 공식' },
      { id: 'sim2_craft', label: '청동/철 합금 단조', group: 'sim2', x: 0.40, y: 0.52, color: '#f59e0b', desc: '내구도와 담금질 기반 커스텀 장비 제작 파이프라인' },
      { id: 'sim2_build', label: '정착지 성벽 건축', group: 'sim2', x: 0.40, y: 0.76, color: '#f59e0b', desc: '격자 그리드 기반 거점 방어 및 시설물 건설' },

      // Sim 3: Trade
      { id: 'sim3_econ', label: '동적 물가 경제망', group: 'sim3', x: 0.64, y: 0.26, color: '#06b6d4', desc: 'Sim 3에서 개발되는 지역별 특산물 시세 차익 알고리즘' },
      { id: 'sim3_alch', label: '에센스 연금 증류', group: 'sim3', x: 0.64, y: 0.50, color: '#06b6d4', desc: '증류기(알렘빅) 기반 포션 제조 및 속성 인챈트 오일' },
      { id: 'sim3_cara', label: '상단 호위 & 전술', group: 'sim3', x: 0.64, y: 0.74, color: '#06b6d4', desc: '마차 무게 한도 및 용병 고용 전투 루프' },

      // Destination: 3D RPG
      { id: 'rpg_core', label: '3D 액션 판타지 RPG', group: 'rpg', x: 0.88, y: 0.50, color: '#a855f7', desc: '모든 시뮬레이션의 시스템과 수천 년 역사가 집대성된 오픈월드' }
    ];

    // Edges
    const edges = [
      ['sim1_hunt', 'rpg_core'],
      ['sim1_mat', 'sim2_craft'],
      ['sim1_food', 'rpg_core'],
      ['sim2_temp', 'sim2_craft'],
      ['sim2_craft', 'rpg_core'],
      ['sim2_build', 'rpg_core'],
      ['sim3_econ', 'rpg_core'],
      ['sim3_alch', 'rpg_core'],
      ['sim3_cara', 'rpg_core'],
      ['sim1_mat', 'sim3_alch'],
      ['sim2_craft', 'sim3_cara']
    ];

    let hoveredNode = null;
    let pulseAngle = 0;

    const resize = () => {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse move handling for tooltip
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = null;
      for (const node of nodes) {
        const nx = node.x * rect.width;
        const ny = node.y * rect.height;
        const dist = Math.hypot(mouseX - nx, mouseY - ny);
        if (dist <= 24) {
          found = node;
          break;
        }
      }

      hoveredNode = found;

      if (found && this.tooltip) {
        this.tooltip.style.display = 'block';
        this.tooltip.style.left = `${Math.min(mouseX + 16, rect.width - 240)}px`;
        this.tooltip.style.top = `${Math.max(mouseY - 40, 10)}px`;
        this.tooltip.innerHTML = `<strong>${found.label}</strong><br><span style="color:#cbd5e1;">${found.desc}</span>`;
      } else if (this.tooltip) {
        this.tooltip.style.display = 'none';
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      hoveredNode = null;
      if (this.tooltip) this.tooltip.style.display = 'none';
    });

    // Theme change listener
    window.addEventListener('themechange', () => {
      // Redraw next frame
    });

    // Render loop
    const render = () => {
      pulseAngle += 0.03;
      const rect = this.canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Determine theme colors
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const edgeDefaultColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
      const textPrimary = isDark ? '#f8fafc' : '#0f172a';
      const textSecondary = isDark ? '#94a3b8' : '#475569';

      // 1. Draw Edges
      edges.forEach(([sourceId, targetId]) => {
        const source = nodes.find(n => n.id === sourceId);
        const target = nodes.find(n => n.id === targetId);
        if (!source || !target) return;

        const sx = source.x * width;
        const sy = source.y * height;
        const tx = target.x * width;
        const ty = target.y * height;

        const isHighlighted = hoveredNode && (hoveredNode.id === source.id || hoveredNode.id === target.id);

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        // Quadratic bezier curve
        const cx = (sx + tx) / 2;
        const cy = (sy + ty) / 2 - 15;
        ctx.quadraticCurveTo(cx, cy, tx, ty);

        ctx.strokeStyle = isHighlighted ? (source.color || '#3b82f6') : edgeDefaultColor;
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
        ctx.stroke();

        // Moving particle on edge
        if (isHighlighted || Math.sin(pulseAngle) > 0.4) {
          const t = (Math.sin(pulseAngle + source.x * 5) + 1) / 2;
          const px = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * tx;
          const py = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cy + t * t * ty;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = source.color;
          ctx.fill();
        }
      });

      // 2. Draw Nodes
      nodes.forEach(node => {
        const nx = node.x * width;
        const ny = node.y * height;
        const isHovered = hoveredNode && hoveredNode.id === node.id;
        const radius = node.group === 'rpg' ? 30 : 20;

        // Outer glow on hover
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(nx, ny, radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = node.color + '33';
          ctx.fill();
        }

        // Main Circle
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = isHovered ? 3.5 : 2.5;
        ctx.stroke();

        // Inner Dot
        ctx.beginPath();
        ctx.arc(nx, ny, node.group === 'rpg' ? 8 : 5, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node Label
        ctx.font = `${isHovered ? 'bold ' : ''}${node.group === 'rpg' ? '12px' : '11px'} system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = isHovered ? node.color : textPrimary;
        ctx.fillText(node.label, nx, ny + radius + 16);
      });

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }
}

// Bootstrap on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new CodexApp();
  app.init();
});
