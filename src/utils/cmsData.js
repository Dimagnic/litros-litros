const BASE = 'https://plsxcorrlfkxsxunnmna.supabase.co/storage/v1/object/public/litros-images'
const OLD  = 'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)'
const LOGO = `${OLD}/karaoke.jpeg`

export const initialCMSData = {

  hero: {
    logo:   LOGO,
    bgImg:  `${OLD}/1.jpeg`,
    title:  'Litros & Litros',
    frase:  'EL LUGAR DONDE SE OYE LA MÚSICA, EL SERVICIO Y LAS AMISTADES PARA PASAR UN EXCELENTE MOMENTO',
    btn1:   'VER MENÚ PROMO',
    btn2:   'VER CARTA',
    btn3:   'RESERVAR',
  },

  horario: {
    titulo:   'HORARIO',
    horas:    'De 6:00 PM a 3:00 AM',
    descanso: 'Lunes Descansamos',
    dias:     'Karaoke todos los demás días',
  },

  menuPromo: {
    titulo:    'MENÚ PROMO',
    subtitulo: 'Las mejores promociones para tu noche',
    fotoUrl:   `${OLD}/promociones.jpeg`,
    nota:      'BLVD 5 DE MAYO #4610 · +222 430 26 93 · *Precios sujetos a cambio*',
  },

  bebidas: {
    titulo:    'CARTA DE BEBIDAS',
    subtitulo: 'La mejor selección de destilados, cocteles y bebidas',
    promo:     '🎂 Bebida de bienvenida gratis en tu cumpleaños',
    nota:      '*Propina opcional no incluida*',
  },

  reservas: {
    titulo:     'RESERVA TU MESA',
    bienvenida: 'Bienvenido a Litros & Litros Karaoke Bar. Completa los datos y te contactamos por WhatsApp para confirmar tu reservación.',
    wa:         '522224302693',
    waMsg:      'Hola, quiero hacer una reservación en Litros & Litros',
  },

  platillos: {
    alitas: {
      img:          `${OLD}/alitas.jpeg`,
      desc:         'Marinadas con sabor a elegir y aderezo incluido',
      ingredientes: [],
      aderezos:     [],
    },
    nachos: {
      img:          `${OLD}/nachos.jpeg`,
      desc:         'Totopo crujiente con chile y queso amarillo',
      ingredientes: [],
      especiales:   ['Carne Pastor','Carne Asada','Salsa Verde'],
    },
    hotdog: {
      img:          `${OLD}/hotdog.jpeg`,
      desc:         '',
      ingredientes: ['Pan caliente','Salchicha italiana','Tocino','Queso amarillo','Frijoles','Chiles','Catsup','Mayonesa','Mostaza'],
    },
    papas: {
      img:          `${OLD}/papas.jpeg`,
      desc:         'Papa ondulada · Sin exceso de aceite · Con queso amarillo · Aderezo y catsup',
      ingredientes: [],
    },
    hamburguesa: {
      img:          `${OLD}/hamburguesa.jpeg`,
      titulo:       'HAMBURGUESAS',
      desc:         'Preparada al momento con ingredientes seleccionados',
      ingredientes: ['Carne de res frita','Queso amarillo','Frijoles','Mantequilla','Tocino','Catsup','Mostaza','Mayonesa'],
      extras:       ['Papas onduladas','Aderezo de la casa'],
    },
  },

  alimentos: {
    tituloPrincipal: 'ALIMENTOS',
    imgPrincipal:    `${OLD}/alitas.jpeg`,
  },

  espectaculos: {
    'puerta-cerrada': {
      img:   `${OLD}/2.jpeg`,
      title: 'Puerta Cerrada',
      items: ['Eventos privados con reservación anticipada'],
    },
    'mejor-voz': {
      img:   `${OLD}/open_mind.jpeg`,
      title: 'Competencia por la Mejor Voz',
      items: ['Participa y gana premios'],
    },
    'karaoke': {
      img:   `${OLD}/karaoke.jpeg`,
      title: 'Karaoke con Animador',
      items: ['Ambiente dinámico'],
    },
    'vs-mesero': {
      img:   `${OLD}/vs_mesero.jpeg`,
      title: 'Compite con el Mesero',
      items: ['Si ganas recibes bebida gratis'],
      premio: '🎁 Si ganas recibes una bebida gratis',
    },
    'cumpleanos': {
      titulo: 'CUMPLEAÑOS',
      checks: [
        'Reserva con anticipación',
        'Mesa decorada',
        'Bebida de bienvenida',
        'Bebida gratis para el cumpleañero',
        'Bebida gratis para cada mesa',
      ],
      nota: '💡 Entre más mesas vengan a celebrar contigo, ¡más bebidas recibe el cumpleañero!',
      cta:  'RESERVAR AHORA',
    },
  },

  footer: {
    brand:     'Litros & Litros',
    desc:      'Karaoke Bar en Puebla',
    copyright: '© Litros & Litros Karaoke Bar — Todos los derechos reservados.',
  },

  socials: {
    fb: 'https://www.facebook.com/profile.php?id=61589505942247',
    ig: 'https://www.instagram.com/litr.oslitros/',
    tt: '',
    yt: '',
    wa: '522224302693',
  },

  waFlotante: {
    visible: true,
    numero:  '522224302693',
    mensaje: '¡Hola! Quiero reservar en Litros & Litros',
  },

  contact: {
    address: 'Blvd Héroes del 5 de Mayo 4610, Santa María, 72080 Puebla, Pue.',
    phone:   '+52 222 430 2693',
    email:   'info@litrosylitros.com',
    hours:   'Martes a Domingo: 6:00 PM – 3:00 AM | Lunes cerrado',
    wa:      '522224302693',
  },

  seo: {
    title: 'Litros & Litros Karaoke Bar – Puebla | Reserva tu mesa',
    desc:  'El mejor karaoke bar en Puebla. Música en vivo, canciones a petición, alitas, bebidas y más. Abierto Martes a Domingo 6PM–3AM.',
    kw:    'bar karaoke puebla, litros y litros, karaoke puebla, bar puebla',
  },


  galeria: {
    titulo:    'GALERÍA',
    subtitulo: 'Vive la experiencia — noches únicas, música en vivo y momentos que no olvidarás',
    imagenes: [
      'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)/1.jpeg',
      'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)/2.jpeg',
      'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)/3.jpeg',
      'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)/4.jpeg',
      'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)/5.jpeg',
      'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)/6.jpeg',
      'https://cdsisztvqtritdillnax.supabase.co/storage/v1/object/public/images%20(publico)/7.jpeg',
    ],
  },

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
    { id:33, cat:'Refrescos', name:'Jugo sabores',                       vol:'1 L',        botella:85,   copa:45  },
    { id:34, cat:'Refrescos', name:'Agua Natural',                       vol:'335 ml',     botella:30,   copa:null },
    { id:35, cat:'Refrescos', name:'Caribe Cooler',                      vol:'355 ml',     botella:90,   copa:null },
    { id:36, cat:'Snacks',    name:'Papas Locas',                        vol:'Individual', botella:65,   copa:null },
    { id:37, cat:'Snacks',    name:'Nachos',                             vol:'—',          botella:100,  copa:null },
    { id:38, cat:'Snacks',    name:'Nachos Árabes',                      vol:'—',          botella:100,  copa:null },
    { id:39, cat:'Snacks',    name:'Nachos al Pastor',                   vol:'—',          botella:100,  copa:null },
  ],
}

// Exportación separada para galería (se agrega al initialCMSData externamente)
// Se inyecta en CMSContext
