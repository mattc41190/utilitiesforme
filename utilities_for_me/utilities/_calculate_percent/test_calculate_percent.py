from . import calculate_percent


def test_calculate_percent_of_correctly_calculates_percent():
    expected = 15
    actual = calculate_percent.calculate_percent_of(10, 150).get("result", -99999)
    assert actual == expected


def test_calculate_num_is_what_percent_of_correctly_calculates_percent():
    expected = 20
    actual = calculate_percent.calculate_num_is_what_percent_of(12, 60).get(
        "result", -99999
    )
    assert actual == expected


def test_calculate_percent_of_correctly_compiles_steps():
    expected_step_1 = "To begin we calculate 10 / 100 which is 0.1"

    steps = calculate_percent.calculate_percent_of(10, 150).get("steps", None)
    actual_step_1 = steps.get("step_1", None)

    assert actual_step_1 == expected_step_1
