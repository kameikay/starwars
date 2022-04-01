import React, { useCallback, useEffect, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { debounce } from 'lodash';
import { Card } from '../../components/CharacterCard';
import { InputSearch } from '../../components/InputSearch';

import { api } from '../../services/api';

import { Character } from '../../types/Character.type';
import { Container } from './styles';
import { PaginationButton } from '../../components/PaginationButton';
import { CompleteDataTypes } from '../../types/CompleteData.types';
import { Loading } from '../../components/Loading';
import { getUrlId } from '../../utils/getUrlId';
import { SelectButton } from '../../components/SelectButton';

export default function Home() {
  const [data, setData] = useState<CompleteDataTypes>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavouriteSelected, setIsFavouriteSelected] = useState<boolean>(false);

  const getData = useCallback(async () => {
    try {
      const response = await api.get(`people/?page=${page}`);

      const returnedData = await response.data;

      setData(returnedData);
      setCharacters(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const getFilteredData = useCallback(async () => {
    try {
      const response = await api.get(`people/?search=${inputSearch}`);

      const returnedData = await response.data;

      setData(returnedData);
      setCharacters(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [inputSearch]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputSearch(event.target.value);
  }

  const debouncedOnChange = debounce(handleInputChange, 500);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [getData]);

  useEffect(() => {
    setIsLoading(true);
    getFilteredData();
  }, [getFilteredData]);

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
          onChange={(event) => debouncedOnChange(event)}
        />

        <div className="select">
          <SelectButton
            type="button"
            isSelected={isFavouriteSelected === false}
            onClick={() => setIsFavouriteSelected(false)}
          >
            Todos
          </SelectButton>
          <SelectButton
            isSelected={isFavouriteSelected === true}
            onClick={() => setIsFavouriteSelected(true)}
          >
            Favoritos
          </SelectButton>
        </div>

        {!inputSearch && (
          <div className="pagination">
            {page === 1 ? (
              <div />
            ) : (
              <PaginationButton onClick={() => setPage(page - 1)}>
                <MdArrowBackIosNew />
              </PaginationButton>
            )}

            {page < 3 ? (
              <>
                <PaginationButton
                  isActive={page === 1}
                  onClick={() => setPage(1)}
                >
                  1
                </PaginationButton>
                <PaginationButton
                  isActive={page === 2}
                  onClick={() => setPage(2)}
                >
                  2
                </PaginationButton>
                <PaginationButton
                  isActive={page === 3}
                  onClick={() => setPage(3)}
                >
                  3
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
              <div />
            ) : (
              <PaginationButton onClick={() => setPage(page + 1)}>
                <MdArrowForwardIos />
              </PaginationButton>
            )}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="loading">
          <Loading />
          <span>Carregando dados...</span>
        </div>
      ) : (
        !isFavouriteSelected && (
          <div className="cards">
            {characters.map((character) => (
              <Card
                imageUrl={`https://starwars-visualguide.com/assets/img/characters/${getUrlId(
                  character.url,
                )}.jpg`}
                name={character.name}
                key={character.name}
                id={getUrlId(character.url)}
                type="characters"
              />
            ))}
          </div>
        )
      )}
    </Container>
  );
}
