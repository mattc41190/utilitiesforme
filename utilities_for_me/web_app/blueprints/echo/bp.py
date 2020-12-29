from flask import Blueprint, redirect, render_template, request, url_for

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


@bp.route("/echo", methods=["GET", "POST"])
def echo_handler():
    if request.method == "POST":
        prev_data = request.form.get("contents", "")
        data = echo(prev_data)
        return render_template("echo.jinja2.html", prev_data=prev_data, data=data)
    return redirect(url_for("echo_page_handler"))


@bp.route("/upper", methods=["GET", "POST"])
def upper_handler():
    if request.method == "POST":
        prev_data = request.form.get("contents", "")
        data = _upper(prev_data)
        return render_template("echo.jinja2.html", prev_data=prev_data, data=data)
    return redirect(url_for("echo_page_handler"))


@bp.route("/lower", methods=["GET", "POST"])
def lower_handler():
    if request.method == "POST":
        prev_data = request.form.get("contents", "")
        data = _lower(prev_data)
        return render_template("echo.jinja2.html", prev_data=prev_data, data=data)
    return redirect(url_for("echo_page_handler"))


@bp.route("/encode_b64", methods=["GET", "POST"])
def encode_b64_handler():
    if request.method == "POST":
        prev_data = request.form.get("contents", "")
        data = encode_b64(prev_data)
        return render_template("echo.jinja2.html", prev_data=prev_data, data=data)
    return redirect(url_for("echo_page_handler"))


@bp.route("/decode_b64", methods=["GET", "POST"])
def b64_decode_handler():
    if request.method == "POST":
        prev_data = request.form.get("contents", "")
        data = decode_b64(prev_data)
        return render_template("echo.jinja2.html", prev_data=prev_data, data=data)
    return redirect(url_for("echo_page_handler"))
