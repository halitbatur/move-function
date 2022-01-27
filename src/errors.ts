interface ErrorList {
  [index: string]: Error;
}

export const ERRORS: ErrorList = {
  CANNOT_MOVE_FOLDER: new Error('You cannot move a folder'),
  FILE_AS_DESTINATION: new Error('You cannot specify a file as the destination'),
  FILE_DOES_NOT_EXIST: new Error('You cannot move a file that does not exist!'),
  FOLDER_DOES_NOT_EXIST: new Error('You cannot move a file to a folder that does not exist!'),
  FILE_AND_FOLDER_DOES_NOT_EXIST: new Error('Both file and folder does not exist!'),
};
