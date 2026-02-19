import { URL_TEST6 } from "../../assets/js/config/constants.js";

// console.log(URL_TEST6);

(function guard() {
  const logged = localStorage.getItem('sessionLoggedIn') === '1';
  // if (!logged) {
  //     // ajusta el path según tu estructura
  //     window.location.href = '../../evaluaciones.html'; // o donde esté tu login/panel
  // }
})();

let currentPage = 0;
const questionsPerPage = 10;
let totalPages = 5;
let questionOrder = [];
let answers = {};
let currentResults = null;
let userFirstName = '';
let userLastName = '';
let userName = '';
let userEmail = '';

// Base de datos de preguntas organizada por dimensión
const questionDatabase = {
  extraversion: [
    { id: 1, text: 'Soy la vida de la fiesta', reverse: false },
    { id: 6, text: 'No hablo mucho', reverse: true },
    { id: 11, text: 'Me siento cómodo/a estando rodeado/a de gente', reverse: false },
    { id: 16, text: 'Me quedo en segundo plano', reverse: true },
    { id: 21, text: 'Inicio conversaciones', reverse: false },
    { id: 26, text: 'Tengo poco que decir', reverse: true },
    { id: 31, text: 'Hablo con muchas personas diferentes en las fiestas', reverse: false },
    { id: 36, text: 'No me gusta llamar la atención', reverse: true },
    { id: 41, text: 'Tomo el control', reverse: false },
    { id: 46, text: 'Soy callado/a cerca de extraños', reverse: true }
  ],
  agreeableness: [
    { id: 2, text: 'Siento poco interés por los demás', reverse: true },
    { id: 7, text: 'Me interesan los problemas de otras personas', reverse: false },
    { id: 12, text: 'Insulto a la gente', reverse: true },
    { id: 17, text: 'Simpatizo con los sentimientos de otros', reverse: false },
    { id: 22, text: 'No me interesan los problemas de otras personas', reverse: true },
    { id: 27, text: 'Tengo un corazón suave', reverse: false },
    { id: 32, text: 'No estoy realmente interesado/a en otros', reverse: true },
    { id: 37, text: 'Me tomo tiempo para otros', reverse: false },
    { id: 42, text: 'No estoy interesado/a en los problemas de otras personas', reverse: true },
    { id: 47, text: 'Hago sentir cómodos a los demás', reverse: false }
  ],
  conscientiousness: [
    { id: 3, text: 'Siempre estoy preparado/a', reverse: false },
    { id: 8, text: 'Dejo mis pertenencias por ahí tiradas', reverse: true },
    { id: 13, text: 'Presto atención a los detalles', reverse: false },
    { id: 18, text: 'Hago un lío de las cosas', reverse: true },
    { id: 23, text: 'Hago las cosas de acuerdo a un plan', reverse: false },
    { id: 28, text: 'A menudo olvido poner las cosas en su lugar', reverse: true },
    { id: 33, text: 'Me gusta el orden', reverse: false },
    { id: 38, text: 'Evado mis deberes', reverse: true },
    { id: 43, text: 'Sigo un horario', reverse: false },
    { id: 48, text: 'Hago las cosas a medias', reverse: true }
  ],
  neuroticism: [
    { id: 4, text: 'Me estreso fácilmente', reverse: false },
    { id: 9, text: 'Estoy relajado/a la mayor parte del tiempo', reverse: true },
    { id: 14, text: 'Me preocupo por las cosas', reverse: false },
    { id: 19, text: 'Rara vez me siento triste', reverse: true },
    { id: 24, text: 'Me irrito fácilmente', reverse: false },
    { id: 29, text: 'Me siento cómodo/a conmigo mismo/a', reverse: true },
    { id: 34, text: 'Cambio de humor frecuentemente', reverse: false },
    { id: 39, text: 'Tengo frecuentes cambios de humor', reverse: false },
    { id: 44, text: 'Me molesto fácilmente', reverse: false },
    { id: 49, text: 'Rara vez pierdo la calma', reverse: true }
  ],
  openness: [
    { id: 5, text: 'Tengo un vocabulario rico y extenso', reverse: false },
    { id: 10, text: 'Tengo dificultad para entender ideas abstractas', reverse: true },
    { id: 15, text: 'Tengo una imaginación vívida', reverse: false },
    { id: 20, text: 'No me interesan las ideas abstractas', reverse: true },
    { id: 25, text: 'Paso tiempo reflexionando sobre las cosas', reverse: false },
    { id: 30, text: 'Evito conversaciones filosóficas', reverse: true },
    { id: 35, text: 'No me interesan conceptos abstractos', reverse: true },
    { id: 40, text: 'No tengo buena imaginación', reverse: true },
    { id: 45, text: 'Tengo excelentes ideas', reverse: false },
    { id: 50, text: 'No soy una persona muy imaginativa', reverse: true }
  ]
};

