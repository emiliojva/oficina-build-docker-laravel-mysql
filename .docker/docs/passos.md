### PASSOS PARA MONTAR AMBIENTE DOCKER/LARAVEL/PHP7

#####Baixar Repositorio github

download in https://github.com/emiliojva/oficina-build-docker-laravel-mysql/tree/master/.docker

#####Compor pasta `vendor` 
```
composer install
```

#####Build da imagem utilizada pelo docker-compose
```
docker build .\.docker\
```


#####  Executar comando, para gerar pasta /vendor do composer: 

###### No (linux/mac)
```
docker run --rm -v $(pwd):/app composer install 
```

###### No (windows)
```
docker run --rm -v "%cd%":/app composer install
```


---

##### Executar comando, após criação do arquivo DockerFile: 
```
docker build .
```

---

##### Executar comando:
```
docker-compose up -d
```

---

##### tools - Migrando dados do banco existente
``` 
https://github.com/Xethron/migrations-generator
```