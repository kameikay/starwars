import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCarAlt, FaSpaceShuttle } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { Loading } from '../../components/Loading';
import { useCharacter } from '../../hooks/useCharacter';
import { api } from '../../services/api';
import { Character } from '../../types/Character.type';
import { CharacterContainer, Container } from './styles';

export default function CharacterPage() {
  const [data, setData] = useState<Character>();
  const {
    films,
    homeWorld,
    starships,
    vehicles,
    isLoading: isLoadingCharacter,
  } = useCharacter(data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getCharacterData = useCallback(async () => {
    try {
      const response = await api.get(`/people/${id}`);
      setData(response.data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  function getUrlId(url: string) {
    const urlId = url.split('/');
    return urlId[urlId.length - 2];
  }

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
            <div className="character-data-details">
              <h1>{data?.name}</h1>
              <p>
                Planeta natal:
                {' '}
                <span>
                  <Link to={`/planets/${getUrlId(homeWorld.url)}`}>
                    {homeWorld.name}
                  </Link>
                </span>
              </p>

              <p>
                Data de nascimento:
                {' '}
                <span>{data?.birth_year}</span>
              </p>

              <p>
                Gênero:
                {' '}
                <span>{data?.gender}</span>
              </p>

              <p>
                Altura:
                {' '}
                <span>
                  {data?.height}
                  {' '}
                  cm
                </span>
              </p>

              <p>
                Peso:
                {' '}
                <span>
                  {data?.mass}
                  {' '}
                  kg
                </span>
              </p>

              <p>
                Cor da pele:
                {' '}
                <span>{data?.skin_color}</span>
              </p>

              <p>
                Cor dos olhos:
                {' '}
                <span>{data?.eye_color}</span>
              </p>

              <p>
                Cor do cabelo:
                {' '}
                <span>{data?.hair_color}</span>
              </p>
            </div>

            <div className="character-data-others">
              {isLoadingCharacter ? (
                <Loading />
              ) : (
                <>
                  <div className="character-data-others-data">
                    <h2>Naves</h2>
                    <ul>
                      {starships.map((starship) => (
                        <li key={starship.name}>
                          <Link to={`/starships/${getUrlId(starship.url)}`}>
                            <FaSpaceShuttle />
                            {starship.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="character-data-others-data">
                    <h2>Veículos</h2>
                    <ul>
                      {vehicles.map((vehicle) => (
                        <li key={vehicle.name}>
                          <Link to={`/vehicles/${getUrlId(vehicle.url)}`}>
                            <FaCarAlt />
                            {vehicle.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="character-data-others-data">
                    <h2>Filmes</h2>
                    <ul>
                      {films.map((film) => (
                        <li key={film.title}>
                          <Link to={`/films/${getUrlId(film.url)}`}>
                            <MdMovie />
                            {film.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
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
