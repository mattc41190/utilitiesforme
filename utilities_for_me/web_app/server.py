import os
import logging

from flask import Flask

logging.basicConfig(level=logging.INFO)


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY="dev",
    )

    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from .blueprints.app import bp as app_bp
    from .blueprints.api.echo import bp as echo_bp

    app.register_blueprint(app_bp.bp)
    app.register_blueprint(echo_bp.bp)

    return app
