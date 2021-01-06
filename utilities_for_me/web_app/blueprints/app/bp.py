from flask import Blueprint, current_app, render_template

bp = Blueprint("app", __name__)


@bp.route("/", defaults={"u_path": ""})
@bp.route("/<path:u_path>")
def index_page_handler(u_path):
    static_root = current_app.config["STATIC_ROOT"]
    return render_template("index.jinja2.html", static_root=static_root)
