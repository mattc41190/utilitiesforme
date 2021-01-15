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
    expected_step_2 = "Then we take that number (0.1) and multiply it by the number that we wanted to find out the first number's percent of (150). 0.1 * 150 = 15.0."
    expected_step_3 = "So there you have it, 10% of 150 is 15.0."

    steps = calculate_percent.calculate_percent_of(10, 150).get("steps", None)
    actual_step_1 = steps.get("step_1", None)
    actual_step_2 = steps.get("step_2", None)
    actual_step_3 = steps.get("step_3", None)

    assert actual_step_1 == expected_step_1
    assert actual_step_2 == expected_step_2
    assert actual_step_3 == expected_step_3


def test_calculate_num_is_what_percent_of_correctly_compiles_steps():
    expected_step_1 = "To begin we divide 12 / 60 which is 0.2."
    expected_step_2 = "Then we multiply that number by 100, and that's it!"
    expected_step_3 = "So, 12 is 20.0% of 60."

    steps = calculate_percent.calculate_num_is_what_percent_of(12, 60).get(
        "steps", None
    )
    actual_step_1 = steps.get("step_1", None)
    actual_step_2 = steps.get("step_2", None)
    actual_step_3 = steps.get("step_3", None)

    assert actual_step_1 == expected_step_1
    assert actual_step_2 == expected_step_2
    assert actual_step_3 == expected_step_3
