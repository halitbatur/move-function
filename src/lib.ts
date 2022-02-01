import { cloneDeep } from 'lodash';
import { Folder, FilePathChangeIndexMap, ItemFile } from './types';
import ERRORS from './errors';

export function findNeededIndexes(
  list: Folder[],
  source: string,
  destination: string,
): FilePathChangeIndexMap {
  const indexes: FilePathChangeIndexMap = {};

  list.forEach((folder: Folder, folderIndex: number) => {
    if (folder.id === destination) {
      indexes.destinationIndex = folderIndex;
    }
    if (folder.id === source) {
      throw ERRORS.CANNOT_MOVE_FOLDER;
    }

    folder.files.forEach((file: ItemFile, fileIndex: number) => {
      if (file.id === source) {
        indexes.sourceFileIndex = fileIndex;
        indexes.sourceFolderIndex = folderIndex;
      }
      if (file.id === destination) {
        throw ERRORS.FILE_AS_DESTINATION;
      }
    });
  });

  return indexes;
}

export function throwIfIndexIsInvalid(indexes: FilePathChangeIndexMap): void {
  if (indexes.destinationIndex === undefined && indexes.sourceFileIndex === undefined) {
    throw ERRORS.FILE_AND_FOLDER_DOES_NOT_EXIST;
  }

  if (indexes.sourceFileIndex === undefined) {
    throw ERRORS.FILE_DOES_NOT_EXIST;
  }

  if (indexes.destinationIndex === undefined) {
    throw ERRORS.FOLDER_DOES_NOT_EXIST;
  }
}

export function moveFileWithinList(list: Folder[], indexes: FilePathChangeIndexMap): Folder[] {
  const editedList: Folder[] = cloneDeep(list);

  const { sourceFileIndex, sourceFolderIndex, destinationIndex } = indexes;
  if (
    sourceFileIndex !== undefined &&
    sourceFolderIndex !== undefined &&
    destinationIndex !== undefined
  ) {
    const sourceFile = editedList[sourceFolderIndex].files[sourceFileIndex];
    editedList[sourceFolderIndex].files.splice(sourceFileIndex, 1);
    editedList[destinationIndex].files.push(sourceFile);
  }

  return editedList;
}
