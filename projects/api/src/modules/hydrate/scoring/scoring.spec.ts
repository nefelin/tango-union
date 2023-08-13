import { scoreTrack } from './scoring';
import { Track } from '../../../schemas/tracks.entity';
import { flagWeights } from './types';

it('should score tracks with no matching terms as 0', () => {
  expect(scoreTrack(noMatch, 0)).toEqual(0);
});

it('should score tracks with only TITLE match correctly', () => {
  expect(scoreTrack(titleMatch, 0)).toEqual(flagWeights.title);
});

it('should score tracks with only TITLE with OR "|" match correctly', () => {
  expect(scoreTrack(titleMatchWithOr, 0)).toEqual(flagWeights.title);
});

it('should score tracks with only year match correctly', () => {
  expect(scoreTrack(yearMatch, 0)).toEqual(flagWeights.year);
});

it('should score tracks with only singer match correctly', () => {
  expect(scoreTrack(singerMatch, 0)).toEqual(flagWeights.singer);
});

it('should score combined year and orchestra present correctly', () => {
  expect(scoreTrack(spotCheckedCanaro, 0)).toEqual(flagWeights.orchestra + flagWeights.year);
});

const noMatch: Track = {
  title: 'Bailango',
  genre: 'milonga candombe',
  orchestra: ['Mario Canaro'],
  singer: ['Carlos Acuña'],
  secondsLong: 116,
  year: 1968,
  updatedAt: new Date(),
  youtube: {
    flaggedForRescrape: false,
    linkScore: 0,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: '1gvBX7E5Jpg',
        title: 'Francisco Canaro y su Orquesta Típica - Candombe  /1941-1949 /  (2000)',
        description:
          'Francisco Canaro CANDOMBE 1941-1949 El Bandoneón 2000 TEMAS: 01) En Esta Tarde Gris - (Jose Maria Contursi / Mariano ...',
        secondsLong: 3405,
        whenPosted: '1 year ago',
        views: 447,
        authorName: 'Felipe Pinto: Folklore y Tango Argentino',
        authorUrl: 'https://youtube.com/channel/UC93LHIU-aDVdUxc9_2dZq2g',
      },
    ],
  },
  searchGrams:
    'ba bai bail baila bailan bailang bailango ma mar mari mario ca can cana canar canaro ca car carl carlo carlos ac acu acun acuna mi mil milo milon milong milonga ca can cand cando candom candomb candombe',
  id: 34,
};

const titleMatch: Track = {
  title: 'Bailango',
  genre: 'milonga candombe',
  orchestra: ['Mario Canaro'],
  singer: ['Carlos Acuña'],
  secondsLong: 116,
  year: 1968,
  updatedAt: new Date(),
  youtube: {
    flaggedForRescrape: false,
    linkScore: 4,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: '1gvBX7E5Jpg',
        title: 'Francisco Canaro y su Orquesta Típica - Candombe  /1941-1949 /  (2000)',
        description: 'Bailango',
        secondsLong: 3405,
        whenPosted: '1 year ago',
        views: 447,
        authorName: 'Felipe Pinto: Folklore y Tango Argentino',
        authorUrl: 'https://youtube.com/channel/UC93LHIU-aDVdUxc9_2dZq2g',
      },
    ],
  },
  searchGrams:
    'ba bai bail baila bailan bailang bailango ma mar mari mario ca can cana canar canaro ca car carl carlo carlos ac acu acun acuna mi mil milo milon milong milonga ca can cand cando candom candomb candombe',
  id: 34,
};

