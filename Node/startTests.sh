xterm -e "node mainTest config:flow5.js"&
wait
xterm -e "node mainTest config:flow1.js"&
xterm -e "node mainTest config:flow2.js"&
wait
xterm -e "node mainTest config:flow3.js"&
xterm -e "node mainTest config:flow4.js"&
wait
xterm -e "node mainTest config:defaultSettings.js"&
wait
