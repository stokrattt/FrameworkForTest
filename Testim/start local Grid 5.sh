mate-terminal -e "java -jar server.jar  -role hub"
sleep 10
mate-terminal -e "java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5551 -browser browserName=chrome"
mate-terminal -e "java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5552 -browser browserName=chrome"
mate-terminal -e "java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5553 -browser browserName=chrome"
mate-terminal -e "java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5554 -browser browserName=chrome"
mate-terminal -e "java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5555 -browser browserName=chrome"
