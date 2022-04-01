import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Card } from '../../components/CharacterCard';
import { InputSearch } from '../../components/InputSearch';

import { api } from '../../services/api';

import { Container } from './styles';
import { Loading } from '../../components/Loading';
import { getUrlId } from '../../utils/getUrlId';
import { Starship } from '../../types/Starship.types';

export default function Starships() {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        <InputSearch
          type="text"
          placeholder="Digite o nome da nave a ser buscada..."
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
          {starships.map((starship) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/starships/${getUrlId(
                starship.url,
              )}.jpg`}
              name={starship.name}
              key={starship.name}
              id={getUrlId(starship.url)}
              type="starships"
            />
          ))}
        </div>
      )}
    </Container>
  );
}
