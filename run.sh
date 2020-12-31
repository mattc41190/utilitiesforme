PRODUCTION="production"
DEVELOPMENT="development"

ENV=$1
ENV="${ENV:-$DEVELOPMENT}"
PORT=$2
PORT="${PORT:-8080}"

if [ $ENV == "production" ]
then
    gunicorn -w 4 utilities_for_me.web_app.server:create_app
else
    export FLASK_APP=utilities_for_me.web_app.server
    export FLASK_ENV=$DEVELOPMENT
    flask run \
        --host=0.0.0.0 \
        --port=$PORT
fi
