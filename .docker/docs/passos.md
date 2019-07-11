#### PASSOS PARA MONTAR AMBIENTE DOCKER/LARAVEL/PHP7

-  Executar comando, para gerar pasta /vendor do composer: 

No (linux/mac)
```
docker run --rm -v $(pwd):/app composer install 
```

No (windows)
```
docker run --rm -v "%cd%":/app composer install
```


---

- Executar comando, após criação do arquivo DockerFile: 
```
docker build .
```

---

- Executar comando:
```
docker-compose up -d
```

---

Migrando dados do banco existente
``` 
https://github.com/Xethron/migrations-generator
```