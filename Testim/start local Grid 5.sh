xterm -geometry 150x30 -bg blue -e java -jar server.jar -role hub &
sleep 10
xterm -geometry 150x30 -e java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5551 -browser browserName=chrome &
xterm -geometry 150x30 -e java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5552 -browser browserName=chrome &
xterm -geometry 150x30 -e java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5553 -browser browserName=chrome &
xterm -geometry 150x30 -e java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5554 -browser browserName=chrome &
xterm -geometry 150x30 -e java -jar server.jar -role webdriver -hub http://localhost:4444/grid/register -port 5555 -browser browserName=chrome &
