import os

from flask import Flask, request


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/echo/echo', methods=['POST'])
    def echo():
        from utilities_for_me.utilities._echo.echo import echo
        return echo(request.form.get("contents", ""))

    return app