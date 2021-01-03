from flask import Blueprint, render_template

bp = Blueprint("app", __name__)


@bp.route('/', defaults={'u_path': ''})
@bp.route('/<path:u_path>')
def index_page_handler(u_path):
    return render_template("index.jinja2.html")
