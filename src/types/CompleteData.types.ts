import { Character } from './Character.type';

export interface CompleteDataTypes {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}
