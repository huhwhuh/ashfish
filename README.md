## Pre-reqs:

Mac:

1. Make sure brew is installed
2. Install Docker
   ```bash
     brew install --cask docker
   ```
3. Open up docker desktop app and hit the agreement
4. Install node-20
   ```bash
     brew install node@20
   ```
5. Make a .env file to streamline local development:
   - Take a look at .env-sample

## Development

Export Firebase emulator configs (While emulators are running)

```bash
docker exec -it firebase firebase emulators:export ./firebase/export
```

Before committing, you will need to make sure the code is formatted correctly.

```bash
npm run format
```

- You will not be able to commit if code style checks or any unit tests fail.
  You can bypass this by using the `-n` flag when committing, but incorrectly formatteed code will fail PR's

Runs dev server, firebase, and unit tests in watch mode

```bash
docker compose up --build dev test-watch
```

Stop and remove all containers

```bash
docker compose down
```

### Tests

Generate Integration tests:

```bash
npx playwright codegen localhost:5173
```

- make sure dev server and firebase emulator are running

To run unit and integration tests

```bash
docker compose run --build --rm test
```

To run just unit tests

```bash
docker compose run --build --rm test npm run test:unit
```

To run just integration tests

```bash
docker compose run --build --rm test npm run test:integ
```
