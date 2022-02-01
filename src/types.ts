export interface FileItem {
  id: string;
  name: string;
}

export interface Folder extends FileItem {
  files: FileItem[];
}

export interface FilePathChangeIndexMap {
  destination?: number;
  sourceFolder?: number;
  sourceFile?: number;
}
