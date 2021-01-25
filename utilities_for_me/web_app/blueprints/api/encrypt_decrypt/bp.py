from flask import Blueprint, request

from utilities_for_me.utilities._encrypt_decrypt.encrypt_decrypt import encrypt, decrypt

bp = Blueprint("encrypt-decrypt", __name__, url_prefix="/api/v1/encrypt-decrypt")


@bp.route("/encrypt", methods=["POST"])
def encrypt_handler():
    message = request.get_json(silent=True).get("message", "")
    data = encrypt(message)
    return {"data": data}


@bp.route("/decrypt", methods=["POST"])
def decrypt_handler():
    key = request.get_json(silent=True).get("key", "")
    encrypted_message = request.get_json(silent=True).get("encrypted_message", "")
    data = decrypt(key, encrypted_message)
    return {"data": data}
