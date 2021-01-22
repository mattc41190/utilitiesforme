echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"length": 10,  "categories":["capital_letters", "lowercase_letters", "numbers", "symbols"]}' \
  http://localhost:5050/api/v1/generate-random-string

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"length": 12,  "categories":["capital_letters", "lowercase_letters"]}' \
  http://localhost:5050/api/v1/generate-random-string
