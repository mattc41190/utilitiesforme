from flask import Blueprint, render_template

bp = Blueprint("app", __name__)


@bp.route("/", methods=["GET"])
def index_page_handler():
    return render_template("index.jinja2.html")