const titleMatchWithOr: Track = {
  title: 'blah | Some other title',
  genre: 'milonga candombe',
  orchestra: ['Mario Canaro'],
  singer: ['Carlos Acuña'],
  secondsLong: 116,
  year: 1968,
  updatedAt: new Date(),
  youtube: {
    flaggedForRescrape: false,
    linkScore: 4,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: '1gvBX7E5Jpg',
        title: 'Francisco Canaro y su Orquesta Típica - Candombe  /1941-1949 /  (2000)',
        description: 'some other title',
        secondsLong: 3405,
        whenPosted: '1 year ago',
        views: 447,
        authorName: 'Felipe Pinto: Folklore y Tango Argentino',
        authorUrl: 'https://youtube.com/channel/UC93LHIU-aDVdUxc9_2dZq2g',
      },
    ],
  },
  searchGrams:
    'ba bai bail baila bailan bailang bailango ma mar mari mario ca can cana canar canaro ca car carl carlo carlos ac acu acun acuna mi mil milo milon milong milonga ca can cand cando candom candomb candombe',
  id: 34,
};

const yearMatch: Track = {
  title: 'no match',
  genre: 'milonga candombe',
  orchestra: ['Mario Canaro'],
  singer: ['Carlos Acuña'],
  secondsLong: 116,
  year: 1968,
  updatedAt: new Date(),
  youtube: {
    flaggedForRescrape: false,
    linkScore: 4,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: '1gvBX7E5Jpg',
        title: '1968',
        description: 'some other title',
        secondsLong: 3405,
        whenPosted: '1 year ago',
        views: 447,
        authorName: 'Felipe Pinto: Folklore y Tango Argentino',
        authorUrl: 'https://youtube.com/channel/UC93LHIU-aDVdUxc9_2dZq2g',
      },
    ],
  },
  searchGrams:
    'ba bai bail baila bailan bailang bailango ma mar mari mario ca can cana canar canaro ca car carl carlo carlos ac acu acun acuna mi mil milo milon milong milonga ca can cand cando candom candomb candombe',
  id: 34,
};

const singerMatch: Track = {
  title: 'noMatch',
  genre: 'milonga candombe',
  orchestra: ['Mario Canaro'],
  singer: ['Carlos Acuña'],
  secondsLong: 116,
  year: 1968,
  updatedAt: new Date(),
  youtube: {
    flaggedForRescrape: false,
    linkScore: 4,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: '1gvBX7E5Jpg',
        title: 'Carlos Acuna',
        description: 'some other title',
        secondsLong: 3405,
        whenPosted: '1 year ago',
        views: 447,
        authorName: 'Felipe Pinto: Folklore y Tango Argentino',
        authorUrl: 'https://youtube.com/channel/UC93LHIU-aDVdUxc9_2dZq2g',
      },
    ],
  },
  searchGrams:
    'ba bai bail baila bailan bailang bailango ma mar mari mario ca can cana canar canaro ca car carl carlo carlos ac acu acun acuna mi mil milo milon milong milonga ca can cand cando candom candomb candombe',
  id: 34,
};

