/**
 * Script for Primal Odyssey & Dawn of Magic Direction Lab
 * Features:
 * 1. Cave Mural & Color Intrusion Canvas (with interactive drawing & catalyst fire)
 * 2. 4-System Survival-to-Magic Evolution Explorer
 * 3. Procedural Web Audio API Soundscape Mixer & Visualizer
 */

/* ==========================================================================
   Data: 3-Act Journey Stages
   ========================================================================== */
const ACT_STAGES = [
  {
    act: 0,
    defaultAwakening: 10,
    defaultCatalyst: 'wood',
    title: '1막: 재난과 공포 — 불과 뼈의 설원 (The Frozen Wastes)',
    story: '끝없이 남하하는 빙하와 맹추위로 고향 동굴을 버린 25명의 부족민이 남쪽으로 대이동을 시작합니다. 아직 마법의 존재를 모르는 부족에게 밤의 어둠과 기이한 오로라, 푸른 안광을 빛내는 괴수는 그저 피해야 할 자연의 저주일 뿐입니다.',
    paletteDesc: '무채색 눈보라, 검은 목탄(Charcoal), 붉은 황토(Ochre), 따뜻한 주황색 모닥불',
    dilemmas: [
      '꺼져가는 모닥불을 지키기 위해 이동 속도를 늦출 것인가, 강행군할 것인가?',
      '푸른 빛을 내는 기이한 마수의 사체를 굶주린 부족민에게 먹일 것인가, 불태울 것인가?',
      '부싯돌 다듬는 법을 아는 유일한 장로가 동상에 걸렸을 때 누구에게 기술을 전수할 것인가?'
    ]
  },
  {
    act: 1,
    defaultAwakening: 55,
    defaultCatalyst: 'crystal',
    title: '2막: 금기와 모방 — 검은 화산재와 운석 구덩이 (The Crater of Blue Ash)',
    story: '식량과 부싯돌이 바닥난 절체절명의 순간, 부족은 하늘에서 떨어진 푸른 운석 파편(태초의 마나석)으로 창날을 깎고 마수의 심장 기름을 모닥불에 던져 넣습니다. 주황색 불길이 청록빛 에테르 불꽃으로 변하며, 창에 찔린 거대 야수가 그 자리에서 얼어붙는 기적이 일어납니다.',
    paletteDesc: '검은 화산재와 대비되는 창백한 형광 청록색(Cyan Ether) 불꽃과 푸른 창날의 침투',
    dilemmas: [
      '마력 광석을 가공하다 마력 중독(신체 결정화) 증상을 보이는 세공사를 계속 작업시킬 것인가?',
      '푸른 불꽃의 연기를 마시고 밤눈과 괴력을 얻은 사냥꾼들의 폭주를 어떻게 제어할 것인가?',
      '우연히 발견한 마법적 현상을 잊지 않기 위해 가죽 두루마리에 어떤 기호로 남길 것인가?'
    ]
  },
  {
    act: 2,
    defaultAwakening: 92,
    defaultCatalyst: 'heart',
    title: '3막: 기록과 각성 — 태초의 폭풍 성소 (Sanctuary of the First Runes)',
    story: '여정의 종착지인 거대 협곡에서, 부족의 샤먼은 마수의 피와 마나석 가루로 바위에 그린 벽화가 자연의 마력과 공명한다는 사실을 깨닫습니다. 인류 최초의 마법 문자(고대 룬)와 주술 영창으로 폭풍의 신수를 제압한 부족은, 이곳에 첫 번째 고대 마법 문명의 정착지를 세웁니다.',
    paletteDesc: '암벽 위에서 살아 맥동하는 황금빛·보랏빛·청록빛 고대 룬 문양과 초월적 오라',
    dilemmas: [
      '태고의 신수를 완전히 도륙하여 무기로 삼을 것인가, 토템으로 봉인하여 성소의 수호신으로 삼을 것인가?',
      '깨달은 룬 마법 지식을 부족 모두에게 공유할 것인가, 선택받은 샤먼 계급만의 비전으로 봉인할 것인가?',
      '긴 유목 여정을 끝내고 어느 지형(광맥 협곡 vs 마력 온천지대)에 첫 정착지(Sim 2 연결)를 세울 것인가?'
    ]
  }
];

/* ==========================================================================
   Data: 4-System Evolution Matrix (Survival -> Magic)
   ========================================================================== */
