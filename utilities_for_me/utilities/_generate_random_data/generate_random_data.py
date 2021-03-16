from random import randint

from typing import Dict

ZERO = 0

FP = "FP"
MP = "MP"
LP = "LP"

ALIEN_FIRST_PRT_NAME = ["tram", "frig", "swano", "turg", "zurg", "wu", "elleka", "ter", ""]
ALIEN_SECOND_PRT_NAME = ["bin", "werf", "blum", "zig", "rusk", "o", ""]
ALIEN_THIRD_PRT_NAME = ["ulon", "ulin", "alor", "eher", "uja", "aha", "imov", ""]



def generate(type: str, num: int) -> Dict:
    alien_name = generate_alien_name()
    return {"data": alien_name}

def get_alien_name_part(part: str):
    if part == FP:
        n = randint(ZERO, len(ALIEN_FIRST_PRT_NAME) - 1)
        return ALIEN_FIRST_PRT_NAME[n] 
    elif part == MP:
        n = randint(ZERO, len(ALIEN_SECOND_PRT_NAME) - 1)
        return ALIEN_SECOND_PRT_NAME[n] 
    else:
        n = randint(ZERO, len(ALIEN_THIRD_PRT_NAME) - 1)
        return ALIEN_THIRD_PRT_NAME[n] 


def generate_alien_name() -> str:
    fp = get_alien_name_part(FP)
    mp = get_alien_name_part(MP)
    lp= get_alien_name_part(LP)
    return "".join([fp,mp,lp]).capitalize()