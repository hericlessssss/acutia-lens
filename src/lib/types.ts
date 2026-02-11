export interface EventData {
  id: string;
  name: string;
  date: string;
  location: string;
  thumbnail: string;
  status: 'ativo' | 'encerrado';
  description?: string;
  photographers?: string[];
  photoCount?: number;
}

export interface Photo {
  id: string;
  url: string;
  eventId: string;
  tags: string[];
  priceCents: number;
  photographerName: string;
  matchScore?: number;
  createdAt: string;
  width?: number;
  height?: number;
  blurDataUrl?: string; // For skeleton loading
}

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface CartItem {
  photo: Photo;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  date: string;
  total: number;
  platformFee: number;
  customerName: string;
  customerEmail: string;
  paymentMethod: 'pix' | 'cartao';
  status: 'aprovado' | 'pendente' | 'cancelado';
}

export interface Photographer {
  id: string;
  name: string;
  email: string;
  status: 'aprovado' | 'pendente';
  photosCount: number;
  avatar?: string;
}

export interface AdminStats {
  visits: number;
  searches: number;
  cartAdds: number;
  purchases: number;
  revenue: number;
}

export interface RevenueByEvent {
  name: string;
  receita: number;
  vendas: number;
}

export interface SearchResult {
  matches: Photo[];
  processingTimeMs: number;
}
