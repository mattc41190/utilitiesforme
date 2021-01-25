from typing import Dict

from cryptography.fernet import Fernet

KEY_LENGTH = 32
SUCCESS = "success"

UTF_8 = "utf8"


def generate_key() -> bytes:
    return Fernet.generate_key()


def check_key(key: str) -> str:
    if not isinstance(key, str):
        return "key was not a string"
    return SUCCESS


def encrypt(message: str) -> Dict[str, str]:
    key = generate_key()
    endcoded_message = message.encode()

    f = Fernet(key)
    encrypted_message = f.encrypt(endcoded_message)

    result = {
        "key": str(key, UTF_8),
        "encrypted_message": str(encrypted_message, UTF_8),
    }

    return result


def decrypt(key: str, encrypted_message: str) -> str:
    result = check_key(key)
    if result != SUCCESS:
        return result

    try:
        b_key = bytes(key, UTF_8)
        b_encrypted_message = bytes(encrypted_message, UTF_8)
        f = Fernet(b_key)
        decrypted_message = f.decrypt(b_encrypted_message)
        return str(decrypted_message, UTF_8)
    except ValueError as e:
        print(e)
        return f"key or message invalid: {e}"
