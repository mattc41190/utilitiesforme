from . import hash_data


def test_hash_data_hashed_messages_as_expected():
    print(hash_data.hash("sha256", "hello"))
