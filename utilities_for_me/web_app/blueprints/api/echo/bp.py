from flask import Blueprint, request

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


@bp.route("/encode-b64", methods=["POST"])
def encode_b64_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = encode_b64(prev_data)
    return {"data": data}


@bp.route("/decode-b64", methods=["POST"])
def b64_decode_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = decode_b64(prev_data)
    return {"data": data}


@bp.route("/kebab-case", methods=["POST"])
def kebab_case_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = kebab_case(prev_data)
    return {"data": data}


@bp.route("/snake-case", methods=["POST"])
def snake_case_handler():
    prev_data = request.get_json(silent=True).get("contents", "")
    data = snake_case(prev_data)
    return {"data": data}
