const cloneDeep = require('lodash/cloneDeep');

type File = { id: string; name: string };

type List = {
  id: string;
  name: string;
  files: File[];
}[];

type Indexes = {
  destinationIndex: number;
  sourceFolderIndex: number;
  sourceFileIndex: number;
};

function indexesValidator(indexesObject: Indexes): boolean {
  return (
    indexesObject.sourceFileIndex !== Number.NEGATIVE_INFINITY &&
    indexesObject.sourceFolderIndex !== Number.NEGATIVE_INFINITY &&
    indexesObject.destinationIndex !== Number.NEGATIVE_INFINITY
  );
}

export default function move(list: List, source: string, destination: string): List {
  const copy: List = cloneDeep(list);

  const indexes: Indexes = {
    destinationIndex: Number.NEGATIVE_INFINITY,
    sourceFolderIndex: Number.NEGATIVE_INFINITY,
    sourceFileIndex: Number.NEGATIVE_INFINITY,
  };

  for (let i = 0; i < copy.length; i++) {
    const currentFolder = copy[i];
    if (currentFolder.id === destination) {
      indexes.destinationIndex = i;
    }
    if (currentFolder.id === source) {
      throw new Error('You cannot move a folder');
    }
    for (let j = 0; j < currentFolder.files.length; j++) {
      const currentFile = currentFolder.files[j];
      if (currentFile.id === source) {
        indexes.sourceFolderIndex = i;
        indexes.sourceFileIndex = j;
      }
      if (currentFile.id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }
    }
  }

  if (indexesValidator(indexes)) {
    const { sourceFileIndex, sourceFolderIndex, destinationIndex } = indexes;
    const file = copy[sourceFolderIndex].files[sourceFileIndex];
    copy[sourceFolderIndex].files.splice(sourceFileIndex, 1);
    copy[destinationIndex].files.push(file);
  }

  if (
    indexes.destinationIndex === Number.NEGATIVE_INFINITY &&
    indexes.sourceFileIndex === Number.NEGATIVE_INFINITY
  ) {
    throw new Error('Both file and folder does not exist!');
  }

  if (indexes.sourceFileIndex === Number.NEGATIVE_INFINITY) {
    throw new Error('You cannot move a file that does not exist!');
  }

  if (indexes.destinationIndex === Number.NEGATIVE_INFINITY) {
    throw new Error('You cannot move a file to a folder that does not exist!');
  }

  return copy;
}
