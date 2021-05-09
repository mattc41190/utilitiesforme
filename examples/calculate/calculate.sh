echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "numA": 10, "numB": 10 }' \
  http://localhost:5050/api/v1/calculate/add


