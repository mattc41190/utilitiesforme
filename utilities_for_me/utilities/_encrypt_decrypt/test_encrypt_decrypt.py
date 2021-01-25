from . import encrypt_decrypt


def test_encrypt_returns_key_and_encrypted_message():
    result = encrypt_decrypt.encrypt("hello")
    assert len(result["key"])
    assert len(result["encrypted_message"])


def test_decrypt_returns_decrypted_message():
    encrypt_result = encrypt_decrypt.encrypt("hello")
    k = encrypt_result["key"]
    m = encrypt_result["encrypted_message"]
    result = encrypt_decrypt.decrypt(k, m)
    assert result == "hello"