const spotCheckedCanaro: Track = {
  title: 'Bichito de luz',
  genre: 'tango',
  orchestra: ['Francisco Canaro'],
  year: 1926,
  updatedAt: new Date(),
  youtube: {
    flaggedForRescrape: false,
    scrapedAt: new Date(),
    links: [
      {
        unionRating: 0,
        videoId: 'emerglNGWH0',
        title: "Today's Tango Is... A Media Luz - Francisco Canaro 15-11-1926",
        description:
          'Music: Edgardo Donato Lyrics: Carlos César Lenzi A carefully prepared bachelor pad, no concierge, no nosey neighbours, nicely ...',
        secondsLong: 190,
        whenPosted: '7 years ago',
        views: 1191,
        authorName: 'Paul Bottomer',
        authorUrl: 'https://youtube.com/@paulbottomer3072',
      },
      {
        unionRating: 0,
        videoId: 'tMw-dM-xyno',
        title: 'A la Luz del Lucero (Instrumental) (Remasterizado)',
        description:
          'Provided to YouTube by The Orchard Enterprises A la Luz del Lucero (Instrumental) (Remasterizado) · Francisco Canaro ...',
        secondsLong: 189,
        whenPosted: null,
        views: 373,
        authorName: 'Francisco Canaro - Topic',
        authorUrl: 'https://youtube.com/channel/UCX5MF6qArIAAcAATjwU-AFw',
      },
      {
        unionRating: 0,
        videoId: 'Wpf6vB062XM',
        title: 'TANDA TANGO Julio De Caro Instrumental 1926-1927',
        description: 'Gallo ciego (1927) / Derecho viejo (1926) / Quejas de bandoneón (1926) / Recuerdo (1927)',
        secondsLong: 683,
        whenPosted: '5 years ago',
        views: 2229,
        authorName: 'Marco El Pibe TangoDj',
        authorUrl: 'https://youtube.com/@marcobuso6594',
      },
      {
        unionRating: 0,
        videoId: 'yKWXktg_PuU',
        title: 'Francisco Canaro Orquesta -A Media Luz- (Instrumental)',
        description: 'A Media Luz-Instrumental. Orquesta Francisco Canaro. Año 1926. Revision 2016.',
        secondsLong: 182,
        whenPosted: '6 years ago',
        views: 3862,
        authorName: 'El Coleccionista',
        authorUrl: 'https://youtube.com/@elcoleccionista5350',
      },
      {
        unionRating: 0,
        videoId: 'Vfs35x5QgJo',
        title: 'Canaro (Instrumental) (Remasterizado)',
        description:
          'Provided to YouTube by The Orchard Enterprises Canaro (Instrumental) (Remasterizado) · Francisco Canaro Colección Completa ...',
        secondsLong: 190,
        whenPosted: null,
        views: 49,
        authorName: 'Francisco Canaro - Topic',
        authorUrl: 'https://youtube.com/channel/UCX5MF6qArIAAcAATjwU-AFw',
      },
      {
        unionRating: 0,
        videoId: 's8tTq7_W7WI',
        title: 'Tanda di tango  Francisco Canaro  instrumental   1936 38',
        description:
          'Tanda di tango Francisco Canaro instrumental 2 1936 38 Pampa Lorenzo El caburé La melodía de nuestro adiós.',
        secondsLong: 680,
        whenPosted: '5 years ago',
        views: 1788,
        authorName: 'gaetano la bruna',
        authorUrl: 'https://youtube.com/@gaetanolabrunaprimerolamusica',
      },
      {
        unionRating: 0,
        videoId: 'KfTlEjhnaF8',
        title: 'ANOCHE A LAS DOS - TANGO | FRANCISCO CANARO (INSTRUMENTAL) - 1926 - RAÚL DE LOS HOYOS',
        description:
          'FRANCISCO CANARO, violinista, autor, compositor, es uno de los grandes talentos que aporto al tango valiosas interpretaciones ...',
        secondsLong: 183,
        whenPosted: '2 years ago',
        views: 66,
        authorName: 'Luis Perriere',
        authorUrl: 'https://youtube.com/@luisperriere2649',
      },
      {
        unionRating: 0,
        videoId: 't7CgJRJ5W3g',
        title: 'Francisco Canaro · Corazón de Oro      ( Instrumental )',
        description: 'Vals .. (Francisco Canaro)',
        secondsLong: 204,
        whenPosted: '6 years ago',
        views: 13239,
        authorName: 'Música típica',
        authorUrl: 'https://youtube.com/@FlorealCazorla',
      },
      {
        unionRating: 0,
        videoId: 'KVeG2-9Zig0',
        title: 'FRANCISCO CANARO - EL CHAMUYO - TANGO - 1933',
        description:
          'En historiando a don FRANCISCO CANARO el tango instrumental EL CHAMUYO grabado el 1 de septiembre de 1933.Se dice de mi.. a manos de Qto. Francisco Canaro.QUE DUO DE CANTORES EL INOLVIDABLE JUAN CARLOS GODOY Y ROBERTO MANCINI. TREMENDO.2004 Taipei Tango Festival bailan "poema" de Francisco Canaro, canta Roberto Maida, 1939.La Mufa - Sala Verdi Montevideo junio 2015 Lucía Gatti - Violonchello Alejandro Migues - Piano Martín Pugin - Bandoneón Jorge ...Provided to YouTube by The Orchard Enterprises Vibraciones Del Alma (Instrumental) (Remasterizado) · Francisco Canaro ...Varios Intérpretes ARGENTINÍSIMA (Vol. 8) MICROFÓN CM 568 1975 TEMAS: 01 - COMO SE DICE ADIÓS - canción - (David ...festival para los oidos y corazón con los celestiales sonidos de la orquesta tipica de FRANCISCO CANARO con temas grabados ...00:00 Te quiero todavia (Famà) 02:52 Mimosa (Instrumental) 05:41 Paciencia (Maida) 08:11 Azulidad (Charlo) 10:57 Al subir al ...',
        secondsLong: 195,
        whenPosted: '9 years ago',
        views: 31784,
        authorName: 'Cantando Tangos',
        authorUrl: 'https://youtube.com/@CantandoTangosPlus',
      },
      {
        unionRating: 0,
        videoId: '2W5jh8k93M4',
        title: 'Francisco Canaro - 1938 - Corazon de oro (Instrumental) (VALS)',
        description: 'Francisco Canaro - 1938 - Corazon de oro (Instrumental) (VALS)',
        secondsLong: 197,
        whenPosted: '5 years ago',
        views: 5065,
        authorName: 'T as Tango',
        authorUrl: 'https://youtube.com/@TasTango',
      },
      {
        unionRating: 0,
        videoId: '0CyyuTii1wA',
        title: 'Poema - Karaoke - TANGO (instrumental version Francisco Canaro)',
        description:
          'POEMA 首诗 Poem (1925) Music by: Mario Melfi Lyrics by: Eduardo Bianco Translated by: Alberto Paz It was a dream of sweet ...',
        secondsLong: 171,
        whenPosted: '9 years ago',
        views: 44478,
        authorName: 'Tango Secrets',
        authorUrl: 'https://youtube.com/@TangoSecrets',
      },
      {
        unionRating: 0,
        videoId: 'GTSZ-BAjSH4',
        title: 'A La Luz Del Candil (Instrumental) (Remasterizado)',
        description:
          'Provided to YouTube by The Orchard Enterprises A La Luz Del Candil (Instrumental) (Remasterizado) · Francisco Canaro ...',
        secondsLong: 159,
        whenPosted: null,
        views: 652,
        authorName: 'Francisco Canaro - Topic',
        authorUrl: 'https://youtube.com/channel/UCX5MF6qArIAAcAATjwU-AFw',
      },
      {
        unionRating: 0,
        videoId: 'wHpgxwnOTQ0',
        title: 'DIECISEIS - FRANCISCO CANARO - 1926 - TANGO STRUMENTALE',
        description: 'Titolo alternativo: El Dieciseis, El 16 Musica: Alberico Spatola.',
        secondsLong: 176,
        whenPosted: '1 year ago',
        views: 9,
        authorName: 'auditetango',
        authorUrl: 'https://youtube.com/@auditetango7972',
      },
      {
        unionRating: 0,
        videoId: 'rEkfdOKw9XQ',
        title: 'Francisco Canaro Orquesta -A La Luz De Un Candil- (Instrumental)',
        description: 'A La Luz De Un Candil-Instrumental. Orquesta Francisco Canaro. Año 1927. Revision 2016.',
        secondsLong: 157,
        whenPosted: '6 years ago',
        views: 2385,
        authorName: 'El Coleccionista',
        authorUrl: 'https://youtube.com/@elcoleccionista5350',
      },
      {
        unionRating: 0,
        videoId: 'gZ0IYroOz4A',
        title: 'Orq. Francisco Canaro - Ciego (1935) tango [instrumental]',
        description: '"Ciego" tango, 1935 Orquesta Tipica de Francisco Canaro versión instrumental.',
        secondsLong: 141,
        whenPosted: '3 years ago',
        views: 257,
        authorName: 'Klooney Tunes',
        authorUrl: 'https://youtube.com/@djkluni6492',
      },
      {
        unionRating: 0,
        videoId: 'L_IPe9GgcxI',
        title: 'Calavera Viejo (Instrumental) (Remasterizado 2018)',
        description:
          'Provided to YouTube by The Orchard Enterprises Calavera Viejo (Instrumental) (Remasterizado 2018) · Francisco Canaro ...',
        secondsLong: 176,
        whenPosted: null,
        views: 174,
        authorName: 'Francisco Canaro - Topic',
        authorUrl: 'https://youtube.com/channel/UCX5MF6qArIAAcAATjwU-AFw',
      },
      {
        unionRating: 0,
        videoId: 'VlCTB8xORVE',
        title: 'Orq. Francisco Canaro - Canto (1934) tango [instrumental]',
        description:
          '"Canto" Tango, 1934 Orquesta Tipica de Francisco Canaro Fragmento de tango "Canto", instrumental.',
        secondsLong: 106,
        whenPosted: '3 years ago',
        views: 236,
        authorName: 'Klooney Tunes',
        authorUrl: 'https://youtube.com/@djkluni6492',
      },
      {
        unionRating: 0,
        videoId: 'do9hPv_S5y4',
        title: 'La Granja de Zenón - Medio Peso',
        description:
          'La Granja de Zenón - Medio Peso (Prado Guerrero, Julio César) Riki Maravilla (P) y © 2021 Leader Music.A cantar y bailar con los Bichikids! Es hora de divertirse en familia con los bichitos mas lindos al ritmo de esta clásica canción ...Las Manos Hacia Arriba y más Canciones Infantiles | El Reino Infantil ▻TRACKLIST Las Manos Hacia Arriba Soy Una Taza A Ver ...Letra Un pato camina con sus dos patas, derecho va para el agua, el pato quiere nadar. Cua, cua, cua! Un pato paseando ...Letra: Susanita tiene un ratón un ratón chiquitín que come chocolate y turrón y bolitas de anís Duerme cerca del radiador con la ...',
        secondsLong: 194,
        whenPosted: '1 year ago',
        views: 94400688,
        authorName: 'Leader Music',
        authorUrl: 'https://youtube.com/@LeaderMusic',
      },
      {
        unionRating: 0,
        videoId: 'wsNDgoYiNvk',
        title: 'Francisco Canaro Orquesta -Bajo Belgrano- (Instrumental)',
        description: 'Bajo Belgrano-Instrumental. Orquesta Francisco Canaro. Año 1926. Revision 2016.',
        secondsLong: 180,
        whenPosted: '6 years ago',
        views: 659,
        authorName: 'El Coleccionista',
        authorUrl: 'https://youtube.com/@elcoleccionista5350',
      },
      {
        unionRating: 0,
        videoId: 'W70bp1dZvkk',
        title: 'A Media Luz (Instrumental) (Remasterizado 2018)',
        description:
          'Provided to YouTube by The Orchard Enterprises A Media Luz (Instrumental) (Remasterizado 2018) · Francisco Canaro ...',
        secondsLong: 180,
        whenPosted: null,
        views: 769,
        authorName: 'Francisco Canaro - Topic',
        authorUrl: 'https://youtube.com/channel/UCX5MF6qArIAAcAATjwU-AFw',
      },
      {
        unionRating: 0,
        videoId: 'H-yOwxRzUs4',
        title: 'Francisco Canaro Orquesta -La Cumparsita- (Instrumental)',
        description: 'La Cumparsita-Instrumental. Orquesta Francisco Canaro. Año 1927. Revision 2016.',
        secondsLong: 155,
        whenPosted: '6 years ago',
        views: 4500,
        authorName: 'El Coleccionista',
        authorUrl: 'https://youtube.com/@elcoleccionista5350',
      },
    ],
    linkScore: 0,
  },
  singer: ['Instrumental'],
  searchGrams:
    'bi bic bich bichi bichit bichito de lu luz fr fra fran franc franci francis francisc francisco ca can cana canar canaro ta tan tang tango',
  id: 411,
};
