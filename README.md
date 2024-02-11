# Getting Start

## Start Local with docker

```bash
cp .env.example .env.local
```

```bash
docker-compose build --no-cache

docker-compose run --rm app yarn install

docker-compose up
```

## Link

- [【Supabase 入門】認証・DB・リアルタイムリスナーを使ってチャットアプリを作ろう](https://zenn.dev/chot/articles/ddd2844ad3ae61)
