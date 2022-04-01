import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { Card } from '../../components/CharacterCard';
import { InputSearch } from '../../components/InputSearch';

import { api } from '../../services/api';

import { Container } from './styles';
import { Loading } from '../../components/Loading';
import { getUrlId } from '../../utils/getUrlId';
import { Starship } from '../../types/Starship.types';
import { RootState } from '../../store';
import { SelectButton } from '../../components/SelectButton';

export default function Starships() {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavouriteSelected, setIsFavouriteSelected] = useState<boolean>(false);
  const starshipsFavourite = useSelector((state: RootState) => state.starship);

  const getData = useCallback(async () => {
    try {
      const response = await api.get('starships/');

      const returnedData = await response.data;

      setStarships(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFilteredData = useCallback(async () => {
    try {
      const response = await api.get(`starships/?search=${inputSearch}`);

      const returnedData = await response.data;

      setStarships(returnedData.results);
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
          Naves -
          {' '}
          <span>Star Wars</span>
        </h1>
      </div>

      <div className="header">
        {!isFavouriteSelected && (
          <InputSearch
            type="text"
            placeholder="Digite o nome da nave a ser buscada..."
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
          {starships.map((starship) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/starships/${getUrlId(
                starship.url,
              )}.jpg`}
              name={starship.name}
              key={starship.name}
              id={getUrlId(starship.url)}
              type="starships"
              isFavourited={starshipsFavourite.some(
                (dataStore) => dataStore.name === starship.name,
              )}
            />
          ))}
        </div>
      ) : (
        <div className="cards">
          {starshipsFavourite.map((starship) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`}
              name={starship.name}
              key={starship.name}
              id={starship.id}
              type="starships"
              isFavourited
            />
          ))}
        </div>
      )}
    </Container>
  );
}
