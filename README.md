# TradeCraft

### System Requirements
- [Node.js](https://nodejs.org/en/download/)

### Prerequisites
- Install `npm` packages
```
cd \path\to\AMPS9000
npm i
```

### Development Scripts
- `npm run dev`
  - Serves client application to `http://localhost:3001` via _Webpack Dev Server_

### Maintenance Scripts
- `npm run clean`
  - Deletes production assets, test coverage data, & documentation from the file system
- `npm run docs`
  - Compiles documentation via _JSDoc_
- `npm run lint`
  - Tests against code styling rules via _ESLint_
- `npm run test`
  - Executes unit tests via _Jest_

### Production Scripts
- `npm run build`
  - Compiles production assets to `public` directory
- `npm start`
  - Runs _Express_ server
