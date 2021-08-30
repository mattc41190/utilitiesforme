print("let's go already")

from todo_repo import ToDoInMemRepo
from utilities._todo.model import ToDo

def simple_create_test():
    r = ToDoInMemRepo()
    r.create("some_user_id",  ToDo("some_user_id", "test this thing", "incomplete", ["testing"]))

simple_create_test()
