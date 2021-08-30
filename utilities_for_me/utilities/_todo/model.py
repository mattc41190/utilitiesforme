class ToDo(object):
    def __init__(self, owner_id, value, status, tags) -> None:
        self.id = None
        self.owner_id = owner_id
        self.value = value
        self.status = status
        self.tags = tags
