import React from 'react';
import { Container } from './styles';

interface ICharacterCardProps {
  imageUrl: string;
  name: string;
}

export function CharacterCard({ imageUrl, name }: ICharacterCardProps) {
  return (
    <Container>
      <img src={imageUrl} alt={`Imagem de ${name}`} />
      <div className="character-name">
        <span>{name}</span>
      </div>
    </Container>
  );
}
