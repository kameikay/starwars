import React, { useState } from 'react';
import { MdStarBorder, MdStar } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container } from './styles';

interface ICardProps {
  imageUrl: string;
  name: string;
  id: string;
  type: 'characters' | 'films';
}

export function Card({
  type, imageUrl, name, id,
}: ICardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  return (
    <Container>
      <button type="button" onClick={() => setIsFavorite(!isFavorite)}>
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
