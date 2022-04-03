import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCarAlt, FaSpaceShuttle, FaUserAlt } from 'react-icons/fa';
import { IoMdPlanet } from 'react-icons/io';
import { BiDna } from 'react-icons/bi';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';
import { CharacterContainer, Container } from './styles';
import { Film } from '../../types/Film.types';
import { useFilms } from '../../hooks/useFilm';

export default function FilmPage() {
  const [data, setData] = useState<Film>();
  const {
    characters,
    planets,
    species,
    starships,
    vehicles,
    isLoading: isLoadingFilms,
  } = useFilms(data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getCharacterData = useCallback(async () => {
    try {
      const response = await api.get(`/films/${id}`);
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
          <div className="films-data">
            <div className="films-data-details">
              <h1>{data?.title}</h1>
              <p>
                Data de criação:
                {' '}
                <span>{data?.release_date}</span>
              </p>

              <p>
                Diretor:
                {' '}
                <span>{data?.director}</span>
              </p>

              <p>
                Produção:
                {' '}
                <span>{data?.producer}</span>
              </p>

              <p>
                Sinopse:
                {' '}
                <span>
                  {data?.opening_crawl}
                  {' '}
                </span>
              </p>
            </div>

            {isLoadingFilms ? (
              <Loading />
            ) : (
              <>
                <div className="films-data-characters">
                  <h2>Personagens:</h2>
                  <ul>
                    {characters.map((character) => (
                      <li key={character.name}>
                        <Link to={`/characters/${getUrlId(character.url)}`}>
                          <FaUserAlt />
                          {character.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="films-data-others">
                  <div className="films-data-others-data">
                    <h2>Planetas</h2>
                    <ul>
                      {planets.map((planet) => (
                        <li key={planet.name}>
                          <IoMdPlanet />
                          {planet.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="films-data-others-data">
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
                </div>

                <div className="films-data-others">
                  <div className="films-data-others-data">
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

                  <div className="films-data-others-data">
                    <h2>Espécies</h2>
                    <ul>
                      {species.map((specie) => (
                        <li key={specie.name}>
                          <BiDna />
                          {specie.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="film-image">
            <img
              src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`}
              alt={`Imagem de ${data?.title}`}
            />
          </div>
        </CharacterContainer>
      )}
    </Container>
  );
}
