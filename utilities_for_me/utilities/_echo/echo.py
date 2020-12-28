from base64 import b64encode, b64decode
from binascii import Error

USER_ERROR_MESSAGE = "cannot transform content"
UTF_8 = "utf-8"


def echo(_str: str) -> str:
    return _str


def _upper(_str: str) -> str:
    return _str.upper()


def _lower(_str: str) -> str:
    return _str.lower()


def encode_b64(_str: str) -> str:
    encoded_bytes = b64encode(bytes(_str, UTF_8))
    return str(encoded_bytes)


def decode_b64(_str: str) -> str:
    try:
        result = b64decode(_str)
        return str(result, UTF_8)
    except Error as e:
        return USER_ERROR_MESSAGE
