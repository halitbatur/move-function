import { Folder, Indexes } from './types';
import { findNeededIndexes, thorwIfIndexIsInvalid, moveFileWithinList } from './lib';

export default function move(list: Folder[], source: string, destination: string): Folder[] {
  const indexes: Indexes = findNeededIndexes(list, source, destination);

  thorwIfIndexIsInvalid(indexes);
  return moveFileWithinList(list, indexes);
}
