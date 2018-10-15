установка:
1. npm install -g protractor
2. npm install -g webdriver-manager
	!посмотрите, куда он сохранил папку webdriver-manager/selenium
3. webdriver-manager update

Запуск теста:
1. переходим в папку с конфигами(moveboard-tests)
2. webdriver-manager start //чтобы не вылетал браузер после остановки теста
3. protractor название.conf

Если не запустится, значит, глюк при установке вебдрайвера.
Не может найти папку selenium.
Надо скопировать папку /usr/lib/node_modules/webdriver-manager/selenium
в /usr/lib/node_modules/protractor/node_modules/webdriver-manager/selenium
(в виндусе аналогично)

