from flask import Blueprint, request

from utilities_for_me.utilities._calculate_percent.calculate_percent import (
    calculate_num_is_what_percent_of,
    calculate_percent_of,
)

bp = Blueprint("calculate-percent", __name__, url_prefix="/api/v1/calculate-percent")


@bp.route("/calculate-percent-of", methods=["POST"])
def calculate_percent_of_handler():
    _percent = request.get_json(silent=True).get("percent", -1)
    _of = request.get_json(silent=True).get("of", -1)

    try:
        percent = float(_percent)
        of = float(_of)

    except ValueError as e:
        return {
            "data": {"result": f"could not calculate {_percent}% of {_of}", "steps": {}}
        }

    data = calculate_percent_of(percent, of)
    return {"data": data}


@bp.route("/calculate-num-is-what-percent-of", methods=["POST"])
def calculate_num_is_what_percent_of_handler():
    _num = request.get_json(silent=True).get("num", -1)
    _of = request.get_json(silent=True).get("of", -1)

    try:
        num = float(_num)
        of = float(_of)

    except ValueError as e:
        return {
            "data": {"result": f"could not calculate {_num}% of {_of}", "steps": {}}
        }

    data = calculate_num_is_what_percent_of(num, of)
    return {"data": data}
