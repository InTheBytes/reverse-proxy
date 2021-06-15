@echo off
setlocal
if ["%~1"]==[""] (
	call :All
) else (
	call :Check %~1
	call :Check %~2
	call :Check %~3
	call :Check %~4
	call :Check %~5
)
npm start
setlocal
exit /B 0

:Check
setlocal
if ["%~1"]==["restaurant"] (call :Restaurant)
if ["%~1"]==["account"] (call :Account)
if ["%~1"]==["search"] (call :Search)
if ["%~1"]==["order"] (call :Order)
if ["%~1"]==["swagger"] (call :Swagger)
endlocal
exit /b 0

:All
call :Restaurant
call :Account
call :Order
call :Search
call :Swagger
exit /b 0

:Restaurant
call :Launch restaurant-manage-service 8083 restaurantmanager
exit /b 0

:Account
call :Launch account-service 8082 accountservice
exit /b 0

:Order
call :Launch order-service 8084 orderservice
exit /b 0

:Search
call :Launch search-service 8081 searchservice
exit /b 0

:Swagger
call :Launch open-api-single 8085 openapi
exit /b 0

:Launch
setlocal
start cmd.exe /k "cd ..\%~1 & mvn clean package & java -jar -Dserver.port=%~2 -Dspring.datasource.maxActive=1 target\%~3-0.0.1-SNAPSHOT.jar"
endlocal
exit /b 0