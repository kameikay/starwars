import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';
import { CharacterContainer, Container } from './styles';
import { useStarship } from '../../hooks/useStarship';
import { getUrlId } from '../../utils/getUrlId';
import { Vehicle } from '../../types/Vehicle.types';

export default function VehiclePage() {
  const [data, setData] = useState<Vehicle>();
  const { films, isLoading: isLoadingStarship, pilot } = useStarship(data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getVehicleData = useCallback(async () => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      setData(response.data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getVehicleData();
  }, [getVehicleData]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <CharacterContainer>
          <div className="vehicles-data">
            <div className="vehicles-data-details">
              <h1>{data?.name}</h1>
              <p>
                Model:
                {' '}
                <span>{data?.model}</span>
              </p>

              <p>
                Fabricante:
                {' '}
                <span>{data?.manufacturer}</span>
              </p>

              <p>
                Classe:
                {' '}
                <span>{data?.vehicle_class}</span>
              </p>

              <p>
                Preço:
                {' '}
                <span>
                  {data?.cost_in_credits}
                  {' '}
                  {data?.cost_in_credits ? 'créditos' : ''}
                  {' '}
                </span>
              </p>

              <p>
                Velocidade:
                {' '}
                <span>
                  {data?.max_atmosphering_speed}
                  {' '}
                  km/h
                  {' '}
                </span>
              </p>

              <p>
                Tamanho:
                {' '}
                <span>
                  {data?.length}
                  m
                </span>
              </p>
              <p>
                Capacidade de carga:
                {' '}
                <span>
                  {data?.cargo_capacity}
                  kg
                </span>
              </p>
              <p>
                Frota mínima:
                {' '}
                <span>{data?.crew}</span>
              </p>
              <p>
                Passageiros:
                {' '}
                <span>{data?.passengers}</span>
              </p>
            </div>

            {isLoadingStarship ? (
              <Loading />
            ) : (
              <div className="vehicles-data-others">
                <div className="vehicles-data-others-data">
                  <h2>Filmes:</h2>
                  <ul>
                    {films.map((film) => (
                      <li key={film.name}>
                        <Link to={`/films/${getUrlId(film.url)}`}>
                          <MdMovie />
                          {film.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="vehicles-data-others-data">
                  <h2>Pilotos:</h2>
                  {pilot.length < 1 ? (
                    <span>Não possui pilotos</span>
                  ) : (
                    <ul>
                      {pilot.map((pilots) => (
                        <li key={pilots.name}>
                          <Link to={`/pilots/${getUrlId(pilots.url)}`}>
                            <FaUserAlt />
                            {pilots.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="vehicle-image">
            <img
              src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
              alt={`Imagem de ${data?.name}`}
            />
          </div>
        </CharacterContainer>
      )}
    </Container>
  );
}
