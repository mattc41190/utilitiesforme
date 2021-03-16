from . import generate_random_data

def test_generate_alien_name():
    alien_name = generate_random_data.generate_alien_name()
    print(alien_name)