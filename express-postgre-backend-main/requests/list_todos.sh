#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0Nzc5MjQ3MSwiZXhwIjoxNzQ3Nzk2MDcxfQ.lo9Scc_PKEX0UhmFx8eFPWPT4wCfLELYyKIN7OOqyKc"

curl -X GET http://localhost:3000/api/todos \
  -H "Authorization: Bearer $TOKEN"
