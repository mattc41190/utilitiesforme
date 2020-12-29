from . import echo

HELLO = "Hello"
BASE_64_HELLO = "SGVsbG8="


def test_echo_returns_unchanged_input():
    assert echo.echo(HELLO) == HELLO


def test__upper_returns_uppercased_input():
    expected = "HELLO"
    assert echo._upper(HELLO) == expected


def test__lower_returns_lowercased_input():
    expected = "hello"
    assert echo._lower(HELLO) == expected


def test_encode_b64_returns_base64_encoded_input():
    expected = "SGVsbG8="
    assert echo.encode_b64(HELLO) == expected


def test_decode_b64_returns_base64_decoded_input():
    expected = HELLO
    assert echo.decode_b64(BASE_64_HELLO) == expected
