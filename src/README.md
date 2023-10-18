This is where most custom development work should be done.

Create subfolders that correspond to your features, so that components can be grouped by usage. For example, for a typical location directory you might have subfolders named `common`, `directory`, `location`.

Within those subfolders, components should be implemented in a file named after the component. For example a Core component would be implemented in `location/Core.tsx`. When appropriate, css should be written in a css file in the same directory as the tsx (`location/Core.css`) for example.

For example, a project in progress might look something like this:

```
components/
├── common/
│   ├── Header.tsx
│   └── Header.css
└── location/
    ├── About.tsx
    ├── About.css
    ├── Hero.tsx
    └── Hero.css
```
