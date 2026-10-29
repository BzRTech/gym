// Dados fictícios do protótipo. Nada aqui vem de um servidor.
window.CP_DATA = {
  users: {
    me:  { name: 'Você',           short: 'VC', color: '#FF4D1F' },
    u1:  { name: 'Rafaela Lima',   short: 'RL', color: '#8E84D6' },
    u2:  { name: 'Bruno Costa',    short: 'BC', color: '#3DDC97' },
    u3:  { name: 'Camila Rocha',   short: 'CR', color: '#FFB547' },
    u4:  { name: 'Diego Alves',    short: 'DA', color: '#4FC3F7' },
    u5:  { name: 'Júlia Martins',  short: 'JM', color: '#F06292' },
    u6:  { name: 'Thiago Nunes',   short: 'TN', color: '#BA68C8' },
    u7:  { name: 'Larissa Souza',  short: 'LS', color: '#81C784' },
    u8:  { name: 'Pedro Henrique', short: 'PH', color: '#FF8A65' },
    u9:  { name: 'Marina Prado',   short: 'MP', color: '#4DD0E1' },
    u10: { name: 'Gustavo Reis',   short: 'GR', color: '#AED581' },
    u11: { name: 'Ana Beatriz',    short: 'AB', color: '#FFD54F' },
  },

  // A Checkpoint trabalha só com CrossFit e Hyrox; o "foco" varia por aula
  modalities: {
    crossfit: { name: 'CrossFit', icon: 'kettlebell' },
    hyrox:    { name: 'Hyrox',    icon: 'run' },
  },

  coaches: ['Coach Diego', 'Coach Bia', 'Coach Marcos', 'Coach Nanda', 'Coach Léo'],

  // [horário, modalidade, foco, coach (índice), espaço, vagas, duração em min]
  schedule: {
    weekdayA: [ // seg, qua, sex
      ['06:00', 'crossfit', 'WOD',                0, 'Box',        16, 60],
      ['07:00', 'hyrox',    'Corrida + estações', 3, 'Área Hyrox', 14, 60],
      ['12:00', 'crossfit', 'WOD express',        2, 'Box',        14, 45],
      ['17:30', 'hyrox',    'Endurance',          3, 'Área Hyrox', 14, 60],
      ['18:30', 'crossfit', 'WOD',                0, 'Box',        18, 60],
      ['19:30', 'crossfit', 'LPO',                4, 'Box',        12, 60],
      ['20:30', 'hyrox',    'Corrida + estações', 1, 'Área Hyrox', 14, 60],
    ],
    weekdayB: [ // ter, qui
      ['06:00', 'hyrox',    'Corrida + estações', 3, 'Área Hyrox', 14, 60],
      ['07:00', 'crossfit', 'WOD',                0, 'Box',        16, 60],
      ['12:00', 'crossfit', 'WOD express',        2, 'Box',        14, 45],
      ['17:30', 'crossfit', 'Ginástica',          1, 'Box',        12, 60],
      ['18:30', 'hyrox',    'Estações',           3, 'Área Hyrox', 14, 60],
      ['19:30', 'crossfit', 'WOD',                0, 'Box',        18, 60],
      ['20:30', 'crossfit', 'Iniciantes',         4, 'Box',        12, 60],
    ],
    saturday: [
      ['08:00', 'hyrox',    'Simulado Hyrox',     3, 'Área Hyrox', 20, 90],
      ['09:30', 'crossfit', 'WOD em dupla',       0, 'Box',        20, 60],
    ],
    sunday: [
      ['09:00', 'crossfit', 'Open Box',           2, 'Box',        24, 90],
    ],
  },

  // Desafio: começou há 28 dias, dura 60
  challenge: { name: 'Projeto Verão', subtitle: 'Desafio Checkpoint', startedDaysAgo: 28, length: 60 },

  // Placar dos outros alunos dentro do desafio
  stats: {
    u1:  { checkins: 24, minutes: 1380, points: 295 },
    u2:  { checkins: 21, minutes: 1150, points: 250 },
    u3:  { checkins: 19, minutes: 1010, points: 225 },
    u4:  { checkins: 17, minutes: 990,  points: 205 },
    u5:  { checkins: 20, minutes: 900,  points: 230 },
    u6:  { checkins: 15, minutes: 820,  points: 170 },
    u7:  { checkins: 22, minutes: 1100, points: 260 },
    u8:  { checkins: 12, minutes: 640,  points: 135 },
    u9:  { checkins: 16, minutes: 870,  points: 185 },
    u10: { checkins: 14, minutes: 760,  points: 150 },
    u11: { checkins: 9,  minutes: 410,  points: 100 },
  },

  // Seu histórico antes desta sessão (dias atrás em que houve check-in)
  me: {
    historyDaysAgo: [1, 2, 3, 4, 6, 8, 9, 10, 11, 13, 15, 16, 17, 20, 22, 23, 24, 27],
    minutes: 936,
    points: 210,
    classesAttended: 6,
    memberSince: 'mar/2025',
    plan: 'Plano Black',
  },

  groups: [
    { id: 'geral',   name: 'Projeto Verão', sub: 'Todos os alunos', code: 'CKP-VERAO', members: 'all' },
    { id: 'turma6h', name: 'Turma das 6h', sub: '5 membros', code: 'CKP-6H42', members: ['me', 'u2', 'u4', 'u7', 'u8'] },
    { id: 'squad',   name: 'Squad Hyrox', sub: '4 membros', code: 'CKP-HYRX', members: ['me', 'u1', 'u3', 'u5'] },
  ],

  // Grupo que aparece ao entrar com qualquer código no protótipo
  joinableGroup: { id: 'box', name: 'Galera do Box', sub: '6 membros', members: ['me', 'u1', 'u2', 'u6', 'u9', 'u10'] },

  // Feed inicial (ago = minutos atrás)
  posts: [
    { id: 'p1', user: 'u1', ago: 25, act: 'crossfit', min: 60, theme: 0, groups: ['geral', 'squad'],
      text: 'Fran em 6:12 hoje 🥵 PR!!',
      reactions: { fire: 14, muscle: 6, clap: 3 },
      comments: [{ user: 'u3', text: 'Monstra!! 🔥' }, { user: 'u5', text: 'Quero esse pique' }] },
    { id: 'p2', user: 'u2', ago: 100, act: 'hyrox', min: 60, theme: 1, groups: ['geral', 'turma6h'],
      text: 'Turma das 6h: 8 km + estações. O sled push acabou comigo ☀️',
      reactions: { fire: 9, muscle: 4, clap: 2 },
      comments: [{ user: 'u4', text: 'Presente amanhã!' }, { user: 'u7', text: 'Bora!!' }] },
    { id: 'p3', user: 'u5', ago: 190, act: 'hyrox', min: 75, theme: 2, groups: ['geral', 'squad'],
      text: 'Treino de dupla pra prova de dezembro com a Camila 💪',
      reactions: { fire: 11, muscle: 2, clap: 5 }, comments: [] },
    { id: 'p4', user: 'u7', ago: 320, act: 'crossfit', min: 60, theme: 3, groups: ['geral', 'turma6h'],
      text: 'Dia de LPO: PR no snatch, 55 kg!',
      reactions: { fire: 18, muscle: 9, clap: 4 },
      comments: [{ user: 'u2', text: 'Que técnica!' }] },
    { id: 'p5', user: 'u4', ago: 1260, act: 'crossfit', min: 60, theme: 0, groups: ['geral', 'turma6h'],
      text: 'Chipper de 30 min com a galera da noite 🔥',
      reactions: { fire: 7, muscle: 5, clap: 1 }, comments: [] },
    { id: 'p6', user: 'u3', ago: 1500, act: 'hyrox', min: 90, theme: 2, groups: ['geral', 'squad'],
      text: 'Simulado completo: 1h28. Bora baixar esse tempo!',
      reactions: { fire: 6, muscle: 1, clap: 8 }, comments: [] },
    { id: 'p7', user: 'u6', ago: 1700, act: 'hyrox', min: 60, theme: 1, groups: ['geral'],
      text: 'Wall balls, remo e corrida. O pulmão pediu socorro.',
      reactions: { fire: 10, muscle: 3, clap: 2 }, comments: [] },
    { id: 'p8', user: 'u8', ago: 2000, act: 'crossfit', min: 45, theme: 3, groups: ['geral', 'turma6h'],
      text: 'WOD express no almoço: 45 min que parecem 3 horas',
      reactions: { fire: 5, muscle: 4, clap: 1 }, comments: [] },
  ],
};
