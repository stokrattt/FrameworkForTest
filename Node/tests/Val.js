module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;
	V.adminLogin = 'roma4ke';
	V.adminPassword = 'root';

	condition.nowWeDoing = 'заходим под админом в настройки валюэйшн, проверяем заполнены ли настройки.';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenSettingsGeneral();
	SF.click(By.xpath('//*[@id="compose-wrapper"]/div[1]/aside/ul/li[3]/a'));
	MF.WaitWhileBusy();
	// берем опцию By persent и начинаем запихивать значения по вертикали
	SF.click(By.xpath('//md-radio-button[@id="radio_2"]'));
	SF.send(By.xpath('//tr[@ng-repeat="body in vm.selectedTable.body track by trackValuationTable($index)"][3]/td/input'),6000);
	SF.click(By.xpath('//div[@ng-if="tab.selected"]'));
	SF.sleep(1);
	SF.send(By.xpath('//tr[@ng-repeat="body in vm.selectedTable.body track by trackValuationTable($index)"][2]/td/input'),5000);
	SF.click(By.xpath('//div[@ng-if="tab.selected"]'));
	SF.sleep(1);
	SF.send(By.xpath('//tr[@ng-repeat="body in vm.selectedTable.body track by trackValuationTable($index)"][1]/td/input'),4000);
	SF.click(By.xpath('//div[@ng-if="tab.selected"]'));
	SF.sleep(1);
	// берем опцию By persent и начинаем запихивать значения по горизонтали
	SF.send(By.xpath('//th[@ng-repeat="deductible in vm.selectedTable.header track by trackValuationTable($index)"][1]/span/input'),600);
	SF.click(By.xpath('//div[@ng-if="tab.selected"]'));
	SF.send(By.xpath('//th[@ng-repeat="deductible in vm.selectedTable.header track by trackValuationTable($index)"][2]/span/input'),500);
	SF.click(By.xpath('//div[@ng-if="tab.selected"]'));
	SF.send(By.xpath('//th[@ng-repeat="deductible in vm.selectedTable.header track by trackValuationTable($index)"][3]/span/input'),400);
	SF.click(By.xpath('//div[@ng-if="tab.selected"]'));
	// берем опцию By persent и начинаем запихивать значения процентов
	driver.findElement(By.xpath('//tr[@class="valuation-table__row body valuation-table-row-index-0"]'))
		.findElements(By.className('valuation-table__cell'))
		.then(function (elements) {
			let breakPointArray = elements.length - 2;
			console.log(elements.id)
		});

	let cellArray = [
		//first row
		'//tr[@class="valuation-table__row body valuation-table-row-index-0"]/td[@class="valuation-table__cell valuation-table-body-cell-index-0"]/input[@ng-if="vm.percent"]',
		'//tr[@class="valuation-table__row body valuation-table-row-index-0"]/td[@class="valuation-table__cell valuation-table-body-cell-index-1"]/input[@ng-if="vm.percent"]',
		'//tr[@class="valuation-table__row body valuation-table-row-index-0"]/td[@class="valuation-table__cell valuation-table-body-cell-index-2"]/input[@ng-if="vm.percent"]',
		//second row
		'//tr[@class="valuation-table__row body valuation-table-row-index-1"]/td[@class="valuation-table__cell valuation-table-body-cell-index-0"]/input[@ng-if="vm.percent"]',
		'//tr[@class="valuation-table__row body valuation-table-row-index-1"]/td[@class="valuation-table__cell valuation-table-body-cell-index-1"]/input[@ng-if="vm.percent"]',
		'//tr[@class="valuation-table__row body valuation-table-row-index-1"]/td[@class="valuation-table__cell valuation-table-body-cell-index-2"]/input[@ng-if="vm.percent"]',
		//third row
		'//tr[@class="valuation-table__row body valuation-table-row-index-2"]/td[@class="valuation-table__cell valuation-table-body-cell-index-0"]/input[@ng-if="vm.percent"]',
		'//tr[@class="valuation-table__row body valuation-table-row-index-2"]/td[@class="valuation-table__cell valuation-table-body-cell-index-1"]/input[@ng-if="vm.percent"]',
		'//tr[@class="valuation-table__row body valuation-table-row-index-2"]/td[@class="valuation-table__cell valuation-table-body-cell-index-2"]/input[@ng-if="vm.percent"]',

	];
	let cellValue = 10;
	cellArray.forEach(function(cell,index){
		SF.send(By.xpath(cell),cellValue);
		SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
		SF.sleep(1);
		cellValue+=5;
		if (index===2||index===5) cellValue = 10;
	});

	SF.click(By.xpath('//button[@ng-click="saveChanges()"]'));
	SF.endOfTest();

};