import { Character } from '../types/Character.type';

export function getCharacterId(character: Character) {
  const splitedUrl = character.url.split('/');
  const characterId = splitedUrl[splitedUrl.length - 2];

  return characterId;
}
