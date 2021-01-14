echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "percent":"50", "of":"100" }' \
  http://localhost:5050/api/v1/calculate-percent/calculate-percent-of

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "num":"50", "of":"100" }' \
  http://localhost:5050/api/v1/calculate-percent/calculate-num-is-what-percent-of
