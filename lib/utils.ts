import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, listingType?: string): string {
  if (isNaN(price) || price === 0) return 'Price on Request';

  let formatted = '';
  if (price >= 10000000) {
    const cr = price / 10000000;
    formatted = `₹${cr % 1 === 0 ? cr : cr.toFixed(2)} Cr`;
  } else if (price >= 100000) {
    const lakh = price / 100000;
    formatted = `₹${lakh % 1 === 0 ? lakh : lakh.toFixed(2)} Lakh`;
  } else {
    formatted = `₹${price.toLocaleString('en-IN')}`;
  }

  if (listingType === 'Rent') {
    formatted += ' / mo';
  }

  return formatted;
}

export function formatArea(sqft: number): string {
  if (!sqft || isNaN(sqft) || sqft === 0) return '';
  return `${sqft.toLocaleString('en-IN')} sq.ft.`;
}

// Local storage favorites helper
export function getFavoriteIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('apex_favorites');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function toggleFavoriteId(id: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const favorites = getFavoriteIds();
    const index = favorites.indexOf(id);
    let updated: string[];
    if (index >= 0) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    localStorage.setItem('apex_favorites', JSON.stringify(updated));
    // Dispatch custom event for UI updates across components
    window.dispatchEvent(new Event('favorites-updated'));
    return updated;
  } catch (e) {
    return [];
  }
}
