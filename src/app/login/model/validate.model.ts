/**验证码 实体类 */
export class ValidateModel {
    /**展示验证码图片的数据*/
    captchaImg: string;
    /**请求验证码的ticket*/
    ticket: string;
    /**constructor构造函数
     *      1. 设置默认值
     * */
    constructor (data: ValidateModel) {
        this.ticket = data.ticket;
        this.captchaImg = data.captchaImg;
    }
    /**返回展示验证码图片的数据方法*/
    get getCaptchaImg(): string {
        sessionStorage.setItem('captchaTicket', this.ticket);
        return this.captchaImg;
    }
}
