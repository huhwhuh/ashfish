## Development (Docker)

Install Docker desktop

```bash
docker compose up test --build
# to run tests
```

```bash
docker compose up app --build
# to run the app in development mode
```

- In this mode, changes are hot-reloaded as you develop

```bash
docker compose down
# delete generated docker images
```