const EVOLUTION_DATA = {
  enchant: {
    name: '도구 세공 → 원시 인챈트',
    icon: '🪨',
    primal: {
      title: '1. 원시 생존 기술: 박편 석기와 골각기 세공',
      desc: '흑요석과 부싯돌의 결을 읽고 망칫돌로 타격하여 날카로운 날(Flake)을 떼어내고, 사냥한 맹수의 뼈와 힘줄로 창대에 단단히 결속하는 물리적 크래프팅.'
    },
    trigger: {
      title: '2. 마법 발견의 계기: 운석 파편과 피의 담금질',
      desc: '일반 돌이 부서지는 두꺼운 가죽의 마수를 상대하기 위해, 빛나는 운석 파편을 창끝에 박아 넣고 끓어오르는 마수의 심장 피에 담금질을 시도.'
    },
    magic: {
      title: '3. 각성한 메커닉: 태초의 마법 부여 (Proto-Enchanting)',
      desc: '광물의 공명 주파수에 맞춰 타격 각도를 조절하면 창날에 냉기·벼락·화염의 원소 파동이 깃듦. 무기를 휘두를 때마다 궤적에 푸른 잔상이 남는 연출.'
    },
    legacy: {
      title: '4. 후대 3D RPG의 유산: 전설의 고대 뼈 무기 & 인챈트학',
      desc: '수천 년 뒤 3D RPG에서 대장장이들이 금속 무기에 마법석을 박는 보석 세공(Socketing) 시스템의 시초이자, 던전 유적에서 발굴되는 고대 신화 등급 무기의 기원.'
    }
  },
  alchemy: {
    name: '화식과 훈제 → 원시 연금술',
    icon: '🔥',
    primal: {
      title: '1. 원시 생존 기술: 모닥불 관리와 고기 훈제',
      desc: '비바람 속에서 마른 장작과 동물 지방을 배합해 불씨를 유지하고, 연기로 고기를 훈제하거나 소금 바위로 염장해 겨울철 식량 부패를 막는 생존 조리.'
    },
    trigger: {
      title: '2. 마법 발견의 계기: 푸른 연기와 발광 약초',
      desc: '동굴 심층부에서 채집한 푸른 이끼와 마수의 골수를 모닥불에 넣고 끓이자, 보랏빛 연기가 피어오르며 연기를 마신 부상자의 골절이 하룻밤 만에 아묾.'
    },
    magic: {
      title: '3. 각성한 메커닉: 주술 훈향과 원시 영약 (Proto-Alchemy)',
      desc: '모닥불에 던져 넣는 촉매 조합에 따라 야영지 전체에 광역 버프(야간 투시, 추위 면역, 광전사 상태)를 부여하는 주술 향(Incense) 및 원시 포션 조제.'
    },
    legacy: {
      title: '4. 후대 3D RPG의 유산: 캠프파이어 버프 요리 & 연금 비전서',
      desc: 'Sim 3의 정밀 증류 연금술과 3D 액션 RPG의 모닥불 휴식 버프 요리로 직결되며, 고대 부족의 비전 레시피는 최상급 엘릭서의 재료 배합비가 됨.'
    }
  },
  totem: {
    name: '맹수 수렵 → 토템 동화',
    icon: '🏹',
    primal: {
      title: '1. 원시 생존 기술: 끈기 사냥과 부위별 해체',
      desc: '발자국과 냄새로 거대 야수를 수십 킬로미터 추적해 지치게 만들고, 사냥 후 가죽·힘줄·뼈·이빨을 하나도 버리지 않고 해체해 방한복을 만드는 수렵 생활.'
    },
    trigger: {
      title: '2. 마법 발견의 계기: 마수의 가죽에 남은 잔류 사념',
      desc: '벼락을 부르던 거대 괴조의 두개골과 깃털을 뒤집어쓴 사냥꾼이 폭풍우 속에서 벼락을 맞고도 죽지 않고 오히려 번개처럼 빠르게 달리는 현상 목격.'
    },
    magic: {
      title: '3. 각성한 메커닉: 토템 가면과 야수 동화 (Totemic Magic)',
      desc: '태고 마수의 핵심 부위(뿔, 안구, 가죽)로 제작한 토템 가면을 착용하면, 사냥꾼의 시야가 마수의 감각(열화상/진동 감지)으로 변하고 고유 권능을 사용.'
    },
    legacy: {
      title: '4. 후대 3D RPG의 유산: 드루이드 변신술 & 보스 소울 장비',
      desc: '3D 액션 RPG에서 거대 보스 몬스터를 토벌한 뒤 그 핵과 재료로 보스의 고유 스킬이 담긴 특수 방어구/장신구를 제작하는 헌팅 루프의 역사적 원형.'
    }
  },
  rune: {
    name: '구전 설화 → 태초의 룬과 주문',
    icon: '🗣️',
    primal: {
      title: '1. 원시 생존 기술: 장로의 구전과 동굴 사냥 벽화',
      desc: '문자가 없던 시대에 어느 계곡에 맹수가 사는지, 어떤 열매가 독인지 다음 세대에 전달하기 위해 암벽에 황토와 목탄으로 사냥 장면을 그리던 기록 행위.'
    },
    trigger: {
      title: '2. 마법 발견의 계기: 마력 혈맥을 따라 빛나는 선',
      desc: '마나석 가루를 섞은 마수의 피로 바위에 마수의 형상을 그리자, 그림의 선을 따라 실제 마력이 흐르며 주변 공기가 진동하고 방어 결계가 형성됨.'
    },
    magic: {
      title: '3. 각성한 메커닉: 룬 기호 조합과 주술 영창 (First Runes)',
      desc: '[불꽃], [확산], [가속]을 뜻하는 원시 상형 기호들을 가죽 두루마리에 연결해 그리면 새로운 마법 효과가 발동하는 시각적 주문 조합(Spellcrafting).'
    },
    legacy: {
      title: '4. 후대 3D RPG의 유산: 고대 룬 마법 체계 & 던전 벽화 퍼즐',
      desc: '플레이어가 첫 게임에서 조합했던 원시 벽화 기호들이 수천 년 뒤 3D RPG 마법 학파의 표준 룬 문자가 되며, 유적 던전의 벽화 해독 기믹으로 재등장.'
    }
  }
};

