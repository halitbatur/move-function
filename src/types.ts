export interface ItemFile {
  id: string;
  name: string;
}

export interface Folder extends ItemFile {
  files: ItemFile[];
}

export interface Indexes {
  destinationIndex?: number;
  sourceFolderIndex?: number;
  sourceFileIndex?: number;
}