const reverseItems = {
  extraversion: [6, 16, 26, 36, 46],
  agreeableness: [2, 12, 22, 32, 42],
  conscientiousness: [8, 18, 28, 38, 48],
  neuroticism: [9, 19, 29, 49],
  openness: [10, 20, 30, 35, 40, 50]
};

const allReverseItems = Object.values(reverseItems).flat();

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateRandomizedQuestions() {
  const dimensions = ['extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness'];
  const dimensionNames = {
    extraversion: 'Extraversión',
    agreeableness: 'Amabilidad',
    conscientiousness: 'Responsabilidad',
    neuroticism: 'Neuroticismo',
    openness: 'Apertura'
  };

  const shuffledDimensions = shuffleArray(dimensions);
  const randomizedQuestions = [];

  shuffledDimensions.forEach(dimension => {
    const shuffledQuestions = shuffleArray(questionDatabase[dimension]);
    shuffledQuestions.forEach(q => {
      randomizedQuestions.push({
        ...q,
        dimension: dimension,
        dimensionName: dimensionNames[dimension]
      });
    });
  });

  return randomizedQuestions;
}

function startTest() {
  // Capturar datos del usuario
  userFirstName = document.getElementById('userFirstName').value.trim();
  userLastName = document.getElementById('userLastName').value.trim();
  userEmail = document.getElementById('userEmail').value.trim();

  // Construir nombre completo para usar donde ya se usaba userName
  userName = `${userFirstName} ${userLastName}`.trim();

  // Validar que los campos no estén vacíos
  if (!userFirstName || !userLastName || !userEmail) {
    const formError = document.getElementById('formError');
    formError.textContent = '⚠️ Por favor completa todos los campos requeridos.';
    formError.classList.remove('hidden');
    return;
  }

  // Validar formato de email básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail)) {
    const formError = document.getElementById('formError');
    formError.textContent = '⚠️ Por favor ingresa un email válido.';
    formError.classList.remove('hidden');
    return;
  }

  // Ocultar mensaje de error si existía
  document.getElementById('formError').classList.add('hidden');

  // Iniciar el test
  questionOrder = generateRandomizedQuestions();
  currentPage = 0;
  answers = {};
  renderPage();

  document.getElementById('intro').classList.add('hidden');
  document.getElementById('test').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage() {
  const startIdx = currentPage * questionsPerPage;
  const endIdx = startIdx + questionsPerPage;
  const pageQuestions = questionOrder.slice(startIdx, endIdx);

  let html = '';
  pageQuestions.forEach((q, idx) => {
    const globalIdx = startIdx + idx;
    const reverseTag = q.reverse ? '<span class="reverse-indicator">INVERSO</span>' : '';
    const isAnswered = answers[q.id] !== undefined ? 'answered' : '';

    html += `
      <div class="question-block ${isAnswered}" data-question="${q.id}">
        <div class="question-number">Pregunta ${globalIdx + 1} - ${q.dimensionName}${reverseTag}</div>
        <div class="question-text">${q.text}</div>
        <div class="options">
          <div class="option">
            <input type="radio" name="q${q.id}" value="5" id="q${q.id}-1" ${answers[q.id] === 5 ? 'checked' : ''}>
            <label for="q${q.id}-1">Muy de acuerdo</label>
          </div>
          <div class="option">
            <input type="radio" name="q${q.id}" value="4" id="q${q.id}-2" ${answers[q.id] === 4 ? 'checked' : ''}>
            <label for="q${q.id}-2">De acuerdo</label>
          </div>
          <div class="option">
            <input type="radio" name="q${q.id}" value="3" id="q${q.id}-3" ${answers[q.id] === 3 ? 'checked' : ''}>
            <label for="q${q.id}-3">Neutral</label>
          </div>
          <div class="option">
            <input type="radio" name="q${q.id}" value="2" id="q${q.id}-4" ${answers[q.id] === 2 ? 'checked' : ''}>
            <label for="q${q.id}-4">En desacuerdo</label>
          </div>
          <div class="option">
            <input type="radio" name="q${q.id}" value="1" id="q${q.id}-5" ${answers[q.id] === 1 ? 'checked' : ''}>
            <label for="q${q.id}-5">Muy en desacuerdo</label>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById('testForm').innerHTML = html;

  // Event listeners para marcar como respondidas
  document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', function () {
      const qId = parseInt(this.name.replace('q', ''), 10);
      answers[qId] = parseInt(this.value, 10);

      const questionBlock = this.closest('.question-block');
      questionBlock.classList.add('answered');

      updateProgress();
    });
  });

  updateProgress();
  updateButtons();
}

function updateProgress() {
  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / 50) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
  document.getElementById('currentQ').textContent = totalAnswered;
  document.getElementById('currentPage').textContent = currentPage + 1;
}

function updateButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');

  prevBtn.classList.toggle('hidden', currentPage === 0);

  if (currentPage === totalPages - 1) {
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
  }
}

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function nextPage() {
  const startIdx = currentPage * questionsPerPage;
  const endIdx = startIdx + questionsPerPage;
  const pageQuestions = questionOrder.slice(startIdx, endIdx);

  const allAnswered = pageQuestions.every(q => answers[q.id] !== undefined);

  if (!allAnswered) {
    document.getElementById('validationMessage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  document.getElementById('validationMessage').classList.add('hidden');

  if (currentPage < totalPages - 1) {
    currentPage++;
    renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function submitTest() {
  if (Object.keys(answers).length < 50) {
    document.getElementById('validationMessage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  calculateResults();
}

function calculateResults() {
  const responses = {};

  questionOrder.forEach(q => {
    let value = answers[q.id];
    if (allReverseItems.includes(q.id)) {
      value = 6 - value;
    }
    responses[q.id] = value;
  });

  const extraversion = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46].reduce((sum, id) => sum + (responses[id] || 0), 0);
  const agreeableness = [2, 7, 12, 17, 22, 27, 32, 37, 42, 47].reduce((sum, id) => sum + (responses[id] || 0), 0);
  const conscientiousness = [3, 8, 13, 18, 23, 28, 33, 38, 43, 48].reduce((sum, id) => sum + (responses[id] || 0), 0);
  const neuroticism = [4, 9, 14, 19, 24, 29, 34, 39, 44, 49].reduce((sum, id) => sum + (responses[id] || 0), 0);
  const openness = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50].reduce((sum, id) => sum + (responses[id] || 0), 0);

  currentResults = { extraversion, agreeableness, conscientiousness, neuroticism, openness };

  displayResults(currentResults);
}

function getPercentile(score, dimension) {
  const norms = {
    extraversion: { 10: 20, 25: 26, 50: 33, 75: 40, 90: 45 },
    agreeableness: { 10: 28, 25: 33, 50: 38, 75: 43, 90: 47 },
    conscientiousness: { 10: 23, 25: 29, 50: 35, 75: 41, 90: 46 },
    neuroticism: { 10: 15, 25: 21, 50: 28, 75: 35, 90: 41 },
    openness: { 10: 28, 25: 33, 50: 38, 75: 42, 90: 46 }
  };

  const norm = norms[dimension];

  // Valores por debajo del percentil 10
  if (score <= norm[10]) return Math.max(5, Math.round((score / norm[10]) * 10));

  // Interpolar entre percentiles
  if (score <= norm[25]) {
    const ratio = (score - norm[10]) / (norm[25] - norm[10]);
    return Math.round(10 + ratio * 15);
  }
  if (score <= norm[50]) {
    const ratio = (score - norm[25]) / (norm[50] - norm[25]);
    return Math.round(25 + ratio * 25);
  }
  if (score <= norm[75]) {
    const ratio = (score - norm[50]) / (norm[75] - norm[50]);
    return Math.round(50 + ratio * 25);
  }
  if (score <= norm[90]) {
    const ratio = (score - norm[75]) / (norm[90] - norm[75]);
    return Math.round(75 + ratio * 15);
  }

  // Valores por encima del percentil 90
  return Math.min(99, Math.round(90 + ((score - norm[90]) / (50 - norm[90])) * 10));
}

function displayResults(scores) {
  const traits = [
    {
      name: 'Extraversión',
      dimension: 'extraversion',
      score: scores.extraversion,
      max: 50,
      alpha: 0.86,
      avgScore: 33,
      description: getExtraversionDescription(scores.extraversion)
    },
    {
      name: 'Amabilidad',
      dimension: 'agreeableness',
      score: scores.agreeableness,
      max: 50,
      alpha: 0.82,
      avgScore: 38,
      description: getAgreeablenessDescription(scores.agreeableness)
    },
    {
      name: 'Responsabilidad',
      dimension: 'conscientiousness',
      score: scores.conscientiousness,
      max: 50,
      alpha: 0.81,
      avgScore: 35,
      description: getConscientiousnessDescription(scores.conscientiousness)
    },
    {
      name: 'Neuroticismo',
      dimension: 'neuroticism',
      score: scores.neuroticism,
      max: 50,
      alpha: 0.86,
      avgScore: 28,
      description: getNeuroticismDescription(scores.neuroticism)
    },
    {
      name: 'Apertura',
      dimension: 'openness',
      score: scores.openness,
      max: 50,
      alpha: 0.84,
      avgScore: 38,
      description: getOpennessDescription(scores.openness)
    }
  ];

  const summaryHTML = `
    <h3>✨ Resumen de Tu Personalidad</h3>
    <p>
      Basándote en tus respuestas, tu perfil de personalidad muestra 
      <strong>${getHighestTrait(traits)}</strong> como tu característica más destacada, 
      seguida por <strong>${getSecondHighestTrait(traits)}</strong>. 
      Este patrón de rasgos es único y refleja tu forma particular de interactuar con el mundo.
    </p>
  `;
  document.getElementById('summarySection').innerHTML = summaryHTML;

  createRadarChart(traits);
  createComparisonBars(traits);

  let html = '';
  traits.forEach(trait => {
    const percentile = getPercentile(trait.score, trait.dimension);

    html += `
      <div class="result-trait">
        <div class="trait-name">
          ${trait.name}
          <span class="percentile-badge">Percentil ${percentile}</span>
        </div>
        <div class="trait-score">
          Puntuación: ${trait.score} de ${trait.max}
        </div>
        <div class="dimension-reliability">
          ✓ Confiabilidad: α = ${trait.alpha}
        </div>
        <div class="progress-bar-result">
          <div class="progress-fill-result" style="width: ${percentile}%">Percentil ${percentile}</div>
        </div>
        <div class="trait-description">${trait.description}</div>
        <div class="interpretation-box">
          <h4>💡 Interpretación</h4>
          ${getInterpretation(trait.dimension, trait.score)}
        </div>
      </div>
    `;
  });

  document.getElementById('resultsContent').innerHTML = html;
  document.getElementById('test').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');

  // Preparar respuestas numéricas en orden (Q1 a Q50) con valores originales (sin inversión)
  const originalAnswers = [];
  for (let i = 1; i <= 50; i++) {
    originalAnswers.push(answers[i] || 0);
  }

  const sessionUser = JSON.parse(localStorage.getItem('sessionUser')) || {};
  const permisoRaw = sessionUser.reenvioSimultaneo || 'NO';
  const emailAdmin = sessionUser.adminEmail || "escencialconsult@gmail.com";

  const userData = localStorage.getItem("sessionUser");
  let user;
  if (userData) {
    user = JSON.parse(userData);
    console.log("Usuario", user);
  }

  // Preparar datos para Google Sheets
  const dataForSheets = {
    fecha: new Date().toLocaleDateString('es-AR'),
    nombre: userFirstName,
    apellido: userLastName,
    email: userEmail,
    email_admin: emailAdmin,
    respuestas: originalAnswers
  };

  // Enviar datos a Google Sheets
  sendToGoogleSheets(dataForSheets);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función helper para generar URL de gráfico radar en QuickChart
function generateQuickChartRadarUrl(scores) {
  const data = [
    scores.extraversion,
    scores.agreeableness,
    scores.conscientiousness,
    scores.neuroticism,
    scores.openness
  ];

  const chartConfig = {
    type: 'radar',
    data: {
      labels: ['Extraversión', 'Amabilidad', 'Responsabilidad', 'Neuroticismo', 'Apertura'],
      datasets: [{
        label: 'Tu Perfil',
        data: data,
        backgroundColor: 'rgba(11, 74, 110, 0.2)',
        borderColor: 'rgb(11, 74, 110)',
        borderWidth: 2
      }]
    },
    options: {
      scale: {
        ticks: { beginAtZero: true, max: 50 }
      }
    }
  };

  return `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
}

// Función helper para generar URL de gráfico de barras en QuickChart
function generateQuickChartBarsUrl(scores, traits) {
  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['Extraversión', 'Amabilidad', 'Responsabilidad', 'Neuroticismo', 'Apertura'],
      datasets: [{
        label: 'Tu Puntuación',
        data: [
          scores.extraversion,
          scores.agreeableness,
          scores.conscientiousness,
          scores.neuroticism,
          scores.openness
        ],
        backgroundColor: 'rgba(11, 74, 110, 0.7)'
      }, {
        label: 'Promedio',
        data: traits.map(t => t.avgScore),
        backgroundColor: 'rgba(100, 116, 139, 0.5)'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: { beginAtZero: true, max: 50 }
        }]
      }
    }
  };

  return `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
}

function getHighestTrait(traits) {
  const sorted = [...traits].sort((a, b) => {
    const aPerc = getPercentile(a.score, a.dimension);
    const bPerc = getPercentile(b.score, b.dimension);
    return bPerc - aPerc;
  });
  return sorted[0].name;
}

function getSecondHighestTrait(traits) {
  const sorted = [...traits].sort((a, b) => {
    const aPerc = getPercentile(a.score, a.dimension);
    const bPerc = getPercentile(b.score, b.dimension);
    return bPerc - aPerc;
  });
  return sorted[1].name;
}

function createRadarChart(traits) {
  const canvas = document.getElementById('radarChart');
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 150;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
    ctx.stroke();
  }

  const dataPoints = [];

  traits.forEach((trait, index) => {
    const angle = (Math.PI * 2 * index) / traits.length - Math.PI / 2;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(angle) * radius,
      centerY + Math.sin(angle) * radius
    );
    ctx.stroke();

    const labelRadius = radius + 30;
    const labelX = centerX + Math.cos(angle) * labelRadius;
    const labelY = centerY + Math.sin(angle) * labelRadius;

    ctx.fillStyle = '#020f27';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(trait.name, labelX, labelY);

    const normalizedScore = (trait.score / trait.max) * radius;
    dataPoints.push({
      x: centerX + Math.cos(angle) * normalizedScore,
      y: centerY + Math.sin(angle) * normalizedScore
    });
  });

  ctx.beginPath();
  ctx.strokeStyle = '#0b4a6e';
  ctx.fillStyle = 'rgba(11, 74, 110, 0.2)';
  ctx.lineWidth = 3;

  dataPoints.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  dataPoints.forEach(point => {
    ctx.beginPath();
    ctx.fillStyle = '#0b4a6e';
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function createComparisonBars(traits) {
  let html = '';
  traits.forEach(trait => {
    const userPercentage = (trait.score / trait.max) * 100;
    const avgPercentage = (trait.avgScore / trait.max) * 100;

    html += `
      <div class="comparison-bar">
        <div class="comparison-bar-label">
          <span>${trait.name}</span>
          <span>Tú: ${trait.score} | Promedio: ${trait.avgScore}</span>
        </div>
        <div class="comparison-bar-bg">
          <div class="comparison-bar-user" style="width: ${userPercentage}%"></div>
          <div class="comparison-bar-avg" style="left: ${avgPercentage}%">
            <span class="avg-label">↓</span>
          </div>
        </div>
      </div>
    `;
  });
  document.getElementById('comparisonBars').innerHTML = html;
}

function getInterpretation(dimension, score) {
  const interpretations = {
    extraversion: {
      high: 'Las personas con alta extraversión suelen destacar en roles de liderazgo, ventas y trabajo en equipo. Tu energía social es un activo valioso.',
      medium: 'Tu balance entre extroversión e introversión te permite adaptarte a diferentes contextos sociales con flexibilidad.',
      average: 'Tu naturaleza ambivertida te permite funcionar tanto en situaciones sociales como en entornos más tranquilos. Tienes versatilidad social.',
      low: 'Tu naturaleza más introvertida es ideal para trabajos que requieren concentración profunda, análisis detallado y reflexión.'
    },
    agreeableness: {
      high: 'Tu alta amabilidad te hace excelente en roles de cuidado, mediación y construcción de relaciones. Las personas confían en ti naturalmente.',
      medium: 'Tu equilibrio entre cooperación y firmeza te permite trabajar bien en equipo mientras defiendes tus intereses cuando es necesario.',
      average: 'Balanceas pragmáticamente entre empatía y asertividad. Puedes adaptar tu estilo según la situación lo requiera.',
      low: 'Tu objetividad y franqueza son valiosas en negociaciones, toma de decisiones difíciles y situaciones que requieren pensamiento crítico.'
    },
    conscientiousness: {
      high: 'Tu alta responsabilidad te hace confiable y efectivo en proyectos complejos. Destacas en roles que requieren planificación y atención al detalle.',
      medium: 'Balanceas bien entre estructura y flexibilidad, lo que te permite ser organizado sin perder espontaneidad.',
      average: 'Puedes ser tanto organizado como flexible según las circunstancias. Te adaptas a diferentes niveles de estructura.',
      low: 'Tu flexibilidad y adaptabilidad son valiosas en entornos dinámicos que requieren pensamiento creativo y respuestas rápidas.'
    },
    neuroticism: {
      high: 'Tu sensibilidad emocional puede ser una fortaleza cuando se canaliza apropiadamente. Considera técnicas de mindfulness y gestión del estrés.',
      medium: 'Tu estabilidad emocional moderada te permite ser sensible a situaciones importantes sin ser abrumado por el estrés cotidiano.',
      average: 'Tienes un balance emocional típico. Puedes experimentar estrés pero también recuperarte adecuadamente.',
      low: 'Tu alta estabilidad emocional es un gran activo en situaciones de presión. Mantienes la calma y piensas claramente bajo estrés.'
    },
    openness: {
      high: 'Tu apertura mental te hace excelente en campos creativos, innovación y aprendizaje continuo. Buscas activamente nuevas experiencias.',
      medium: 'Balanceas bien entre apreciar lo nuevo y valorar lo familiar, lo que te da flexibilidad cognitiva sin perder estabilidad.',
      average: 'Puedes apreciar tanto lo novedoso como lo tradicional. Tienes flexibilidad en tu enfoque hacia nuevas ideas.',
      low: 'Tu preferencia por lo práctico y concreto es valiosa en campos que requieren aplicación consistente de métodos probados.'
    }
  };

  const percentile = getPercentile(score, dimension);
  let level = 'low';
  if (percentile >= 75) level = 'high';
  else if (percentile >= 50) level = 'medium';
  else if (percentile >= 40) level = 'average';

  return interpretations[dimension][level];
}

function getExtraversionDescription(score) {
  const percentile = getPercentile(score, 'extraversion');
  if (percentile >= 90) return 'Tu nivel de extraversión es <strong>muy alto</strong>. Eres extremadamente sociable, enérgico/a y te sientes muy cómodo/a en situaciones sociales. Disfrutas estar rodeado/a de gente y tiendes a ser muy expresivo/a y asertivo/a.';
  if (percentile >= 75) return 'Tu nivel de extraversión es <strong>alto</strong>. Eres sociable y enérgico/a. Te sientes cómodo/a en situaciones sociales y disfrutas de la interacción con otras personas.';
  if (percentile >= 50) return 'Tu nivel de extraversión es <strong>moderadamente alto</strong>. Disfrutas de la compañía de otros aunque también valoras momentos de tranquilidad. Te adaptas bien a diferentes situaciones sociales.';
  if (percentile >= 40) return 'Tu nivel de extraversión es <strong>promedio</strong>. Balanceas entre lo social y lo reservado. Puedes disfrutar de interacciones sociales pero también necesitas tiempo a solas para recargar energías.';
  if (percentile >= 25) return 'Tu nivel de extraversión es <strong>bajo</strong> (más introvertido/a). Tiendes a ser reservado/a y prefieres grupos pequeños. Necesitas tiempo a solas para recargar energías.';
  return 'Tu nivel de extraversión es <strong>muy bajo</strong> (muy introvertido/a). Prefieres claramente ambientes tranquilos y contacto social limitado. Te recargas con tiempo a solas y disfrutas de actividades solitarias.';
}

function getAgreeablenessDescription(score) {
  const percentile = getPercentile(score, 'agreeableness');
  if (percentile >= 90) return 'Tu nivel de amabilidad es <strong>muy alto</strong>. Eres extremadamente empático/a, cooperativo/a y considerado/a con los demás. Priorizas fuertemente la armonía en las relaciones.';
  if (percentile >= 75) return 'Tu nivel de amabilidad es <strong>alto</strong>. Eres muy compasivo/a y cooperativo/a. Te importa mucho el bienestar de otros y construyes relaciones armoniosas.';
  if (percentile >= 50) return 'Tu nivel de amabilidad es <strong>moderadamente alto</strong>. Eres compasivo/a y trabajas bien en equipo, aunque también puedes ser firme cuando es necesario.';
  if (percentile >= 40) return 'Tu nivel de amabilidad es <strong>promedio</strong>. Balanceas entre ser empático/a y proteger tus propios intereses. Puedes ser cooperativo/a pero también directo/a cuando la situación lo requiere.';
  if (percentile >= 25) return 'Tu nivel de amabilidad es <strong>bajo</strong>. Tiendes a priorizar la objetividad sobre la empatía. Eres directo/a en tus opiniones y selectivo/a al confiar.';
  return 'Tu nivel de amabilidad es <strong>muy bajo</strong>. Eres muy directo/a y escéptico/a. Priorizas claramente tus intereses y valoras la franqueza sobre la armonía social.';
}

function getConscientiousnessDescription(score) {
  const percentile = getPercentile(score, 'conscientiousness');
  if (percentile >= 90) return 'Tu nivel de responsabilidad es <strong>muy alto</strong>. Eres extremadamente organizado/a, disciplinado/a y orientado/a a objetivos. Prestas atención meticulosa a los detalles.';
  if (percentile >= 75) return 'Tu nivel de responsabilidad es <strong>alto</strong>. Eres muy organizado/a y trabajador/a. Planificas con anticipación y cumples consistentemente con tus compromisos.';
  if (percentile >= 50) return 'Tu nivel de responsabilidad es <strong>moderadamente alto</strong>. Eres organizado/a y cumples con tus responsabilidades de manera generalmente confiable.';
  if (percentile >= 40) return 'Tu nivel de responsabilidad es <strong>promedio</strong>. Balanceas entre organización y espontaneidad. Puedes planificar cuando es necesario pero también disfrutas de flexibilidad.';
  if (percentile >= 25) return 'Tu nivel de responsabilidad es <strong>bajo</strong>. Tiendes a ser más espontáneo/a que planificador/a. Prefieres flexibilidad y puedes procrastinar ocasionalmente.';
  return 'Tu nivel de responsabilidad es <strong>muy bajo</strong>. Prefieres claramente la espontaneidad sobre la planificación. Eres muy flexible aunque esto puede afectar el cumplimiento de plazos.';
}

function getNeuroticismDescription(score) {
  const percentile = getPercentile(score, 'neuroticism');
  if (percentile >= 90) return 'Tu nivel de neuroticismo es <strong>muy alto</strong> (estabilidad emocional muy baja). Experimentas emociones muy intensamente y eres muy sensible al estrés. Es importante desarrollar estrategias de manejo emocional.';
  if (percentile >= 75) return 'Tu nivel de neuroticismo es <strong>alto</strong> (estabilidad emocional baja). Tiendes a experimentar preocupación y ansiedad con frecuencia. Te beneficiarías de técnicas de gestión del estrés.';
  if (percentile >= 50) return 'Tu nivel de neuroticismo es <strong>moderadamente alto</strong>. Experimentas preocupación ocasional pero generalmente manejas el estrés de forma adecuada.';
  if (percentile >= 40) return 'Tu nivel de neuroticismo es <strong>promedio</strong> (estabilidad emocional moderada). Tienes un equilibrio razonable en tu respuesta emocional. Manejas el estrés relativamente bien.';
  if (percentile >= 25) return 'Tu nivel de neuroticismo es <strong>bajo</strong> (estabilidad emocional alta). Eres calmado/a y resiliente. Manejas bien el estrés y te recuperas rápidamente de contratiempos.';
  return 'Tu nivel de neuroticismo es <strong>muy bajo</strong> (estabilidad emocional muy alta). Eres extremadamente calmado/a y emocionalmente estable. Mantienes la compostura incluso en situaciones muy difíciles.';
}

function getOpennessDescription(score) {
  const percentile = getPercentile(score, 'openness');
  if (percentile >= 90) return 'Tu nivel de apertura es <strong>muy alto</strong>. Eres extremadamente curioso/a, creativo/a y abierto/a a nuevas experiencias. Buscas activamente lo novedoso y lo intelectual.';
  if (percentile >= 75) return 'Tu nivel de apertura es <strong>alto</strong>. Eres muy curioso/a e imaginativo/a. Disfrutas explorando ideas abstractas y valoras la creatividad y diversidad de perspectivas.';
  if (percentile >= 50) return 'Tu nivel de apertura es <strong>moderadamente alto</strong>. Disfrutas de nuevas experiencias y eres imaginativo/a, aunque también valoras cierta estabilidad.';
  if (percentile >= 40) return 'Tu nivel de apertura es <strong>promedio</strong>. Balanceas entre lo familiar y lo nuevo. Puedes disfrutar de nuevas experiencias ocasionalmente pero también valoras la estabilidad.';
  if (percentile >= 25) return 'Tu nivel de apertura es <strong>bajo</strong>. Prefieres lo familiar y práctico sobre lo abstracto. Valoras la tradición y las rutinas establecidas.';
  return 'Tu nivel de apertura es <strong>muy bajo</strong>. Prefieres claramente lo convencional y lo concreto. Valoras fuertemente las tradiciones y te sientes más cómodo/a con lo familiar.';
}

async function sendToGoogleSheets(data) {
    URL_TEST6
//   const scriptUrl = 'https://script.google.com/macros/s/AKfycbwphfOTu06OzmVud3Sh3MzFzSK8CDapEI6yo8pgfyDuNNDzumSUhwBrAoEpYrRvsWXa/exec';
     const scriptUrl = URL_TEST6;

  const respuestasCSV = Array.isArray(data.respuestas)
    ? data.respuestas.join(',')
    : String(data.respuestas || '');

  const payload = {
    nombreHoja: 'RespuestasBigFive',
    fila: [
      new Date().toLocaleString('es-AR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }),
      data.nombre || '',
      data.apellido || '',
      data.email || '',
      data.email_admin || '',
      respuestasCSV
    ]
  };

  try {
    await fetch(scriptUrl, {
      method: 'POST',
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    return true;
  } catch (err) {
    console.error('❌ Error POST:', err);
    return false;
  }
}

function exportResults() {
  window.print();
}

function restartTest() {
  currentPage = 0;
  answers = {};
  questionOrder = [];

  document.getElementById('results').classList.add('hidden');
  document.getElementById('intro').classList.remove('hidden');
  document.getElementById('validationMessage').classList.add('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * IMPORTANTE:
 * Como tu HTML usa onclick="startTest()", onclick="nextPage()", etc,
 * estas funciones deben quedar en el scope global.
 * En algunos setups (type="module") no sería así, pero acá NO es módulo.
 */
window.startTest = startTest;
window.nextPage = nextPage;
window.previousPage = previousPage;
window.submitTest = submitTest;
window.exportResults = exportResults;
window.restartTest = restartTest;
