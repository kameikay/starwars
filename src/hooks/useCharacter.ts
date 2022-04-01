import { useCallback, useEffect, useState } from 'react';
import { Character } from '../types/Character.type';

export function useCharacter(data: Character | undefined) {
  const [films, setFilms] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const [homeWorld, setHomeWorld] = useState<string>('');

  const getFilms = useCallback(async () => {
    data?.films.forEach(async (film) => {
      const response = await fetch(film);
      const filmData = await response.json();
      setFilms((prevState) => {
        if (prevState.includes(filmData.title)) return prevState;
        return [...prevState, filmData.title];
      });
    });
  }, [data?.films]);

  const getVehicles = useCallback(async () => {
    data?.vehicles.forEach(async (vehicle) => {
      const response = await fetch(vehicle);
      const vehicleData = await response.json();
      setVehicles((prevState) => {
        if (prevState.includes(vehicleData.name)) return prevState;
        return [...prevState, vehicleData.name];
      });
    });
  }, [data?.vehicles]);

  const getStarships = useCallback(async () => {
    data?.starships.forEach(async (starship) => {
      const response = await fetch(starship);
      const starshipData = await response.json();

      setStarships((prevState) => {
        if (prevState.includes(starshipData.name)) return prevState;
        return [...prevState, starshipData.name];
      });
    });
  }, [data?.starships]);

  const getHomeWorld = useCallback(async () => {
    if (!data?.homeworld) return;
    const response = await fetch(data.homeworld);
    const homeWorldData = await response.json();
    setHomeWorld(homeWorldData.name);
  }, [data?.homeworld]);

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  useEffect(() => {
    getStarships();
  }, [getStarships]);

  useEffect(() => {
    getHomeWorld();
  }, [getHomeWorld]);

  return {
    films,
    vehicles,
    starships,
    homeWorld,
  };
}
