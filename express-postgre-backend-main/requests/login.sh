#!/bin/bash

curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "gigi@example.com",
    "password": "senha1234"
  }'
