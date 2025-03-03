
export const HISTORICAL_FIGURES = [
  {
    id: 'leonardo-da-vinci',
    name: 'Leonardo da Vinci',
    period: '1452-1519',
    title: 'Renaissance Polymath',
    description: 'Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect.',
    image: 'https://images.unsplash.com/photo-1577083552778-fea5ca3411fc?q=80&w=500&auto=format&fit=crop',
    placeholder: 'Ask me about art, anatomy, engineering...'
  },
  {
    id: 'cleopatra',
    name: 'Cleopatra VII',
    period: '69 BC - 30 BC',
    title: 'Queen of the Ptolemaic Kingdom',
    description: 'The last active ruler of the Ptolemaic Kingdom of Egypt, known for her relationships with Julius Caesar and Mark Antony.',
    image: 'https://images.unsplash.com/photo-1645376905615-99a0b99631cc?q=80&w=500&auto=format&fit=crop',
    placeholder: 'Ask me about ruling Egypt, Rome, Caesar...'
  },
  {
    id: 'albert-einstein',
    name: 'Albert Einstein',
    period: '1879-1955',
    title: 'Theoretical Physicist',
    description: 'Developer of the theory of relativity, one of the two pillars of modern physics, alongside quantum mechanics.',
    image: 'https://images.unsplash.com/photo-1639763240648-13fab0d25602?q=80&w=500&auto=format&fit=crop',
    placeholder: 'Ask me about relativity, quantum physics...'
  },
  {
    id: 'marie-curie',
    name: 'Marie Curie',
    period: '1867-1934',
    title: 'Physicist & Chemist',
    description: 'Pioneer in the field of radioactivity, the first woman to win a Nobel Prize, and the only person to win Nobel Prizes in multiple scientific fields.',
    image: 'https://images.unsplash.com/photo-1601406774216-e0c3733a2cdd?q=80&w=500&auto=format&fit=crop',
    placeholder: 'Ask me about radioactivity, Nobel Prizes...'
  },
  {
    id: 'napoleon-bonaparte',
    name: 'Napoleon Bonaparte',
    period: '1769-1821',
    title: 'French Emperor',
    description: 'French statesman and military leader who rose to prominence during the French Revolution and led successful campaigns during the Revolutionary Wars.',
    image: 'https://images.unsplash.com/photo-1685541930172-cdee6a9f4ae5?q=80&w=500&auto=format&fit=crop',
    placeholder: 'Ask me about conquering Europe, Waterloo...'
  },
  {
    id: 'william-shakespeare',
    name: 'William Shakespeare',
    period: '1564-1616',
    title: 'Playwright & Poet',
    description: 'English poet, playwright, and actor, widely regarded as the greatest writer in the English language and the world\'s greatest dramatist.',
    image: 'https://images.unsplash.com/photo-1590374504316-f5ee44544522?q=80&w=500&auto=format&fit=crop',
    placeholder: 'Ask me about Hamlet, sonnets, theater...'
  }
];

export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
};

export type HistoricalFigure = typeof HISTORICAL_FIGURES[0];
