# curl -X POST -F "contents=hello" http://localhost:5000/echo/echo
# echo
# curl -X POST -F "contents=HELLO" http://localhost:5000/echo/lower
# echo
# curl -X POST -F "contents=hello" http://localhost:5000/echo/upper
# echo
# curl -X POST -F "contents=hElLo" http://localhost:5000/echo/encode_b64
# echo
# curl -X POST -F "contents=aEVsTG8=" http://localhost:5000/echo/decode_b64


echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"contents":"Hello"}' \
  http://localhost:5000/api/v1/echo/echo

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"contents":"Hello"}' \
  http://localhost:5000/api/v1/echo/upper

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"contents":"Hello"}' \
  http://localhost:5000/api/v1/echo/lower

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"contents":"Hello"}' \
  http://localhost:5000/api/v1/echo/encode_b64

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"contents":"Hello"}' \
  http://localhost:5000/api/v1/echo/decode_b64