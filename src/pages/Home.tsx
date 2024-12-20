import NavItem from "../components/NavItem";
import Sidebar from "../components/ui/SideBar";
import CharacterInfo from "../components/CharacterInfo";
import CharacterInfoItem from "../components/ui/CharacterInfoItem";
import { useQuery, gql, useReactiveVar } from "@apollo/client";
import type { Character } from "../utils/types";
import { useState, useRef, useCallback } from "react";
import { favoritesVar } from "../apollo/cache";

const GET_CHARACTERS = gql`
  query GetCharachters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
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
  }
`;

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  const favorites = useReactiveVar(favoritesVar);

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  const handleCharacterSelect = (id: string) => {
    const character = data.characters.results.find(
      (character: Character) => character.id === id,
    );
    setSelectedCharacter(character);
  };

  const handleMore = async () => {
    await fetchMore({
      variables: {
        page: data.characters.info.next,
      },
    });
  };

  const observer = useRef<IntersectionObserver>();
  const lastCharacterElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.characters.info.next) {
          handleMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, data?.characters.info.next],
  );

  const toggleFavorite = (id: string) => {
    const currentFavorites = favoritesVar();
    const newFavorites = currentFavorites.includes(id)
      ? currentFavorites.filter((f) => f !== id)
      : [...currentFavorites, id];

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
  return (
    <>
      <Sidebar>
        {data.characters.results.map((character: Character, index: number) => (
          <div
            ref={
              index === data.characters.results.length - 1
                ? lastCharacterElementRef
                : null
            }
            key={character.id}
          >
            <NavItem
              id={character.id}
              name={character.name}
              species={character.species}
              onSelect={handleCharacterSelect}
              isSelected={selectedCharacter?.id === character.id}
              isFavorite={favorites.includes(character.id)}
              onToggleFavorite={() => toggleFavorite(character.id)}
            />
          </div>
        ))}
        {loading && (
          <p className="p-4 text-center font-bold text-textLight">
            Loading more...
          </p>
        )}
      </Sidebar>
      <CharacterInfo
        imageSource={selectedCharacter?.image}
        imageAlt={selectedCharacter?.name}
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
    </>
  );
}
