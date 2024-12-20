import { makeVar, InMemoryCache } from "@apollo/client";

const loadFavorites = (): string[] => {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const favoritesVar = makeVar<string[]>(loadFavorites());

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        favorites: {
          read() {
            return favoritesVar();
          },
        },
        characters: {
          keyArgs: false,
          merge(existing, incoming) {
            if (!existing) return incoming;

            return {
              ...incoming,
              results: [...existing.results, ...incoming.results],
            };
          },
        },
      },
    },
  },
});
