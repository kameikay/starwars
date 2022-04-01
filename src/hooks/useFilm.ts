import { useCallback, useEffect, useState } from 'react';
import { Film } from '../types/Film.types';

type Character = {
  name: string;
  url: string;
};

type Planet = {
  name: string;
  url: string;
};

type Starship = {
  name: string;
  url: string;
};

type Vehicle = {
  name: string;
  url: string;
};

type Specie = {
  name: string;
  url: string;
};
export function useFilms(data: Film | undefined) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCharacters = useCallback(async () => {
    try {
      data?.characters.forEach((character) => {
        fetch(character)
          .then((dataResponse) => dataResponse.json())
          .then((characterData) => setCharacters((prevState) => {
            if (prevState.includes(characterData.name)) return prevState;
            return [
              ...prevState,
              {
                name: characterData.name,
                url: characterData.url,
              },
            ];
          }));
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [data?.characters]);

  const getPlanets = useCallback(async () => {
    try {
      data?.planets.forEach((planet) => {
        fetch(planet)
          .then((dataResponse) => dataResponse.json())
          .then((planetData) => setPlanets((prevState) => {
            if (prevState.includes(planetData.name)) return prevState;
            return [
              ...prevState,
              {
                name: planetData.name,
                url: planetData.url,
              },
            ];
          }));
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [data?.planets]);

  const getStarships = useCallback(async () => {
    try {
      data?.starships.forEach((starship) => {
        fetch(starship)
          .then((dataResponse) => dataResponse.json())
          .then((starshipData) => setStarships((prevState) => {
            if (prevState.includes(starshipData.name)) return prevState;
            return [
              ...prevState,
              {
                name: starshipData.name,
                url: starshipData.url,
              },
            ];
          }));
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [data?.starships]);

  const getVehicles = useCallback(async () => {
    try {
      data?.vehicles.forEach((vehicle) => {
        fetch(vehicle)
          .then((dataResponse) => dataResponse.json())
          .then((vehicleData) => setVehicles((prevState) => {
            if (prevState.includes(vehicleData.name)) return prevState;
            return [
              ...prevState,
              {
                name: vehicleData.name,
                url: vehicleData.url,
              },
            ];
          }));
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [data?.vehicles]);

  const getSpecies = useCallback(async () => {
    try {
      data?.species.forEach((specie) => {
        fetch(specie)
          .then((dataResponse) => dataResponse.json())
          .then((speciesData) => setSpecies((prevState) => {
            if (prevState.includes(speciesData.name)) return prevState;
            return [
              ...prevState,
              {
                name: speciesData.name,
                url: speciesData.url,
              },
            ];
          }));
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [data?.species]);

  useEffect(() => {
    setIsLoading(true);
    getCharacters();
  }, [getCharacters]);

  useEffect(() => {
    setIsLoading(true);
    getPlanets();
  }, [getPlanets]);

  useEffect(() => {
    setIsLoading(true);
    getStarships();
  }, [getStarships]);

  useEffect(() => {
    setIsLoading(true);
    getVehicles();
  }, [getVehicles]);

  useEffect(() => {
    setIsLoading(true);
    getSpecies();
  }, [getSpecies]);

  return {
    characters,
    planets,
    starships,
    vehicles,
    species,
    isLoading,
  };
}
