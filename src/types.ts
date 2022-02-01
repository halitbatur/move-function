export interface FileItem {
  id: string;
  name: string;
}

export interface Folder extends FileItem {
  files: FileItem[];
}

export interface FilePathChangeIndexMap {
  destinationIndex?: number;
  sourceFolderIndex?: number;
  sourceFileIndex?: number;
}
