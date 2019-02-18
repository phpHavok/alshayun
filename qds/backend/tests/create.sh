#!/bin/bash
curl -X POST --header "Content-Type: application/json" \
    --data "@$1" 'http://127.0.0.1:5000/article'
