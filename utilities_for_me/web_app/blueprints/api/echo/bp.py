from flask import Blueprint, redirect, render_template, request, url_for

from utilities_for_me.utilities._echo.echo import (
    echo,
    _upper,
    _lower,
    encode_b64,
    decode_b64,
    kebab_case,
    snake_case,
)

bp = Blueprint("echo", __name__, url_prefix="/api/v1/echo")


@bp.route("/echo", methods=["POST"])
def echo_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = echo(prev_data)
    return {"data": data}


@bp.route("/upper", methods=["POST"])
def upper_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = _upper(prev_data)
    return {"data": data}


@bp.route("/lower", methods=["POST"])
def lower_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = _lower(prev_data)
    return {"data": data}


@bp.route("/encode_b64", methods=["POST"])
def encode_b64_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = encode_b64(prev_data)
    return {"data": data}


@bp.route("/decode_b64", methods=["POST"])
def b64_decode_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = decode_b64(prev_data)
    return {"data": data}


@bp.route("/kebab_case", methods=["POST"])
def kebab_case_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = kebab_case(prev_data)
    return {"data": data}


@bp.route("/snake_case", methods=["POST"])
def snake_case_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = snake_case(prev_data)
    return {"data": data}
