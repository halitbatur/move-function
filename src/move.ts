import { Folder, Indexes } from './types';
import { findNeededIndexes, throwIfIndexIsInvalid, moveFileWithinList } from './lib';

export default function move(list: Folder[], source: string, destination: string): Folder[] {
  const indexes: Indexes = findNeededIndexes(list, source, destination);

  throwIfIndexIsInvalid(indexes);
  return moveFileWithinList(list, indexes);
}
