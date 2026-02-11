import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, CartItem, Photo, EventData, Photographer } from '@/lib/types';
import { storage } from '@/lib/storage';
import { mockEvents, mockPhotographers } from '@/lib/mockData';

interface StoreContextType {
    // User State
    user: User;
    login: (name: string, email: string) => void;
    logout: () => void;

    // Cart State
    cart: CartItem[];
    addToCart: (photo: Photo) => void;
    removeFromCart: (photoId: string) => void;
    clearCart: () => void;
    cartCount: number;

    // Favorites State
    favorites: string[];
    toggleFavorite: (photoId: string) => void;
    isFavorite: (photoId: string) => boolean;

    // Matched Photos (Find Flow)
    matchedPhotos: Photo[];
    setMatchedPhotos: (photos: Photo[]) => void;

    // Admin State
    events: EventData[];
    addEvent: (event: EventData) => void;
    photographers: Photographer[];
    togglePhotographerStatus: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    // Initialize state from storage
    const [user, setUserState] = useState<User>(storage.getUser());
    const [cart, setCartState] = useState<CartItem[]>(storage.getCart());
    const [favorites, setFavoritesState] = useState<string[]>(storage.getFavorites());
    const [matchedPhotos, setMatchedPhotosState] = useState<Photo[]>(storage.getMatchedPhotos());
    const [events, setEventsState] = useState<EventData[]>(storage.getEvents());
    const [photographers, setPhotographersState] = useState<Photographer[]>(storage.getPhotographers());

    // -- User Actions --
    const login = (name: string, email: string) => {
        const newUser = { id: 'u-1', name, email, isLoggedIn: true };
        storage.setUser(newUser);
        setUserState(newUser);
    };

    const logout = () => {
        storage.logout();
        setUserState({ id: '', name: '', email: '', isLoggedIn: false });
    };

    // -- Cart Actions --
    const addToCart = (photo: Photo) => {
        storage.addToCart(photo);
        setCartState(storage.getCart()); // Update local state from storage source of truth
    };

    const removeFromCart = (photoId: string) => {
        storage.removeFromCart(photoId);
        setCartState(storage.getCart());
    };

    const clearCart = () => {
        storage.clearCart();
        setCartState([]);
    };

    // -- Favorites Actions --
    const toggleFavorite = (photoId: string) => {
        const newFavs = storage.toggleFavorite(photoId);
        setFavoritesState(newFavs);
    };

    const isFavorite = (photoId: string) => favorites.includes(photoId);

    // -- Matched Photos --
    const setMatchedPhotos = (photos: Photo[]) => {
        storage.setMatchedPhotos(photos);
        setMatchedPhotosState(photos);
    };

    // -- Admin Actions --
    const addEvent = (event: EventData) => {
        const newEvents = [event, ...events];
        storage.setEvents(newEvents);
        setEventsState(newEvents);
    };

    const togglePhotographerStatus = (id: string) => {
        const newPhotographers = photographers.map(p =>
            p.id === id ? { ...p, status: p.status === 'aprovado' ? 'pendente' : 'aprovado' } as Photographer : p
        );
        storage.setPhotographers(newPhotographers);
        setPhotographersState(newPhotographers);
    };

    return (
        <StoreContext.Provider
            value={{
                user,
                login,
                logout,
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                cartCount: cart.length,
                favorites,
                toggleFavorite,
                isFavorite,
                matchedPhotos,
                setMatchedPhotos,
                events,
                addEvent,
                photographers,
                togglePhotographerStatus,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
