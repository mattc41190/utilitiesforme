from flask import Blueprint, render_template, request

from utilities_for_me.utilities._echo.echo import (
    echo,
    _upper,
    _lower,
    encode_b64,
    decode_b64,
)

bp = Blueprint("echo", __name__, url_prefix="/echo")


@bp.route("/", methods=["GET"])
def echo_page_handler():
    return render_template("echo.jinja2.html")


@bp.route("/echo", methods=["POST"])
def echo_handler():
    return echo(request.form.get("contents", ""))


@bp.route("/upper", methods=["POST"])
def upper_handler():
    return _upper(request.form.get("contents", ""))


@bp.route("/lower", methods=["POST"])
def lower_handler():
    return _lower(request.form.get("contents", ""))


@bp.route("/encode_b64", methods=["POST"])
def encode_b64_handler():
    return encode_b64(request.form.get("contents", ""))


@bp.route("/decode_b64", methods=["POST"])
def b64_decode_handler():
    return decode_b64(request.form.get("contents", ""))
