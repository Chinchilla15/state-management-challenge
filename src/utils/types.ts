export interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: {
    name: string;
  }[];
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

export interface NavItemProps {
  name: string;
  species: string;
  id: string;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}

type InfoTitle =
  | "Name"
  | "Species"
  | "Status"
  | "Gender"
  | "Location"
  | "Origin"
  | "Episode"
  | `Episode ${number}`;

type InfoItemType = {
  Name: { value: string };
  Species: { value: string };
  Status: { value: string };
  Gender: { value: string };
  Location: { value: string };
  Origin: { value: string };
  Episode: { value: string };
  [key: `Episode ${number}`]: { value: string };
};

export type CharacterInfoItemProps = {
  [K in InfoTitle]: {
    title: K;
    value: InfoItemType[K]["value"];
  };
}[InfoTitle];

export interface CharacterInfoProps {
  children?: React.ReactNode;
  imageSource?: string;
  imageAlt?: string;
}
