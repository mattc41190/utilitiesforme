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

.PHONY: test_python
test_python:
	coverage run -m pytest -s utilities_for_me && coverage html

.PHONY: check_python
check_python: typecheck_python format_python test_python

.PHONY: build_python
build_python: check_python

# JAVASCRIPT TARGETS

.PHONY: format_js
format_js:
	npm run standard

.PHONY: check_js
check_js: format_js

.PHONY: run_dev_ui
run_dev_ui: 
	npm run parcel-watch

.PHONY: build_js
build_js: check_js
	npm run parcel-build

# UNIVERSAL TARGETS

.PHONY: check_only
check_only: check_python check_js

.PHONY: build
build: build_python build_js

.PHONY: build_image
build_image: build
	docker build -t utilities-for-me:latest .

.PHONY: run_dev_server
run_dev_server: check_python
	export PORT=5050 && sh run_dev.sh

.PHONY: run_prod_local
run_prod_local: build
	export PORT=5151 && sh run_prod.sh

.PHONY: run_dev_image
run_dev_image: build_image
	docker run -e "SCRIPT=run_dev.sh" -d -p 5050:5050 utilities-for-me:latest

.PHONY: run_prod_image
run_prod_image: build_image
	docker run -e "PORT=80" -e "SCRIPT=run_prod.sh" -d -p 80:80 utilities-for-me:latest

.PHONY: deploy_prod_cdn
deploy_prod_cdn: build_js
	gsutil -m rsync -r utilities_for_me/web_app/static  gs://utilities-for-me/static

.PHONY: deploy_prod
deploy_prod: build
	gcloud app deploy