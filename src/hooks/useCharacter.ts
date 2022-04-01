import { useCallback, useEffect, useState } from 'react';
import { Character } from '../types/Character.type';

type Film = {
  title: string;
  url: string;
};

type Vehicle = {
  name: string;
  url: string;
};

type Starship = {
  name: string;
  url: string;
};

type HomeWorld = {
  name: string;
  url: string;
};

export function useCharacter(data: Character | undefined) {
  const [films, setFilms] = useState<Film[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [homeWorld, setHomeWorld] = useState<HomeWorld>({
    name: '',
    url: '',
  });

  const getFilms = useCallback(async () => {
    data?.films.forEach(async (film) => {
      const response = await fetch(film);
      const filmData = await response.json();
      setFilms((prevState) => {
        if (prevState.includes(filmData.title)) return prevState;
        return [
          ...prevState,
          {
            title: filmData.title,
            url: filmData.url,
          },
        ];
      });
    });
  }, [data?.films]);

  const getVehicles = useCallback(async () => {
    data?.vehicles.forEach(async (vehicle) => {
      const response = await fetch(vehicle);
      const vehicleData = await response.json();
      setVehicles((prevState) => {
        if (prevState.includes(vehicleData.name)) return prevState;
        return [
          ...prevState,
          {
            name: vehicleData.name,
            url: vehicleData.url,
          },
        ];
      });
    });
  }, [data?.vehicles]);

  const getStarships = useCallback(async () => {
    data?.starships.forEach(async (starship) => {
      const response = await fetch(starship);
      const starshipData = await response.json();

      setStarships((prevState) => {
        if (prevState.includes(starshipData.name)) return prevState;
        return [
          ...prevState,
          {
            name: starshipData.name,
            url: starshipData.url,
          },
        ];
      });
    });
  }, [data?.starships]);

  const getHomeWorld = useCallback(async () => {
    if (!data?.homeworld) return;
    const response = await fetch(data.homeworld);
    const homeWorldData = await response.json();
    setHomeWorld({
      name: homeWorldData.name,
      url: homeWorldData.url,
    });
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
