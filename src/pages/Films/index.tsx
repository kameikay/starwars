import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Card } from '../../components/CharacterCard';
import { InputSearch } from '../../components/InputSearch';

import { api } from '../../services/api';

import { Container } from './styles';
import { Loading } from '../../components/Loading';
import { getUrlId } from '../../utils/getUrlId';
import { Film } from '../../types/Film.types';

export default function Films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = useCallback(async () => {
    try {
      const response = await api.get('films/');

      const returnedData = await response.data;

      setFilms(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFilteredData = useCallback(async () => {
    try {
      const response = await api.get(`films/?search=${inputSearch}`);

      const returnedData = await response.data;

      setFilms(returnedData.results);
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
          Filmes -
          {' '}
          <span>Star Wars</span>
        </h1>
      </div>

      <div className="header">
        <InputSearch
          type="text"
          placeholder="Digite o nome do filme a ser buscado..."
          onChange={(event) => debouncedOnChange(event)}
        />
      </div>

      {isLoading ? (
        <div className="loading">
          <Loading />
          <span>Carregando dados...</span>
        </div>
      ) : (
        <div className="cards">
          {films.map((film) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/films/${getUrlId(
                film.url,
              )}.jpg`}
              name={film.title}
              key={film.title}
              id={getUrlId(film.url)}
              type="films"
            />
          ))}
        </div>
      )}
    </Container>
  );
}
