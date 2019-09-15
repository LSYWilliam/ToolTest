export class ThreeLinkModel {
    /**省*/
    private _province: any;
    /**市*/
    private _city: any;
    /**区*/
    private _area: any;
    /**获取具体的省*/
    get province(): any {
        return this._province;
    }
    /**设置具体的省*/
    set province(value: any) {
        this._province = value;
    }
    /**获取具体的市*/
    get city(): any {
        return this._city;
    }
    /**设置具体的省*/
    set city(value: any) {
        this._city = value;
    }
    /**获取具体的区*/
    get area(): any {
        return this._area;
    }
    /**设置具体的区*/
    set area(value: any) {
        this._area = value;
    }
}
