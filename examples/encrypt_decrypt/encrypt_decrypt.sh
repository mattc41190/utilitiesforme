echo -----
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"message": "hello"}' \
  http://localhost:5050/api/v1/encrypt-decrypt/encrypt

echo -----
echo "Use results from previous request! Expect to fail otherwise!"
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"key": "0ZeheiiSjKcKFCriQlvGkogDPCVD52xH2UXwZRzQJYA=", "encrypted_message": "gAAAAABgDhzULt1vg5lnn_Pu-G9mqgnQtwMY_dW3ZSzLtQ_vp0KMKU3hAj9-7We9F0e3SSkRPI1m6Nhvbmex6XQBOMk8bwthQQ=="}' \
  http://localhost:5050/api/v1/encrypt-decrypt/decrypt