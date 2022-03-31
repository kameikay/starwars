import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { CharacterCard } from '../../components/CharacterCard';
import { InputSearch } from '../../components/InputSearch';

import { api } from '../../services/api';

import { Character } from '../../types/Character.type';
import { Container } from './styles';
import { PaginationButton } from '../../components/PaginationButton';
import { CompleteDataTypes } from '../../types/CompleteData.types';

export default function Home() {
  const [data, setData] = useState<CompleteDataTypes>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);

  const getData = useCallback(async () => {
    const response = await api.get(`people/?page=${page}`);

    const returnedData = await response.data;

    setData(returnedData);
    setCharacters(returnedData.results);

    console.log('request');
  }, [page]);

  function getCharacterId(character: Character) {
    const splitedUrl = character.url.split('/');
    const characterId = splitedUrl[splitedUrl.length - 2];

    return characterId;
  }

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container>
      <div className="title">
        <h1>
          Buscador -
          {' '}
          <span>Star Wars</span>
        </h1>
      </div>

      <div className="header">
        <InputSearch
          type="text"
          placeholder="Digite o nome do personagem a ser buscado..."
        />

        <div className="pagination">
          {page === 1 ? (
            <PaginationButton disabled>
              <MdArrowBackIosNew />
            </PaginationButton>
          ) : (
            <PaginationButton onClick={() => setPage(page - 1)}>
              <MdArrowBackIosNew />
            </PaginationButton>
          )}

          {page < 3 ? (
            <>
              <PaginationButton isActive>{page}</PaginationButton>
              <PaginationButton onClick={() => setPage(page + 1)}>
                {page + 1}
              </PaginationButton>
              <PaginationButton onClick={() => setPage(page + 2)}>
                {page + 2}
              </PaginationButton>
            </>
          ) : (
            <>
              <PaginationButton onClick={() => setPage(page - 1)}>
                {page - 1}
              </PaginationButton>
              <PaginationButton isActive>{page}</PaginationButton>
              <PaginationButton onClick={() => setPage(page + 1)}>
                {page + 1}
              </PaginationButton>
            </>
          )}

          {!data?.next ? (
            <PaginationButton disabled>
              <MdArrowForwardIos />
            </PaginationButton>
          ) : (
            <PaginationButton onClick={() => setPage(page + 1)}>
              <MdArrowForwardIos />
            </PaginationButton>
          )}
        </div>
      </div>

      <div className="cards">
        {characters.map((character) => (
          <Link
            to={`/characters/${getCharacterId(character)}`}
            key={character.name}
          >
            <CharacterCard
              imageUrl={`https://starwars-visualguide.com/assets/img/characters/${getCharacterId(
                character,
              )}.jpg`}
              name={character.name}
            />
          </Link>
        ))}
      </div>
    </Container>
  );
}
