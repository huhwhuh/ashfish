## Pre-reqs:

Mac:

1. Make sure brew is installed
2. Install Docker desktop
   ```zsh
     brew install --cask docker
   ```
3. Install node-20
   ```zsh
     brew install node@20
   ```

## Development

```zsh
# Runs development server and unit tests in watch mode
docker compose up --build dev test:watch

# stops and deletes generated docker containers
docker compose down
```

### Tests

```zsh
# to run unit and integration tests
docker compose run --build --rm test
```

```zsh
# to run just unit tests
docker compose run --build --rm dev npm run test:unit
```

```zsh
# to run just integration tests
docker compose run --build --rm test npm run test:integ
```
