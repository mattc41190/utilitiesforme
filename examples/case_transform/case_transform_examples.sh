echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"from_case":"pascal_case", "to_case":"snake_case", "contents":"HelloThere"}' \
  http://localhost:5050/api/v1/case-transform


echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"from_case":"kebab_case", "to_case":"camel_case", "contents":"hello-There"}' \
  http://localhost:5050/api/v1/case-transform


echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"from_case":"camel_case", "to_case":"space_case", "contents":"helloThere"}' \
  http://localhost:5050/api/v1/case-transform


echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"from_case":"snake_case", "to_case":"pascal_case", "contents":"hello_there"}' \
  http://localhost:5050/api/v1/case-transform