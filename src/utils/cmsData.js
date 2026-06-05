const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const LOGO = 'https://horizons-cdn.hostinger.com/a11fab72-8fa1-435a-81fd-8c8f92a5a284/176ad26295791c3dbb5a84904bb2322a.jpg'

export const initialCMSData = {

  // ── HEADER ────────────────────────────────────────────────────
  header: {
    logo:      LOGO,
    brand:     'Litros & Litros',
    nav: [
      { label:'Inicio',           path:'/'              },
      { label:'Alimentos',        path:'/alimentos'     },
      { label:'Bebidas',          path:'/carta-bebidas' },
      { label:'Eventos',          path:'/eventos'       },
      { label:'Cabinas Privadas', path:'/#reservas', special:true },
    ],
  },

  // ── HERO (Inicio) ─────────────────────────────────────────────
  hero: {
    logo:     LOGO,
    title:    'Litros & Litros',
    subtitle: 'El lugar donde se oye la música, el servicio y las alitas para pasar un excelente momento',
    horario:  'Mar – Dom  |  6:00 PM – 3:00 AM  |  Lunes Descansamos',
    btn1:     'Ver Menú Promo',
    btn2:     'Ver Carta',
    btn3:     'Reservar',
    bgImg:    `${BASE}/1.jpeg`,
  },

  // ── ¿POR QUÉ ELEGIRNOS? ──────────────────────────────────────
  porqueElegirnos: {
    titulo:  '¿Por qué elegirnos?',
    subtitulo: 'Somos un lugar seguro y amigable con experiencia',
    pills: [
      { icon:'🎵', label:'Música'       },
      { icon:'🍺', label:'Buena Vibra'  },
      { icon:'🎤', label:'Karaoke'      },
    ],
    musica: {
      titulo:  '🎶 Música',
      texto:   'Todos los géneros disponibles. Puedes pedir 3 canciones que más te gusten y las ponemos sin costo.',
      destacado: '3 canciones que más te gusten',
      gratis:    'sin costo',
    },
  },

  // ── HORARIO ───────────────────────────────────────────────────
  horario: {
    titulo:   '🕐 Horario',
    horas:    '6:00 PM – 3:00 AM',
    dias:     'Martes a Domingo — Karaoke todos los días',
    descanso: 'Lunes Descansamos',
    fotoUrl:  `${BASE}/5.jpeg`,
  },

  // ── RESERVAS / CABINAS ────────────────────────────────────────
  reservas: {
    titulo:   'Cabinas Privadas',
    subtitulo:'Reserva tu espacio privado para grupos, cumpleaños o eventos especiales',
    fotoUrl:  `${BASE}/2.jpeg`,
    wa:       '522224302693',
    waMsg:    'Hola, quiero hacer una reservación en Litros & Litros',
    btnTexto: 'Reservar por WhatsApp',
    telefono: '+52 222 430 2693',
  },

  // ── ALIMENTOS ─────────────────────────────────────────────────
  alimentos: {
    titulo:   'Alimentos',
    subtitulo:'Snacks y platillos preparados con ingredientes frescos',
    platillos: [
      {
        id:1, nombre:'Hamburguesa', fotoUrl:`${BASE}/7.jpeg`,
        ingredientes:['Carne de res frita','Queso amarillo','Frijoles','Mantequilla','Tocino','Catsup','Mostaza'],
        opcionales:['Mayonesa'],
        extras:['Papas onduladas','Aderezo de la casa'],
        badge:'',
      },
      {
        id:2, nombre:'Alitas', fotoUrl:`${BASE}/3.jpeg`,
        desc:'Marinadas con sabor a elegir y aderezo incluido.',
        ingredientes:[], opcionales:[], extras:[],
        badge:'🔥 Elige tu sabor',
      },
      {
        id:3, nombre:'Nachos', fotoUrl:`${BASE}/4.jpeg`,
        desc:'Totopos crujientes con chiles y queso amarillo.',
        especiales:['Carne Pastor','Carne Asada','Salseado (Salsa Verde)'],
        ingredientes:[], opcionales:[], extras:[],
        badge:'⭐ Especiales',
      },
      {
        id:4, nombre:'Hot Dog', fotoUrl:`${BASE}/6.jpeg`,
        ingredientes:['Pan caliente','Salchicha italiana','Tocino','Queso amarillo','Frijoles','Chiles','Catsup','Mayonesa','Mostaza'],
        opcionales:[], extras:[], badge:'',
      },
      {
        id:5, nombre:'Papas Francesas', fotoUrl:`${BASE}/1.jpeg`,
        desc:'Papa ondulada, sin aceite en exceso.',
        ingredientes:['Queso amarillo'],
        aderezos:['Catsup'],
        opcionales:[], extras:[], badge:'',
      },
    ],
  },

  // ── CARTA BEBIDAS ─────────────────────────────────────────────
  bebidas: {
    titulo:   'Carta de Bebidas',
    subtitulo:'La mejor selección de destilados, cocteles y bebidas',
    promo:    '🎂 Bebida de bienvenida gratis en tu cumpleaños',
    nota:     '*Propina opcional no incluida*',
  },

  // ── EVENTOS ───────────────────────────────────────────────────
  eventos: {
    titulo:    'Eventos Especiales',
    subtitulo: 'Vive experiencias únicas en Litros & Litros',
    fotoUrl:   `${BASE}/3.jpeg`,
    puertaCerrada: {
      titulo: 'Shows de Puerta Cerrada',
      items:  ['Eventos privados con reservación anticipada'],
    },
    mejorVoz: {
      titulo: 'Compite por la Mejor Voz',
      items:  ['Participa y gana premios'],
    },
    karaoke: {
      titulo:  'Karaoke c/ Animador',
      items:   ['Karaoke con animador — dúos bienvenidos', 'Compite con nuestro Mesero Estrella'],
      premio:  '🎁 El que gana recibe una bebida gratis',
    },
    cumpleanos: {
      titulo:    'Cumpleaños',
      subtitulo: 'Celebra tu día con nosotros y recibe un trato único. Reserva con anticipación para asegurar tu lugar.',
      checks: [
        'Reserva con anticipación',
        'Adornamos tu mesa',
        '1 Bebida de bienvenida',
        'La casa le da al cumpleañero una bebida igual de cada mesa que esté con nosotros en el lugar',
      ],
      nota:   '💡 Entre más mesas vengan a celebrar contigo, ¡más bebidas recibe el cumpleañero!',
    },
    btnTexto: 'Reservar Ahora',
    wa:       '522224302693',
    waMsg:    'Hola, quiero hacer una reservación en Litros & Litros',
  },

  // ── CONTACTO ──────────────────────────────────────────────────
  contact: {
    address:  'Blvd Héroes del 5 de Mayo 4610, Santa María, 72080 Heroica Puebla de Zaragoza, Pue.',
    phone:    '+52 222 430 2693',
    email:    'info@litrosylitros.com',
    hours:    'Martes a Domingo: 6:00 PM – 3:00 AM  |  Lunes cerrado',
    wa:       '522224302693',
  },

  // ── FOOTER ────────────────────────────────────────────────────
  footer: {
    brand:     'Litros & Litros',
    desc:      'Karaoke Bar en Puebla. El lugar donde se oye la música, el servicio y las alitas.',
    copyright: '© 2026 Litros & Litros Karaoke Bar. Todos los derechos reservados.',
  },

  // ── REDES SOCIALES ────────────────────────────────────────────
  socials: {
    fb:  'https://www.facebook.com/profile.php?id=61589505942247',
    ig:  'https://www.instagram.com/litr.oslitros/',
    wa:  '522224302693',
    tt:  '',
    yt:  '',
  },

  // ── WHATSAPP FLOTANTE ─────────────────────────────────────────
  waFlotante: {
    numero:  '522224302693',
    mensaje: 'Hola, quiero información sobre Litros & Litros',
    visible: true,
  },

  // ── SEO ───────────────────────────────────────────────────────
  seo: {
    title: 'Litros & Litros Karaoke Bar – Puebla | Reserva tu cabina',
    desc:  'El mejor karaoke bar en Puebla. Música en vivo, canciones a petición, alitas, bebidas y cabinas privadas. Abierto Martes a Domingo 6PM–3AM.',
    kw:    'bar karaoke puebla, litros y litros, karaoke puebla, cabinas privadas puebla, bar puebla',
  },

  // ── MENÚ BEBIDAS (precios) ────────────────────────────────────
  menuBebidas: [
    { id:1,  cat:'Ron',       name:'Bacardi Blanco',                     vol:'700 ml',     botella:690,  copa:65   },
    { id:2,  cat:'Ron',       name:'Bacardi Sabores',                    vol:'700 ml',     botella:720,  copa:75   },
    { id:3,  cat:'Ron',       name:'Capitán Morgan',                     vol:'750 ml',     botella:790,  copa:78   },
    { id:4,  cat:'Ron',       name:'Zacapa 23',                          vol:'750 ml',     botella:1750, copa:170  },
    { id:5,  cat:'Vodka',     name:'Absolut Azul',                       vol:'750 ml',     botella:680,  copa:65   },
    { id:6,  cat:'Vodka',     name:'Absolut Sabores',                    vol:'750 ml',     botella:720,  copa:70   },
    { id:7,  cat:'Vodka',     name:'Zaverich Natural',                   vol:'700 ml',     botella:480,  copa:45   },
    { id:8,  cat:'Tequila',   name:'José Cuervo Especial',               vol:'695 ml',     botella:null, copa:48   },
    { id:9,  cat:'Tequila',   name:'José Cuervo Tradicional',            vol:'695 ml',     botella:null, copa:70   },
    { id:10, cat:'Tequila',   name:'Don Julio 70',                       vol:'700 ml',     botella:1640, copa:145  },
    { id:11, cat:'Brandy',    name:'Torres X',                           vol:'700 ml',     botella:850,  copa:85   },
    { id:12, cat:'Brandy',    name:'Torres V',                           vol:'700 ml',     botella:790,  copa:null },
    { id:13, cat:'Whisky',    name:'Etiqueta Roja',                      vol:'700 ml',     botella:745,  copa:75   },
    { id:14, cat:'Whisky',    name:'Black & White',                      vol:'700 ml',     botella:700,  copa:70   },
    { id:15, cat:'Whisky',    name:"Buchanan's",                         vol:'750 ml',     botella:1590, copa:140  },
    { id:16, cat:'Whisky',    name:'Etiqueta Negra',                     vol:'700 ml',     botella:1450, copa:140  },
    { id:17, cat:'Mezcal',    name:'400 Conejos',                        vol:'750 ml',     botella:1100, copa:110  },
    { id:18, cat:'Mezcal',    name:'La Manuela',                         vol:'750 ml',     botella:null, copa:75   },
    { id:19, cat:'Digestivos',name:'Jägermeister',                       vol:'700 ml',     botella:null, copa:95   },
    { id:20, cat:'Digestivos',name:'Baileys',                            vol:'700 ml',     botella:900,  copa:95   },
    { id:21, cat:'Digestivos',name:'Anís Dulce Mico',                    vol:'700 ml',     botella:null, copa:45   },
    { id:22, cat:'Coctelería',name:'Pay Limón',                          vol:'335 ml',     botella:55,   copa:null },
    { id:23, cat:'Coctelería',name:'Azulito',                            vol:'335 ml',     botella:50,   copa:null },
    { id:24, cat:'Coctelería',name:'Piña Colada',                        vol:'335 ml',     botella:65,   copa:null },
    { id:25, cat:'Coctelería',name:'Helado Tinto',                       vol:'335 ml',     botella:75,   copa:null },
    { id:26, cat:'Cerveza',   name:'Carta Blanca',                       vol:'335 ml',     botella:30,   copa:null },
    { id:27, cat:'Cerveza',   name:'Corona / Victoria / Lager / Tecate', vol:'335 ml',     botella:50,   copa:null },
    { id:28, cat:'Cerveza',   name:'Negra Modelo / Modelo Especial',     vol:'325 ml',     botella:60,   copa:null },
    { id:29, cat:'Cerveza',   name:'Caguamón',                           vol:'1.2 L',      botella:95,   copa:null },
    { id:30, cat:'Cerveza',   name:'10 Latas',                           vol:'355 ml c/u', botella:260,  copa:null },
    { id:31, cat:'Refrescos', name:'Refrescos',                          vol:'350 ml',     botella:38,   copa:null },
    { id:32, cat:'Refrescos', name:'Energet Azul',                       vol:'355 ml',     botella:45,   copa:null },
    { id:33, cat:'Refrescos', name:'Energet Azul Botella',               vol:'285 ml',     botella:77,   copa:null },
    { id:34, cat:'Refrescos', name:'Jugo sabores',                       vol:'1 L',        botella:85,   copa:45  },
    { id:35, cat:'Refrescos', name:'Jugo de arándano',                   vol:'1 L',        botella:95,   copa:null },
    { id:36, cat:'Refrescos', name:'Jugo Mango Piña',                    vol:'1 L',        botella:130,  copa:null },
    { id:37, cat:'Refrescos', name:'Agua Natural',                       vol:'335 ml',     botella:30,   copa:null },
    { id:38, cat:'Refrescos', name:'Caribe Cooler',                      vol:'355 ml',     botella:90,   copa:null },
    { id:39, cat:'Refrescos', name:'Boones',                             vol:'750 ml',     botella:290,  copa:null },
    { id:40, cat:'Snacks',    name:'Papas Locas',                        vol:'Individual', botella:65,   copa:null },
    { id:41, cat:'Snacks',    name:'Nachos',                             vol:'—',          botella:100,  copa:null },
    { id:42, cat:'Snacks',    name:'Nachos Árabes',                      vol:'—',          botella:100,  copa:null },
    { id:43, cat:'Snacks',    name:'Nachos al Pastor',                   vol:'—',          botella:100,  copa:null },
  ],

  // legacy compat
  musica: { title:'Música', sub:'', features:[] },

  // ── HOME — Cards de secciones ────────────────────────────────
  homeCards: {
    alimentos: [
      { id:'alitas',       icon:'🍗', title:'Alitas',          desc:'Marinadas con sabor a elegir · Aderezo incluido',                     img:`${BASE}/alitas.jpeg` },
      { id:'nachos',       icon:'🧀', title:'Nachos',          desc:'Base crujiente + variantes especiales',                               img:`${BASE}/nachos.jpeg` },
      { id:'hotdog',       icon:'🌭', title:'Hot Dog',         desc:'Pan caliente · Salchicha italiana · Receta completa',                 img:`${BASE}/hotdog.jpeg` },
      { id:'papas',        icon:'🍟', title:'Papas Francesas', desc:'Papa ondulada · Queso amarillo · Catsup',                            img:`${BASE}/papas.jpeg` },
    ],
    hamburguesa: { id:'hamburguesa', icon:'🍔', title:'Hamburguesa', desc:'Carne de res frita · Queso amarillo · Tocino · y más',         img:`${BASE}/hamburguesa.jpeg` },
    espectaculos: [
      { id:'puerta-cerrada', icon:'🚪', title:'Puerta Cerrada',       desc:'Eventos privados con reservación anticipada',                  img:`${BASE}/2.jpeg` },
      { id:'mejor-voz',      icon:'🏆', title:'Competencia de Voz',   desc:'Participa y gana premios · Demuestra tu talento',             img:`${BASE}/open_mind.jpeg` },
      { id:'karaoke',        icon:'🎤', title:'Karaoke con Animador',  desc:'Show completo · Dúos bienvenidos · Toda la noche',            img:`${BASE}/karaoke.jpeg` },
      { id:'vs-mesero',      icon:'⚔️', title:'Compite con Mesero',   desc:'¿Puedes ganarle? El ganador recibe bebida gratis',            img:`${BASE}/vs_mesero.jpeg` },
    ],
    cumpleanos: { id:'cumpleanos', icon:'🎂', title:'Especial Cumpleaños', desc:'Mesa decorada · Bebida de bienvenida · Bebida gratis',    img:`${BASE}/cumpleanos.jpeg` },
  },

  // ── PLATILLOS DETALLE ─────────────────────────────────────────
  platillos: {
    alitas: {
      icon:'🍗', title:'Alitas', img:`${BASE}/alitas.jpeg`,
      desc:'Marinadas al momento con el sabor que tú elijas. Aderezo incluido.',
      ingredientes:['Alitas marinadas al momento','Sabor a elegir','Aderezo incluido'],
      especiales:[], opcionales:[], extras:[], aderezos:[],
    },
    nachos: {
      icon:'🧀', title:'Nachos', img:`${BASE}/nachos.jpeg`,
      desc:'Totopos crujientes con chile y queso amarillo. Elige tu variante especial.',
      ingredientes:['Totopos crujientes','Chiles','Queso amarillo'],
      especiales:['Carne al Pastor','Carne Asada','Salseado (Salsa Verde)'],
      opcionales:[], extras:[], aderezos:[],
    },
    hotdog: {
      icon:'🌭', title:'Hot Dog', img:`${BASE}/hotdog.jpeg`,
      desc:'Pan caliente con salchicha italiana y todos los ingredientes que lo hacen único.',
      ingredientes:['Pan caliente','Salchicha italiana','Tocino','Queso amarillo','Frijoles','Chiles','Catsup','Mayonesa','Mostaza'],
      especiales:[], opcionales:[], extras:[], aderezos:[],
    },
    papas: {
      icon:'🍟', title:'Papas Francesas', img:`${BASE}/papas.jpeg`,
      desc:'Papa ondulada, poco aceite, servida con queso amarillo y catsup.',
      ingredientes:['Papa ondulada','Poco aceite','Queso amarillo'],
      aderezos:['Catsup'], especiales:[], opcionales:[], extras:[],
    },
    hamburguesa: {
      icon:'🍔', title:'Hamburguesa', img:`${BASE}/hamburguesa.jpeg`,
      desc:'Nuestra hamburguesa es preparada con ingredientes frescos y de calidad.',
      ingredientes:['Carne de res frita','Queso amarillo','Frijoles','Mantequilla','Tocino','Catsup','Mostaza'],
      opcionales:['Mayonesa'],
      extras:['Papas onduladas','Aderezo de la casa'],
      especiales:[], aderezos:[],
    },
  },

  // ── ESPECTÁCULOS DETALLE ──────────────────────────────────────
  espectaculos: {
    'puerta-cerrada': {
      icon:'🚪', title:'Shows de Puerta Cerrada', img:`${BASE}/2.jpeg`,
      desc:'Una experiencia exclusiva e íntima para tu grupo. El show de puerta cerrada es el evento privado más especial de Litros & Litros.',
      items:['Evento privado con reservación anticipada','Ambiente exclusivo solo para tu grupo','Experiencia única e irrepetible','Disponible para grupos y empresas'],
      premio:'', nota:'', cta:'Reservar mi evento privado',
    },
    'mejor-voz': {
      icon:'🏆', title:'Competencia por la Mejor Voz', img:`${BASE}/open_mind.jpeg`,
      desc:'Demuestra que tienes el talento. Compite contra otros cantantes y gana el título de la mejor voz de la noche.',
      items:['Compite contra otros participantes','El jurado es el público presente','Premios para el ganador cada noche','Abierto a todos los géneros musicales'],
      premio:'', nota:'', cta:'Quiero participar',
    },
    'karaoke': {
      icon:'🎤', title:'Karaoke con Animador', img:`${BASE}/karaoke.jpeg`,
      desc:'Nuestro animador hace que cada canción sea una experiencia única. El escenario es tuyo y los dúos son bienvenidos.',
      items:['Animador profesional toda la noche','Dúos y grupos bienvenidos','Todos los géneros disponibles','Canciones a petición sin costo'],
      premio:'', nota:'', cta:'Reservar mi noche de karaoke',
    },
    'vs-mesero': {
      icon:'⚔️', title:'Compite con Nuestro Mesero', img:`${BASE}/vs_mesero.jpeg`,
      desc:'¿Crees que puedes superar a nuestro mesero en el karaoke? Acepta el reto y si ganas, ¡la bebida corre por cuenta de la casa!',
      items:['Reta a nuestro mesero estrella','El público decide quién gana','El ganador recibe una bebida gratis','Se vale animar, gritar y apostar'],
      premio:'🎁 El que gana recibe una bebida gratis de la casa', nota:'', cta:'Acepto el reto',
    },
    'cumpleanos': {
      icon:'🎂', title:'Especial Cumpleaños', img:`${BASE}/cumpleanos.jpeg`,
      desc:'Celebra tu día especial con nosotros y recibe un trato único que no olvidarás. Reserva con anticipación para asegurar tu lugar.',
      items:[],
      checks:['Reserva con anticipación','Adornamos tu mesa especialmente para ti','1 Bebida de bienvenida incluida','La casa le da al cumpleañero una bebida igual de cada mesa que esté en el lugar'],
      nota:'💡 Entre más mesas vengan a celebrar contigo, ¡más bebidas recibe el cumpleañero!',
      premio:'', cta:'Reservar mi cumpleaños',
    },
  },

  // ── MENÚ PROMO ────────────────────────────────────────────────
  menuPromo: {
    titulo:   'Promociones',
    subtitulo:'Las mejores promos para que disfrutes al máximo tu noche',
    fotoUrl:  `${BASE}/promociones.jpeg`,
    cards: [
      { emoji:'🍺', title:'Cervezas',    desc:'3 x $75  ·  10 x $260  ·  MicheLitro $98' },
      { emoji:'🪣', title:'Naturales',   desc:'Ron, Tequila, Vodka o Gin · 3 Litros x $175' },
      { emoji:'🥤', title:'Escarchados', desc:'Sandía, Mango, Tamarindo y más · 3L x $190' },
      { emoji:'🍶', title:'Caguamón',    desc:'Xxlager, Carta Blanca, Victoria · 2 x $190' },
      { emoji:'🌮', title:'Nachos',      desc:'Árabe $100 · Pastor $100' },
      { emoji:'🍗', title:'Alitas (7)',  desc:'$78' },
      { emoji:'🌭', title:'Hot Dog',     desc:'$48' },
    ],
    nota:'BLVD 5 DE MAYO #4610 · +222 430 26 93',
  },
}
