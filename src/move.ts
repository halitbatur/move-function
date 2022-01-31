import { cloneDeep } from 'lodash';
import { Folder, Indexes } from './types';
import { findNeededIndexes, handleEdgeCases, modifiyList } from './lib';

export default function move(list: Folder[], source: string, destination: string): Folder[] {
  const editedList: Folder[] = cloneDeep(list);
  const indexes: Indexes = findNeededIndexes(editedList, source, destination);

  handleEdgeCases(indexes);
  modifiyList(editedList, indexes);

  return editedList;
}
