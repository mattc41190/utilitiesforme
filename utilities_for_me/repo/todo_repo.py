import time

from typing import List, Optional

from collections import deque
from utilities_for_me.utilities._todo.model import ToDo

class RepoToDo(object):
    def __init__(self, owner_id, value, status, tags) -> None:
        self.id = None
        self.owner_id = owner_id
        self.value = value
        self.status = status
        self.tags = tags


class ToDoRepo(object):
    def create(self, user_id: str, todo: ToDo) -> ToDo:
        pass

    def update(self, todo_id, user_id: str, todo: ToDo) -> ToDo:
        pass

    def delete(self, todo_id):
        pass

    def get_by_id(self, todo_id, user_id: str) -> ToDo:
        pass

    def get_by_user_id(self, user_id: str) -> List[ToDo]:
        pass

    def marshal_to_app(self, RepoToDo) -> ToDo:
        todo = ToDo(RepoToDo.owner_id, RepoToDo.value, RepoToDo.status, RepoToDo.tags)
        todo.id = RepoToDo.id
        return todo

    def marshal_to_repo(self, todo: ToDo) -> RepoToDo:
        repo_todo = RepoToDo(todo.owner_id, todo.value, todo.status, todo.tags)
        return todo


class ToDoInMemRepo(ToDoRepo):

    def __init__(self) -> None:
        super().__init__()
        self.todos = {}

    def create(self, user_id: str, todo: ToDo):
        todo_list = self.todos.get(user_id) 

        if not todo_list:
            self.todos[user_id] = deque()
        
        print(todo.tags)

        repo_todo = self.marshal_to_repo(todo)
        repo_todo.id = int(time.time())

        todo_list.appendleft(todo)


    def update(self, todo_id: int, user_id: str, todo: ToDo):
        pass

    def delete(self, todo_id: int):
        pass

    def get_by_id(self, todo_id: int, user_id: str) -> Optional[ToDo]:
        users_todos = self.todos.get(user_id)

        if not users_todos:
            print("user not found...")
            return None
        
        repo_todo = users_todos[todo_id]

        return self.marshal_to_app(repo_todo)

    def get_by_user_id(self, user_id: str) -> List[ToDo]:
        pass