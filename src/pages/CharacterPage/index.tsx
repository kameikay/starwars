import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { useCharacter } from '../../hooks/useCharacter';
import { api } from '../../services/api';
import { Character } from '../../types/Character.type';
import { CharacterContainer, Container } from './styles';

export default function CharacterPage() {
  const [data, setData] = useState<Character>();
  const {
    films, homeWorld, starships, vehicles,
  } = useCharacter(data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getCharacterData = useCallback(async () => {
    try {
      const response = await api.get(`/people/${id}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCharacterData();
  }, [getCharacterData]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <CharacterContainer>
          <div className="character-data">
            <h1>{data?.name}</h1>
            <div className="character-data-details">
              <p>
                Planeta natal:
                {' '}
                {homeWorld}
              </p>

              <p>
                Data de nascimento:
                {' '}
                {data?.birth_year}
              </p>

              <p>
                Gênero:
                {' '}
                {data?.gender}
              </p>

              <p>
                Altura:
                {' '}
                {data?.height}
              </p>

              <p>
                Peso:
                {' '}
                {data?.mass}
              </p>

              <p>
                Cor da pele:
                {' '}
                {data?.skin_color}
              </p>

              <p>
                Cor dos olhos:
                {' '}
                {data?.eye_color}
              </p>

              <p>
                Cor do cabelo:
                {' '}
                {data?.hair_color}
              </p>
            </div>

            <div className="character-data-spaceships">
              <h2>Naves</h2>
              <ul>
                {starships.map((starship) => (
                  <li key={starship}>{starship}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="character-image">
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
              alt={`Imagem de ${data?.name}`}
            />
          </div>
        </CharacterContainer>
      )}
    </Container>
  );
}
