#!/bin/bash

curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "gigi",
    "email": "gigi@example.com",
    "password": "senha1234"
  }'
