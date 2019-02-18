#!/bin/bash
curl -X DELETE --header "Content-Type: application/json" \
    --data "{\"id\":$1}" 'http://127.0.0.1:5000/article'
