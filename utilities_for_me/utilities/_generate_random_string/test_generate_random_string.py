from . import generate_random_string

_CAPITAL_LETTERS = generate_random_string.CAPITAL_LETTERS
_LOWERCASE_LETTERS = generate_random_string.LOWERCASE_LETTERS
_NUMBERS = generate_random_string.NUMBERS
_SYMBOLS = generate_random_string.SYMBOLS

capital_letters = "capital_letters"
lowercase_letters = "lowercase_letters"
numbers = "numbers"
symbols = "symbols"


def test_generate_creates_random_string():
    expected_length = 20
    result = generate_random_string.generate(
        20, [capital_letters, lowercase_letters, numbers, symbols]
    )
    assert len(result) == expected_length
    result_in_capital_letters = result[0] in _CAPITAL_LETTERS
    result_in_lowercase_letters = result[0] in _LOWERCASE_LETTERS
    result_in_numbers = result[0] in _NUMBERS
    result_in_symbols = result[0] in _SYMBOLS
    assert any(
        {
            result_in_capital_letters,
            result_in_lowercase_letters,
            result_in_numbers,
            result_in_symbols,
        }
    )


def test_generate_with_capitals_creates_random_string_with_only_capitals():
    expected_length = 20
    result = generate_random_string.generate(20, [capital_letters])
    assert len(result) == expected_length
    result_in_capital_letters = result[0] in _CAPITAL_LETTERS
    result_not_in_lowercase_letters = result[0] not in _LOWERCASE_LETTERS
    result_not_in_numbers = result[0] not in _NUMBERS
    result_not_in_symbols = result[0] not in _SYMBOLS
    assert result_in_capital_letters
    assert result_not_in_lowercase_letters
    assert result_not_in_numbers
    assert result_not_in_symbols
