This is where most custom development work should be done. 

For each custom component, a subdirectory should be added to this directory named after the component. That directory should contain an index.tsx file and an index.css file for the React and CSS respectively.

For organizational benefits, you may want to further nest components by the feature that they're associated with. 

For example, a project in progress might look something like this:

```
components/
├── common/
│   └── Header/
│       ├── index.tsx
│       └── index.css
└── location/
    ├── About/
    │   ├── index.tsx
    │   └── index.css
    └── Hero/
        ├── index.tsx
        └── index.css
```