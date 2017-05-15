xterm -geometry 100x25 -bg black -e "java -jar server.jar -role hub"&
sleep 10
xterm -geometry 100x25 -bg blue -e "java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5561 -browser browserName=chrome"&
xterm -geometry 100x25 -bg blue -e "java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5562 -browser browserName=chrome"&
xterm -geometry 100x25 -bg blue -e "java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5563 -browser browserName=chrome"&
xterm -geometry 100x25 -bg blue -e "java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5564 -browser browserName=chrome"&
xterm -geometry 100x25 -bg blue -e "java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5565 -browser browserName=chrome"&
sleep 10
bash ./startTests.sh
