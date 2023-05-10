docker build . -t swarch2023i-1a/api-gateway

docker run -p 4000:4000 swarch2023i-1a/api-gateway

docker stop $(docker ps -a -q)

docker-compose up --build