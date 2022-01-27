export type ItemFile = { id: string; name: string };

export interface Folder extends ItemFile {
  files: ItemFile[];
}

export type Indexes = {
  destinationIndex?: number;
  sourceFolderIndex?: number;
  sourceFileIndex?: number;
};
