import {browser, element, by, $, $$} from 'protractor';
import {protractor} from "protractor/built/ptor";

describe('wlanscope-front App', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    it('should redirect index.html to http://localhost:4200/#/login', function () {
        browser.get('/');
        expect(browser.getCurrentUrl()).toContain('/#/login');// 断言
        browser.sleep(1000);// 睡眠1秒，观察效果
    });
    describe('Login html', () => {
        beforeEach(() => {
            browser.waitForAngularEnabled(false);
            browser.get('/');  //  导航到首页
        });
        it('should turn to login page', () => {
            const title = element(by.css('div.login_title'));
            const titleText = title.getText(); // 抓取元素文本
            expect(titleText).toEqual('无 限 云 平 台',titleText);
        });
        xit("should has confirmCode ",()=> {
            const confirmCode = element(by.css("img"));
            const confirmCodeEl = confirmCode.getAttribute("src");
            expect(confirmCodeEl).toBeUndefined('不存在验证码');
        });
        it('should login with correct username and correct password', () => {
            const loginContent = element(by.className('login_item'));
            const loginContentEl = loginContent.getText();
            expect(loginContentEl).toContain('账号登录');

            element.all(by.tagName("input")).get(0).sendKeys('admin'); // 传递测试用户名
            element.all(by.tagName("input")).get(1).sendKeys('admin'); // 传递测试密码
            element.all(by.tagName("input")).get(2).sendKeys('1234');
            element(by.tagName("button")).click(); // 点击事件

            let EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf($(".system_name")),10000);// 睡眠1秒，观察效果

            const pageName=element(by.className("system_name"));
            const page = $$(".system_name").getText();
            const pageText = pageName.getText();

            expect(pageText).toBe('无 限 云 平 台',pageText);
            browser.sleep(1000);// 睡眠1秒，观察效果
        });

        it('login failed with error username', () => {
            const loginContent = element(by.className('login_item'));
            const loginContentEl = loginContent.getText();
            expect(loginContentEl).toContain('账号登录');

            element.all(by.tagName("input")).get(0).sendKeys('admiqwdwqn'); // 传递测试用户名
            element.all(by.tagName("input")).get(1).sendKeys('admin'); // 传递测试密码
            element.all(by.tagName("input")).get(2).sendKeys('1234');
            element(by.tagName("button")).click(); // 点击事件

            browser.sleep(1000);// 睡眠1秒，观察效果

            expect(element(by.className("system_name")).isPresent()).not.toBeTruthy('登录失败');
            browser.sleep(1000);// 睡眠1秒，观察效果
        });

        it('login failed with correct username and error password', () => {
            const loginContent = element(by.className('login_item'));
            const loginContentEl = loginContent.getText();
            expect(loginContentEl).toContain('账号登录');

            element.all(by.tagName("input")).get(0).sendKeys('admin'); // 传递测试用户名
            element.all(by.tagName("input")).get(1).sendKeys('admin123'); // 传递测试密码
            element.all(by.tagName("input")).get(2).sendKeys('1234');
            element(by.tagName("button")).click(); // 点击事件

            browser.sleep(1000);// 睡眠1秒，观察效果

            expect(element(by.className("system_name")).isPresent()).not.toBeTruthy('登录失败');
            browser.sleep(1000);// 睡眠1秒，观察效果
        });
    });
});
