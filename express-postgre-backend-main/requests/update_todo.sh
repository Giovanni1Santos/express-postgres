
#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0NzU5OTUxMywiZXhwIjoxNzQ3NjAzMTEzfQ.YlJ4jLvHsK81rAx_MrxuTMjMjp-_yqtPn1sN4piQvK0"
ID=1

curl -X PUT http://localhost:3000/api/todos/$ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "done": 1
  }'
