/** http请求 接口*/
export interface RequestArgsInterface {
    systemName?: string;
    url?: string;
    body?: any;
    header?: any;
    responseType?: any;
}
/** http请求 参数类*/
export class RequestArgs {
    /** http请求 系统名称*/
    private _systemName : string;
    /** http请求 url地址*/
    private _url: string;
    /** http请求 请求参数*/
    private _body: any;
    /** http请求 请求头*/
    private _header : any;
    /** http请求 响应类型*/
    private _responseType: any;
    /** 设置http请求 参数默认值*/
    constructor(data? : RequestArgsInterface) {
        if (data) {
            this.systemName = data.systemName;
            this.url = data.url;
            this.body = data.body;
            this.header = data.header;
            this.responseType = data.responseType;
        }
    }
    /**获取 http请求 系统名称*/
    get systemName(): string {
        return this._systemName;
    }
    /**设置 http请求 系统名称*/
    set systemName(value: string) {
        this._systemName = value;
    }
    /**获取 http请求 url地址*/
    get url(): string {
        return this._url;
    }
    /**设置 http请求 url地址*/
    set url(value: string) {
        this._url = value;
    }
    /**获取 http请求 请求参数*/
    get body(): any {
        if (this._body) {
            return this._body;
        }
        else {
            return {};
        }
    }
    /**设置 http请求 请求参数*/
    set body(value: any) {
        this._body = value;
    }
    /**获取 http请求 请求头*/
    get header(): any {
        return this._header;
    }
    /**设置 http请求 请求头*/
    set header(value: any) {
        this._header = value;
    }
    /**设置 http请求 响应类型*/
    set responseType(value: any) {
        this._responseType = value;
    }
    /**获取 http请求 响应类型*/
    public response(): any {
        return this._responseType;
    }
    /**获取 http请求 请求头*/
    public getHeaders() {
        let httpHeaders = {'Content-Type':'application/json'};
        if (this.header) {
            for (let obj in this.header) {
                httpHeaders[obj] = this.header[obj];
            }
        }
        return httpHeaders;
    }
    /**获取 http请求 请求头(用于导入文件的)*/
    public getHeaders2() {
        let httpHeaders = { 'Accept': 'application/json' };
        if (this.header) {
            for (let obj in this.header) {
                httpHeaders[obj] = this.header[obj];
            }
        }
        return httpHeaders;
    }
    /**获取 http请求 请求头*/
    // public getXWFUHeaders() {
    //     let httpHeaders = {'Content-Type':'application/x-www-form-urlencoded'};
    //     if (this.header) {
    //         for (let obj in this.header) {
    //             httpHeaders[obj] = this.header[obj];
    //         }
    //     }
    //     return httpHeaders;
    // }

    public getXwfuHeaders() {
        let httpHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
        if (this.header) {
            for (let obj in this.header) {
                httpHeaders[obj] = this.header[obj];
            }
        }
        return httpHeaders;
    }


}
