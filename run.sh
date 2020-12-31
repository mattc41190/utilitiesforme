PRODUCTION="production"
DEVELOPMENT="development"

ENV=$APP_ENV
ENV="${ENV:-$DEVELOPMENT}"
PORT=$APP_PORT
PORT="${PORT:-5000}"

if [ $ENV == "production" ]
then
    gunicorn -b 0.0.0.0:$PORT -w 4 utilities_for_me.web_app.wsgi:app
else
    export FLASK_APP=utilities_for_me.web_app.server
    export FLASK_ENV=$DEVELOPMENT
    flask run \
        --host=0.0.0.0 \
        --port=$PORT
fi
