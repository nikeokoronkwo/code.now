export interface Gist {
  files: Record<string, GistFile>,
  [k: string]: any,
}

interface GistFile {
  filename: string,
  type: string,
  language: string,
  raw_url: string,
  size: number,
  truncated: boolean,
  content: string,
  encoding: string
}
