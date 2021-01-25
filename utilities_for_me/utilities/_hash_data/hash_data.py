import hashlib

SHA_256 = "sha256"
UTF_8 = "utf8"


def hash(algorithm: str = SHA_256, data: str = ""):
    if algorithm == SHA_256:
        return hashlib.sha256(bytes(data, UTF_8)).hexdigest()
