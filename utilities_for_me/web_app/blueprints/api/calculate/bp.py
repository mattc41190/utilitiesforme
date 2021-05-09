from typing import Dict
from flask import Blueprint, request

from utilities_for_me.utilities._calculate.calculate import add

bp = Blueprint("calculate", __name__, url_prefix="/api/v1/calculate")


@bp.route("/add", methods=["POST"])
def handle_add() -> Dict:
    num_a = request.get_json(silent=True).get("numA", 0)
    num_b = request.get_json(silent=True).get("numB", 0)

    sum = add(num_a, num_b)
    data = {"sum": sum}
    return data
