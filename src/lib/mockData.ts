import { EventData, Photo, Photographer, AdminStats, RevenueByEvent } from './types';

export const mockEvents: EventData[] = [
  {
    id: 'evt-1',
    name: 'Gama x Rival FC — Campeonato Brasiliense',
    date: '2025-03-15',
    location: 'Estádio Bezerrão, Gama-DF',
    thumbnail: 'https://picsum.photos/seed/stadium1/800/500',
    status: 'ativo',
    description: 'Jogo decisivo do campeonato brasiliense com casa cheia.',
    photoCount: 1250,
  },
  {
    id: 'evt-2',
    name: 'Noite no Bezerrão — Show de Luzes',
    date: '2025-02-28',
    location: 'Estádio Bezerrão, Gama-DF',
    thumbnail: 'https://picsum.photos/seed/concert1/800/500',
    status: 'encerrado',
    description: 'Evento especial com show de luzes e música ao vivo.',
    photoCount: 850,
  },
  {
    id: 'evt-3',
    name: 'Final da Copa — Gama FC x Brasília FC',
    date: '2025-04-20',
    location: 'Estádio Mané Garrincha, Brasília-DF',
    thumbnail: 'https://picsum.photos/seed/finalcup/800/500',
    status: 'ativo',
    description: 'A grande final da copa local entre os dois maiores rivais.',
    photoCount: 3400,
  },
  {
    id: 'evt-4',
    name: 'Festival de Verão — Arena Capital',
    date: '2025-01-10',
    location: 'Arena Capital, Brasília-DF',
    thumbnail: 'https://picsum.photos/seed/festival1/800/500',
    status: 'encerrado',
    description: 'Festival de verão com atrações musicais e esportivas.',
    photoCount: 2100,
  },
  {
    id: 'evt-5',
    name: 'Clássico do Cerrado — Semifinal',
    date: '2025-05-05',
    location: 'Estádio Serejão, Taguatinga-DF',
    thumbnail: 'https://picsum.photos/seed/classic1/800/500',
    status: 'ativo',
    description: 'Semifinal emocionante do clássico regional.',
    photoCount: 1800,
  },
];

const photographers = ['Ricardo Lemos', 'Ana Beatriz', 'Carlos Mendes', 'Juliana Rocha'];
const tagSets = [
  ['torcida', 'arquibancada'],
  ['familia', 'torcida'],
  ['jogador', 'campo'],
  ['torcida', 'gol'],
  ['familia', 'camarote'],
  ['jogador', 'comemoração'],
  ['torcida', 'festa'],
  ['familia', 'selfie'],
];

// Generate more photos for better scroll testing
export const mockPhotos: Photo[] = Array.from({ length: 48 }, (_, i) => {
  const eventIndex = i % mockEvents.length;
  return {
    id: `photo-${i + 1}`,
    url: `https://picsum.photos/seed/acutia${i + 1}/800/600`, // Ensure reliable dimensions
    eventId: mockEvents[eventIndex].id,
    tags: tagSets[i % tagSets.length],
    priceCents: [990, 1490, 1990, 2490, 2990][i % 5],
    photographerName: photographers[i % photographers.length],
    createdAt: new Date(2025, 0, 1 + i).toISOString(),
    width: 800,
    height: 600,
  };
});

export const mockPhotographers: Photographer[] = [
  { id: 'ph-1', name: 'Ricardo Lemos', email: 'ricardo@foto.com', status: 'aprovado', photosCount: 156 },
  { id: 'ph-2', name: 'Ana Beatriz', email: 'ana@foto.com', status: 'aprovado', photosCount: 203 },
  { id: 'ph-3', name: 'Carlos Mendes', email: 'carlos@foto.com', status: 'pendente', photosCount: 87 },
  { id: 'ph-4', name: 'Juliana Rocha', email: 'juliana@foto.com', status: 'aprovado', photosCount: 142 },
];

export const mockAdminStats: AdminStats = {
  visits: 12450,
  searches: 3280,
  cartAdds: 1560,
  purchases: 487,
  revenue: 2345000,
};

export const mockRevenueByEvent: RevenueByEvent[] = mockEvents.map((evt) => ({
  name: evt.name.split('—')[0].trim(),
  receita: Math.floor(Math.random() * 500000) + 100000,
  vendas: Math.floor(Math.random() * 200) + 50,
}));
