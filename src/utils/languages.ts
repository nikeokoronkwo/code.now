const { cpp } = await import('@codemirror/lang-cpp')
const { python } = await import('@codemirror/lang-python')
const { rust } = await import('@codemirror/lang-rust')
const { go } = await import('@codemirror/lang-go')
const { java } = await import('@codemirror/lang-java')
const { c, csharp, dart, scala, kotlin } = await import('@codemirror/legacy-modes/mode/clike')
const { swift } = await import('@codemirror/legacy-modes/mode/swift')
const { haskell } = await import('@codemirror/legacy-modes/mode/haskell')

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
    name: 'Rust',
    id: 'rust',
    icon: 'vscode-icons:file-type-light-rust',
    extensions: ['rs'],
    support: rust(),
  },
  {
    name: 'Go',
    id: 'golang',
    icon: 'devicon:go-wordmark',
    extensions: ['go'],
    support: go(),
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
  {
    name: 'Swift',
    id: 'swift',
    icon: 'vscode-icons:file-type-swift',
    extensions: ['swift'],
    stream: swift,
  },
  {
    name: 'Java',
    id: 'java',
    icon: 'devicon:java',
    extensions: ['java'],
    support: java(),
  },
  {
    name: 'Scala',
    id: 'scala',
    icon: 'devicon:scala',
    extensions: ['scala', 'sc'],
    stream: scala,
  },
  {
    name: 'Kotlin',
    id: 'kotlin',
    icon: 'devicon:kotlin',
    extensions: ['kt'],
    stream: kotlin
  }
]

export function detectLanguage(filename: string) {
  const extension = extname(filename).replace('.', '')
  return languages.find((v) => v.extensions.includes(extension))
}
