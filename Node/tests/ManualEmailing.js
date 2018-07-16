module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
	V.subject = SF.randomBukva(15);

    //=========================начинаем писать тест=============================
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'открываем любой реквест и отправляем письмо на тестовую почту';
	MF.Board_OpenFirstRequest();
	MF.EditRequest_OpenMailDialog();
	MF.EditRequest_MailDialog_SetEmail(1, V.testMail.mail);
	MF.EditRequest_MailDialog_AddTemplate('Default','Expired');
	MF.EditRequest_MailDialog_SetSubject(1, V.subject);
	MF.EditRequest_MailDialog_ClickSend();
	MF.EditRequest_CloseEditRequest();
	MF.WaitWhileToaster ();
	MF.Board_LogoutAdmin();
	SF.sleep(40);

condition.nowWeDoing = 'открываем тестовую почту и ищем письмо';
	SF.get('http://mail.ru');
	LF.MailRu_Login(V.testMail.login, V.testMail.password);
	MF.MailRu_CheckEmailExistBySubject(V.subject);
	SF.sleep(3);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
