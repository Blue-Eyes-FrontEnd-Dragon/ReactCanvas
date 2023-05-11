# Infrastructure

This project is a generic infrastructure configuration utilising `Docker` you can use this with any project to get a database and `nginx` gateway configured with minimal effort, `adminer` is also provided as a means to interact with the database.

# Why use an Nginx gateway?

First of all what is an API gateway? in simple terms it is essentially a specific method of using a reverse proxy. In this project template we use an `Nginx` configuration as a reverse proxy to control traffic within our own internal network. This is a very simple implementation but you have the benefit of having your application hidden behind an additional layer, this means only endpoints within our `Nginx` config will be exposed to the end user, even if we make a mistake on our internal network and accidentally expose more ports than necessary. From this we have less of a concern when having our `services` communicate on their internal network.

To learn more there is a great article [here](https://www.nginx.com/blog/building-microservices-using-an-api-gateway/).

# How To Use

It's as simple as I could make it! all you need to do is update the `nginx.conf` with your own applications
configuration, note that this does rely on your application being `dockerised` as the network being used is a
`docker` network.

Firstly, you should uncomment the proxy pass line in the config and remove the returns. These returns are here only to test the container itself builds correctly.

```
server {
    listen 80;

    server_name localhost;

     access_log  /var/log/nginx/access.log;
     error_log   /var/log/nginx/error.log;

    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Connection $http_connection;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Sec-WebSocket-Extensions $http_sec_websocket_extensions;
        proxy_set_header Sec-WebSocket-Key $http_sec_websocket_key;
        proxy_set_header Sec-WebSocket-Version $http_sec_websocket_version;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 900;
        client_max_body_size 0;
        proxy_buffering off;
        add_header X-Accel-Buffering no;

        proxy_pass http://app-client:3000/;
    }

    location /api/ {
        proxy_pass http://app-api:3001/;
        proxy_set_header Host $host;
    }
}
```

You then likely want to change the proxy_pass `URL` to route the traffic to your own services. This initial setup is assuming a simplistic setup of only two services (a client and an api), you can expand this by adding more `location` configurations or simply run this on a per-app basis with another `reverse-proxy` routing overall traffic, this can be done through a larger docker network.

For a simple setup simply change the `app-client` and `app-api` to the name of your service containers along with the ports they are operating on, docker will handle all of the routing on the network for us.

You will of course need to add the network defined in the `docker-compose` file to your own services networks too.

You could add the default `microservice-network` to your existing services networks in their `docker-compose.yml` or you could update the name to match an existing network in your files. Alternatively you could even place this infrastructure folder in your actual service:

```
project/services/infrastructure/docker-compose.yml
project/services/infrastructure/db/init.sql
project/services/infrastructure/nginx/nginx.conf

project/services/service1/
project/services/service2/
```

and then have another overarching infrastructure in the root of the project which handles the overall routing between these services. This will take quite a bit of additional configuration as you will essentially have a reverse proxy forwarding traffic upstream to another reverse proxy. 

# How should I use this in my project?

Personally, I would pull this into the root of a project. My own project configurations would be something like this:

```
project/services/Makefile
project/infrastructure/docker-compose.yml
project/infrastructure/db/init.sql
project/infrastructure/nginx/nginx.conf

project/services/service1/
project/services/service2/
```

You will

# Testing

To test the container manually on the first run you can simply run `docker-compose up --build -d`. You can then traverse to `localhost:8080/` and `localhost:8080/api/`
you should receive a download, upon opening the file in a text editor you should see the words `Hello Client` or `Hello API` respectively. This means our routing is working as expected.

# Versions
- `Docker` : 3.8
- `Postgres` : 15.2
- `Adminer` : latest
- `Nginx` : 1.23.3