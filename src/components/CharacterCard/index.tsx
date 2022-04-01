import React, { useState } from 'react';
import { MdStarBorder, MdStar } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFavouriteCharacter } from '../../store/slices/Character.slice';
import { setFilmFavourite } from '../../store/slices/Film.slice';
import { setStarshipFavourite } from '../../store/slices/Starship.slice';
import { Container } from './styles';

interface ICardProps {
  imageUrl: string;
  name: string;
  id: string;
  type: 'characters' | 'films' | 'starships' | 'vehicles' | 'planets';
  isFavourited: boolean;
}

export function Card({
  type,
  imageUrl,
  name,
  id,
  isFavourited = false,
}: ICardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavourited);
  const dispatch = useDispatch();

  function handleFavourite() {
    if (type === 'characters') {
      dispatch(setFavouriteCharacter({ name, id }));
    }

    if (type === 'films') {
      dispatch(setFilmFavourite({ title: name, id }));
    }

    if (type === 'starships') {
      dispatch(setStarshipFavourite({ name, id }));
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <Container>
      <button type="button" onClick={() => handleFavourite()}>
        {!isFavorite ? <MdStarBorder size={32} /> : <MdStar size={32} />}
      </button>

      <img src={imageUrl} alt={`Imagem de ${name}`} />

      <div className="card-name">
        <Link to={`/${type}/${id}`}>
          <span>{name}</span>
        </Link>
      </div>
    </Container>
  );
}
