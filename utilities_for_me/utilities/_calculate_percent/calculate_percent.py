ONE_HUNDRED = 100


def _get_steps_for_calculate_percent_of(percent, of, decimal_percent, result):
    step_1 = (
        f"To begin we calculate {percent} / {ONE_HUNDRED} which is {decimal_percent}"
    )
    step_2 = f"Then we take that number ({decimal_percent}) and multiply it by the number that we wanted to find out the first number's percent of ({of}). {decimal_percent} * {of} = {result}."
    step_3 = f"So there you have it, {percent}% of {of} is {result}."
    steps = {"step_1": step_1, "step_2": step_2, "step_3": step_3}
    return steps


def calculate_percent_of(percent: float, of: float):
    decimal_percent = percent / ONE_HUNDRED
    result = decimal_percent * of
    steps = _get_steps_for_calculate_percent_of(percent, of, decimal_percent, result)
    return {"result": result, "steps": steps}


def _get_steps_for_calculate_num_is_what_percent_of(num, of, num_over_of, result):
    step_1 = f"To begin we divide {num} / {of} which is {num_over_of}."
    step_2 = f"Then we multiply that number by {ONE_HUNDRED}, and that's it!"
    step_3 = f"So, {num} is {result}% of {of}."
    steps = {"step_1": step_1, "step_2": step_2, "step_3": step_3}
    return steps


def calculate_num_is_what_percent_of(num: float, of: float):
    num_over_of = num / of
    result = num_over_of * ONE_HUNDRED
    steps = _get_steps_for_calculate_num_is_what_percent_of(num, of, num_over_of, result)
    return {"result": result, "steps": steps}
