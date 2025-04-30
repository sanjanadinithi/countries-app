import { useEffect, useState } from 'react';

export default function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (code) => {
        setFavorites((prev) =>
            prev.includes(code) ? prev.filter(f => f !== code) : [...prev, code]
        );
    };

    return [favorites, toggleFavorite];
}
