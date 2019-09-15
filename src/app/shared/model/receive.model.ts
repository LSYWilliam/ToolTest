/**请求之后 后台返回数据  实体类*/
export class ReceiveModel {
    /** 后台返回的code码*/
    private _code : number;
    /** 后台返回的提示信息*/
    private _msg : string;
    /** 后台返回的数据*/
    private _result: any;
    /** 后台返回的分页内容*/
    private _pagination : any;

    constructor() {}
    /** 获取后台返回的code码*/
    get code(): number {
        return this._code;
    }
    /** 设置 后台返回的code码*/
    set code(value: number) {
        this._code = value;
    }
    /** 获取后台返回的提示信息*/
    set msg(value: string) {
        this._msg = value;
    }
    /**获取后台返回的提示信息*/
    get result(): any {
        return this._result;
    }
    /** 设置后台返回的数据*/
    set result(value: any) {
        this._result = value;
    }
    /** 获取后台返回的数据*/
    get pagination(): any {
        return this._pagination;
    }
    /** 设置后台返回的数据*/
    set pagination(value: any) {
        this._pagination = value;
    }
}
