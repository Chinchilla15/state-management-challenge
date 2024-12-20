import { useQuery, gql, useReactiveVar } from "@apollo/client";
import { favoritesVar } from "../apollo/cache";
import type { Character, PageProps } from "@/utils/types";
import CharacterInfo from "../components/CharacterInfo";
import CharacterInfoItem from "../components/ui/CharacterInfoItem";
import Sidebar from "../components/ui/SideBar";
import NavItem from "../components/NavItem";
import { useState } from "react";
import client from "../apollo/client";

const GET_CHARACTERS_BY_IDS = gql`
  query GetCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
      species
      status
      gender
      origin {
        name
      }
      location {
        name
      }
      episode {
        name
      }
    }
  }
`;

export default function Favorites({
  isMobileView,
  onCharacterSelect,
}: PageProps) {
  const favorites = useReactiveVar(favoritesVar);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  const { data, loading, error } = useQuery(GET_CHARACTERS_BY_IDS, {
    variables: { ids: favorites },
    skip: favorites.length === 0,
  });

  const handleCharacterSelect = (id: string) => {
    const character = data.charactersByIds.find(
      (character: Character) => character.id === id,
    );
    setSelectedCharacter(character);
    onCharacterSelect(character);
  };

  const toggleFavorite = (id: string) => {
    const currentFavorites = favoritesVar();
    const newFavorites = currentFavorites.filter((f) => f !== id);

    // Optimistic update
    const previousData = client.cache.readQuery({
      query: GET_CHARACTERS_BY_IDS,
      variables: { ids: currentFavorites },
    });

    client.cache.writeQuery({
      query: GET_CHARACTERS_BY_IDS,
      variables: { ids: newFavorites },
      data: {
        charactersByIds: previousData.charactersByIds.filter(
          (c: Character) => c.id !== id,
        ),
      },
    });

    if (selectedCharacter?.id === id) {
      setSelectedCharacter(null);
    }

    favoritesVar(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  if (loading)
    return (
      <Sidebar>
        <p className="p-4 text-center font-bold text-textLight">Loading...</p>
      </Sidebar>
    );

  if (error)
    return (
      <Sidebar>
        <p className="p-4 text-center font-bold text-textEmphasis">
          Failed to Load Data
        </p>
      </Sidebar>
    );

  if (!data || favorites.length === 0)
    return (
      <Sidebar>
        <p className="p-4 text-center font-bold text-textLight">
          No favorites yet
        </p>
      </Sidebar>
    );

  return (
    <>
      <Sidebar className={isMobileView && selectedCharacter ? "hidden" : ""}>
        {data.charactersByIds.map((character: Character) => (
          <NavItem
            key={character.id}
            id={character.id}
            name={character.name}
            species={character.species}
            onSelect={handleCharacterSelect}
            isSelected={selectedCharacter?.id === character.id}
            isFavorite={true}
            onToggleFavorite={() => toggleFavorite(character.id)}
          />
        ))}
      </Sidebar>
      {(!isMobileView || selectedCharacter) && (
        <CharacterInfo
          imageSource={selectedCharacter?.image}
          imageAlt={selectedCharacter?.name}
          className={
            isMobileView && selectedCharacter
              ? "fixed inset-0 z-50 bg-white"
              : ""
          }
        >
          {selectedCharacter ? (
            <>
              <h2 className="text-textDark- mb-4 text-default font-bold">
                General Information
              </h2>
              <CharacterInfoItem title="Name" value={selectedCharacter.name} />
              <CharacterInfoItem
                title="Species"
                value={selectedCharacter.species}
              />
              <CharacterInfoItem
                title="Status"
                value={selectedCharacter.status}
              />
              <CharacterInfoItem
                title="Gender"
                value={selectedCharacter.gender}
              />
              <CharacterInfoItem
                title="Location"
                value={selectedCharacter.location.name}
              />
              <CharacterInfoItem
                title="Origin"
                value={selectedCharacter.origin.name}
              />
              <div className="mt-8">
                <h2 className="text-textDark- mb-4 text-default font-bold">
                  Episodes
                </h2>
                {selectedCharacter.episode.slice(0, 5).map((episode, index) => (
                  <CharacterInfoItem
                    title={`Episode ${index + 1}`}
                    value={episode.name}
                  />
                ))}
              </div>
              <button
                className={`mt-4 rounded px-4 py-2 ${
                  favorites.includes(selectedCharacter.id)
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => toggleFavorite(selectedCharacter.id)}
              >
                {favorites.includes(selectedCharacter.id)
                  ? "Remove from favorites"
                  : "Add to favorites"}
              </button>
            </>
          ) : (
            ""
          )}
        </CharacterInfo>
      )}
    </>
  );
}
