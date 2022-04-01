import React, { useState } from 'react';
import { MdStarBorder, MdStar } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFavouriteCharacter } from '../../store/slices/Character.slice';
import { Container } from './styles';

interface ICardProps {
  imageUrl: string;
  name: string;
  id: string;
  type: 'characters' | 'films' | 'starships' | 'vehicles' | 'planets';
}

export function Card({
  type, imageUrl, name, id,
}: ICardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const dispatch = useDispatch();

  function handleFavourite() {
    dispatch(setFavouriteCharacter({ name, id }));
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
