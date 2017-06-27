#!/bin/bash

node ./helper/getEndpoint.js > .build/endpoint.out
export TODOS_ENDPOINT=`cat .build/endpoint.out`
export HTTPorHTTPS=https

echo $TODOS_ENDPOINT
