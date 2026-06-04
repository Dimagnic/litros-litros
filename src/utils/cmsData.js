// ─── IMÁGENES REALES DEL LOCAL ────────────────────────────────
// Todas las fotos están en Supabase Storage, bucket: images (publico)
const BASE = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'

const IMGS = {
  salon1: `${BASE}/1.jpeg`,  // Salón principal — rojo/neon — HERO bg
  cabina:  `${BASE}/2.jpeg`,  // Zona íntima/cabinas — púrpura — RESERVAS
  salon2:  `${BASE}/3.jpeg`,  // Salón amplio — vista completa — MÚSICA
  salon3:  `${BASE}/4.jpeg`,  // Salón día — EVENTOS
  barra:   `${BASE}/5.jpeg`,  // Barra iluminada — BEBIDAS
  neon:    `${BASE}/6.jpeg`,  // Zona neon rosa — NOSOTROS/GALERÍA
  lounge:  `${BASE}/7.jpeg`,  // Zona lounge — ALIMENTOS
  logo:    'https://horizons-cdn.hostinger.com/a11fab72-8fa1-435a-81fd-8c8f92a5a284/176ad26295791c3dbb5a84904bb2322a.jpg',
}

export const initialCMSData = {
  hero: {
    logo:     IMGS.logo,
    title:    'Litros & Litros',
    subtitle: 'El lugar donde se oye la música, el servicio y las alitas para pasar un excelente momento',
    badge:    'Karaoke Bar · Puebla',
    horario:  'Mar – Dom  |  6:00 PM – 3:00 AM  |  Lunes cerrado',
    btn1:     'Ver Promos',
    btn2:     'Reservar Ahora',
    img:      IMGS.salon1,   // fondo semitransparente hero
  },
  musica: {
    title: 'Música',
    sub:   'Todos los géneros, sin límites y sin costo adicional',
    img:   IMGS.salon2,      // foto de fondo sección música
    features: [
      { icon:'🎤', title:'Karaoke con Animador',   desc:'Nuestro animador hace que cada canción sea una experiencia única. ¡El escenario es tuyo!' },
      { icon:'🎵', title:'Canciones a Petición',   desc:'Pide tu canción favorita sin costo adicional. Todos los géneros disponibles.' },
      { icon:'🏆', title:'Competencia: Mejor Voz', desc:'Demuestra tu talento y compite por el título de la mejor voz de la noche.' },
      { icon:'⚔️', title:'Reto vs Mesero',         desc:'¿Te atreves a retar a nuestros meseros en el karaoke? ¡Ellos también cantan!' },
    ],
  },
  bebidas: {
    title: 'Bebidas',
    sub:   'Carta completa con los mejores destilados, cocteles y cervezas',
    promo: '🎂 Bebida de bienvenida gratis en tu cumpleaños',
    img:   IMGS.barra,       // foto barra — aparece como banner lateral
  },
  alimentos: {
    title: 'Alimentos',
    sub:   'Snacks y platillos para acompañar tu noche',
    img:   IMGS.lounge,      // foto zona lounge/snacks
    items: [
      { id:1, name:'Hamburguesa',     price:'Consultar',  icon:'🍔', color:'linear-gradient(135deg,#ef4444,#f97316)', desc:'Carne de res frita, queso amarillo, frijoles, mantequilla, tocino, catsup, mostaza. Mayonesa opcional.' },
      { id:2, name:'Alitas',          price:'Consultar',  icon:'🍗', color:'linear-gradient(135deg,#f97316,#eab308)', desc:'Marinadas al momento, elige tu sabor favorito. Aderezo incluido.' },
      { id:3, name:'Nachos',          price:'Desde $60',  icon:'🧀', color:'linear-gradient(135deg,#eab308,#ef4444)', desc:'Totopos con chile y queso amarillo. Opciones: carne al pastor, carne asada o salsa verde.' },
      { id:4, name:'Hot Dog',         price:'Consultar',  icon:'🌭', color:'linear-gradient(135deg,#a855f7,#ef4444)', desc:'Pan caliente, salchicha italiana, tocino, queso amarillo, frijoles, chiles, catsup, mayonesa, mostaza.' },
      { id:5, name:'Papas Francesas', price:'Desde $65',  icon:'🍟', color:'linear-gradient(135deg,#f97316,#a855f7)', desc:'Papa ondulada, poco aceite, queso amarillo y catsup. Crujientes y perfectas.' },
    ],
  },
  eventos: {
    title: 'Eventos',
    sub:   'Vive experiencias únicas en Litros & Litros',
    img:   IMGS.salon3,      // foto salón día para eventos
    items: [
      { id:1, icon:'🎭', title:'Show de Puerta Cerrada', color:'linear-gradient(135deg,#ef4444,#a855f7)', desc:'Espectáculos exclusivos para grupos. Una experiencia íntima e irrepetible solo para tu mesa.' },
      { id:2, icon:'🏆', title:'Competencias de Canto',  color:'linear-gradient(135deg,#a855f7,#f97316)', desc:'Compite contra otros cantantes y demuestra quién tiene la mejor voz. Premios cada noche.' },
      { id:3, icon:'🎂', title:'Fiestas y Cumpleaños',   color:'linear-gradient(135deg,#f97316,#ef4444)', desc:'Reserva anticipada · Mesa decorada · Bebida de bienvenida · Bebida gratis para el cumpleañero y acompañantes.' },
    ],
  },
  reservas: {
    title: 'Reserva Tu Cabina',
    sub:   'Espacios privados disponibles para grupos y celebraciones especiales',
    img:   IMGS.cabina,      // foto zona cabinas/íntima
    wa:    '522224302693',
    waMsg: 'Hola, quiero hacer una reservación en Litros & Litros',
    items: [
      { icon:'🏠', label:'Cabinas Privadas',      desc:'Espacios íntimos para tu grupo' },
      { icon:'📋', label:'Reservación en Línea',  desc:'Rápido y sin complicaciones' },
      { icon:'🎉', label:'Paquetes Especiales',   desc:'Cumpleaños, despedidas y más' },
    ],
  },
  contact: {
    address: 'Blvd Héroes del 5 de Mayo 4610, Santa María, 72080 Heroica Puebla de Zaragoza, Pue.',
    phone:   '+52 222 430 2693',
    email:   'info@litrosylitros.com',
    hours:   'Martes a Domingo: 6:00 PM – 3:00 AM  |  Lunes cerrado',
    wa:      '522224302693',
  },
  footer: {
    brand:     'Litros & Litros',
    desc:      'Karaoke Bar en Puebla. El lugar donde se oye la música, el servicio y las alitas.',
    copyright: '© 2026 Litros & Litros Karaoke Bar. Todos los derechos reservados.',
  },
  socials: {
    fb: 'https://www.facebook.com/profile.php?id=61587845141536',
    ig: 'https://instagram.com',
    tt: '',
    yt: '',
  },
  seo: {
    title: 'Litros & Litros Karaoke Bar – Puebla | Reserva tu cabina',
    desc:  'El mejor karaoke bar en Puebla. Música en vivo, canciones a petición, alitas, bebidas y cabinas privadas. Abierto Martes a Domingo 6PM–3AM.',
    kw:    'bar karaoke puebla, litros y litros, karaoke puebla, cabinas privadas puebla, bar puebla',
  },
  menuBebidas: [
    { id:1,  cat:'Ron',       name:'Bacardi Blanco',                       vol:'700 ml',    botella:690,  copa:65   },
    { id:2,  cat:'Ron',       name:'Bacardi Sabores',                      vol:'700 ml',    botella:720,  copa:75   },
    { id:3,  cat:'Ron',       name:'Capitán Morgan',                       vol:'750 ml',    botella:790,  copa:78   },
    { id:4,  cat:'Ron',       name:'Zacapa 23',                            vol:'750 ml',    botella:1750, copa:170  },
    { id:5,  cat:'Vodka',     name:'Absolut Azul',                         vol:'750 ml',    botella:680,  copa:65   },
    { id:6,  cat:'Vodka',     name:'Absolut Sabores',                      vol:'750 ml',    botella:720,  copa:70   },
    { id:7,  cat:'Vodka',     name:'Zaverich Natural',                     vol:'700 ml',    botella:480,  copa:45   },
    { id:8,  cat:'Tequila',   name:'José Cuervo Especial',                 vol:'695 ml',    botella:null, copa:48   },
    { id:9,  cat:'Tequila',   name:'José Cuervo Tradicional',              vol:'695 ml',    botella:null, copa:70   },
    { id:10, cat:'Tequila',   name:'Don Julio 70',                         vol:'700 ml',    botella:1640, copa:145  },
    { id:11, cat:'Brandy',    name:'Torres X',                             vol:'700 ml',    botella:850,  copa:85   },
    { id:12, cat:'Brandy',    name:'Torres V',                             vol:'700 ml',    botella:790,  copa:null },
    { id:13, cat:'Whisky',    name:'Etiqueta Roja',                        vol:'700 ml',    botella:745,  copa:75   },
    { id:14, cat:'Whisky',    name:'Black & White',                        vol:'700 ml',    botella:700,  copa:70   },
    { id:15, cat:'Whisky',    name:"Buchanan's",                           vol:'750 ml',    botella:1590, copa:140  },
    { id:16, cat:'Whisky',    name:'Etiqueta Negra',                       vol:'700 ml',    botella:1450, copa:140  },
    { id:17, cat:'Mezcal',    name:'400 Conejos',                          vol:'750 ml',    botella:1100, copa:110  },
    { id:18, cat:'Mezcal',    name:'La Manuela',                           vol:'750 ml',    botella:null, copa:75   },
    { id:19, cat:'Digestivos',name:'Jägermeister',                         vol:'700 ml',    botella:null, copa:95   },
    { id:20, cat:'Digestivos',name:'Baileys',                              vol:'700 ml',    botella:900,  copa:95   },
    { id:21, cat:'Digestivos',name:'Anís Dulce Mico',                      vol:'700 ml',    botella:null, copa:45   },
    { id:22, cat:'Coctelería',name:'Pay Limón',                            vol:'335 ml',    botella:55,   copa:null },
    { id:23, cat:'Coctelería',name:'Azulito',                              vol:'335 ml',    botella:50,   copa:null },
    { id:24, cat:'Coctelería',name:'Piña Colada',                          vol:'335 ml',    botella:65,   copa:null },
    { id:25, cat:'Coctelería',name:'Helado Tinto',                         vol:'335 ml',    botella:75,   copa:null },
    { id:26, cat:'Cerveza',   name:'Carta Blanca',                         vol:'335 ml',    botella:30,   copa:null },
    { id:27, cat:'Cerveza',   name:'Corona / Victoria / Lager / Tecate',   vol:'335 ml',    botella:50,   copa:null },
    { id:28, cat:'Cerveza',   name:'Negra Modelo / Modelo Especial',       vol:'325 ml',    botella:60,   copa:null },
    { id:29, cat:'Cerveza',   name:'Caguamón',                             vol:'1.2 L',     botella:95,   copa:null },
    { id:30, cat:'Cerveza',   name:'10 Latas',                             vol:'355 ml c/u',botella:260,  copa:null },
    { id:31, cat:'Refrescos', name:'Refrescos',                            vol:'350 ml',    botella:38,   copa:null },
    { id:32, cat:'Refrescos', name:'Energet Azul',                         vol:'355 ml',    botella:45,   copa:null },
    { id:33, cat:'Refrescos', name:'Energet Azul Botella',                 vol:'285 ml',    botella:77,   copa:null },
    { id:34, cat:'Refrescos', name:'Jugo sabores',                         vol:'1 L',       botella:85,   copa:45  },
    { id:35, cat:'Refrescos', name:'Jugo de arándano',                     vol:'1 L',       botella:95,   copa:null },
    { id:36, cat:'Refrescos', name:'Jugo Mango Piña',                      vol:'1 L',       botella:130,  copa:null },
    { id:37, cat:'Refrescos', name:'Agua Natural',                         vol:'335 ml',    botella:30,   copa:null },
    { id:38, cat:'Refrescos', name:'Caribe Cooler',                        vol:'355 ml',    botella:90,   copa:null },
    { id:39, cat:'Refrescos', name:'Boones',                               vol:'750 ml',    botella:290,  copa:null },
    { id:40, cat:'Snacks',    name:'Papas Locas',                          vol:'Individual',botella:65,   copa:null },
    { id:41, cat:'Snacks',    name:'Nachos',                               vol:'—',         botella:100,  copa:null },
    { id:42, cat:'Snacks',    name:'Nachos Árabes',                        vol:'—',         botella:100,  copa:null },
    { id:43, cat:'Snacks',    name:'Nachos al Pastor',                     vol:'—',         botella:100,  copa:null },
  ],
  // legacy compat
  menuData:{ food:[], drinks:[] }, songs:[], karaokeDates:[], events:[],
  about:{ title:'', sub:'', h2:'', img:'', p1:'', p2:'', p3:'' },
}
