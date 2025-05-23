#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0ODAwMTU4NiwiZXhwIjoxNzQ4MDA1MTg2fQ.TE3vuRGCXAQM-S0NX2CKwzSLSlUYlV8ioDCKC6B4xIE"
ID=1

curl -X DELETE http://localhost:3000/api/todos/$ID \
  -H "Authorization: Bearer $TOKEN"
