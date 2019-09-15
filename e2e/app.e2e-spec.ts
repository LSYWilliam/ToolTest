import {browser, element, by, $, $$} from 'protractor';
import {protractor} from "protractor/built/ptor";

describe('wlanscope-front App', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    it('should redirect index.html to http://localhost:4200/#/login', function () {
        browser.get('/');
        expect(browser.getCurrentUrl()).toContain('/#/login');// ����
        browser.sleep(1000);// ˯��1�룬�۲�Ч��
    });
    describe('Login html', () => {
        beforeEach(() => {
            browser.waitForAngularEnabled(false);
            browser.get('/');  //  ��������ҳ
        });
        it('should turn to login page', () => {
            const title = element(by.css('div.login_title'));
            const titleText = title.getText(); // ץȡԪ���ı�
            expect(titleText).toEqual('�� �� �� ƽ ̨',titleText);
        });
        xit("should has confirmCode ",()=> {
            const confirmCode = element(by.css("img"));
            const confirmCodeEl = confirmCode.getAttribute("src");
            expect(confirmCodeEl).toBeUndefined('��������֤��');
        });
        it('should login with correct username and correct password', () => {
            const loginContent = element(by.className('login_item'));
            const loginContentEl = loginContent.getText();
            expect(loginContentEl).toContain('�˺ŵ�¼');

            element.all(by.tagName("input")).get(0).sendKeys('admin'); // ���ݲ����û���
            element.all(by.tagName("input")).get(1).sendKeys('admin'); // ���ݲ�������
            element.all(by.tagName("input")).get(2).sendKeys('1234');
            element(by.tagName("button")).click(); // ����¼�

            let EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf($(".system_name")),10000);// ˯��1�룬�۲�Ч��

            const pageName=element(by.className("system_name"));
            const page = $$(".system_name").getText();
            const pageText = pageName.getText();

            expect(pageText).toBe('�� �� �� ƽ ̨',pageText);
            browser.sleep(1000);// ˯��1�룬�۲�Ч��
        });

        it('login failed with error username', () => {
            const loginContent = element(by.className('login_item'));
            const loginContentEl = loginContent.getText();
            expect(loginContentEl).toContain('�˺ŵ�¼');

            element.all(by.tagName("input")).get(0).sendKeys('admiqwdwqn'); // ���ݲ����û���
            element.all(by.tagName("input")).get(1).sendKeys('admin'); // ���ݲ�������
            element.all(by.tagName("input")).get(2).sendKeys('1234');
            element(by.tagName("button")).click(); // ����¼�

            browser.sleep(1000);// ˯��1�룬�۲�Ч��

            expect(element(by.className("system_name")).isPresent()).not.toBeTruthy('��¼ʧ��');
            browser.sleep(1000);// ˯��1�룬�۲�Ч��
        });

        it('login failed with correct username and error password', () => {
            const loginContent = element(by.className('login_item'));
            const loginContentEl = loginContent.getText();
            expect(loginContentEl).toContain('�˺ŵ�¼');

            element.all(by.tagName("input")).get(0).sendKeys('admin'); // ���ݲ����û���
            element.all(by.tagName("input")).get(1).sendKeys('admin123'); // ���ݲ�������
            element.all(by.tagName("input")).get(2).sendKeys('1234');
            element(by.tagName("button")).click(); // ����¼�

            browser.sleep(1000);// ˯��1�룬�۲�Ч��

            expect(element(by.className("system_name")).isPresent()).not.toBeTruthy('��¼ʧ��');
            browser.sleep(1000);// ˯��1�룬�۲�Ч��
        });
    });
});
