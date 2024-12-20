export interface Character {
  id: string;
  name: string;
  image: string;
}

export interface FavoritesState {
  favorites: string[];
}

export const initialState: FavoritesState = {
  favorites: [],
};

export interface PageLayoutProps {
  children: React.ReactNode;
}
