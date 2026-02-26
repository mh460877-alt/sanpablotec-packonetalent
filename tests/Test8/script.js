import { URL_TEST8 } from '../../assets/js/config/constants.js';

// ========== DATOS: 180 ÍTEMS (15 campos x 12) ==========
const ITEMS_IPPR = [
  // Campo 1 - Ciencias Naturales
  { id: 1, campo: 1, campoNombre: "Campo 1 — Ciencias Naturales", text: "Estudiar los seres vivos y realizar trabajos en campo como la botánica, la zoología o la genética." },
  { id: 2, campo: 1, text: "Ser astrónomo." },
  { id: 3, campo: 1, text: "Trabajar en centros de cultivo de especies acuáticas, vegetales o animales." },
  { id: 4, campo: 1, text: "Ser geólogo." },
  { id: 5, campo: 1, text: "Ser licenciado en ciencias del mar." },
  { id: 6, campo: 1, text: "Estudiar los fenómenos del firmamento y aplicar estos conocimientos a la navegación o a la utilización del espacio." },
  { id: 7, campo: 1, text: "Investigar las propiedades de la materia para los productos de medicina, agricultura y otras." },
  { id: 8, campo: 1, text: "Ser químico." },
  { id: 9, campo: 1, text: "Ser biólogo." },
  { id: 10, campo: 1, text: "Estudiar la tierra y sus componentes." },
  { id: 11, campo: 1, text: "Trabajar como ingeniero ambiental." },
  { id: 12, campo: 1, text: "Dedicarse a la conservación de recursos naturales." },

  // Campo 2 - Construcción e Ingeniería
  { id: 13, campo: 2, campoNombre: "Campo 2 — Construcción e Ingeniería", text: "Proyectar edificios y supervisar la construcción de los mismos." },
  { id: 14, campo: 2, text: "Dirigir la realización material en las obras de construcción de edificios y controlar los materiales empleados." },
  { id: 15, campo: 2, text: "Ser controlador aéreo." },
  { id: 16, campo: 2, text: "Desarrollar proyectos y trabajos de electrónica aplicados a la industria." },
  { id: 17, campo: 2, text: "Diseñar instalaciones relacionadas con las comunicaciones (telefonía, radio, etc.)." },
  { id: 18, campo: 2, text: "Realizar proyectos para la construcción de puentes, carreteras y aeropuertos." },
  { id: 19, campo: 2, text: "Ser ingeniero de telecomunicación." },
  { id: 20, campo: 2, text: "Ser ingeniero de caminos." },
  { id: 21, campo: 2, text: "Ser arquitecto." },
  { id: 22, campo: 2, text: "Ser experto en edificación y construcción civil." },
  { id: 23, campo: 2, text: "Realizar tareas relacionadas de seguridad del tráfico aéreo." },
  { id: 24, campo: 2, text: "Ser ingeniero en electrónica." },

  // Campo 3 - Ciencias de la Salud
  { id: 25, campo: 3, campoNombre: "Campo 3 — Ciencias de la Salud", text: "Asesorar y tratar a personas con problemas de alimentación." },
  { id: 26, campo: 3, text: "Ser dietista." },
  { id: 27, campo: 3, text: "Curar algunas enfermedades del aparato locomotor o del sistema nervioso mediante técnicas y medios naturales." },
  { id: 28, campo: 3, text: "Aplicar conocimientos científicos trabajando en laboratorios donde se preparan medicamentos." },
  { id: 29, campo: 3, text: "Trabajar como fisioterapeuta." },
  { id: 30, campo: 3, text: "Ser enfermero/a." },
  { id: 31, campo: 3, text: "Ser farmacéutico." },
  { id: 32, campo: 3, text: "Aplicar los conocimientos de la anatomía, las funciones y el comportamiento de las personas sanas para establecer el diagnóstico y el tratamiento." },
  { id: 33, campo: 3, text: "Aplicar los conocimientos de medicina a tratamientos de enfermedades mentales." },
  { id: 34, campo: 3, text: "Ser odontólogo." },
  { id: 35, campo: 3, text: "Colaborar con el médico en el cuidado de los enfermos." },
  { id: 36, campo: 3, text: "Ser médico." },

  // Campo 4 - Ciencias Sociales y Humanidades
  { id: 37, campo: 4, campoNombre: "Campo 4 — Ciencias Sociales y Humanidades", text: "Analizar e investigar la actuación del hombre en su aspecto social y evolutivo a lo largo del tiempo." },
  { id: 38, campo: 4, text: "Ejercer la profesión de historiador." },
  { id: 39, campo: 4, text: "Estudiar la sociedad, los grupos humanos y sus realizaciones aplicando estos conocimientos en análisis sociológicos." },
  { id: 40, campo: 4, text: "Investigar los fundamentos de la religión católica, analizar textos escritos, restos arqueológicos y tradiciones." },
  { id: 41, campo: 4, text: "Ejercer la profesión del trabajador social." },
  { id: 42, campo: 4, text: "Colaborar con personas o familias para solucionar problemas de tipo social o personal." },
  { id: 43, campo: 4, text: "Ejercer la profesión de filólogo." },
  { id: 44, campo: 4, text: "Interpretar y traducir textos aplicando los conocimientos lingüísticos, teóricos y prácticos." },
  { id: 45, campo: 4, text: "Ser teólogo." },
  { id: 46, campo: 4, text: "Aplicar los conocimientos sobre las distintas manifestaciones artísticas." },
  { id: 47, campo: 4, text: "Ejercer la profesión de especialista en arte." },
  { id: 48, campo: 4, text: "Ejercer la profesión de sociólogo." },

  // Campo 5 - Derecho y Criminología
  { id: 49, campo: 5, campoNombre: "Campo 5 — Derecho y Criminología", text: "Ser criminólogo." },
  { id: 50, campo: 5, text: "Intervenir ante los tribunales de justicia en nombre de la ley, representando a una persona o al estado." },
  { id: 51, campo: 5, text: "Trabajar como licenciado en ciencias del trabajo." },
  { id: 52, campo: 5, text: "Ser abogado." },
  { id: 53, campo: 5, text: "Ser diplomático (embajador)." },
  { id: 54, campo: 5, text: "Representar al propio país en otros países." },
  { id: 55, campo: 5, text: "Hacer averiguaciones e informar a jueces y policías sobre aspectos relacionados con comportamientos delictivos." },
  { id: 56, campo: 5, text: "Representar a empresas o trabajadores ante los tribunales de lo social." },
  { id: 57, campo: 5, text: "Aplicar conocimientos profesionales para resolver problemas relacionados con los trabajadores de una empresa." },
  { id: 58, campo: 5, text: "Trabajar como diplomado en relaciones laborales." },
  { id: 59, campo: 5, text: "Trabajar asesorando a las fuerzas de seguridad en temas referentes a comportamientos criminales." },
  { id: 60, campo: 5, text: "Trabajar como investigador privado." },

  // Campo 6 - Comunicación y Medios
  { id: 61, campo: 6, campoNombre: "Campo 6 — Comunicación y Medios", text: "Trabajar como publicista." },
  { id: 62, campo: 6, text: "Buscar y redactar noticias para publicarlas en la prensa escrita o difundirlas para radio u otros medios." },
  { id: 63, campo: 6, text: "Trabajar como licenciado en comunicación audiovisual." },
  { id: 64, campo: 6, text: "Trabajar como técnico de sonido." },
  { id: 65, campo: 6, text: "Elaborar la información para presentarla en los medios de comunicación audiovisual." },
  { id: 66, campo: 6, text: "Diseñar campañas publicitarias para dar a conocer un producto y lograr su aceptación o para difundir mensajes." },
  { id: 67, campo: 6, text: "Obtener imágenes por medio de fotografía, video y presentarlas en cualquier soporte." },
  { id: 68, campo: 6, text: "Ser técnico en imagen." },
  { id: 69, campo: 6, text: "Ser periodista." },
  { id: 70, campo: 6, text: "Estudiar los procesos y técnicas de los medios audiovisuales y los elementos que intervienen en ella." },
  { id: 71, campo: 6, text: "Ser director realizador de medios audiovisuales." },
  { id: 72, campo: 6, text: "Aplicar los conocimientos profesionales para registrar y reproducir en producciones de diversos tipos." },

  // Campo 7 - Educación y Psicología
  { id: 73, campo: 7, campoNombre: "Campo 7 — Educación y Psicología", text: "Trabajar en la educación de adultos utilizando recursos didácticos." },
  { id: 74, campo: 7, text: "Enseñar a alumnos con necesidades especiales." },
  { id: 75, campo: 7, text: "Cooperar en la educación de niños de 0 a 3 años contribuyendo a la mejora de sus hábitos de alimentación." },
  { id: 76, campo: 7, text: "Trabajar como pedagogo." },
  { id: 77, campo: 7, text: "Aplicar pruebas psicológicas para evaluar la inteligencia, aptitudes y personalidad de los alumnos." },
  { id: 78, campo: 7, text: "Trabajar como maestro en educación especial." },
  { id: 79, campo: 7, text: "Trabajar como educador social." },
  { id: 80, campo: 7, text: "Trabajar como psicólogo escolar." },
  { id: 81, campo: 7, text: "Trabajar como educador infantil." },
  { id: 82, campo: 7, text: "Analizar las técnicas y métodos de enseñanza para dirigir y organizar centros educativos." },
  { id: 83, campo: 7, text: "Impartir las enseñanzas de educación física." },
  { id: 84, campo: 7, text: "Enseñar técnicas a niños de educación primaria." },

  // Campo 8 - Economía y Empresa
  { id: 85, campo: 8, campoNombre: "Campo 8 — Economía y Empresa", text: "Ser gestor administrativo." },
  { id: 86, campo: 8, text: "Ser administrador de fincas." },
  { id: 87, campo: 8, text: "Ser economista." },
  { id: 88, campo: 8, text: "Realizar trámites para empresas." },
  { id: 89, campo: 8, text: "Trabajar como licenciado en ciencias contables y financieras." },
  { id: 90, campo: 8, text: "Comprar, vender o alquilar pisos o solares." },
  { id: 91, campo: 8, text: "Ser agente de la propiedad inmobiliaria (compra venta de casas, departamentos, etc.)." },
  { id: 92, campo: 8, text: "Realizar los planes establecidos para la comercialización de productos." },
  { id: 93, campo: 8, text: "Ser especialista en gestión comercial y marketing." },
  { id: 94, campo: 8, text: "Aplicar los conocimientos técnicos al campo de los seguros." },
  { id: 95, campo: 8, text: "Aplicar los conocimientos de economía para resolver problemas prácticos en empresas." },
  { id: 96, campo: 8, text: "Establecer comunidades de propietarios participando en la elaboración de sus estatutos." },

  // Campo 9 - Informática y Tecnología
  { id: 97, campo: 9, campoNombre: "Campo 9 — Informática y Tecnología", text: "Realizar tareas de especialistas en diversos campos de la informática." },
  { id: 98, campo: 9, text: "Ser ingeniero en informática." },
  { id: 99, campo: 9, text: "Aplicar los conocimientos informáticos sobre sistemas operativos y tecnología de la información." },
  { id: 100, campo: 9, text: "Ser ingeniero técnico en informática de gestión." },
  { id: 101, campo: 9, text: "Trabajar como administrador de sistemas informáticos." },
  { id: 102, campo: 9, text: "Realizar trabajos de informática aplicada a las comunicaciones." },
  { id: 103, campo: 9, text: "Ser especialista en telemática." },
  { id: 104, campo: 9, text: "Trabajar en el desarrollo de aplicaciones informáticas." },
  { id: 105, campo: 9, text: "Participar en el diseño de aplicaciones informáticas realizando la aplicación de las mismas." },
  { id: 106, campo: 9, text: "Establecer y manejar los sistemas informáticos." },
  { id: 107, campo: 9, text: "Trabajar como especialista en multimedia." },
  { id: 108, campo: 9, text: "Aplicar conocimientos de informática, electrónica y telecomunicaciones para el tratamiento gráfico de datos." },

  // Campo 10 - Agronomía y Veterinaria
  { id: 109, campo: 10, campoNombre: "Campo 10 — Agronomía y Veterinaria", text: "Ser ingeniero forestal." },
  { id: 110, campo: 10, text: "Organizar explotaciones agrícolas o agropecuarias." },
  { id: 111, campo: 10, text: "Trabajar en explotaciones ganaderas." },
  { id: 112, campo: 10, text: "Ser veterinario." },
  { id: 113, campo: 10, text: "Trabajar como técnico en explotaciones ganaderas." },
  { id: 114, campo: 10, text: "Potenciar los espacios naturales para la conservación de bosques." },
  { id: 115, campo: 10, text: "Dirigir fincas para aumentar la productividad de granjas." },
  { id: 116, campo: 10, text: "Ser ingeniero agrícola." },
  { id: 117, campo: 10, text: "Realizar tareas de vigilancia y protección del medio ambiente en bosques, jardines o parques." },
  { id: 118, campo: 10, text: "Trabajar como ingeniero agrónomo." },
  { id: 119, campo: 10, text: "Prevenir, diagnosticar y tratar las enfermedades que padezcan los animales." },
  { id: 120, campo: 10, text: "Trabajar como técnico en trabajos forestales y conservación de medio ambiente." },

  // Campo 11 - Artes Plásticas y Diseño
  { id: 121, campo: 11, campoNombre: "Campo 11 — Artes Plásticas y Diseño", text: "Ser dibujante, ilustrador de publicaciones." },
  { id: 122, campo: 11, text: "Trabajar como diseñador de interiores." },
  { id: 123, campo: 11, text: "Trabajar como técnico en artes plásticas y diseño." },
  { id: 124, campo: 11, text: "Diseñar y elaborar productos relacionados con la moda." },
  { id: 125, campo: 11, text: "Ser ceramista." },
  { id: 126, campo: 11, text: "Ser diseñador especialista en moda." },
  { id: 127, campo: 11, text: "Crear piezas de cerámica e investigar técnicas con respecto a este trabajo." },
  { id: 128, campo: 11, text: "Crear diseños para la mejora de espacios interiores." },
  { id: 129, campo: 11, text: "Dibujar o diseñar elementos para la decoración de cerámica." },
  { id: 130, campo: 11, text: "Conservar y restaurar bienes culturales." },
  { id: 131, campo: 11, text: "Trabajar como restaurador de bienes naturales." },
  { id: 132, campo: 11, text: "Emplear técnicas de ilustración gráfica para realizar ilustraciones en libros." },

  // Campo 12 - Música, Danza y Teatro
  { id: 133, campo: 12, campoNombre: "Campo 12 — Música, Danza y Teatro", text: "Formar parte de una orquesta o actuar como solista." },
  { id: 134, campo: 12, text: "Dar recitales o conciertos interpretando canciones clásicas o modernas." },
  { id: 135, campo: 12, text: "Ser músico o instrumentista." },
  { id: 136, campo: 12, text: "Ser musicólogo." },
  { id: 137, campo: 12, text: "Ser cantante." },
  { id: 138, campo: 12, text: "Bailar en representaciones públicas." },
  { id: 139, campo: 12, text: "Ser bailarín." },
  { id: 140, campo: 12, text: "Investigar y analizar la historia de la música." },
  { id: 141, campo: 12, text: "Ser actor profesional." },
  { id: 142, campo: 12, text: "Actuar en representaciones teatrales interpretando a un personaje." },
  { id: 143, campo: 12, text: "Doblar las voces de actores extranjeros para películas de cine o televisión." },
  { id: 144, campo: 12, text: "Ser actor de doblaje." },

  // Campo 13 - Seguridad y Fuerzas Armadas
  { id: 145, campo: 13, campoNombre: "Campo 13 — Seguridad y Fuerzas Armadas", text: "Apagar incendios o prevenirlos." },
  { id: 146, campo: 13, text: "Rescatar a personas que se encuentren en situaciones problemáticas en el mar." },
  { id: 147, campo: 13, text: "Realizar las tareas necesarias para garantizar la seguridad de los ciudadanos." },
  { id: 148, campo: 13, text: "Realizar trabajos técnicos, científicos o de mando relacionados con los fines del ejército." },
  { id: 149, campo: 13, text: "Ser bombero." },
  { id: 150, campo: 13, text: "Realizar en el ejército trabajos de especialista en mecánica, electricidad, etc." },
  { id: 151, campo: 13, text: "Trabajar como vigilante." },
  { id: 152, campo: 13, text: "Ser oficial de carrera del ejército." },
  { id: 153, campo: 13, text: "Trabajar como técnico en salvamento acuático." },
  { id: 154, campo: 13, text: "Ser policía." },
  { id: 155, campo: 13, text: "Custodiar establecimientos u oficinas para evitar robos u otros hechos delictivos." },
  { id: 156, campo: 13, text: "Ser especialista del ejército." },

  // Campo 14 - Actividad Física y Deporte
  { id: 157, campo: 14, campoNombre: "Campo 14 — Actividad Física y Deporte", text: "Trabajar como animador de actividades físicas y deportivas." },
  { id: 158, campo: 14, text: "Trabajar como conductor de actividades deportivas en el medio natural." },
  { id: 159, campo: 14, text: "Trabajar como licenciado en ciencias de la actividad física." },
  { id: 160, campo: 14, text: "Organizar actividades físicas o deportivas." },
  { id: 161, campo: 14, text: "Trabajar como maestro especialista en educación física." },
  { id: 162, campo: 14, text: "Ser técnico deportivo." },
  { id: 163, campo: 14, text: "Entrenar a deportistas o equipos para perfeccionar sus conocimientos y aptitudes." },
  { id: 164, campo: 14, text: "Asesorar sobre aspectos de la actividad física y el deporte en centros escolares." },
  { id: 165, campo: 14, text: "Enseñar a realizar un deporte determinado." },
  { id: 166, campo: 14, text: "Ser entrenador deportivo." },
  { id: 167, campo: 14, text: "Utilizar los conocimientos sobre masaje y anatomía humana para ayudar a los deportistas a recuperarse de lesiones." },
  { id: 168, campo: 14, text: "Trabajar como masajista deportivo." },

  // Campo 15 - Turismo y Hostelería
  { id: 169, campo: 15, campoNombre: "Campo 15 — Turismo y Hostelería", text: "Trabajar como técnico en animación turística." },
  { id: 170, campo: 15, text: "Trabajar como técnico en turismo." },
  { id: 171, campo: 15, text: "Trabajar como técnico en información turística." },
  { id: 172, campo: 15, text: "Trabajar como técnico superior en alojamiento." },
  { id: 173, campo: 15, text: "Establecer destinos turísticos, atender y guiar a grupos de visitantes." },
  { id: 174, campo: 15, text: "Dirigir o administrar restaurantes; crear productos gastronómicos para ofrecerlos a los clientes." },
  { id: 175, campo: 15, text: "Trabajar como tripulante de cabina de pasajeros o auxiliar de barco." },
  { id: 176, campo: 15, text: "Organizar todo lo necesario para recibir a los clientes del hotel." },
  { id: 177, campo: 15, text: "Dirigir a personas o grupos en recorridos por sendero o zonas de montaña." },
  { id: 178, campo: 15, text: "Procurar la mejora del turismo incluyendo actividades culturales." },
  { id: 179, campo: 15, text: "Atender a los pasajeros en vuelos de líneas aéreas o barcos o cruceros." },
  { id: 180, campo: 15, text: "Idear, preparar y dirigir programas de animación cultural." }
];

