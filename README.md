## Pre-reqs:

Mac:

1. Make sure brew is installed
2. Install Docker desktop
   ```bash
     brew install --cask docker
   ```
3. Install node-20
   ```bash
     brew install node@20
   ```

## Development

```bash
# Runs development server and unit tests in watch mode
docker compose up --build dev test:watch

# stops and deletes generated docker containers
docker compose down
```

### Tests

```bash
# to run unit and integration tests
docker compose run --build --rm test
```

```bash
# to run just unit tests
docker compose run --build --rm test npm run test:unit
```

```bash
# to run just integration tests
docker compose run --build --rm test npm run test:integ
```