/* ==========================================================================
   Lab 1: Cave Mural & Color Intrusion Simulator Class
   ========================================================================== */
class MuralDirectionLab {
  constructor() {
    this.canvas = document.getElementById('mural-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.actButtons = document.querySelectorAll('.act-btn');
    this.awakeningSlider = document.getElementById('awakening-slider');
    this.awakeningVal = document.getElementById('awakening-val');
    this.catalystBtns = document.querySelectorAll('.catalyst-btn');
    this.clearBtn = document.getElementById('clear-mural-btn');
    this.narrativeBox = document.getElementById('stage-narrative-box');

    this.currentAct = 0;
    this.awakening = 10; // 0 to 100
    this.catalyst = 'wood'; // 'wood' | 'crystal' | 'heart'
    this.time = 0;

    // Fire & Magic Particles
    this.particles = [];
    // User painted strokes on the cave wall
    this.userStrokes = [];
    this.isDrawing = false;
    this.currentStroke = null;

    if (this.canvas && this.ctx) {
      this.init();
    }
  }

  init() {
    this.setupControls();
    this.setupDrawing();
    this.initParticles();
    this.renderNarrative();
    this.animate();
  }

  setupControls() {
    this.actButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const actIndex = parseInt(btn.dataset.act, 10);
        this.setAct(actIndex);
      });
    });

    if (this.awakeningSlider) {
      this.awakeningSlider.addEventListener('input', (e) => {
        this.awakening = parseInt(e.target.value, 10);
        if (this.awakeningVal) {
          this.awakeningVal.textContent = `${this.awakening}%`;
        }
      });
    }

    this.catalystBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.catalystBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.catalyst = btn.dataset.catalyst;
        // Boost particles on catalyst throw
        this.spawnCatalystBurst();
      });
    });

    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => {
        this.userStrokes = [];
      });
    }
  }

  setAct(actIndex) {
    this.currentAct = actIndex;
    const stage = ACT_STAGES[actIndex];
    if (!stage) return;

    this.actButtons.forEach((btn, idx) => {
      const isSelected = idx === actIndex;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', String(isSelected));
    });

    this.awakening = stage.defaultAwakening;
    if (this.awakeningSlider) this.awakeningSlider.value = String(this.awakening);
    if (this.awakeningVal) this.awakeningVal.textContent = `${this.awakening}%`;

    this.catalyst = stage.defaultCatalyst;
    this.catalystBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.catalyst === this.catalyst);
    });

    this.spawnCatalystBurst();
    this.renderNarrative();
  }

  renderNarrative() {
    if (!this.narrativeBox) return;
    const stage = ACT_STAGES[this.currentAct];
    this.narrativeBox.innerHTML = `
      <div class="stage-story">
        <h3>${stage.title}</h3>
        <p>${stage.story}</p>
        <p style="font-size:0.84rem; color:var(--accent-primary); font-weight:600; margin:0;">
          🎨 핵심 색채 연출: ${stage.paletteDesc}
        </p>
      </div>
      <div class="stage-dilemma">
        <h4>⚖️ 여정 중 발생하는 부족의 서사적 딜레마</h4>
        <ul>
          ${stage.dilemmas.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  setupDrawing() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: ((clientX - rect.left) / rect.width) * this.canvas.width,
        y: ((clientY - rect.top) / rect.height) * this.canvas.height
      };
    };

    const startDraw = (e) => {
      e.preventDefault();
      this.isDrawing = true;
      const pos = getPos(e);
      let strokeColor = '#d97706'; // Ochre default
      let isGlowing = false;

      if (this.awakening >= 70 || this.catalyst === 'heart') {
        strokeColor = '#fbbf24';
        isGlowing = true;
      } else if (this.awakening >= 35 || this.catalyst === 'crystal') {
        strokeColor = '#22d3ee';
        isGlowing = true;
      }

      this.currentStroke = {
        color: strokeColor,
        glow: isGlowing,
        points: [pos]
      };
      this.userStrokes.push(this.currentStroke);
    };

    const moveDraw = (e) => {
      if (!this.isDrawing || !this.currentStroke) return;
      e.preventDefault();
      const pos = getPos(e);
      this.currentStroke.points.push(pos);
    };

    const endDraw = () => {
      this.isDrawing = false;
      this.currentStroke = null;
    };

    this.canvas.addEventListener('mousedown', startDraw);
    this.canvas.addEventListener('mousemove', moveDraw);
    window.addEventListener('mouseup', endDraw);

    this.canvas.addEventListener('touchstart', startDraw, { passive: false });
    this.canvas.addEventListener('touchmove', moveDraw, { passive: false });
    window.addEventListener('touchend', endDraw);
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < 55; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle(burst = false) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const fireX = w * 0.5;
    const fireY = h * 0.82;

    return {
      x: fireX + (Math.random() - 0.5) * (burst ? 90 : 50),
      y: fireY + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * (burst ? 2.4 : 0.9),
      vy: -(1.0 + Math.random() * (burst ? 3.5 : 2.0)),
      size: 2 + Math.random() * 4.5,
      alpha: 0.7 + Math.random() * 0.3,
      decay: 0.006 + Math.random() * 0.008,
      magicSeed: Math.random()
    };
  }

  spawnCatalystBurst() {
    for (let i = 0; i < 25; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  getFireColors() {
    const ratio = this.awakening / 100;
    if (this.catalyst === 'crystal') {
      return {
        core: '#e0f2fe',
        mid: '#22d3ee',
        outer: 'rgba(6, 182, 212, 0.38)',
        spark: '#67e8f9'
      };
    }
    if (this.catalyst === 'heart') {
      return {
        core: '#fef08a',
        mid: '#c084fc',
        outer: 'rgba(168, 85, 247, 0.42)',
        spark: '#fbbf24'
      };
    }
    // Wood mixed with awakening ratio
    if (ratio > 0.65) {
      return {
        core: '#fef08a',
        mid: '#38bdf8',
        outer: 'rgba(168, 85, 247, 0.35)',
        spark: '#f472b6'
      };
    }
    if (ratio > 0.3) {
      return {
        core: '#fde047',
        mid: '#f97316',
        outer: 'rgba(34, 211, 238, 0.28)',
        spark: '#22d3ee'
      };
    }
    return {
      core: '#fef08a',
      mid: '#f97316',
      outer: 'rgba(234, 88, 12, 0.32)',
      spark: '#fb923c'
    };
  }

  animate() {
    const loop = () => {
      if (!document.hidden) {
        this.time += 0.03;
        this.draw();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ratio = this.awakening / 100;
    const colors = this.getFireColors();

    // 1. Cave Rock Base Background
    ctx.fillStyle = '#14110f';
    ctx.fillRect(0, 0, w, h);

    // 2. Dynamic Campfire & Magic Ambient Glow on Cave Wall
    const fireX = w * 0.5;
    const fireY = h * 0.82;
    const flicker = Math.sin(this.time * 3.2) * 12 + Math.cos(this.time * 5.7) * 6;
    const lightRadius = 260 + ratio * 150 + flicker;

    const grad = ctx.createRadialGradient(fireX, fireY - 40, 10, fireX, fireY - 40, lightRadius);
    grad.addColorStop(0, colors.outer);
    grad.addColorStop(0.55, ratio > 0.4 ? 'rgba(30, 27, 75, 0.35)' : 'rgba(67, 20, 7, 0.25)');
    grad.addColorStop(1, 'rgba(10, 9, 8, 0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 3. Cave Wall Cracks & Strata Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1.5;
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 95);
      ctx.quadraticCurveTo(w * 0.3, i * 95 + 25, w * 0.65, i * 95 - 15);
      ctx.lineTo(w, i * 95 + 10);
      ctx.stroke();
    }

    // 4. LEFT MURAL: Prehistoric Mammoth / Behemoth
    this.drawBeastMural(ctx, w * 0.22, h * 0.46, ratio);

    // 5. RIGHT MURAL: Hunters & First Rune Monolith
    this.drawHuntersAndMonolith(ctx, w * 0.77, h * 0.46, ratio);

    // 6. User Drawn Cave Paintings / Runes
    this.drawUserStrokes(ctx, ratio);

    // 7. CENTER: Campfire Logs & Animated Flames
    this.drawCampfire(ctx, fireX, fireY, colors, flicker);

    // 8. Rising Sparks & Mana Particles
    this.updateAndDrawParticles(ctx, colors, ratio);
  }

  drawBeastMural(ctx, cx, cy, ratio) {
    ctx.save();
    ctx.translate(cx, cy);

    // Ochre & Charcoal Base Beast Silhouette
    ctx.strokeStyle = '#d97706';
    ctx.fillStyle = 'rgba(154, 52, 18, 0.28)';
    ctx.lineWidth = 3.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(-80, 45);
    ctx.quadraticCurveTo(-85, -35, -20, -55);
    ctx.quadraticCurveTo(45, -70, 85, -25);
    ctx.quadraticCurveTo(110, 5, 105, 55);
    ctx.lineTo(80, 95);
    ctx.lineTo(58, 95);
    ctx.lineTo(52, 50);
    ctx.lineTo(-10, 50);
    ctx.lineTo(-18, 95);
    ctx.lineTo(-42, 95);
    ctx.lineTo(-42, 45);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Giant Curved Tusks
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-72, 15);
    ctx.quadraticCurveTo(-125, 25, -135, -18);
    ctx.quadraticCurveTo(-112, 0, -70, 2);
    ctx.stroke();

    // Awakening Effect: Glowing Mana Core & Spirit Lines inside the Beast
    if (ratio > 0.25 || this.catalyst !== 'wood') {
      const glowAlpha = Math.min(1, (ratio - 0.15) * 1.3);
      ctx.save();
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 14 * glowAlpha;
      ctx.strokeStyle = `rgba(34, 211, 238, ${glowAlpha})`;
      ctx.lineWidth = 2.2;

      // Beast Heart Core Spiral
      ctx.beginPath();
      ctx.arc(10, -5, 16 + Math.sin(this.time * 4) * 3, 0, Math.PI * 2);
      ctx.stroke();

      // Mana veins radiating from core
      ctx.beginPath();
      ctx.moveTo(10, -21);
      ctx.lineTo(25, -45);
      ctx.moveTo(26, -5);
      ctx.lineTo(68, 5);
      ctx.moveTo(-6, -5);
      ctx.lineTo(-55, 8);
      ctx.stroke();
      ctx.restore();
    }

    // Label below mural
    ctx.fillStyle = 'rgba(253, 186, 116, 0.75)';
    ctx.font = '600 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('태고의 거대 마수 (벽화 기록)', 0, 125);

    ctx.restore();
  }

  drawHuntersAndMonolith(ctx, cx, cy, ratio) {
    ctx.save();
    ctx.translate(cx, cy);

    // Stick Hunters (Left of monolith)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';

    const drawHunter = (hx, hy, spearAngle) => {
      ctx.save();
      ctx.translate(hx, hy);
      // Head
      ctx.beginPath();
      ctx.arc(0, -26, 6, 0, Math.PI * 2);
      ctx.stroke();
      // Body & Legs
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(-2, 8);
      ctx.lineTo(-12, 32);
      ctx.moveTo(-2, 8);
      ctx.lineTo(10, 32);
      // Arm
      ctx.moveTo(0, -12);
      ctx.lineTo(14, -18);
      ctx.stroke();

      // Spear
      ctx.rotate(spearAngle);
      ctx.strokeStyle = ratio > 0.35 ? '#38bdf8' : '#fde68a';
      if (ratio > 0.35) {
        ctx.shadowColor = '#22d3ee';
        ctx.shadowBlur = 10;
      }
      ctx.beginPath();
      ctx.moveTo(-18, -10);
      ctx.lineTo(28, -22);
      ctx.stroke();
      ctx.restore();
    };

    drawHunter(-85, 35, -0.15);
    drawHunter(-45, 42, -0.25);

    // Ancient Monolith / Rune Tablet (Right side)
    const monoAlpha = 0.35 + ratio * 0.65;
    ctx.save();
    ctx.translate(35, 10);

    if (ratio > 0.5 || this.catalyst !== 'wood') {
      ctx.shadowColor = ratio > 0.75 ? '#c084fc' : '#22d3ee';
      ctx.shadowBlur = 18 * ratio;
    }

    ctx.strokeStyle = ratio > 0.5 ? `rgba(34, 211, 238, ${monoAlpha})` : 'rgba(217, 119, 6, 0.6)';
    ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
    ctx.lineWidth = 2.5;

    // Crystal Monolith Shape
    ctx.beginPath();
    ctx.moveTo(0, -75);
    ctx.lineTo(34, -20);
    ctx.lineTo(24, 65);
    ctx.lineTo(-24, 65);
    ctx.lineTo(-34, -20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing Rune Symbols on Monolith
    const runeGlow = Math.max(0.2, ratio);
    ctx.strokeStyle = ratio > 0.7 ? `rgba(251, 191, 36, ${runeGlow})` : `rgba(103, 232, 249, ${runeGlow})`;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    // Top rune
    ctx.moveTo(-10, -32);
    ctx.lineTo(0, -48);
    ctx.lineTo(10, -32);
    ctx.lineTo(0, -16);
    ctx.closePath();
    // Center line & branches
    ctx.moveTo(0, -16);
    ctx.lineTo(0, 42);
    ctx.moveTo(-12, 8);
    ctx.lineTo(12, 22);
    ctx.moveTo(12, 8);
    ctx.lineTo(-12, 22);
    ctx.stroke();

    // Sacred Halo Ring at high awakening
    if (ratio > 0.65) {
      ctx.strokeStyle = `rgba(192, 132, 252, ${(ratio - 0.6) * 2})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(0, -5, 58, this.time * 0.5, this.time * 0.5 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();

    ctx.fillStyle = ratio > 0.5 ? 'rgba(103, 232, 249, 0.85)' : 'rgba(253, 186, 116, 0.75)';
    ctx.font = '600 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      ratio > 0.5 ? '각성한 마력 성소와 태초의 룬' : '사냥꾼과 미지의 바위 성소',
      -10,
      125
    );

    ctx.restore();
  }

  drawUserStrokes(ctx, ratio) {
    this.userStrokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.glow || ratio > 0.5) {
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = 12;
      }

      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    });
  }

  drawCampfire(ctx, fx, fy, colors, flicker) {
    ctx.save();
    ctx.translate(fx, fy);

    // Charred wooden logs
    ctx.strokeStyle = '#573016';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-42, 16);
    ctx.lineTo(38, -2);
    ctx.moveTo(-36, -2);
    ctx.lineTo(42, 16);
    ctx.stroke();

    // Stones around fire
    ctx.fillStyle = '#44403c';
    [-46, -24, 0, 24, 46].forEach((sx, idx) => {
      ctx.beginPath();
      ctx.arc(sx, 18 + (idx % 2) * 4, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Outer Flame
    ctx.save();
    ctx.shadowColor = colors.mid;
    ctx.shadowBlur = 24;
    ctx.fillStyle = colors.mid;
    ctx.beginPath();
    ctx.moveTo(-30, 8);
    ctx.quadraticCurveTo(-36, -38, 0 + flicker * 0.4, -75 - Math.abs(flicker));
    ctx.quadraticCurveTo(36, -38, 30, 8);
    ctx.closePath();
    ctx.fill();

    // Inner Core Flame
    ctx.fillStyle = colors.core;
    ctx.beginPath();
    ctx.moveTo(-16, 8);
    ctx.quadraticCurveTo(-18, -22, 0 - flicker * 0.25, -46 - Math.abs(flicker) * 0.5);
    ctx.quadraticCurveTo(18, -22, 16, 8);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  updateAndDrawParticles(ctx, colors, ratio) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx + Math.sin(this.time * 2 + p.magicSeed * 6) * 0.45;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles[i] = this.createParticle(false);
        continue;
      }

      ctx.save();
      const isMagicSpark = p.magicSeed < ratio || this.catalyst !== 'wood';
      ctx.fillStyle = isMagicSpark ? colors.spark : '#fb923c';
      ctx.globalAlpha = Math.max(0, p.alpha);
      if (isMagicSpark) {
        ctx.shadowColor = colors.spark;
        ctx.shadowBlur = 8;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

/* ==========================================================================
   Lab 2: 4-System Evolution Matrix Class
   ========================================================================== */
class SystemEvolutionLab {
  constructor() {
    this.tabsContainer = document.getElementById('evo-tabs');
    this.contentContainer = document.getElementById('evo-content');
    this.activeKey = 'enchant';

    if (this.tabsContainer && this.contentContainer) {
      this.init();
    }
  }

  init() {
    this.renderTabs();
    this.renderContent(this.activeKey);
  }

  renderTabs() {
    this.tabsContainer.innerHTML = '';
    Object.keys(EVOLUTION_DATA).forEach(key => {
      const item = EVOLUTION_DATA[key];
      const btn = document.createElement('button');
      btn.className = `evo-tab ${key === this.activeKey ? 'active' : ''}`;
      btn.innerHTML = `${item.icon} ${item.name}`;
      btn.addEventListener('click', () => {
        this.activeKey = key;
        this.tabsContainer.querySelectorAll('.evo-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderContent(key);
      });
      this.tabsContainer.appendChild(btn);
    });
  }

  renderContent(key) {
    const data = EVOLUTION_DATA[key];
    if (!data) return;

    this.contentContainer.innerHTML = `
      <div class="evo-flow-grid">
        <div class="evo-step-card">
          <div class="evo-step-header">
            <strong>${data.primal.title}</strong>
            <span class="evo-pill pill-primal">STEP 1 · 원시 생존</span>
          </div>
          <p>${data.primal.desc}</p>
        </div>

        <div class="evo-step-card">
          <div class="evo-step-header">
            <strong>${data.trigger.title}</strong>
            <span class="evo-pill pill-trigger">STEP 2 · 발견과 조우</span>
          </div>
          <p>${data.trigger.desc}</p>
        </div>

        <div class="evo-step-card">
          <div class="evo-step-header">
            <strong>${data.magic.title}</strong>
            <span class="evo-pill pill-magic">STEP 3 · 원시 마법 발현</span>
          </div>
          <p>${data.magic.desc}</p>
        </div>

        <div class="evo-step-card">
          <div class="evo-step-header">
            <strong>${data.legacy.title}</strong>
            <span class="evo-pill pill-legacy">STEP 4 · 3D RPG 유산</span>
          </div>
          <p>${data.legacy.desc}</p>
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   Lab 3: Procedural Web Audio Soundscape Mixer Class
   ========================================================================== */
class PrimalAudioLab {
  constructor() {
    this.toggleBtn = document.getElementById('audio-toggle-btn');
    this.btnText = document.getElementById('audio-btn-text');
    this.vizCanvas = document.getElementById('audio-viz-canvas');
    this.vizCtx = this.vizCanvas ? this.vizCanvas.getContext('2d') : null;

    this.sliders = {
      wind: document.getElementById('vol-wind'),
      drum: document.getElementById('vol-drum'),
      drone: document.getElementById('vol-drone'),
      shimmer: document.getElementById('vol-shimmer')
    };

    this.labels = {
      wind: document.getElementById('vol-wind-val'),
      drum: document.getElementById('vol-drum-val'),
      drone: document.getElementById('vol-drone-val'),
      shimmer: document.getElementById('vol-shimmer-val')
    };

    this.audioCtx = null;
    this.analyser = null;
    this.isPlaying = false;
    this.gains = {};
    this.timers = [];

    this.init();
  }

  init() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleAudio());
    }

    // Volume Sliders
    Object.keys(this.sliders).forEach(key => {
      const slider = this.sliders[key];
      if (!slider) return;
      slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (this.labels[key]) this.labels[key].textContent = `${val}%`;
        this.updateChannelGain(key, val / 100);
      });
    });

    // Presets
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const preset = chip.dataset.preset;
        if (preset === 'act1') this.applyPreset(75, 55, 0, 0);
        if (preset === 'act2') this.applyPreset(50, 45, 65, 25);
        if (preset === 'act3') this.applyPreset(30, 60, 85, 80);
        if (!this.isPlaying) this.toggleAudio();
      });
    });

    // One-shot SFX buttons
    const flintBtn = document.getElementById('sfx-flint');
    const fluteBtn = document.getElementById('sfx-flute');
    const runeBtn = document.getElementById('sfx-rune');

    if (flintBtn) flintBtn.addEventListener('click', () => this.playFlintSfx());
    if (fluteBtn) fluteBtn.addEventListener('click', () => this.playBoneFluteSfx());
    if (runeBtn) runeBtn.addEventListener('click', () => this.playRuneAwakenSfx());

    this.drawIdleVisualizer();
  }

  applyPreset(wind, drum, drone, shimmer) {
    const vals = { wind, drum, drone, shimmer };
    Object.keys(vals).forEach(k => {
      if (this.sliders[k]) this.sliders[k].value = String(vals[k]);
      if (this.labels[k]) this.labels[k].textContent = `${vals[k]}%`;
      this.updateChannelGain(k, vals[k] / 100);
    });
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.connect(this.audioCtx.destination);
      this.renderVisualizer();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleAudio() {
    if (this.isPlaying) {
      this.stopSoundscape();
    } else {
      this.startSoundscape();
    }
  }

  startSoundscape() {
    this.ensureContext();
    this.isPlaying = true;
    this.toggleBtn.classList.add('playing');
    this.btnText.textContent = '⏹️ 사운드스케이프 정지 (Stop Audio)';

    const ctx = this.audioCtx;

    // 1. Wind & Campfire Noise Generator
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 2.5;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 260;
    windFilter.Q.value = 2.2;

    // Wind LFO
    const windLfo = ctx.createOscillator();
    windLfo.frequency.value = 0.18;
    const windLfoGain = ctx.createGain();
    windLfoGain.gain.value = 140;
    windLfo.connect(windFilter.frequency);
    windLfo.start();

    const windGain = ctx.createGain();
    windGain.gain.value = (parseInt(this.sliders.wind.value, 10) / 100) * 0.35;
    whiteNoise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.analyser);
    whiteNoise.start();

    // 2. Mana Crystal Harmonic Drone (110Hz + 165Hz + 220Hz)
    const droneGain = ctx.createGain();
    droneGain.gain.value = (parseInt(this.sliders.drone.value, 10) / 100) * 0.22;

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 480;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc2.type = 'sine';
    osc1.frequency.value = 110; // A2
    osc2.frequency.value = 164.81; // E3 (Fifth)
    osc1.connect(droneFilter);
    osc2.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.analyser);
    osc1.start();
    osc2.start();

    this.gains = {
      wind: windGain,
      drone: droneGain,
      drumVol: parseInt(this.sliders.drum.value, 10) / 100,
      shimmerVol: parseInt(this.sliders.shimmer.value, 10) / 100
    };

    this.activeSources = [whiteNoise, windLfo, osc1, osc2];

    // 3. Periodic Tribal Drum & Heartbeat Loop
    const drumTimer = setInterval(() => {
      if (!this.isPlaying || document.hidden) return;
      if (this.gains.drumVol > 0.02) {
        this.triggerTribalDrum(this.gains.drumVol * 0.5);
        setTimeout(() => {
          if (this.isPlaying) this.triggerTribalDrum(this.gains.drumVol * 0.28);
        }, 260);
      }
    }, 1350);

    // 4. Periodic Rune Shimmer Loop
    const shimmerNotes = [523.25, 659.25, 783.99, 987.77, 1046.5];
    const shimmerTimer = setInterval(() => {
      if (!this.isPlaying || document.hidden) return;
      if (this.gains.shimmerVol > 0.02) {
        const note = shimmerNotes[Math.floor(Math.random() * shimmerNotes.length)];
        this.triggerRunePing(note, this.gains.shimmerVol * 0.16);
      }
    }, 950);

    this.timers.push(drumTimer, shimmerTimer);
    this.renderVisualizer();
  }

  stopSoundscape() {
    this.isPlaying = false;
    this.toggleBtn.classList.remove('playing');
    this.btnText.textContent = '🔊 사운드스케이프 시작 (Start Audio)';

    this.timers.forEach(t => clearInterval(t));
    this.timers = [];

    if (this.activeSources) {
      this.activeSources.forEach(src => {
        try { src.stop(); } catch (_) {}
      });
      this.activeSources = [];
    }
  }

  updateChannelGain(key, normalized) {
    if (!this.isPlaying || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    if (key === 'wind' && this.gains.wind) {
      this.gains.wind.gain.setTargetAtTime(normalized * 0.35, now, 0.08);
    } else if (key === 'drone' && this.gains.drone) {
      this.gains.drone.gain.setTargetAtTime(normalized * 0.22, now, 0.08);
    } else if (key === 'drum') {
      this.gains.drumVol = normalized;
    } else if (key === 'shimmer') {
      this.gains.shimmerVol = normalized;
    }
  }

  triggerTribalDrum(amp) {
    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(115, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.22);

    gain.gain.setValueAtTime(amp, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc.connect(gain);
    gain.connect(this.analyser);
    osc.start(now);
    osc.stop(now + 0.34);
  }

  triggerRunePing(freq, amp) {
    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(amp, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.4);

    osc.connect(gain);
    gain.connect(this.analyser);
    osc.start(now);
    osc.stop(now + 1.45);
  }

  /* ---------------- One-Shot SFX ---------------- */
  playFlintSfx() {
    this.ensureContext();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.065);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

    osc.connect(gain);
    gain.connect(this.analyser);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playBoneFluteSfx() {
    this.ensureContext();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.35);
    osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.9);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);

    osc.connect(gain);
    gain.connect(this.analyser);
    osc.start(now);
    osc.stop(now + 1.2);
  }

  playRuneAwakenSfx() {
    this.ensureContext();
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      setTimeout(() => {
        this.triggerRunePing(freq, 0.22);
      }, idx * 90);
    });
  }

  /* ---------------- Visualizer ---------------- */
  drawIdleVisualizer() {
    if (!this.vizCtx || !this.vizCanvas) return;
    const ctx = this.vizCtx;
    const w = this.vizCanvas.width;
    const h = this.vizCanvas.height;
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '500 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('상단의 [사운드스케이프 시작] 또는 [효과음 테스트] 버튼을 누르면 실시간 음향 파형이 표시됩니다.', w / 2, h / 2 - 12);
  }

  renderVisualizer() {
    if (!this.vizCtx || !this.analyser) return;
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const drawFrame = () => {
      if (!this.isPlaying && (!this.audioCtx || this.audioCtx.state !== 'running')) return;
      requestAnimationFrame(drawFrame);

      this.analyser.getByteTimeDomainData(dataArray);
      const ctx = this.vizCtx;
      const w = this.vizCanvas.width;
      const h = this.vizCanvas.height;

      ctx.fillStyle = 'rgba(9, 13, 22, 0.35)';
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 2.2;
      ctx.strokeStyle = '#22d3ee';
      ctx.beginPath();

      const sliceWidth = w / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * h) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(w, h / 2);
      ctx.stroke();
    };

    requestAnimationFrame(drawFrame);
  }
}

/* ==========================================================================
   Bootstrap
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  new MuralDirectionLab();
  new SystemEvolutionLab();
  new PrimalAudioLab();
});
