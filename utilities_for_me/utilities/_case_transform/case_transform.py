import re
from typing import List


USER_ERROR_MESSAGE = "cannot transform content"

SPACE_CASE = "space_case"
SNAKE_CASE = "snake_case"
KEBAB_CASE = "kebab_case"
PASCAL_CASE = "pascal_case"
CAMEL_CASE = "camel_case"

EMPTY = ""
SPACE = " "
UNDERSCORE = "_"
DASH = "-"

ACCEPTED_CASES = [SPACE_CASE, SNAKE_CASE, KEBAB_CASE, PASCAL_CASE, CAMEL_CASE]


def _values_in_accepted_cases(accepted_cases, *args):
    for value in args:
        if value not in accepted_cases:
            raise ValueError(f"{value} is not an accepted case for transformation")


def _sanitize_snake_case(dirty_str: str) -> List[str]:
    parts = dirty_str.split(UNDERSCORE)
    lowercased_parts = [word.lower() for word in parts]
    return lowercased_parts


def _sanitize_kebab_case(dirty_str: str) -> List[str]:
    parts = dirty_str.split(DASH)
    lowercased_parts = [word.lower() for word in parts]
    return lowercased_parts


def _sanitize_pascal_case(dirty_str: str) -> List[str]:
    parts = re.findall("[A-Z][^A-Z]*", dirty_str)
    lowercased_parts = [word.lower() for word in parts]
    return lowercased_parts


def _sanitize_camel_case(dirty_str: str) -> List[str]:
    parts = re.findall(".[^A-Z]*", dirty_str)
    lowercased_parts = [word.lower() for word in parts]
    return lowercased_parts


def _sanitize_space_case(dirty_str: str) -> List[str]:
    parts = dirty_str.split(SPACE)
    lowercased_parts = [word.lower() for word in parts]
    return lowercased_parts


def sanitize(from_case: str, dirty_str: str) -> List[str]:
    if from_case == SNAKE_CASE:
        return _sanitize_snake_case(dirty_str)
    elif from_case == KEBAB_CASE:
        return _sanitize_kebab_case(dirty_str)
    elif from_case == PASCAL_CASE:
        return _sanitize_pascal_case(dirty_str)
    elif from_case == CAMEL_CASE:
        return _sanitize_camel_case(dirty_str)
    elif from_case == SPACE_CASE:
        return _sanitize_space_case(dirty_str)

    return ["unable to sanitize contents"]


def _compile_space_case(parts: List[str]) -> str:
    result = SPACE.join(parts)
    return result


def _compile_snake_case(parts: List[str]) -> str:
    result = UNDERSCORE.join(parts)
    return result


def _compile_kebab_case(parts: List[str]) -> str:
    result = DASH.join(parts)
    return result


def _compile_pascal_case(parts: List[str]) -> str:
    first_letter_capitalize_parts = [word.capitalize() for word in parts]
    result = EMPTY.join(first_letter_capitalize_parts)
    return result


def _compile_camel_case(parts: List[str]) -> str:
    first_letter_uppercased_parts = [word.capitalize() for word in parts]
    first_letter_uppercased_parts[0] = first_letter_uppercased_parts[0].lower()
    result = EMPTY.join(first_letter_uppercased_parts)
    return result


def _compile(parts: List[str], to_case: str) -> str:
    if to_case == SNAKE_CASE:
        return _compile_snake_case(parts)
    elif to_case == KEBAB_CASE:
        return _compile_kebab_case(parts)
    elif to_case == PASCAL_CASE:
        return _compile_pascal_case(parts)
    elif to_case == CAMEL_CASE:
        return _compile_camel_case(parts)
    elif to_case == SPACE_CASE:
        return _compile_space_case(parts)

    return "unable to compile string parts"


def transform(from_case: str, to_case: str, contents: str) -> str:
    try:
        _values_in_accepted_cases(ACCEPTED_CASES, from_case, to_case)
    except ValueError as e:
        return USER_ERROR_MESSAGE

    parts = sanitize(from_case, contents)

    result = _compile(parts, to_case)

    return result
