from typing import Dict
from flask import Blueprint, request

from utilities_for_me.utilities._calculate_percent.calculate_percent import (
    calculate_num_is_what_percent_of,
    calculate_percent_of,
)

bp = Blueprint("calculate-percent", __name__, url_prefix="/api/v1/calculate-percent")

NO_FORMULA_PROVIDED = "no_formula_provided"
BAD_REQUEST_CODE = 400
NEGATIVE_ONE = -1

PERCENT = "percent"
NUM = "num"
OF = "of"

PERCENT_OF = "percent_of"
NUM_IS_WHAT_PERCENT_OF = "num_is_what_percent_of"


def handle_percent_of(_percent: float, _of: float) -> Dict:
    percent = float(_percent)
    of = float(_of)
    data = calculate_percent_of(percent, of)
    return data


def handle_num_is_what_percent_of(_num: float, _of: float) -> Dict:
    num = float(_num)
    of = float(_of)
    data = calculate_num_is_what_percent_of(num, of)
    return data


@bp.route("", methods=["POST"])
def calculate_percent_of_handler():

    formula = request.get_json(silent=True).get("formula", NO_FORMULA_PROVIDED)

    if formula == PERCENT_OF:

        _percent = request.get_json(silent=True).get(PERCENT, NEGATIVE_ONE)
        _of = request.get_json(silent=True).get(OF, NEGATIVE_ONE)

        try:
            data = handle_percent_of(_percent, _of)
            return {"data": data}
        except ValueError as e:
            return {
                "data": {
                    "result": f"could not calculate {_percent}% of {_of}",
                    "steps": {},
                }
            }, BAD_REQUEST_CODE
    elif formula == NUM_IS_WHAT_PERCENT_OF:

        _num = request.get_json(silent=True).get(NUM, NEGATIVE_ONE)
        _of = request.get_json(silent=True).get(OF, NEGATIVE_ONE)

        try:
            data = handle_num_is_what_percent_of(_num, _of)
            return {"data": data}
        except ValueError as e:
            return {
                "data": {
                    "result": f"could not calculate what percent {_num} is of {_of}",
                    "steps": {},
                }
            }, BAD_REQUEST_CODE
    else:
        return {
            "data": {"result": f"unexpected formula: {formula} provided", "steps": {}}
        }, BAD_REQUEST_CODE


# @bp.route("/calculate-percent-of", methods=["POST"])
# def calculate_percent_of_handler():
#     _percent = request.get_json(silent=True).get("percent", -1)
#     _of = request.get_json(silent=True).get("of", -1)

#     try:
#         percent = float(_percent)
#         of = float(_of)

#     except ValueError as e:
#         return {
#             "data": {"result": f"could not calculate {_percent}% of {_of}", "steps": {}}
#         }

#     data = calculate_percent_of(percent, of)
#     return {"data": data}


# @bp.route("/calculate-num-is-what-percent-of", methods=["POST"])
# def calculate_num_is_what_percent_of_handler():
#     _num = request.get_json(silent=True).get("num", -1)
#     _of = request.get_json(silent=True).get("of", -1)

#     try:
#         num = float(_num)
#         of = float(_of)

#     except ValueError as e:
#         return {
#             "data": {"result": f"could not calculate {_num}% of {_of}", "steps": {}}
#         }

#     data = calculate_num_is_what_percent_of(num, of)
#     return {"data": data}
