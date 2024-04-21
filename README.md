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

## Development

Before committing, you will need to make sure the code is formatted correctly.

- You will not be able to commit if code style checks or any unit tests fail.
  You can bypass this by using the `-n` flag when committing, but it will fail in the PR stage.

```bash
npm run format
```

Runs dev server and unit tests in watch mode

```bash
docker compose up --build dev test-watch
docker compose down
```

Stop and remove all containers

```bash
docker compose down
```

### Tests

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
