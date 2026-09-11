curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"amina@example.com\",\"password\":\"secret123\"}"
{"token":"<JWT returned by server>","user":{"name":"Amina","email":"amina@example.com"}}
