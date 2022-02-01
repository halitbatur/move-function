export interface ItemFile {
  id: string;
  name: string;
}

export interface Folder extends ItemFile {
  files: ItemFile[];
}

export interface FilePathChangeIndexMap {
  destinationIndex?: number;
  sourceFolderIndex?: number;
  sourceFileIndex?: number;
}
