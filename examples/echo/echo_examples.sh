curl -X POST -F "contents=hello" http://localhost:5000/echo/echo
echo
curl -X POST -F "contents=HELLO" http://localhost:5000/echo/lower
echo
curl -X POST -F "contents=hello" http://localhost:5000/echo/upper
echo
curl -X POST -F "contents=hElLo" http://localhost:5000/echo/encode_b64
echo
curl -X POST -F "contents=aEVsTG8=" http://localhost:5000/echo/decode_b64