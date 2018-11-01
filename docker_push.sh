#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t jackhammer-client .
docker tag jackhammer-client $DOCKER_USERNAME/jackhammer-client 
docker push $DOCKER_USERNAME/jackhammer-client
