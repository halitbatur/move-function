interface ErrorList {
  [index: string]: Error;
}

export class CannotMoveFolderError extends Error {
  constructor(errorMessage = 'You cannot move a folder') {
    super(errorMessage);
  }
}

export class CannotSelectFileAsDestinationError extends Error {
  constructor(errorMessage = 'You cannot specify a file as the destination') {
    super(errorMessage);
  }
}

export class FileDoesNotExistError extends Error {
  constructor(errorMessage = 'You cannot move a file that does not exist!') {
    super(errorMessage);
  }
}

export class FolderDoesNotExistError extends Error {
  constructor(errorMessage = 'You cannot move a file to a folder that does not exist!') {
    super(errorMessage);
  }
}

export class FileAndFolderDoesNotExistError extends Error {
  constructor(errorMessage = 'Both file and folder does not exist!') {
    super(errorMessage);
  }
}
const ERRORS: ErrorList = {
  CANNOT_MOVE_FOLDER: new CannotMoveFolderError(),
  FILE_AS_DESTINATION: new CannotSelectFileAsDestinationError(),
  FILE_DOES_NOT_EXIST: new FileDoesNotExistError(),
  FOLDER_DOES_NOT_EXIST: new FolderDoesNotExistError(),
  FILE_AND_FOLDER_DOES_NOT_EXIST: new FileAndFolderDoesNotExistError(),
};

export default ERRORS;
