// import { DropDownsInterface} from "../../../../../../shared/component/dropdown/model/dropdowns.model";

import {DropDownsInterface} from "../../dropdown/model/dropdowns.model";

export interface portalInterFace{
    id?: number;
    /** portal名称 */
    portalName?: string;
    /** portal服务器地址 */
    portalIp?: string;
    /** 密钥 */
    portalShareKey?: string;
    /** portal服务器端口 */
    portalAuthPort?: number;
    /** portal 地址 */
    portalUrl?:string;
    /** 备注 */
    remarks?:string;
}

export interface radiusInterFace{
    id?: number;
    /** 名称 */
    radiusName?: string;
    /** 服务器ip */
    masterServerIp?: string;
    /** 密钥 */
    masterServerKey?: string;
    /** 认证端口 */
    masterServerAuthPort?: number;
    /** 计费端口 */
    masterServerFeePort?: number;
    /** 备注 */
    remarks?: string
}

export class ServerModel {
    /**portal服务下拉框列表数据*/
    private _portalServerDropDown : Array<DropDownsInterface>;
    /**radius服务下拉框列表数据*/
    private _radiusServerDropDown : Array<DropDownsInterface>;
    private _portalServerList: any;
    private _radiusServerList: any;
    /**Portal服务表格字段*/
    private _portalServiceTableInput: TableInterface;
    /**Radius服务表格字段*/
    private _portalRadiusTableInput: TableInterface;
    /**portal服务表格行数据*/
    private _portalServerData: any;
    /**radius服务表格行数据*/
    private _radiusServerData: any;
    /**默认的具体的portal服务*/
    private _portalDefault: string;
    /**默认的具体的radius服务*/
    private _radiusDefault: string;

    /**设置ewifi认证下面的服务下拉框和表格数据*/
    public setData (portal: portalInterFace,radis: radiusInterFace) {
        let tmp1: Array<DropDownsInterface> = [];
        let list1 = {};
        let tmp2: Array<DropDownsInterface> = [];
        let list2 = {};

        for (let obj in radis) {
            tmp1.push(<DropDownsInterface> {id: radis[obj]['id'], name: radis[obj]['radiusName']});
            list1[radis[obj]['id']] = [radis[obj]];
        }
        this.radiusServerDropDown = tmp1;
        this.radiusServerList = list1;

        for (let obj in portal) {
            tmp2.push(<DropDownsInterface> { id: portal[obj]['id'], name:portal[obj]['portalName']});
            list2[portal[obj]['id']] = [portal[obj]];
        }
        this.portalServerDropDown = tmp2;
        this.portalServerList = list2;

        this.portalDefault = '请选择Portal服务器';
        this.radiusDefault = '请选择Radius服务器';

    }

    get portalServerDropDown(): Array<DropDownsInterface> {
        return this._portalServerDropDown;
    }

    set portalServerDropDown(value: Array<DropDownsInterface>) {
        this._portalServerDropDown = value;
    }

    get radiusServerDropDown(): Array<DropDownsInterface> {
        return this._radiusServerDropDown;
    }

    set radiusServerDropDown(value: Array<DropDownsInterface>) {
        this._radiusServerDropDown = value;
    }

    get portalServerList(): any {
        return this._portalServerList;
    }

    set portalServerList(value: any) {
        this._portalServerList = value;
    }


    get radiusServerList(): any {
        return this._radiusServerList;
    }

    set radiusServerList(value: any) {
        this._radiusServerList = value;
    }

    /**获取portal服务表格字段*/
    get portalServiceTableInput(): TableInterface {
        this._portalServiceTableInput = {
            tableHeaderData: [
                {
                    headerName: 'PortalId',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '名称',
                    field: 'portalName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: 'IP',
                    field: 'portalIp',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '密钥',
                    field: 'portalShareKey',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '端口',
                    field: 'portalAuthPort',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: 'Portal URL',
                    field: 'portalUrl',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '备注',
                    field: 'remarks',
                    suppressMenu: true,
                    suppressSorting: true
                }
            ],
            paginationBool: false,
            sizeEveryPage: 10,
            tableRowHeight: 35,
            tableStyle: {
                width: "1200px",
                height: "70px"
            }
        };
        return this._portalServiceTableInput;
    }
    /**获取radius服务表格字段*/
    get portalRadiusTableInput(): TableInterface {
        this._portalRadiusTableInput = {
            tableHeaderData: [
                {
                    headerName: 'radiusId',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '名称',
                    field: 'radiusName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: 'IP',
                    field: 'masterServerIp',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '密钥',
                    field: 'masterServerKey',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '认证端口',
                    field: 'masterServerAuthPort',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '计费端口',
                    field: 'masterServerFeePort',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '备注',
                    field: 'remarks',
                    suppressMenu: true,
                    suppressSorting: true
                }
            ],
            paginationBool: false,
            sizeEveryPage: 10,
            tableRowHeight: 35,
            tableStyle: {
                width: "1200px",
                height: "70px"
            }
        };
        return this._portalRadiusTableInput;
    }


    get portalServerData(): any {
        return this._portalServerData;
    }

    set portalServerData(value: any) {
        this._portalServerData = value;
    }

    get radiusServerData(): any {
        return this._radiusServerData;
    }

    set radiusServerData(value: any) {
        this._radiusServerData = value;
    }


    get portalDefault(): string {
        return this._portalDefault;
    }

    set portalDefault(value: string) {
        this._portalDefault = value;
    }

    get radiusDefault(): string {
        return this._radiusDefault;
    }

    set radiusDefault(value: string) {
        this._radiusDefault = value;
    }
}
