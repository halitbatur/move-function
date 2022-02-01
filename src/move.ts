import { Folder, FilePathChangeIndexMap } from './types';
import { findNeededIndexes, throwIfIndexIsInvalid, moveFileWithinList } from './lib';

export default function move(list: Folder[], source: string, destination: string): Folder[] {
  const indexes: FilePathChangeIndexMap = findNeededIndexes(list, source, destination);

  const validatedIndexes = throwIfIndexIsInvalid(indexes);
  return moveFileWithinList(list, validatedIndexes);
}
