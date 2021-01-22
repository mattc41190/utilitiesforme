from random import randint
from typing import List

CAPITAL_LETTERS_TITLE = "capital_letters"
LOWERCASE_LETTERS_TITLE = "lowercase_letters"
NUMBERS_TITLE = "numbers"
SYMBOLS_TITLE = "symbols"

ZERO = 0

# Turn Black Formatter Off
# fmt: off
CAPITAL_LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
LOWERCASE_LETTERS = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
NUMBERS = ["0","1","2","3","4","5","6","7","8","9"]
SYMBOLS = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", ";", ":", ",", "<", ".", ">", "/", "?", "\\"]
# fmt: on


category_map = {
    CAPITAL_LETTERS_TITLE: CAPITAL_LETTERS,
    LOWERCASE_LETTERS_TITLE: LOWERCASE_LETTERS,
    NUMBERS_TITLE: NUMBERS,
    SYMBOLS_TITLE: SYMBOLS,
}


def choose_character(category: List) -> str:
    n = randint(ZERO, len(category) - 1)
    return category[n]


def choose_category(categories: List[List]) -> List:
    n = randint(ZERO, len(categories) - 1)
    return categories[n]


def generate(length: int, provided_categories: List) -> str:
    result = ""
    allowed_categories = []
    for potential_category in provided_categories:
        category = category_map.get(potential_category, None)
        if category:
            allowed_categories.append(category)
    for _ in range(length):
        category = choose_category(allowed_categories)
        character = choose_character(category)
        result = result + character
    return result
