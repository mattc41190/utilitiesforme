echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"contents":"Hello"}' \
  http://localhost:5050/api/v1/echo/echo

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"contents":"Hello"}' \
  http://localhost:5050/api/v1/echo/upper

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"contents":"Hello"}' \
  http://localhost:5050/api/v1/echo/lower

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"contents":"Hello"}' \
  http://localhost:5050/api/v1/echo/encode_b64

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"contents":"Hello"}' \
  http://localhost:5050/api/v1/echo/decode_b64