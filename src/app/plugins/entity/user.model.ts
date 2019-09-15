/**
 * 用户登录时的实体类
 * @class UserModel
 */
export class UserModel {

  private username: string;
  private password: any;
  private code: string;
  private ticket: string;

  get _username() {
    return this.username;
  }

  set _username(value) {
    this.username = value;
  }

  get _password() {
    return this.password;
  }

  set _password(value) {
    this.password = value;
  }

  get _code() {
    return this.code;
  }

  set _code(value) {
    this.code = value.toLowerCase();
  }

  get _ticket() {
    return this.ticket;
  }

  set _ticket(value) {
    this.ticket = value;
  }
}
