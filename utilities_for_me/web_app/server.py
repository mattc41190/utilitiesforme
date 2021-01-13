import os
import logging
from os import environ

from flask import Flask, url_for

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

    static_root = ""

    if app.config["ENV"] == "production":
        static_root = (
            "https://storage.googleapis.com/utilities-for-me"  # config based on env
        )
    app.config["STATIC_ROOT"] = static_root

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from .blueprints.app import bp as app_bp
    from .blueprints.api.echo import bp as echo_bp
    from .blueprints.api.case_transform import bp as case_transform_bp

    app.register_blueprint(app_bp.bp)
    app.register_blueprint(echo_bp.bp)
    app.register_blueprint(case_transform_bp.bp)

    return app
