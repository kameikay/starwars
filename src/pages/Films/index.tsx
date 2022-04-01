import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { Card } from '../../components/CharacterCard';
import { InputSearch } from '../../components/InputSearch';

import { api } from '../../services/api';

import { Container } from './styles';
import { Loading } from '../../components/Loading';
import { getUrlId } from '../../utils/getUrlId';
import { Film } from '../../types/Film.types';
import { SelectButton } from '../../components/SelectButton';
import { RootState } from '../../store';

export default function Films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [isFavouriteSelected, setIsFavouriteSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const filmsFavourite = useSelector((state: RootState) => state.film);

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
        {!isFavouriteSelected && (
          <InputSearch
            type="text"
            placeholder="Digite o nome do filme a ser buscado..."
            onChange={(event) => debouncedOnChange(event)}
          />
        )}

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
      </div>

      {isLoading ? (
        <div className="loading">
          <Loading />
          <span>Carregando dados...</span>
        </div>
      ) : !isFavouriteSelected ? (
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
              isFavourited={filmsFavourite.some(
                (data) => data.title === film.title,
              )}
            />
          ))}
        </div>
      ) : filmsFavourite.length > 0 ? (
        <div className="cards">
          {filmsFavourite.map((film) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/films/${film.id}.jpg`}
              name={film.title}
              key={film.title}
              id={film.id}
              type="films"
              isFavourited
            />
          ))}
        </div>
      ) : (
        <div className="no-favourite">
          <span>Nenhum filme favorito</span>
        </div>
      )}
    </Container>
  );
}