const TOTAL = 180;
const WEB_APP_URL = URL_TEST8;

// ========== ESTADO ==========
let user = {};
let answers = {};
let timeStart = 0, timeEnd = 0;
let timerInterval, elapsedSeconds = 0;

// ========== HELPERS DOM ==========
const $ = (id) => document.getElementById(id);

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ========== FLUJO ==========
function goToInstructions() {
  const n = $('userName').value.trim();
  const l = $('userLast').value.trim();
  const e = $('userEmail').value.trim();

  if (!n || !l || !e) return alert("Complete todos los campos");

  user = { name: n, lastname: l, email: e };
  showSection('instSection');
}

function startTest() {
  timeStart = Date.now();
  renderQuestions();
  showSection('testSection');
  $('timerDisplay').style.display = 'block';
  elapsedSeconds = 0;
  startTimer();
}

function renderQuestions() {
  const container = $('questionsContainer');
  container.innerHTML = '';

  ITEMS_IPPR.forEach(q => {
    if (q.campoNombre) {
      const header = document.createElement('div');
      header.className = 'campo-header';
      header.textContent = q.campoNombre;
      container.appendChild(header);
    }

    const div = document.createElement('div');
    div.className = 'question-item';
    div.id = 'q-' + q.id;

    const numInCampo = ((q.id - 1) % 12) + 1;

    div.innerHTML = `
      <span class="q-number">${numInCampo}</span>
      <span class="q-text">${q.text}</span>
      <div class="options-ippr" data-qid="${q.id}">
        <button class="opt-btn-ippr" data-val="0" title="No Conozco">NC</button>
        <button class="opt-btn-ippr" data-val="1" title="Desagrado">D</button>
        <button class="opt-btn-ippr" data-val="2" title="Indiferencia">I</button>
        <button class="opt-btn-ippr" data-val="3" title="Agrado">A</button>
      </div>
    `;
    container.appendChild(div);
  });

  // Delegación de eventos para no usar onclick inline
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('button.opt-btn-ippr');
    if (!btn) return;

    const wrap = btn.closest('.options-ippr');
    const qId = Number(wrap.dataset.qid);
    const val = Number(btn.dataset.val);

    selectAnswer(qId, val, btn);
  });
}

