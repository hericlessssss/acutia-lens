import { User, CartItem, Photo, Order, EventData, Photographer } from './types';
import { mockEvents, mockPhotographers } from './mockData';

export const KEYS = {
  CART: 'acutia_cart',
  FAVORITES: 'acutia_favorites',
  THEME: 'acutia_theme',
  USER_CONSENT: 'acutia_consent',
  USER: 'acutia_user',
  MATCHED_PHOTOS: 'acutia_matched_photos',
  ORDERS: 'acutia_orders',
  EVENTS: 'acutia_events',
  PHOTOGRAPHERS: 'acutia_photographers',
};

const get = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
};

const set = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage`, e);
  }
};

const remove = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`Error removing ${key} from localStorage`, e);
  }
};

export const storage = {
  get,
  set,
  remove,

  // User
  getUser: (): User => get<User>(KEYS.USER, { id: '', name: '', email: '', isLoggedIn: false }),
  setUser: (user: User) => set(KEYS.USER, user),
  logout: () => remove(KEYS.USER),

  // Cart
  getCart: (): CartItem[] => get<CartItem[]>(KEYS.CART, []),
  setCart: (cart: CartItem[]) => set(KEYS.CART, cart),
  addToCart: (photo: Photo) => {
    const cart = get<CartItem[]>(KEYS.CART, []);
    if (!cart.find(i => i.photo.id === photo.id)) {
      set(KEYS.CART, [...cart, { photo, quantity: 1 }]);
    }
  },
  removeFromCart: (photoId: string) => {
    const cart = get<CartItem[]>(KEYS.CART, []);
    set(KEYS.CART, cart.filter(i => i.photo.id !== photoId));
  },
  clearCart: () => set(KEYS.CART, []),

  // Favorites
  getFavorites: (): string[] => get<string[]>(KEYS.FAVORITES, []),
  toggleFavorite: (photoId: string): string[] => {
    const favs = get<string[]>(KEYS.FAVORITES, []);
    const newFavs = favs.includes(photoId)
      ? favs.filter(id => id !== photoId)
      : [...favs, photoId];
    set(KEYS.FAVORITES, newFavs);
    return newFavs;
  },

  // Photos & Orders
  getMatchedPhotos: (): Photo[] => get<Photo[]>(KEYS.MATCHED_PHOTOS, []),
  setMatchedPhotos: (photos: Photo[]) => set(KEYS.MATCHED_PHOTOS, photos),

  getOrders: (): Order[] => get<Order[]>(KEYS.ORDERS, []),
  addOrder: (order: Order) => {
    const orders = get<Order[]>(KEYS.ORDERS, []);
    set(KEYS.ORDERS, [order, ...orders]);
  },
  getOrder: (id: string): Order | undefined => {
    return get<Order[]>(KEYS.ORDERS, []).find(o => o.id === id);
  },

  // Admin Persistence
  getEvents: (): EventData[] => get<EventData[]>(KEYS.EVENTS, mockEvents),
  setEvents: (events: EventData[]) => set(KEYS.EVENTS, events),

  getPhotographers: (): Photographer[] => get<Photographer[]>(KEYS.PHOTOGRAPHERS, mockPhotographers),
  setPhotographers: (ph: Photographer[]) => set(KEYS.PHOTOGRAPHERS, ph),
};
