import { useCallback, useEffect, useState } from 'react';
import { Starship } from '../types/Starship.types';
import { Vehicle } from '../types/Vehicle.types';

type Film = {
  name: string;
  url: string;
};

type Pilot = {
  name: string;
  url: string;
};

export function useStarship(data: Starship | Vehicle | undefined) {
  const [films, setFilms] = useState<Film[]>([]);
  const [pilot, setPilot] = useState<Pilot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFilms = useCallback(async () => {
    try {
      data?.films.forEach((filmResponse) => {
        fetch(filmResponse)
          .then((dataResponse) => dataResponse.json())
          .then((filmData) => setFilms((prevState) => {
            if (prevState.includes(filmData.title)) return prevState;
            return [
              ...prevState,
              {
                name: filmData.title,
                url: filmData.url,
              },
            ];
          }));
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [data?.films]);

  const getPilots = useCallback(async () => {
    try {
      data?.pilots.forEach((pilotResponse) => {
        fetch(pilotResponse)
          .then((dataResponse) => dataResponse.json())
          .then((pilotData) => setPilot((prevState) => {
            if (prevState.includes(pilotData.name)) return prevState;
            return [
              ...prevState,
              {
                name: pilotData.name,
                url: pilotData.url,
              },
            ];
          }));
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [data?.pilots]);

  useEffect(() => {
    setIsLoading(true);
    getFilms();
  }, [getFilms]);

  useEffect(() => {
    setIsLoading(true);
    getPilots();
  }, [getPilots]);

  return {
    films,
    pilot,
    isLoading,
  };
}
