build:
	@echo "Building frontend..."
	# Сборка frontend-приложения
	npm run --prefix frontend build

start:
	@echo "Starting server..."
	# Запуск сервера, который будет отдавать статику из ./frontend/dist
	npx start-server -s ./frontend/dist

.PHONY: build start