function selectAnswer(qId, val, btnElem) {
  answers[qId] = val;

  const parent = btnElem.parentElement;
  Array.from(parent.children).forEach(child => {
    child.classList.remove('selected-0', 'selected-1', 'selected-2', 'selected-3');
  });
  btnElem.classList.add('selected-' + val);

  $('q-' + qId).classList.add('answered');
  updateProgress();
}

function updateProgress() {
  const answered = Object.keys(answers).length;
  const percent = Math.round((answered / TOTAL) * 100);

  $('progressBar').style.width = percent + '%';
  $('progressCount').innerText = answered;
  $('progressPercent').innerText = percent + '%';
}

function finishTest() {
  const answered = Object.keys(answers).length;

  if (answered < TOTAL) {
    if (!confirm(`Ha respondido ${answered} de ${TOTAL} preguntas.\n\n¿Desea finalizar de todos modos?`)) return;
  }

  clearInterval(timerInterval);
  timeEnd = Date.now();
  $('timerDisplay').style.display = 'none';
  showSection('finalSection');
  sendResults();
}

// ========== ENVIAR RESULTADOS ==========
async function sendResults() {
  const tiempoUsado = formatTimeUsed(timeStart, timeEnd);
  const respuestasFormateadas = formatAnswers(answers);
  const respuestasFinal = `{${tiempoUsado} - ${respuestasFormateadas}}`;

  const now = new Date();
  const fechaHora = now.toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
  
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser')) || {};
  let permisoRaw = sessionUser.reenvioSimultaneo || 'NO';

  // OBTENER EMAILS
  const emailAdmin = sessionUser.adminEmail || "escencialconsult@gmail.com";

  const filaOrdenada = [
    user.name || "SinNombre",
    user.lastname || "SinApellido",
    permisoRaw == "SI" ? user.email : "",
    emailAdmin || "",
    fechaHora,
    respuestasFinal
  ];

  const payload = {
    nombreHoja: "Respuestas",
    fila: filaOrdenada
  };

  try {
    await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    $('loadingMsg').innerText = "¡Datos guardados correctamente!";
    $('loadingMsg').style.color = "#059669";
  } catch (error) {
    console.error("Error:", error);
    $('loadingMsg').innerText = "⚠️ Error de conexión, avise al administrador.";
    $('loadingMsg').style.color = "orange";
  }
}

// ========== UTILIDADES ==========
function formatTimeUsed(start, end) {
  if (!start || !end) return "0m 0s";
  const total = Math.floor((end - start) / 1000);
  return `${Math.floor(total / 60)}m ${total % 60}s`;
}

function formatAnswers(obj) {
  const sorted = Object.keys(obj).map(Number).sort((a, b) => a - b);
  return sorted.map(id => `${id};${obj[id]}`).join(', ') || "Sin respuestas";
}

// ========== TIMER ==========
function startTimer() {
  updateTimer();
  timerInterval = setInterval(() => { elapsedSeconds++; updateTimer(); }, 1000);
}
function updateTimer() {
  const m = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
  const s = (elapsedSeconds % 60).toString().padStart(2, '0');
  $('timerDisplay').innerText = `${m}:${s}`;
}

// ========== INIT ==========
function init() {
  $('btnContinuar').addEventListener('click', goToInstructions);
  $('btnComenzar').addEventListener('click', startTest);
  $('finishBtn').addEventListener('click', finishTest);
}

document.addEventListener('DOMContentLoaded', init);