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
      indexes.destination = folderIndex;
    }
    if (folder.id === sourceFileId) {
      throw ERRORS.CANNOT_MOVE_FOLDER;
    }

    folder.files.forEach((file: FileItem, fileIndex: number) => {
      if (file.id === sourceFileId) {
        indexes.sourceFile = fileIndex;
        indexes.sourceFolder = folderIndex;
      }
      if (file.id === destinationFolderId) {
        throw ERRORS.FILE_AS_DESTINATION;
      }
    });
  });

  return indexes;
}

export function throwIfIndexIsInvalid(
  indexes: FilePathChangeIndexMap,
): Required<FilePathChangeIndexMap> {
  if (indexes.destination === undefined && indexes.sourceFile === undefined) {
    throw ERRORS.FILE_AND_FOLDER_DOES_NOT_EXIST;
  }

  if (indexes.sourceFile === undefined) {
    throw ERRORS.FILE_DOES_NOT_EXIST;
  }

  if (indexes.destination === undefined) {
    throw ERRORS.FOLDER_DOES_NOT_EXIST;
  }

  return indexes as Required<FilePathChangeIndexMap>;
}

export function moveFileWithinList(
  list: Folder[],
  indexes: Required<FilePathChangeIndexMap>,
): Folder[] {
  const editedList: Folder[] = cloneDeep(list);

  const sourceFileContent = editedList[indexes.sourceFolder].files[indexes.sourceFile];
  editedList[indexes.sourceFolder].files.splice(indexes.sourceFile, 1);
  editedList[indexes.destination].files.push(sourceFileContent);

  return editedList;
}
