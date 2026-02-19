import { URL_TEST2 } from "../../assets/js/config/constants.js";
    // ================== DATOS DEL TEST ==================

    // Tríadas del Test de Kuder (168 tríadas = 504 actividades)
    const triads = [
      // Tríada 1-10
      { activities: ["Visitar un museo", "Navegar por internet", "Coleccionar autógrafos"], keys: [5, 2, 6] },
      { activities: ["Pertenecer a un club social", "Pertenecer a un club literario", "Pertenecer a un club de aficionados a la astronomía"], keys: [8, 6, 3] },
      { activities: ["Asistir a una reunión de servicio social", "Asistir a una reunión política", "Asistir a un concierto"], keys: [8, 4, 7] },
      { activities: ["Diseñar muebles", "Escribir artículos", "Llevar la contabilidad de una empresa"], keys: [5, 6, 9] },
      { activities: ["Dirigir la crianza de ganado", "Ser cantante lírico", "Trabajar en una agencia de publicidad"], keys: [0, 7, 4] },
      { activities: ["Conocer datos útiles para navegar en internet", "Dar charlas sobre química", "Escribir obras de teatro"], keys: [2, 3, 6] },
      { activities: ["Estudiar métodos de regadío", "Tocar en una orquesta sinfónica", "Ser jefe de ventas de una empresa"], keys: [0, 7, 4] },
      { activities: ["Ser ingeniero(a) en sistemas", "Trabajar haciendo encuestas o entrevistas", "Ilustrar libros"], keys: [2, 8, 5] },
      { activities: ["Investigar sobre nuevas variedades de trigo", "Desarrollar teorías matemáticas", "Atender enfermos"], keys: [0, 2, 8] },
      { activities: ["Ser profesor(a) de ciencias naturales", "Ser vendedor(a) de productos técnicos", "Ser artista"], keys: [3, 4, 5] },

      // Tríada 11-20
      { activities: ["Criar animales", "Reparar aparatos eléctricos", "Resolver problemas de aritmética"], keys: [0, 1, 2] },
      { activities: ["Investigar las causas de las enfermedades", "Estudiar la historia del arte", "Componer música"], keys: [3, 5, 7] },
      { activities: ["Convencer a otros sobre algo", "Ayudar a niños con dificultades de aprendizaje", "Ordenar y clasificar documentos en una oficina"], keys: [4, 8, 9] },
      { activities: ["Plantar árboles", "Manejar máquinas y herramientas", "Llevar libros de contabilidad"], keys: [0, 1, 9] },
      { activities: ["Hacer experimentos en un laboratorio", "Diseñar joyas", "Leer novelas"], keys: [3, 5, 6] },
      { activities: ["Participar en una obra de teatro", "Vender seguros", "Enseñar en una escuela"], keys: [5, 4, 8] },
      { activities: ["Cuidar plantas en un invernadero", "Armar aparatos mecánicos", "Hacer cálculos de ingeniería"], keys: [0, 1, 2] },
      { activities: ["Estudiar la estructura del átomo", "Escribir poesías", "Participar en campañas de ayuda a niños discapacitados"], keys: [3, 6, 8] },
      { activities: ["Ser cantante", "Ser gerente de una empresa", "Ser secretario(a) ejecutivo(a)"], keys: [7, 4, 9] },
      { activities: ["Trabajar al aire libre", "Instalar equipos eléctricos", "Hacer presupuestos"], keys: [0, 1, 9] },

      // Tríada 21-30
      { activities: ["Realizar investigaciones científicas", "Pintar cuadros", "Redactar noticias para un diario"], keys: [3, 5, 6] },
      { activities: ["Tocar un instrumento musical", "Dirigir un negocio", "Ayudar a personas con problemas"], keys: [7, 4, 8] },
      { activities: ["Sembrar y cosechar", "Usar herramientas de carpintería", "Analizar estados financieros"], keys: [0, 1, 9] },
      { activities: ["Estudiar fenómenos físicos", "Hacer trabajos artesanales", "Escribir cuentos"], keys: [3, 5, 6] },
      { activities: ["Interpretar música clásica", "Ser representante de ventas", "Trabajar en servicio social"], keys: [7, 4, 8] },
      { activities: ["Criar peces", "Reparar automóviles", "Realizar cálculos estadísticos"], keys: [0, 1, 2] },
      { activities: ["Investigar nuevos medicamentos", "Diseñar ropa", "Revisar y corregir textos"], keys: [3, 5, 6] },
      { activities: ["Componer canciones", "Convencer a otros de tus ideas", "Cuidar niños"], keys: [7, 4, 8] },
      { activities: ["Trabajar en un rancho", "Manejar maquinaria industrial", "Llevar registros contables"], keys: [0, 1, 9] },
      { activities: ["Hacer experimentos químicos", "Esculpir", "Escribir ensayos"], keys: [3, 5, 6] },

      // Tríada 31-40
      { activities: ["Dar conciertos de música", "Negociar contratos", "Orientar a jóvenes"], keys: [7, 4, 8] },
      { activities: ["Cultivar hortalizas", "Arreglar motores", "Hacer gráficos estadísticos"], keys: [0, 1, 2] },
      { activities: ["Estudiar biología", "Hacer trabajos de cerámica", "Traducir textos"], keys: [3, 5, 6] },
      { activities: ["Cantar en un coro", "Vender productos", "Trabajar con personas discapacitadas"], keys: [7, 4, 8] },
      { activities: ["Pescar", "Usar tornos y fresadoras", "Realizar auditorías"], keys: [0, 1, 9] },
      { activities: ["Investigar en un observatorio", "Diseñar logotipos", "Escribir críticas literarias"], keys: [3, 5, 6] },
      { activities: ["Dirigir una orquesta", "Administrar una empresa", "Ser psicólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Trabajar en agricultura", "Soldar piezas metálicas", "Hacer balances"], keys: [0, 1, 9] },
      { activities: ["Hacer investigación médica", "Fotografiar", "Escribir guiones"], keys: [3, 5, 6] },
      { activities: ["Afinar instrumentos musicales", "Promocionar productos", "Enseñar a leer"], keys: [7, 4, 8] },

      // Tríada 41-50
      { activities: ["Cuidar animales domésticos", "Reparar electrodomésticos", "Programar computadoras"], keys: [0, 1, 2] },
      { activities: ["Estudiar astronomía", "Hacer esculturas", "Ser editor(a) de libros"], keys: [3, 5, 6] },
      { activities: ["Tocar piano", "Ser agente de ventas", "Trabajar en un hospital"], keys: [7, 4, 8] },
      { activities: ["Podar árboles", "Construir muebles", "Realizar inventarios"], keys: [0, 1, 9] },
      { activities: ["Hacer experimentos de laboratorio", "Dibujar ilustraciones", "Escribir artículos"], keys: [3, 5, 6] },
      { activities: ["Estudiar composición musical", "Dirigir equipos de trabajo", "Ser enfermero(a)"], keys: [7, 4, 8] },
      { activities: ["Trabajar en ganadería", "Instalar sistemas eléctricos", "Analizar datos financieros"], keys: [0, 1, 9] },
      { activities: ["Investigar enfermedades", "Hacer trabajos en cuero", "Redactar informes"], keys: [3, 5, 6] },
      { activities: ["Cantar ópera", "Hacer negocios", "Ayudar en asilos"], keys: [7, 4, 8] },
      { activities: ["Sembrar flores", "Manejar grúas", "Hacer cuentas"], keys: [0, 1, 9] },

      // Tríada 51-60
      { activities: ["Estudiar genética", "Pintar retratos", "Escribir novelas"], keys: [3, 5, 6] },
      { activities: ["Tocar guitarra", "Vender inmuebles", "Ser maestro(a)"], keys: [7, 4, 8] },
      { activities: ["Cosechar frutas", "Armar computadoras", "Hacer presupuestos"], keys: [0, 1, 9] },
      { activities: ["Investigar microorganismos", "Hacer grabados", "Ser periodista"], keys: [3, 5, 6] },
      { activities: ["Componer sinfonías", "Ser empresario(a)", "Trabajar con ancianos"], keys: [7, 4, 8] },
      { activities: ["Criar caballos", "Reparar relojes", "Llevar estadísticas"], keys: [0, 1, 2] },
      { activities: ["Hacer análisis químicos", "Diseñar tarjetas", "Escribir columnas de opinión"], keys: [3, 5, 6] },
      { activities: ["Cantar en un musical", "Convencer inversionistas", "Cuidar enfermos"], keys: [7, 4, 8] },
      { activities: ["Trabajar en un vivero", "Usar máquinas de precisión", "Organizar archivos"], keys: [0, 1, 9] },
      { activities: ["Estudiar física nuclear", "Hacer diseño gráfico", "Traducir libros"], keys: [3, 5, 6] },

      // Tríada 61-70
      { activities: ["Tocar violín", "Negociar acuerdos", "Ser consejero(a) escolar"], keys: [7, 4, 8] },
      { activities: ["Plantar café", "Hacer trabajos de mecánica", "Realizar cálculos"], keys: [0, 1, 2] },
      { activities: ["Investigar el ADN", "Hacer vitrales", "Escribir biografías"], keys: [3, 5, 6] },
      { activities: ["Dirigir un coro", "Administrar negocios", "Ser trabajador(a) social"], keys: [7, 4, 8] },
      { activities: ["Cultivar vegetales", "Ensamblar equipos", "Hacer liquidaciones"], keys: [0, 1, 9] },
      { activities: ["Hacer investigación científica", "Diseñar carteles", "Ser escritor(a)"], keys: [3, 5, 6] },
      { activities: ["Cantar baladas", "Vender servicios", "Ayudar a discapacitados"], keys: [7, 4, 8] },
      { activities: ["Cuidar un jardín botánico", "Soldar circuitos", "Hacer contabilidad"], keys: [0, 1, 9] },
      { activities: ["Estudiar virología", "Hacer mosaicos", "Redactar ensayos"], keys: [3, 5, 6] },
      { activities: ["Interpretar jazz", "Ser comerciante", "Enseñar matemáticas"], keys: [7, 4, 8] },

      // Tríada 71-80
      { activities: ["Trabajar en campo", "Reparar bicicletas", "Analizar presupuestos"], keys: [0, 1, 9] },
      { activities: ["Investigar células", "Fotografiar bodas", "Escribir poemas"], keys: [3, 5, 6] },
      { activities: ["Tocar batería", "Dirigir ventas", "Ser terapeuta"], keys: [7, 4, 8] },
      { activities: ["Criar ovejas", "Manejar tornos", "Hacer auditorías"], keys: [0, 1, 9] },
      { activities: ["Estudiar ecología", "Diseñar vestuario", "Ser crítico(a) literario(a)"], keys: [3, 5, 6] },
      { activities: ["Cantar rock", "Vender franquicias", "Trabajar en cruz roja"], keys: [7, 4, 8] },
      { activities: ["Sembrar maíz", "Arreglar televisores", "Llevar libros de caja"], keys: [0, 1, 9] },
      { activities: ["Hacer experimentos de física", "Hacer artesanías", "Escribir reseñas"], keys: [3, 5, 6] },
      { activities: ["Tocar flauta", "Ser ejecutivo(a) de ventas", "Dar terapia a niños"], keys: [7, 4, 8] },
      { activities: ["Trabajar en apicultura", "Instalar antenas", "Hacer nóminas"], keys: [0, 1, 9] },

      // Tríada 81-90
      { activities: ["Investigar el clima", "Pintar murales", "Ser novelista"], keys: [3, 5, 6] },
      { activities: ["Componer bandas sonoras", "Negociar exportaciones", "Ser médico(a)"], keys: [7, 4, 8] },
      { activities: ["Cultivar orquídeas", "Reparar electrodomésticos", "Hacer cálculos de costos"], keys: [0, 1, 2] },
      { activities: ["Estudiar botánica", "Hacer joyería", "Escribir teatro"], keys: [3, 5, 6] },
      { activities: ["Cantar en festivales", "Ser gerente comercial", "Trabajar con refugiados"], keys: [7, 4, 8] },
      { activities: ["Cosechar verduras", "Usar taladros industriales", "Organizar documentos"], keys: [0, 1, 9] },
      { activities: ["Hacer análisis de laboratorio", "Hacer serigrafía", "Redactar crónicas"], keys: [3, 5, 6] },
      { activities: ["Tocar saxofón", "Vender tecnología", "Ser nutricionista"], keys: [7, 4, 8] },
      { activities: ["Plantar arroz", "Armar robots", "Hacer declaraciones"], keys: [0, 1, 9] },
      { activities: ["Investigar océanos", "Diseñar interiores", "Escribir ciencia ficción"], keys: [3, 5, 6] },

      // Tríada 91-100
      { activities: ["Dirigir bandas musicales", "Administrar franquicias", "Ser pediatra"], keys: [7, 4, 8] },
      { activities: ["Trabajar en silvicultura", "Reparar smartphones", "Analizar costos"], keys: [0, 1, 9] },
      { activities: ["Estudiar paleontología", "Hacer cerámica artística", "Ser poeta"], keys: [3, 5, 6] },
      { activities: ["Tocar trompeta", "Ser vendedor(a) profesional", "Trabajar en orfanatos"], keys: [7, 4, 8] },
      { activities: ["Criar conejos", "Usar fresadoras", "Hacer balances generales"], keys: [0, 1, 9] },
      { activities: ["Investigar bacterias", "Pintar paisajes", "Escribir biografías"], keys: [3, 5, 6] },
      { activities: ["Cantar música folclórica", "Dirigir proyectos comerciales", "Ser fisioterapeuta"], keys: [7, 4, 8] },
      { activities: ["Sembrar café", "Soldar estructuras", "Llevar inventarios"], keys: [0, 1, 9] },
      { activities: ["Estudiar geología", "Diseñar publicidad", "Redactar editoriales"], keys: [3, 5, 6] },
      { activities: ["Interpretar música clásica contemporánea", "Vender consultoría", "Ser enfermero(a) especializado(a)"], keys: [7, 4, 8] },

      // Tríada 101-110
      { activities: ["Trabajar en acuicultura", "Reparar drones", "Hacer liquidaciones de impuestos"], keys: [0, 1, 9] },
      { activities: ["Hacer investigación espacial", "Hacer ilustraciones digitales", "Ser guionista"], keys: [3, 5, 6] },
      { activities: ["Tocar arpa", "Ser emprendedor(a)", "Dar apoyo psicológico"], keys: [7, 4, 8] },
      { activities: ["Cultivar bonsáis", "Armar circuitos electrónicos", "Realizar auditorías fiscales"], keys: [0, 1, 9] },
      { activities: ["Investigar nanotecnología", "Hacer esmaltes", "Escribir críticas de cine"], keys: [3, 5, 6] },
      { activities: ["Cantar en musicales de Broadway", "Negociar contratos internacionales", "Ser geriatra"], keys: [7, 4, 8] },
      { activities: ["Sembrar soja", "Usar prensas hidráulicas", "Organizar presupuestos"], keys: [0, 1, 9] },
      { activities: ["Estudiar neurociencia", "Diseñar videojuegos", "Ser dramaturgo(a)"], keys: [3, 5, 6] },
      { activities: ["Tocar violonchelo", "Ser director(a) comercial", "Trabajar en centros de rehabilitación"], keys: [7, 4, 8] },
      { activities: ["Criar alpacas", "Instalar sistemas de aire acondicionado", "Hacer estados financieros"], keys: [0, 1, 9] },

      // Tríada 111-120
      { activities: ["Investigar energías renovables", "Hacer animación 3D", "Escribir ensayos filosóficos"], keys: [3, 5, 6] },
      { activities: ["Componer música electrónica", "Vender startups", "Ser oncólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Trabajar en horticultura orgánica", "Programar PLCs", "Analizar flujos de efectivo"], keys: [0, 1, 2] },
      { activities: ["Estudiar astrofísica", "Diseñar apps", "Ser ensayista"], keys: [3, 5, 6] },
      { activities: ["Cantar ópera contemporánea", "Dirigir multinacionales", "Ser psiquiatra"], keys: [7, 4, 8] },
      { activities: ["Cultivar té", "Reparar maquinaria pesada", "Llevar contabilidad internacional"], keys: [0, 1, 9] },
      { activities: ["Hacer investigación genómica", "Diseñar tatuajes", "Escribir columnas políticas"], keys: [3, 5, 6] },
      { activities: ["Tocar contrabajo", "Ser inversionista", "Trabajar en medicina humanitaria"], keys: [7, 4, 8] },
      { activities: ["Plantar cacao", "Ensamblar drones", "Hacer auditorías forenses"], keys: [0, 1, 9] },
      { activities: ["Investigar inteligencia artificial", "Hacer street art", "Ser crítico(a) de arte"], keys: [3, 5, 6] },

      // Tríada 121-130
      { activities: ["Dirigir grupos corales", "Administrar fondos de inversión", "Ser cardiólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Trabajar en permacultura", "Instalar fibra óptica", "Realizar análisis financieros"], keys: [0, 1, 9] },
      { activities: ["Estudiar química farmacéutica", "Diseñar tatuajes temporales", "Escribir memorias"], keys: [3, 5, 6] },
      { activities: ["Tocar oboe", "Vender bienes raíces de lujo", "Ser neonatólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Criar llamas", "Reparar impresoras 3D", "Hacer proyecciones financieras"], keys: [0, 1, 9] },
      { activities: ["Investigar cambio climático", "Hacer graffiti profesional", "Ser blogger literario(a)"], keys: [3, 5, 6] },
      { activities: ["Cantar música de cámara", "Dirigir fusiones empresariales", "Ser neurólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Sembrar quinoa", "Usar robots industriales", "Organizar tesorería"], keys: [0, 1, 9] },
      { activities: ["Hacer investigación oceanográfica", "Diseñar merchandising", "Escribir ciencia ficción distópica"], keys: [3, 5, 6] },
      { activities: ["Tocar laúd", "Ser capitalista de riesgo", "Trabajar en cuidados paliativos"], keys: [7, 4, 8] },

      // Tríada 131-140
      { activities: ["Cultivar hierbas aromáticas", "Armar impresoras industriales", "Hacer balances consolidados"], keys: [0, 1, 9] },
      { activities: ["Estudiar bioquímica", "Hacer body painting", "Ser cronista deportivo(a)"], keys: [3, 5, 6] },
      { activities: ["Interpretar música barroca", "Negociar IPOs", "Ser dermatólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Trabajar en hidroponía", "Instalar paneles solares", "Analizar razones financieras"], keys: [0, 1, 9] },
      { activities: ["Investigar bioética", "Diseñar empaques", "Escribir sátira política"], keys: [3, 5, 6] },
      { activities: ["Cantar música renacentista", "Ser CEO de corporación", "Trabajar en medicina deportiva"], keys: [7, 4, 8] },
      { activities: ["Criar abejas reinas", "Reparar servidores", "Llevar costos de producción"], keys: [0, 1, 9] },
      { activities: ["Hacer investigación epigenética", "Crear NFTs artísticos", "Ser dramaturgo(a) experimental"], keys: [3, 5, 6] },
      { activities: ["Tocar clavecín", "Vender portfolios de inversión", "Ser endocrinólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Plantar bambú", "Ensamblar satélites", "Hacer auditorías de riesgos"], keys: [0, 1, 9] },

      // Tríada 141-150
      { activities: ["Estudiar biomedicina", "Diseñar sneakers personalizados", "Escribir microrrelatos"], keys: [3, 5, 6] },
      { activities: ["Componer música experimental", "Dirigir holdings", "Ser inmunólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Trabajar en agricultura vertical", "Programar microcontroladores", "Realizar valuaciones"], keys: [0, 1, 2] },
      { activities: ["Investigar neuroplasticidad", "Hacer performance art", "Ser poeta slam"], keys: [3, 5, 6] },
      { activities: ["Cantar música gregoriana", "Ser venture capitalist", "Trabajar en medicina forense"], keys: [7, 4, 8] },
      { activities: ["Cultivar microgreens", "Reparar motherboards", "Hacer consolidación de empresas"], keys: [0, 1, 9] },
      { activities: ["Estudiar farmacogenómica", "Diseñar wearables", "Escribir distopías"], keys: [3, 5, 6] },
      { activities: ["Tocar theremin", "Administrar hedge funds", "Ser gastroenterólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Sembrar microalgas", "Instalar domótica", "Organizar fusiones"], keys: [0, 1, 9] },
      { activities: ["Hacer investigación cuántica", "Crear instalaciones artísticas", "Ser novelista gráfico(a)"], keys: [3, 5, 6] },

      // Tríada 151-160
      { activities: ["Dirigir ópera moderna", "Negociar adquisiciones", "Ser neumólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Trabajar en biojardinería", "Usar CNC", "Analizar solvencia empresarial"], keys: [0, 1, 9] },
      { activities: ["Investigar CRISPR", "Hacer land art", "Escribir manifiestos"], keys: [3, 5, 6] },
      { activities: ["Tocar hang drum", "Ser angel investor", "Trabajar en medicina regenerativa"], keys: [7, 4, 8] },
      { activities: ["Cultivar hongos gourmet", "Armar estaciones espaciales", "Hacer peritajes contables"], keys: [0, 1, 9] },
      { activities: ["Estudiar xenobiología", "Diseñar experiencias VR", "Ser libretista de podcast"], keys: [3, 5, 6] },
      { activities: ["Cantar en flashmobs", "Dirigir consorcios", "Ser oftalmólogo(a)"], keys: [7, 4, 8] },
      { activities: ["Plantar trufas", "Instalar IoT industrial", "Llevar due diligence"], keys: [0, 1, 9] },
      { activities: ["Hacer investigación de exoplanetas", "Crear arte generativo", "Escribir haikus modernos"], keys: [3, 5, 6] },
      { activities: ["Tocar kalimba", "Vender activos digitales", "Ser urólogo(a)"], keys: [7, 4, 8] },

      // Tríada 161-168
      { activities: ["Trabajar en cultivos celulares", "Programar firmware", "Realizar due diligence financiero"], keys: [0, 1, 2] },
      { activities: ["Investigar materia oscura", "Diseñar metaversos", "Ser poeta digital"], keys: [3, 5, 6] },
      { activities: ["Componer soundtracks interactivos", "Administrar DAOs", "Trabajar en telemedicina"], keys: [7, 4, 8] },
      { activities: ["Cultivar espirulina", "Reparar exoesqueletos", "Hacer valoraciones de startups"], keys: [0, 1, 9] },
      { activities: ["Estudiar bioimpresión", "Crear criptoarte", "Escribir fan fiction profesional"], keys: [3, 5, 6] },
      { activities: ["Cantar música adaptativa", "Ser trader de futuros", "Ser intensivista"], keys: [7, 4, 8] },
      { activities: ["Sembrar en Marte (simulación)", "Ensamblar nanorobots", "Analizar blockchain financiero"], keys: [0, 1, 9] },
      { activities: ["Investigar computación cuántica", "Diseñar hologramas artísticos", "Ser escritor(a) transmedia"], keys: [3, 5, 6] }
    ];


    const REWRITE_MAP = new Map([
      // Tecnología / industria
      ["Programar PLCs", "Programar controles de máquinas en una fábrica"],
      ["Usar CNC", "Usar máquinas automáticas para cortar o tallar piezas"],
      ["Instalar IoT industrial", "Instalar sensores y equipos conectados en una fábrica"],
      ["Programar firmware", "Programar el sistema interno de un dispositivo"],
      ["Programar microcontroladores", "Programar chips que controlan aparatos"],
      ["Reparar motherboards", "Reparar placas principales de computadoras"],
      ["Reparar servidores", "Reparar computadoras que dan servicio a muchas personas"],
      ["Instalar fibra óptica", "Instalar cables de internet de alta velocidad"],
      ["Reparar impresoras 3D", "Reparar impresoras que crean objetos en 3D"],
      ["Usar robots industriales", "Trabajar con robots en una fábrica"],
      ["Ensamblar satélites", "Armar equipos que van al espacio (satélites)"],
      ["Armar estaciones espaciales", "Armar estructuras para trabajo en el espacio (simulación)"],
      ["Ensamblar nanorobots", "Armar robots muy pequeños (micro-robots)"],

      // Ciencia avanzada
      ["Investigar nanotecnología", "Investigar tecnología a escala muy pequeña"],
      ["Estudiar neurociencia", "Estudiar el cerebro y cómo funciona"],
      ["Hacer investigación genómica", "Investigar genes y herencia"],
      ["Hacer investigación epigenética", "Investigar cómo se activan o desactivan genes"],
      ["Investigar CRISPR", "Investigar edición genética"],
      ["Estudiar farmacogenómica", "Estudiar tratamientos según la genética"],
      ["Estudiar xenobiología", "Estudiar vida fuera de la Tierra (en teoría)"],
      ["Hacer investigación cuántica", "Investigar física cuántica"],
      ["Investigar computación cuántica", "Investigar computación basada en física cuántica"],
      ["Investigar materia oscura", "Investigar la “materia invisible” del universo"],
      ["Hacer investigación de exoplanetas", "Investigar planetas fuera del sistema solar"],
      ["Estudiar bioimpresión", "Estudiar impresión 3D de tejidos"],
      ["Trabajar en cultivos celulares", "Trabajar con células en laboratorio"],
      ["Analizar blockchain financiero", "Analizar registros digitales usados en finanzas"],

      // Salud (especialidades)
      ["Ser oncólogo(a)", "Ser médico(a) especializado(a) en cáncer"],
      ["Ser geriatra", "Ser médico(a) especializado(a) en personas mayores"],
      ["Ser psiquiatra", "Ser médico(a) especializado(a) en salud mental"],
      ["Ser cardiólogo(a)", "Ser médico(a) especializado(a) en el corazón"],
      ["Ser neonatólogo(a)", "Ser médico(a) de recién nacidos"],
      ["Ser neurólogo(a)", "Ser médico(a) especializado(a) en el sistema nervioso"],
      ["Ser endocrinólogo(a)", "Ser médico(a) especializado(a) en hormonas"],
      ["Ser inmunólogo(a)", "Ser médico(a) especializado(a) en defensas del cuerpo"],
      ["Ser neumólogo(a)", "Ser médico(a) especializado(a) en pulmones"],
      ["Ser gastroenterólogo(a)", "Ser médico(a) especializado(a) en el aparato digestivo"],
      ["Ser oftalmólogo(a)", "Ser médico(a) especializado(a) en la vista"],
      ["Ser urólogo(a)", "Ser médico(a) especializado(a) en vías urinarias"],
      ["Ser intensivista", "Ser médico(a) de cuidados intensivos"],
      ["Trabajar en telemedicina", "Atender pacientes a distancia (por videollamada)"],
      ["Trabajar en medicina regenerativa", "Trabajar en tratamientos para reparar tejidos"],
      ["Trabajar en cuidados paliativos", "Acompañar a personas con enfermedades graves para aliviar su malestar"],

      // Finanzas / negocios
      ["Administrar hedge funds", "Administrar fondos de inversión de alto riesgo"],
      ["Negociar IPOs", "Negociar la salida a bolsa de una empresa"],
      ["Vender portfolios de inversión", "Vender planes de inversión"],
      ["Hacer valoraciones de startups", "Calcular cuánto vale una empresa nueva"],
      ["Llevar due diligence", "Hacer una revisión a fondo antes de invertir o comprar"],
      ["Realizar due diligence financiero", "Hacer una revisión financiera a fondo antes de invertir o comprar"],
      ["Ser venture capitalist", "Invertir en empresas nuevas"],
      ["Ser capitalista de riesgo", "Invertir en empresas nuevas"],
      ["Ser angel investor", "Invertir al inicio de una empresa nueva"],
      ["Administrar DAOs", "Administrar organizaciones online basadas en reglas"],
      ["Ser trader de futuros", "Comprar y vender contratos a futuro en mercados"],

      // Digital / web3 / VR / NFTs
      ["Diseñar experiencias VR", "Diseñar experiencias en realidad virtual"],
      ["Diseñar metaversos", "Diseñar mundos virtuales"],
      ["Crear NFTs artísticos", "Crear arte digital con certificado"],
      ["Crear criptoarte", "Crear arte digital ligado a criptomonedas"],
      ["Diseñar hologramas artísticos", "Diseñar imágenes en 3D tipo holograma"],
      ["Ser escritor(a) transmedia", "Escribir historias para varios formatos (video, audio, web)"],
      ["Componer soundtracks interactivos", "Componer música que cambia según lo que hace la persona"],
      ["Cantar música adaptativa", "Cantar música que se ajusta a la situación o al público"],
    ]);

    function rewriteMarkedActivities(triadsArr) {
      triadsArr.forEach(t => {
        t.activities = t.activities.map(a => REWRITE_MAP.get(a) ?? a);
      });
    }

    // ✅ aplicar una vez
    rewriteMarkedActivities(triads);


    // Definiciones de áreas
    const areas = [
      {
        code: 0,
        name: "AIRE LIBRE",
        description: "Trabajos en contacto con la naturaleza, cultivo de plantas o cría de animales. Actividades al aire libre.",
        professions: ["Ingeniero Agrónomo", "Veterinario", "Biólogo", "Guardabosques", "Paisajista", "Técnico Agrícola"]
      },
      {
        code: 1,
        name: "MECÁNICO",
        description: "Trabajos manuales con máquinas y herramientas. Comprensión de aparatos mecánicos.",
        professions: ["Ingeniero Mecánico", "Técnico Electrónico", "Mecánico", "Técnico en Refrigeración", "Operador de Maquinaria"]
      },
      {
        code: 2,
        name: "CÁLCULO",
        description: "Trabajo con números, razonamiento deductivo y resolución de problemas matemáticos.",
        professions: ["Contador", "Actuario", "Estadístico", "Analista Financiero", "Programador", "Ingeniero en Sistemas"]
      },
      {
        code: 3,
        name: "CIENTÍFICO",
        description: "Descubrimiento de nuevos hechos, investigación, resolución de problemas físicos, químicos o biológicos.",
        professions: ["Médico", "Químico", "Físico", "Biólogo", "Investigador", "Farmacéutico", "Bioquímico"]
      },
      {
        code: 4,
        name: "PERSUASIVO",
        description: "Trato con personas, negocios, venta de productos, liderazgo e influencia.",
        professions: ["Vendedor", "Gerente Comercial", "Abogado", "Político", "Relacionista Público", "Ejecutivo de Ventas"]
      },
      {
        code: 5,
        name: "ARTÍSTICO",
        description: "Trabajos creativos con diseño, colores, materiales plásticos y expresión gráfica.",
        professions: ["Diseñador Gráfico", "Arquitecto", "Artista Plástico", "Fotógrafo", "Diseñador de Interiores", "Ilustrador"]
      },
      {
        code: 6,
        name: "LITERARIO",
        description: "Gusto por la lectura, escritura y expresión verbal oral y escrita.",
        professions: ["Escritor", "Periodista", "Editor", "Profesor de Literatura", "Bibliotecario", "Corrector de Estilo"]
      },
      {
        code: 7,
        name: "MUSICAL",
        description: "Preferencia por música, conciertos, instrumentos y actividades relacionadas con el sonido.",
        professions: ["Músico", "Compositor", "Director de Orquesta", "Profesor de Música", "Técnico de Sonido", "Productor Musical"]
      },
      {
        code: 8,
        name: "ASISTENCIAL",
        description: "Actividades de ayuda a los demás, búsqueda del bienestar de las personas.",
        professions: ["Trabajador Social", "Enfermero", "Psicólogo", "Profesor", "Orientador", "Médico General", "Terapeuta"]
      },
      {
        code: 9,
        name: "ADMINISTRATIVO",
        description: "Tareas de oficina que requieren precisión, orden, exactitud y manejo de archivos.",
        professions: ["Secretario Ejecutivo", "Administrador", "Asistente Administrativo", "Archivero", "Recepcionista"]
      }
    ];

    // ================== ESTADO ==================
    const CHUNK = 10; // tríadas por sección
    let userName = "", userLastName = "", userEmail = "";
    let currentSection = 0;
    let answers = {}; // { triadIndex: { mas: activityIndex, menos: activityIndex } }

    // ================== CONSTRUCCIÓN DE SECCIONES ==================
    function buildSections() {
      const arr = [];
      for (let i = 0; i < triads.length; i += CHUNK) {
        arr.push({ start: i, end: Math.min(i + CHUNK, triads.length) });
      }
      return arr;
    }
    const sections = buildSections();

    // ================== UI INICIO ==================
    const nameInput = document.getElementById("userName");
    const lastNameInput = document.getElementById("userLastName");
    const emailInput = document.getElementById("userEmail");
    const startBtn = document.getElementById("startBtn");

    function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function updateStartState() {
      startBtn.disabled = !(nameInput.value.trim() && lastNameInput.value.trim() && emailOk(emailInput.value.trim()));
    }
    nameInput.addEventListener("input", updateStartState);
    lastNameInput.addEventListener("input", updateStartState);
    emailInput.addEventListener("input", updateStartState);

    startBtn.addEventListener("click", startTest);
    document.getElementById("prevBtn").addEventListener("click", previousSection);
    document.getElementById("nextBtn").addEventListener("click", nextSection);
    document.getElementById("restartBtn").addEventListener("click", restartTest);

    function startTest() {
      userName = nameInput.value.trim();
      userLastName = lastNameInput.value.trim();
      userEmail = emailInput.value.trim();
      document.getElementById("registrationScreen").classList.add("hidden");
      document.getElementById("testScreen").classList.remove("hidden");
      renderSection();
    }

    // ================== RENDER SECCIÓN ==================
    function renderSection() {
      const s = sections[currentSection];
      const container = document.getElementById("sectionContainer");

      let html = `<div class="section-title">Grupos ${s.start + 1} – ${s.end}</div>`;

      for (let i = s.start; i < s.end; i++) {
        const triad = triads[i];
        const ans = answers[i] || {};

        html += `
          <div class="triad-item">
            <div class="triad-number">Grupo ${i + 1} de ${triads.length}</div>
        `;

        triad.activities.forEach((activity, actIdx) => {
          const isMas = ans.mas === actIdx;
          const isMenos = ans.menos === actIdx;

          html += `
            <div class="activity-option">
              <div class="activity-text">${activity}</div>
              <div class="choice-buttons">
                <button class="choice-btn ${isMas ? 'active-mas' : ''}" 
                        onclick="selectChoice(${i}, ${actIdx}, 'mas')">
                  +
                </button>
                <button class="choice-btn ${isMenos ? 'active-menos' : ''}" 
                        onclick="selectChoice(${i}, ${actIdx}, 'menos')">
                  −
                </button>
              </div>
            </div>
          `;
        });

        html += `</div>`;
      }

      container.innerHTML = html;
      updateProgress();
      updateNavigationButtons();
    }

    function selectChoice(triadIdx, activityIdx, type) {
      if (!answers[triadIdx]) answers[triadIdx] = {};

      // Si ya está seleccionado, deseleccionar
      if (answers[triadIdx][type] === activityIdx) {
        delete answers[triadIdx][type];
      } else {
        // Si es la misma actividad que tiene el otro tipo, intercambiar
        const otherType = type === 'mas' ? 'menos' : 'mas';
        if (answers[triadIdx][otherType] === activityIdx) {
          delete answers[triadIdx][otherType];
        }
        answers[triadIdx][type] = activityIdx;
      }

      renderSection();
    }
    window.selectChoice = selectChoice;

    function isSectionComplete() {
      const s = sections[currentSection];
      for (let i = s.start; i < s.end; i++) {
        const ans = answers[i];
        if (!ans || ans.mas === undefined || ans.menos === undefined) return false;
        if (ans.mas === ans.menos) return false; // No pueden ser iguales
      }
      return true;
    }

    function updateNavigationButtons() {
      document.getElementById("prevBtn").disabled = currentSection === 0;
      const next = document.getElementById("nextBtn");
      next.disabled = !isSectionComplete();
      next.textContent = (currentSection === sections.length - 1) ? "Calcular Resultados" : "Siguiente";
    }

    function updateProgress() {
      const total = sections.length;
      const p = ((currentSection + 1) / total) * 100;
      document.getElementById("progressFill").style.width = p + "%";
      document.getElementById("progressPercent").textContent = Math.round(p) + "%";
      document.getElementById("pageIndicator").textContent = `Sección ${currentSection + 1} de ${total}`;
    }

    function previousSection() {
      if (currentSection > 0) {
        currentSection--;
        renderSection();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    function nextSection() {
      if (currentSection < sections.length - 1) {
        currentSection++;
        renderSection();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        calculateResults();
      }
    }

    // ================== CÁLCULO DE RESULTADOS ==================
    function calculateResults() {
      // Verificar que todas las tríadas estén completadas
      if (Object.keys(answers).length !== triads.length) {
        alert("Por favor complete todas las tríadas antes de calcular resultados.");
        return;
      }

      // Inicializar contadores por área (0-9)
      const scores = Array(10).fill(0);
      let verificationScore = 0;

      // ✅ CORRECCIÓN CRÍTICA: Calcular puntuaciones sumando AMBAS áreas (más Y menos)
      triads.forEach((triad, idx) => {
        const ans = answers[idx];
        if (!ans || ans.mas === undefined || ans.menos === undefined) return;

        const masKey = triad.keys[ans.mas];
        const menosKey = triad.keys[ans.menos];

        // Sumar 1 al área de "más" Y al área de "menos"
        scores[masKey]++;
        scores[menosKey]++;

        // Verificación: contar respuestas coherentes
        if (ans.mas !== ans.menos) verificationScore++;
      });

      // ✅ CORRECCIÓN: Validación de escala V según manual (página 2)
      // VÁLIDO: 31-39, DUDOSO: 28-32, INVÁLIDO: < 28 o > 39
      const esValido = verificationScore >= 31 && verificationScore <= 39;
      const estadoValidez = verificationScore < 28 ? 'INVALIDO' :
        verificationScore <= 32 ? 'DUDOSO' :
          verificationScore <= 39 ? 'VALIDO' : 'INVALIDO';

      // Calcular percentiles (simplificado - en producción usar baremos)
      // Para este ejemplo, usamos el puntaje directo como percentil aproximado
      const maxPossible = triads.length / 3; // Cada área podría tener máximo esto
      const percentiles = scores.map(score => Math.round((score / maxPossible) * 100));

      // Determinar código de perfil (2 áreas más altas)
      const areaScores = scores.map((score, idx) => ({ code: idx, score, percentile: percentiles[idx] }));
      areaScores.sort((a, b) => b.score - a.score);

      const profileCode = areaScores.slice(0, 2).map(a => a.code).sort((a, b) => a - b).join('-');

      // Enviar datos a Google Sheets
      sendToGoogleSheets(scores, verificationScore);

      // Mostrar resultados
      showResults({
        scores,
        percentiles,
        profileCode,
        esValido,
        estadoValidez,
        verificationScore,
        topAreas: areaScores.slice(0, 3)
      });
    }

    const WEB_APP_URL = URL_TEST2;

    async function sendToGoogleSheets(scores, verificationScore) {
      const today = new Date();
      const fecha = today.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });

      // Preparar respuestas: para cada tríada, guardamos mas y menos
      const respuestas = [];
      for (let i = 0; i < triads.length; i++) {
        const ans = answers[i] || {};
        respuestas.push(`${ans.mas ?? ''}|${ans.menos ?? ''}`);
      }

      const sessionUser = JSON.parse(localStorage.getItem('sessionUser')) || {};
      let permisoRaw = sessionUser.reenvioSimultaneo || 'NO';


      // OBTENER EMAILS
      const emailAdmin = sessionUser.adminEmail || "escencialconsult@gmail.com";

      const filaOrdenada = [
        fecha,
        userName,
        userLastName,
        userEmail,
        permisoRaw == 'SI' ? emailAdmin : "",
        respuestas
      ];

      const payload = {
        nombreHoja: "Respuestas",
        fila: filaOrdenada
      };

      console.log("Enviando a la base de datos:", payload);

      try {
        const res = await fetch(WEB_APP_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        console.log("GAS Response:", await res.text());
      } catch (error) {
        console.error("Error enviando a Google Sheets:", error);
      }
    }

    function showResults(results) {
      document.getElementById("testScreen").classList.add("hidden");
      document.getElementById("resultsScreen").classList.remove("hidden");

      // Validez
      const validityBox = document.getElementById("validityBox");
      if (results.esValido) {
        validityBox.innerHTML = `
          <div class="validity-success">
            <p><strong>✓ Test válido</strong><br>
            Puntuación de verificación: ${results.verificationScore} (rango normal: 31-39)<br>
            Las respuestas son coherentes y confiables.</p>
          </div>
        `;
      } else if (results.estadoValidez === 'DUDOSO') {
        validityBox.innerHTML = `
          <div class="validity-warning">
            <p><strong>⚠ Advertencia de validez</strong><br>
            Puntuación de verificación: ${results.verificationScore} (rango normal: 31-39, dudoso: 28-32)<br>
            Los resultados podrían necesitar revisión. Se recomienda revisar las respuestas con mayor atención.</p>
          </div>
        `;
      } else {
        validityBox.innerHTML = `
          <div class="validity-warning">
            <p><strong>⚠ Test inválido</strong><br>
            Puntuación de verificación: ${results.verificationScore} (rango normal: 31-39)<br>
            Los resultados no son confiables. Se recomienda repetir el test con mayor atención a las instrucciones.</p>
          </div>
        `;
      }

      // Código de perfil
      const topArea1 = areas.find(a => a.code === results.topAreas[0].code);
      const topArea2 = areas.find(a => a.code === results.topAreas[1].code);

      document.getElementById("profileCode").textContent = results.profileCode;
      document.getElementById("profileDescription").textContent =
        `${topArea1.name} + ${topArea2.name}`;

      // Áreas de interés
      let areasHTML = '';

      // Ordenar por percentil para mostrar
      const sortedAreas = results.percentiles.map((p, idx) => ({
        area: areas[idx],
        percentile: p,
        score: results.scores[idx]
      })).sort((a, b) => b.percentile - a.percentile);

      sortedAreas.forEach((item, index) => {
        const isTop3 = index < 3;
        areasHTML += `
          <div class="area-card">
            <div class="area-header">
              <div class="area-name">${index + 1}. ${item.area.name}</div>
              <div class="area-score-badge">Percentil ${item.percentile}</div>
            </div>
            <div class="area-bar">
              <div class="area-bar-fill" style="width: ${item.percentile}%"></div>
            </div>
            <div class="area-percentile">Puntuación: ${item.score} puntos</div>
            <div class="area-description">${item.area.description}</div>
            ${isTop3 ? `
              <div class="professions-list">
                <div class="professions-title">Profesiones relacionadas:</div>
                <ul>
                  ${item.area.professions.map(prof => `<li>${prof}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        `;
      });

      document.getElementById("areasContainer").innerHTML = areasHTML;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function restartTest() {
      currentSection = 0;
      answers = {};
      userName = "";
      userLastName = "";
      userEmail = "";
      nameInput.value = "";
      lastNameInput.value = "";
      emailInput.value = "";
      updateStartState();
      document.getElementById("resultsScreen").classList.add("hidden");
      document.getElementById("registrationScreen").classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
