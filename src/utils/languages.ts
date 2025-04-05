import { cpp } from '@codemirror/lang-cpp'
import { python } from '@codemirror/lang-python'
import { rust } from '@codemirror/lang-rust'
import { go } from '@codemirror/lang-go'
import { c, csharp, dart } from '@codemirror/legacy-modes/mode/clike'
import { haskell } from '@codemirror/legacy-modes/mode/haskell'

import { extname } from '@std/path'
import { javascript } from '@codemirror/lang-javascript'

export const languages = [
  {
    name: 'C',
    id: 'c',
    icon: 'vscode-icons:file-type-c',
    extensions: ['c'],
    stream: c,
  },
  {
    name: 'C++',
    id: 'cplusplus',
    icon: 'vscode-icons:file-type-cpp',
    extensions: ['cc', 'cpp', 'c++', 'cxx'],
    support: cpp(),
  },
  {
    name: 'C#',
    id: 'csharp',
    icon: 'vscode-icons:file-type-csharp',
    extensions: ['cs'],
    stream: csharp,
  },
  {
    name: 'Haskell',
    id: 'haskell',
    icon: 'devicon:haskell',
    extensions: ['hs'],
    stream: haskell,
  },
  {
    name: 'Python',
    id: 'python',
    icon: 'vscode-icons:file-type-python',
    extensions: ['py'],
    support: python(),
  },
  {
    name: 'Go',
    id: 'golang',
    icon: 'devicon:go-wordmark',
    extensions: ['go'],
    support: go(),
  },
  {
    name: 'Rust',
    id: 'rust',
    icon: 'vscode-icons:file-type-light-rust',
    extensions: ['rs'],
    support: rust(),
  },
  {
    name: 'Dart',
    id: 'dart',
    icon: 'vscode-icons:file-type-dartlang',
    extensions: ['dart'],
    stream: dart,
  },
  {
    name: 'JavaScript',
    id: 'javascript',
    icon: 'vscode-icons:file-type-js',
    extensions: ['js'],
    support: javascript(),
  },
  {
    name: 'TypeScript',
    id: 'typescript',
    icon: 'vscode-icons:file-type-typescript',
    extensions: ['ts'],
    support: javascript({ typescript: true }),
  },
]

export function detectLanguage(filename: string) {
  const extension = extname(filename).replace('.', '')
  return languages.find((v) => v.extensions.includes(extension))
}
