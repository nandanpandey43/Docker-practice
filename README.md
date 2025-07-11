# 📦 Docker Compose Command Reference

This guide lists the most common and useful Docker Compose commands to help manage your development and observability stack (Prometheus, Grafana, Loki, Promtail, etc.) efficiently.

---

## 🚀 Start & Run Services

### Start (build if needed) & run in foreground

```bash
docker compose up
```

### Start & run in background (detached mode)

```bash
docker compose up -d
```

### Build images before starting

```bash
docker compose up --build
```

---

## 🛑 Stop & Remove Services

### Stop services (without removing containers)

```bash
docker compose stop
```

### Stop & remove containers, networks

```bash
docker compose down
```

### Stop & remove containers + volumes (persistent data)

```bash
docker compose down -v
```

### Clean unused containers/images/networks/volumes

```bash
docker system prune -a
```

---

## 🔁 Restart Services

### Restart all services

```bash
docker compose restart
```

### Restart a specific service

```bash
docker compose restart grafana
```

---

## 🔍 Monitor & Debug

### View logs from all services

```bash
docker compose logs
```

### View logs from a specific service

```bash
docker compose logs prometheus
```

### Open interactive shell in a container

```bash
docker compose exec grafana sh
```

### Bash shell (if supported)

```bash
docker compose exec grafana bash
```

---

## 🛠 Build & Configuration

### Only build images (do not start containers)

```bash
docker compose build
```

### Recreate containers (without rebuilding)

```bash
docker compose up -d --force-recreate
```

---

## 🧪 Status & Inspection

### List running containers

```bash
docker compose ps
```

### View full merged config

```bash
docker compose config
```

---

## ✅ Summary Cheatsheet

| Task           | Command                          |
| -------------- | -------------------------------- |
| Start          | `docker compose up`              |
| Start in bg    | `docker compose up -d`           |
| Stop           | `docker compose stop`            |
| Down + volumes | `docker compose down -v`         |
| Restart        | `docker compose restart`         |
| Logs           | `docker compose logs`            |
| Exec shell     | `docker compose exec grafana sh` |
| Build only     | `docker compose build`           |
| Clean system   | `docker system prune -a`         |

---