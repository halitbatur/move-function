import { cloneDeep } from 'lodash';
import { Folder, FilePathChangeIndexMap, FileItem } from './types';
import ERRORS from './errors';

export function findNeededIndexes(
  list: Folder[],
  sourceFileId: string,
  destinationFolderId: string,
): FilePathChangeIndexMap {
  const indexes: FilePathChangeIndexMap = {};

  list.forEach((folder: Folder, folderIndex: number) => {
    if (folder.id === destinationFolderId) {
      indexes.destinationIndex = folderIndex;
    }
    if (folder.id === sourceFileId) {
      throw ERRORS.CANNOT_MOVE_FOLDER;
    }

    folder.files.forEach((file: FileItem, fileIndex: number) => {
      if (file.id === sourceFileId) {
        indexes.sourceFileIndex = fileIndex;
        indexes.sourceFolderIndex = folderIndex;
      }
      if (file.id === destinationFolderId) {
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
