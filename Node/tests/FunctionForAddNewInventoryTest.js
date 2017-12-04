module.exports = function (SF, JS, MF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {

    function addNewInventoryBoard(boardNumbers) {
        SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
        SF.sleep (2);
        MF.WaitWhileBusy ();
        SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][4]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][5]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][6]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][7]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][8]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][6]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][7]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][8]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        if (boardNumbers!=undefined) {
            driver.wait(driver.findElement(By.xpath('//div[@ng-if="total.total_cf > 0 && (!isAccount || isContractPage)"]/span[@ng-bind="total.total_cf"][1]')).getText().then(function (text) {
                boardNumbers.InventoryCubicFit = SF.cleanPrice(text.replace('Total Estimated Cubic Feet:', ''));
            }), config.timeout);
        }
        SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
        SF.sleep (4);
    }

    function addAdditionalNewInventoryBoard(boardNumbers) {
        SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
        MF.WaitWhileBusy();
        SF.sleep (3);
        SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][6]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][7]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][8]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][6]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][7]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][8]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        if (boardNumbers!=undefined) {
            driver.wait(driver.findElement(By.xpath('//div[@ng-if="total.total_cf > 0 && (!isAccount || isContractPage)"]/span[@ng-bind="total.total_cf"][1]')).getText().then(function (text) {
                boardNumbers.InventoryCubicFit = SF.cleanPrice(text.replace('Total Estimated Cubic Feet:', ''));
            }), config.timeout);
        }
        SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
        SF.sleep (4);
    }

    function AccountLocalAddNewInventory(accountNumbers) {
        MF.WaitWhileBusy();
        SF.click(By.id('tab_Inventory'));
        JS.waitForExist('div[ng-repeat="filter in room.filters track by $id(filter)"]');
        SF.sleep(4);
        SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][4]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][5]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][6]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][7]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][8]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][6]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][7]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][8]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
        SF.sleep(1);
        MF.SweetConfirm();
        SF.sleep(3);
        // if (accountNumbers != undefined) {
        //     driver.wait(driver.executeScript('return $(\'div.inventory__toolbar-item:contains("Total Estimated Cubic Feet:")\').text()').then(
        //         function (text) {
        //             accountNumbers.InventoryCbf = SF.cleanPrice(text);
        //             console.log("cbf = " + accountNumbers.InventoryCbf);
        //         }
        //     ),config.timeout);
        // }
    }
    function AccountLocalAddAdditionalNewInventory() {
        MF.WaitWhileBusy();
        JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Inventory\\")');
        SF.sleep(8);
        SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][6]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][7]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][8]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][6]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][7]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][8]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
        SF.sleep(2);
        MF.SweetConfirm();
        SF.sleep(3);
    }
    function AccountFlatRateAddNewInventory() {
        JS.waitForExist('div[ng-repeat="filter in room.filters track by $id(filter)"]');
        SF.sleep(5);
        SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][4]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][5]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][6]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][7]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][8]//button[@ng-click="onClickCounter(1)"]'));
        SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][6]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][7]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//div[@class="inventory__item"][8]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
        SF.click (By.xpath('//button[@ng-click="vm.saveListInventories()"]/span[contains(text(), "Next To Overview")]'));  //нужно будет проверить
        SF.sleep (2);
    }


    return {
        addNewInventoryBoard:addNewInventoryBoard,
        addAdditionalNewInventoryBoard:addAdditionalNewInventoryBoard,
        AccountLocalAddNewInventory:AccountLocalAddNewInventory,
        AccountLocalAddAdditionalNewInventory:AccountLocalAddAdditionalNewInventory,
        AccountFlatRateAddNewInventory:AccountFlatRateAddNewInventory
    };
};
