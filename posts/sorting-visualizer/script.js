/**
 * Sorting Algorithm Visualizer
 * Interactive, generator-based step-by-step sorting on HTML5 Canvas.
 */

class SortingVisualizer {
  constructor() {
    this.canvas = document.getElementById('sort-canvas');
    this.ctx = this.canvas.getContext('2d');

    // UI Elements
    this.algoSelect = document.getElementById('algo-select');
    this.sizeSlider = document.getElementById('size-slider');
    this.sizeVal = document.getElementById('size-val');
    this.speedSlider = document.getElementById('speed-slider');
    this.speedVal = document.getElementById('speed-val');

    this.startBtn = document.getElementById('start-btn');
    this.pauseBtn = document.getElementById('pause-btn');
    this.stepBtn = document.getElementById('step-btn');
    this.resetBtn = document.getElementById('reset-btn');

    this.statusBadge = document.getElementById('status-badge');
    this.metricComp = document.getElementById('metric-comp');
    this.metricSwap = document.getElementById('metric-swap');
    this.metricTime = document.getElementById('metric-time');

    // State
    this.array = [];
    this.arraySize = parseInt(this.sizeSlider.value, 10);
    this.speed = parseInt(this.speedSlider.value, 10);
    this.status = 'idle'; // idle, running, paused, completed

    this.generator = null;
    this.timerId = null;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.timeTicker = null;

    // Metrics
    this.comparisons = 0;
    this.swaps = 0;

    // Highlights during sort
    this.comparingIndices = [];
    this.swappingIndices = [];
    this.sortedIndices = new Set();

    this.init();
  }

  init() {
    this.setupCanvas();
    this.setupListeners();
    this.resetArray();
  }

  setupCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.logicalWidth = rect.width;
    this.logicalHeight = rect.height;
  }

  setupListeners() {
    window.addEventListener('resize', () => {
      this.setupCanvas();
      this.draw();
    });

    window.addEventListener('themechange', () => {
      this.draw();
    });

    this.sizeSlider.addEventListener('input', (e) => {
      this.arraySize = parseInt(e.target.value, 10);
      this.sizeVal.textContent = this.arraySize;
      if (this.status !== 'running') {
        this.resetArray();
      }
    });

    this.speedSlider.addEventListener('input', (e) => {
      this.speed = parseInt(e.target.value, 10);
      this.speedVal.textContent = `${this.speed}x`;
    });

    this.resetBtn.addEventListener('click', () => {
      this.stop();
      this.resetArray();
    });

    this.startBtn.addEventListener('click', () => {
      if (this.status === 'paused') {
        this.resume();
      } else {
        this.start();
      }
    });

    this.pauseBtn.addEventListener('click', () => {
      this.pause();
    });

    this.stepBtn.addEventListener('click', () => {
      this.step();
    });
  }

  resetArray() {
    this.array = [];
    for (let i = 0; i < this.arraySize; i++) {
      // 5% ~ 95% height values
      this.array.push(Math.floor(Math.random() * 90) + 10);
    }
    this.comparisons = 0;
    this.swaps = 0;
    this.elapsedTime = 0;
    this.comparingIndices = [];
    this.swappingIndices = [];
    this.sortedIndices.clear();
    this.updateMetrics();
    this.setStatus('idle');
    this.draw();
  }

  setStatus(status) {
    this.status = status;
    this.statusBadge.className = `status-badge status-${status}`;
    this.statusBadge.textContent = status.toUpperCase();

    if (status === 'running') {
      this.startBtn.disabled = true;
      this.pauseBtn.disabled = false;
      this.stepBtn.disabled = true;
      this.sizeSlider.disabled = true;
      this.algoSelect.disabled = true;
    } else if (status === 'paused') {
      this.startBtn.disabled = false;
      this.startBtn.textContent = '재개 (Resume)';
      this.pauseBtn.disabled = true;
      this.stepBtn.disabled = false;
      this.sizeSlider.disabled = true;
      this.algoSelect.disabled = true;
    } else {
      this.startBtn.disabled = false;
      this.startBtn.textContent = '정렬 시작 (Start)';
      this.pauseBtn.disabled = true;
      this.stepBtn.disabled = false;
      this.sizeSlider.disabled = false;
      this.algoSelect.disabled = false;
    }
  }

  updateMetrics() {
    this.metricComp.textContent = this.comparisons.toLocaleString();
    this.metricSwap.textContent = this.swaps.toLocaleString();
    this.metricTime.textContent = `${(this.elapsedTime / 1000).toFixed(1)}s`;
  }

  start() {
    this.comparisons = 0;
    this.swaps = 0;
    this.elapsedTime = 0;
    this.sortedIndices.clear();
    this.updateMetrics();

    const algo = this.algoSelect.value;
    if (algo === 'bubble') this.generator = this.bubbleSort();
    else if (algo === 'selection') this.generator = this.selectionSort();
    else if (algo === 'insertion') this.generator = this.insertionSort();
    else if (algo === 'quick') this.generator = this.quickSort(0, this.array.length - 1);
    else if (algo === 'merge') this.generator = this.mergeSort(0, this.array.length - 1);

    this.setStatus('running');
    this.startTime = performance.now() - this.elapsedTime;
    this.startTimer();
    this.runLoop();
  }

  pause() {
    this.setStatus('paused');
    this.stopTimer();
    clearTimeout(this.timerId);
  }

  resume() {
    this.setStatus('running');
    this.startTime = performance.now() - this.elapsedTime;
    this.startTimer();
    this.runLoop();
  }

  stop() {
    clearTimeout(this.timerId);
    this.stopTimer();
    this.generator = null;
    this.setStatus('idle');
  }

  startTimer() {
    this.stopTimer();
    this.timeTicker = setInterval(() => {
      this.elapsedTime = performance.now() - this.startTime;
      this.metricTime.textContent = `${(this.elapsedTime / 1000).toFixed(1)}s`;
    }, 100);
  }

  stopTimer() {
    if (this.timeTicker) {
      clearInterval(this.timeTicker);
      this.timeTicker = null;
    }
  }

  step() {
    if (!this.generator) {
      this.start();
      this.pause();
      return;
    }
    const result = this.generator.next();
    if (result.done) {
      this.complete();
    } else {
      this.draw();
      this.updateMetrics();
    }
  }

  runLoop() {
    if (this.status !== 'running') return;

    // Run steps based on speed factor
    const stepsPerFrame = Math.max(1, Math.floor(this.speed / 1.5));
    let done = false;

    for (let i = 0; i < stepsPerFrame; i++) {
      const result = this.generator.next();
      if (result.done) {
        done = true;
        break;
      }
    }

    this.draw();
    this.updateMetrics();

    if (done) {
      this.complete();
    } else {
      const delay = Math.max(0, 100 - (this.speed * 9.5));
      this.timerId = setTimeout(() => this.runLoop(), delay);
    }
  }

  complete() {
    this.stopTimer();
    for (let i = 0; i < this.array.length; i++) {
      this.sortedIndices.add(i);
    }
    this.comparingIndices = [];
    this.swappingIndices = [];
    this.setStatus('completed');
    this.draw();
    this.updateMetrics();
  }

  // --- Sorting Algorithm Generators ---

  *bubbleSort() {
    const n = this.array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this.comparingIndices = [j, j + 1];
        this.comparisons++;
        yield;

        if (this.array[j] > this.array[j + 1]) {
          this.swappingIndices = [j, j + 1];
          const temp = this.array[j];
          this.array[j] = this.array[j + 1];
          this.array[j + 1] = temp;
          this.swaps++;
          yield;
          this.swappingIndices = [];
        }
      }
      this.sortedIndices.add(n - i - 1);
    }
    this.sortedIndices.add(0);
  }

  *selectionSort() {
    const n = this.array.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        this.comparingIndices = [minIdx, j];
        this.comparisons++;
        yield;

        if (this.array[j] < this.array[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        this.swappingIndices = [i, minIdx];
        const temp = this.array[i];
        this.array[i] = this.array[minIdx];
        this.array[minIdx] = temp;
        this.swaps++;
        yield;
        this.swappingIndices = [];
      }
      this.sortedIndices.add(i);
    }
    this.sortedIndices.add(n - 1);
  }

  *insertionSort() {
    const n = this.array.length;
    this.sortedIndices.add(0);

    for (let i = 1; i < n; i++) {
      let key = this.array[i];
      let j = i - 1;

      this.comparingIndices = [i, j];
      this.comparisons++;
      yield;

      while (j >= 0 && this.array[j] > key) {
        this.swappingIndices = [j + 1, j];
        this.array[j + 1] = this.array[j];
        this.swaps++;
        yield;

        j--;
        if (j >= 0) {
          this.comparingIndices = [j, i];
          this.comparisons++;
          yield;
        }
      }
      this.array[j + 1] = key;
      this.swappingIndices = [];
      for (let k = 0; k <= i; k++) {
        this.sortedIndices.add(k);
      }
    }
  }

  *quickSort(low, high) {
    if (low < high) {
      const pivotIndex = yield* this.partition(low, high);
      yield* this.quickSort(low, pivotIndex - 1);
      yield* this.quickSort(pivotIndex + 1, high);
    } else if (low >= 0 && low < this.array.length) {
      this.sortedIndices.add(low);
    }
  }

  *partition(low, high) {
    const pivot = this.array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      this.comparingIndices = [j, high];
      this.comparisons++;
      yield;

      if (this.array[j] < pivot) {
        i++;
        this.swappingIndices = [i, j];
        const temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
        this.swaps++;
        yield;
        this.swappingIndices = [];
      }
    }

    this.swappingIndices = [i + 1, high];
    const temp = this.array[i + 1];
    this.array[i + 1] = this.array[high];
    this.array[high] = temp;
    this.swaps++;
    yield;
    this.swappingIndices = [];

    this.sortedIndices.add(i + 1);
    return i + 1;
  }

  *mergeSort(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    yield* this.mergeSort(start, mid);
    yield* this.mergeSort(mid + 1, end);
    yield* this.merge(start, mid, end);
  }

  *merge(start, mid, end) {
    const left = this.array.slice(start, mid + 1);
    const right = this.array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      this.comparingIndices = [k, mid + 1 + j];
      this.comparisons++;
      yield;

      if (left[i] <= right[j]) {
        this.array[k] = left[i];
        i++;
      } else {
        this.array[k] = right[j];
        j++;
      }
      this.swaps++;
      this.swappingIndices = [k];
      yield;
      k++;
    }

    while (i < left.length) {
      this.array[k] = left[i];
      this.swaps++;
      this.swappingIndices = [k];
      yield;
      i++;
      k++;
    }

    while (j < right.length) {
      this.array[k] = right[j];
      this.swaps++;
      this.swappingIndices = [k];
      yield;
      j++;
      k++;
    }

    this.swappingIndices = [];
    if (start === 0 && end === this.array.length - 1) {
      for (let idx = 0; idx < this.array.length; idx++) {
        this.sortedIndices.add(idx);
      }
    }
  }

  // --- Rendering ---

  draw() {
    const w = this.logicalWidth;
    const h = this.logicalHeight;
    this.ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Canvas Background
    this.ctx.fillStyle = isDark ? '#090d16' : '#f8fafc';
    this.ctx.fillRect(0, 0, w, h);

    const n = this.array.length;
    const barWidth = (w - (n + 1) * 2) / n;

    for (let i = 0; i < n; i++) {
      const val = this.array[i];
      const barHeight = (val / 100) * (h - 40);
      const x = 2 + i * (barWidth + 2);
      const y = h - barHeight - 10;

      // Determine color
      if (this.swappingIndices.includes(i)) {
        this.ctx.fillStyle = '#ef4444'; // Red (swapping)
      } else if (this.comparingIndices.includes(i)) {
        this.ctx.fillStyle = '#f59e0b'; // Amber (comparing)
      } else if (this.sortedIndices.has(i)) {
        this.ctx.fillStyle = '#10b981'; // Green (sorted)
      } else {
        this.ctx.fillStyle = isDark ? '#3b82f6' : '#2563eb'; // Blue default
      }

      // Draw rounded top bar
      this.drawBar(x, y, barWidth, barHeight);
    }
  }

  drawBar(x, y, width, height) {
    const radius = Math.min(4, width / 2);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + height);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  new SortingVisualizer();
});
