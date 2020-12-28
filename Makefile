# PYTHON TARGETS

.PHONY: freeze_python_reqs
freeze_python_reqs:
	pip freeze > requirements.txt

.PHONY: install_python_reqs
install_python_reqs:
	pip install -r requirements.txt

.PHONY: format_python
format_python:
	python -m black .

.PHONY: typecheck_python
typecheck_python:
	mypy utilities_for_me/ 

.PHONY: check_python
check_python: typecheck_python format_python

# UNIVERSAL TARGETS

.PHONY: check
check: check_python