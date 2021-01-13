from . import case_transform


def test__values_in_accepted_cases_allows_accepted_cases():
    accepted_cases = ["some_case"]
    case = "some_case"
    case_transform._values_in_accepted_cases(accepted_cases, case)


def test_transform_snake_to_kebab_transforms_content_as_expected():
    expected = "hello-there"
    actual = case_transform.transform("snake_case", "kebab_case", "hello_there")
    assert actual == expected


def test_transform_kebab_to_snake_transforms_content_as_expected():
    expected = "hello_there"
    actual = case_transform.transform("kebab_case", "snake_case", "hello-there")
    assert actual == expected


def test_transform_kebab_to_pascal_transforms_content_as_expected():
    expected = "HelloThere"
    actual = case_transform.transform("kebab_case", "pascal_case", "hello-there")
    assert actual == expected


def test_transform_pascal_to_snake_transforms_content_as_expected():
    expected = "hello_there"
    actual = case_transform.transform("pascal_case", "snake_case", "HelloThere")
    assert actual == expected


def test_transform_pascal_to_camel_transforms_content_as_expected():
    expected = "helloThere"
    actual = case_transform.transform("pascal_case", "camel_case", "HelloThere")
    assert actual == expected


def test_transform_camel_to_pascal_transforms_content_as_expected():
    expected = "HelloThere"
    actual = case_transform.transform("camel_case", "pascal_case", "helloThere")
    assert actual == expected


def test_transform_camel_to_kebab_transforms_content_as_expected():
    expected = "hello-there"
    actual = case_transform.transform("camel_case", "kebab_case", "helloThere")
    assert actual == expected


def test_transform_space_to_kebab_transforms_content_as_expected():
    expected = "hello-there"
    actual = case_transform.transform("space_case", "kebab_case", "hello There")
    assert actual == expected


def test_transform_snake_to_space_transforms_content_as_expected():
    expected = "hello there"
    actual = case_transform.transform("snake_case", "space_case", "hello_There")
    assert actual == expected
