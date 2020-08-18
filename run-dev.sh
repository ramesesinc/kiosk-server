docker container stop filipizen-server

docker container rm filipizen-server

docker run -it -d \
    --name filipizen-server \
    -p 5000:5000 \
    ramesesinc/filipizen-server \
    node server.js
