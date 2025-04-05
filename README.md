# `code.now`
A powerful web code editor

## Features
- Lightweight
- Supports multiple languages: From C and C++ to Python and JavaScript, code.now supports syntax highlighting and autocomplete for a wide range of languages
- Share code easily: With [Github Gists](), you can easily share code for people to see just with the github gist ID.

## Why another code editor?
This code editor isn't designed to be a complete IDE for running projects on the web, but rather a lightweight and simple code editor that people can use to write and share code snippets online easily and free.

## Using
The code editor works like a normal editor for the most part. When typing the filename, the editor will detect the language for the given file (i.e entering `file.kt` sets the editor to `Kotlin`).

By default, code is persisted for five days on local storage.

In order to load code from github gists, add an `id` query parameter with the value of your gist ID.
By default, it loads the first file presented (support for multiple files is [underway](https://github.com/nikeokoronkwo/code.now/issues/1)).

> We do have some more features coming on to help with sharing code snippets and communicating between others

<!-- Upcoming features: 
- Keybindings
-->

## Contributing
I would love to have your contributions. If you have an issue or a proposal, feel free to propose in the issues.

To run this project locally, clone this project into your directory, and run
```bash
pnpm install
```

Then to run:
```bash
pnpm dev
```

## Stack
- [Vue](https://vuejs.org) (+ Pinia, Vue Router)
- [TailwindCSS (v3)](https://v3.tailwindcss.com)