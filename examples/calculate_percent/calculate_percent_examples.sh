echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "percent":"50", "of":"100", "formula": "percent_of" }' \
  http://localhost:5050/api/v1/calculate-percent

echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "num":"50", "of":"100", "formula": "num_is_what_percent_of" }' \
  http://localhost:5050/api/v1/calculate-percent
