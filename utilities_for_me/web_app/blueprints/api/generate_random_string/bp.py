from typing import Dict
from flask import Blueprint, request

from utilities_for_me.utilities._generate_random_string.generate_random_string import (
    generate,
    CAPITAL_LETTERS_TITLE,
    LOWERCASE_LETTERS_TITLE,
    NUMBERS_TITLE,
    SYMBOLS_TITLE,
)

bp = Blueprint(
    "generate-random-string", __name__, url_prefix="/api/v1/generate-random-string"
)


@bp.route("", methods=["POST"])
def calculate_percent_of_handler():
    acceptable_categories = [
        CAPITAL_LETTERS_TITLE,
        LOWERCASE_LETTERS_TITLE,
        NUMBERS_TITLE,
        SYMBOLS_TITLE,
    ]
    provided_categories = []
    raw_length = request.get_json(silent=True).get("length", 8)

    try:
        length = int(raw_length)
        if length > 128:
            length = 128
    except ValueError as e:
        print(e)  # TODO: Use logger
        return {"result": f"{raw_length} is not a usable number"}, 400

    body_categories = request.get_json(silent=True).get("categories", [])

    for category in body_categories:
        if category in acceptable_categories:
            provided_categories.append(category)

    if len(provided_categories) == 0:
        return {
            "result": "no usable characters categories provided for string generation"
        }, 400

    result = generate(length, provided_categories)
    data = {"result": result}
    return {"data": data}
