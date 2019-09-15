import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {NetworkManagementService} from "../service/network-management.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {ConfirmModalComponent} from "../../../../shared/component/confirm-modal/confirm-modal.component";
import {NetworkManagerModalComponent} from "./network-manager-modal/network-manager-modal.component";
import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";
import {SsidConfModel} from "../../../../wireless/conf/ssid-conf/model/ssid-conf.model";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {NzModalSubject} from "ng-zorro-antd";
import {TransferComponent} from "../../../../shared/component/transfer/transfer.component";

declare let BMap: any;

/**
 * 网络管理
 * @class NetworkManagementComponent
 */
@Component
({
    selector: 'app-network-management',
    templateUrl: './network-management.component.html',
    styleUrls: ['./network-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class NetworkManagementComponent extends NetworkManagementService implements OnInit, OnDestroy {

    /** 新增网络 */
    public addData: string;
    /** 删除网络 */
    public delData: string;
    /** 访问控制单选按钮 */
    private globalRadio: any;
    /**  */
    private globalProbe: any;
    /** 全局SSID */
    private globalSsidInfo: Array<any> = [];
    /** 订阅变量 */
    private subscribe$: Subscription;

    /** 新建网络的模态框 */
    private newNetworkModal$: NzModalSubject;

    /** 保存网络的模态框 */
    private saveModal$: NzModalSubject;

    public threeLinkData: any;
    public province: any;
    public city: any;
    public area: any;

    private validateFlag = false;

    @ViewChild(TransferComponent) private childTransfer: TransferComponent;

    /**
     * 新建或者删除网络
     * */
    public netWorkEvent(flag: boolean) {
        this.showModalForConfirm(flag);
    }

    /**
     * 网络管理保存按钮事件
     * */
    public saveGlobalPageData() {
        if (this.validateSSID()) {
            this.message.error('部分数据不符合要求，请输入正确的数据再保存！！');
            return;
        }
        this.showModalalert('是否进行保存！');
    }

    /**
     * 添加或删除数据
     * */
    public deviceEvent(data: any) {
        this.networkManagerModel.deviceAdd = data['add'];
        this.networkManagerModel.deviceDel = data['del'];
    }

    /**
     * 添加或删除数据
     * */
    public switchDeviceEvent(data: any) {
        this.networkManagerModel.switchDeviceAdd = data['add'];
        this.networkManagerModel.switchDeviceDel = data['del'];
    }

    /** 网络类型下拉菜单点击事件 */
    public selectNetType(id: string) {
        this.networkManagerModel.netInfo.netType = Number.parseInt(id);
        this.staticData.setDefaultData(id);
        switch (this.networkManagerModel.netInfo.netType) {
            case 0:
                this.message.info('切换成AP组网，保存时将释放所选交换机设备');
                this.hasAPDevice = true;
                this.hasSwitchDevice = false;
                break;
            case 1:
                this.message.info('切换成交换机组网，保存时将释放所选AP设备');
                this.hasAPDevice = false;
                this.hasSwitchDevice = true;
                break;
            case 2:
                this.hasAPDevice = true;
                this.hasSwitchDevice = true;
                break;
        }
    }

    /**ssid是开启还是关闭*/
    getIsOpenOrClose(value, idx) {
        this.networkManagerModel.ssidInfo[idx].ssidStatus = value;
        this.networkManagerModel.ssidInfo[idx].ssidInfo["ssidStatus"] = value?1:0;
        this.globalSsidInfo[idx].ssidStatus = value?1:0;
        this.markAsDirtys();
    }

    /** SSID清单  */
    public setSsidInfo(data: SsidConfModel, idx: number) {
        this.globalSsidInfo[idx] = data.getData();
    }

    /**  5g信道  */
    public setRadio(data: any) {
        this.globalRadio = data;
    }

    /** 探针配置  */
    public setProbe(data: any) {
        this.globalProbe = data;
    }

    public validateSSID() {
        this.markAsDirtys();
        let flag = false;
        this.globalSsidInfo.forEach(res => {
            if(res.ssidStatus) {
                for (let item in res.validateFlagStack) {
                    if(res.validateFlagStack[item]) {
                        flag = true;
                    }
                }
            }
        });
        return flag;
    }
    outValidateFlag(data: boolean) {
        this.validateFlag = data;
    }

    /**
     * 打开是否保存的提示框
     * @param message string
     *              对话框提示信息
     */
    showModalForConfirm(message: boolean) {
        const modalConfig = {
            title: message === true ? '新增网络' : '删除网络',
            content: NetworkManagerModalComponent,
            onOk() {
            },
            onCancel() {
            },
            closable: false,
            footer: false,
            maskClosable: false,
            componentParams: {
                name: message,
                netID: this.selectNetID,
                threeLinkData: this.threeLinkData
            }
        };

        this.newNetworkModal$ = this.modalService.open(modalConfig);
        this.newNetworkModal$.subscribe(result => {
            let tmp = result.split('|');
            switch (tmp.length) {
                /** 返回ID和名称 tmp[1]: ID tmp[2]:名称 tmp[0]标识符 */
                case 7:
                    this.animation(tmp);
                    break;
                case 2:
                    this.delData = tmp[1];
                    this.network.getDropDownData();
                    break;
            }
        });
    }

    /**
     * 保存数据
     * @param message
     * @description
     *      1、弹出模态框确认是否保存
     *      2、判断是否获取onOk
     *      3、设置http请求头部ticket
     *      4、请求接口，保存数据
     *      5、成功或失败提示框
     * */
    showModalalert(message: string) {
        const modalConfig = {
            content: ConfirmModalComponent,
            onOk() {
            },
            onCancel() {
            },
            footer: false,
            maskClosable: false,
            componentParams: {
                name: message
            }
        };

        this.saveModal$ = this.modalService.open(modalConfig);
        this.saveModal$.subscribe(result => {
            if (result === 'onOk') {
                /**信道配置相关已经隐藏掉，保存时也要隐藏*/
                // this.networkManagerModel.setRadio(this.globalRadio);
                /**探针配置相关已经隐藏掉，保存时也要隐藏*/
                // this.networkManagerModel.setProbe(this.globalProbe);
                // this.judgeDeviceList();
                this.networkManagerModel.setSsid(this.globalSsidInfo);
                if (this.networkManagerModel.hasSameNoZeroVlanId()) {
                    this.message.error('相同网络下，不能存在相同的非零VlanId！');
                    return;
                }
                /**设置网络地址的经纬度*/
                let myGeo = new BMap.Geocoder();
                let that = this;
                let keyword = this.networkManagerModel.netInfo.province +
                    this.networkManagerModel.netInfo.city + this.networkManagerModel.netInfo.county +
                    this.networkManagerModel.netInfo.detailAddress;
                myGeo.getPoint(keyword, function (point) {
                    if (point) {
                        that.networkManagerModel.netInfo.longitude = point.lng;
                        that.networkManagerModel.netInfo.latitude = point.lat;
                        that.contentStatus = true;
                    } else {
                        alert("您选择地址没有解析到结果!");
                    }
                }, "");
                /**点击保存按钮  保存网络地址之后 再进行调用保存按钮的数据*/
                that.asyncFun().then(function (data) {
                    if (data['code'] === 0) {
                        that.networkManagerModel.deviceAdd = undefined;
                        that.networkManagerModel.deviceDel = undefined;
                        that.networkManagerModel.switchDeviceAdd = undefined;
                        that.networkManagerModel.switchDeviceDel = undefined;
                        that.childTransfer.emptyData();
                        that.updateNetworkListInfo();
                        that.message.success('参数保存成功！');
                    } else {
                        that.message.error('参数保存失败！');
                        that.message.error(data['msg']);
                    }
                });
            }
        });
    }
    /**网络管理保存数据-接口*/
    asyncFun(){
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = "wlanscope";
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.body = this.networkManagerModel.getSaveData();
        requestArgs.url = '/api/v1/net_info/' + this.selectNetID + '/config';
        return new Promise((resolve, reject) => {
            this.http.httpPatch(requestArgs).subscribe(
                res => {
                    this.contentStatus = false;
                    resolve(res);
                }
            );
        });
    }
    /**
     * 添加网络出现动画
     * @param tmp
     * @description
     *      1、添加网络成功时3秒动画
     *      2、将返回的数据添加到列表
     *      3、网络列表中显示新增的网络
     * */
    private animation(tmp: any) {
        this.contentStatus = true;
        const stream$ = new Observable<number>(
            observer => {
                let count = 3;
                const interval = setInterval(
                    () => {
                        observer.next(count--);
                    }, 1000);
                return () => {
                    clearInterval(interval);
                };
            }
        );
        this.subscribe$ = stream$.subscribe(
            value => {
                if (value === 0) {
                    this.networkListInfo.push(
                        {
                            'netId': Number.parseInt(tmp[1]),
                            'netName': tmp[2],
                            'netType': 0,
                            netTypeStr: 'AP组网',
                            'province': tmp[3],
                            'city': tmp[4],
                            'county': tmp[5],
                            'detailAddress': tmp[6],
                        }
                    );
                    /** 将添加的数据发送至列表中 */
                    this.addData = JSON.stringify(<DropDownsInterface> {id: tmp[1], name: tmp[2]});
                    /** 设置新增的网络名称 */
                    this.networkManagerModel.setNetInfo(tmp[1], tmp[2], 0, tmp[3], tmp[4], tmp[5], tmp[6]);
                    /** 设置默认的网络类型 */
                    this.staticData.setDefaultData('0');
                    this.contentStatus = false;

                    this.network.inDefault = tmp[2] + "配置";
                    this.network.getDropDownData(tmp[2] + "配置");
                }
            }
        );
    }

    /**
     * 获取网络ID
     * @description
     *      1、获取SSID信息
     *      2、无线电配置
     *      3、探针配置
     * */
    cloneNetWork(id: string) {
        this.getSsidMessage(id);
        // this.getGlobalValue(id);
        // this.getGlobalProbeConfValue(id);
    }

    /**获取三级联动组件里面的数据
     *      1. 即 判断省市区具体是哪个省 哪个市 哪个区
     * */
    outData(value) {
        this.dealProCityArea(value);
    }

    /**选择三级联动里面的省市区，返回的数据*/
    dealProCityArea(value) {
        const value1 = JSON.parse(value);
        this.province = value1.hasOwnProperty('_province') ? value1._province.name : '';
        this.city = this.province && value1.hasOwnProperty('_city') ? value1._city.name : '';
        this.area = this.city && value1.hasOwnProperty('_area') ? value1._area.name : '';

        this.networkManagerModel.netInfo.province = this.province;
        this.networkManagerModel.netInfo.city = this.city;
        this.networkManagerModel.netInfo.county = this.area;
    }

    /**三级联动数据*/
    getThreeLinkData() {
        this.requestArgs.systemName = "test";
        this.requestArgs.url = "assets/data/mock-data/area.json";
        this.http.httpGet(this.requestArgs).subscribe(res => {
            this.threeLinkData = res;
        });
    }

    /**
     * 销毁组件或指令
     * */
    ngOnDestroy(): void {
        if (this.newNetworkModal$ != undefined) {
            this.newNetworkModal$.destroy();
        }

        if (this.saveModal$ != undefined) {
            this.saveModal$.destroy();
        }
    }

    ngOnInit(): void {
        this.getThreeLinkData();
    }

}



// import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
// import {routerTransition} from "../../../../animations/route-animations";
// import {NetworkManagementService} from "../service/network-management.service";
// import {RequestArgs} from "../../../../shared/model/request-args";
// import {ConfirmModalComponent} from "../../../../shared/component/confirm-modal/confirm-modal.component";
// import {NetworkManagerModalComponent} from "./network-manager-modal/network-manager-modal.component";
// import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";
// import {SsidConfModel} from "../../../../wireless/conf/ssid-conf/model/ssid-conf.model";
// import {Observable} from "rxjs/Observable";
// import {Subscription} from "rxjs/Subscription";
// import {NzModalSubject} from "ng-zorro-antd";
// import {TransferComponent} from "../../../../shared/component/transfer/transfer.component";
//
// declare let BMap: any;
//
// /**
//  * 网络管理
//  * @class NetworkManagementComponent
//  */
// @Component
// ({
//     selector: 'app-network-management',
//     templateUrl: './network-management.component.html',
//     styleUrls: ['./network-management.component.scss'],
//     animations: [routerTransition()],
//     host: {'[@routerTransition]': ''}
// })
//
// export class NetworkManagementComponent extends NetworkManagementService implements OnInit, OnDestroy {
//
//     /** 新增网络 */
//     public addData: string;
//     /** 删除网络 */
//     public delData: string;
//     /** 访问控制单选按钮 */
//     private globalRadio: any;
//     /**  */
//     private globalProbe: any;
//     /** 全局SSID */
//     private globalSsidInfo: Array<any> = [];
//     /** 订阅变量 */
//     private subscribe$: Subscription;
//
//     /** 新建网络的模态框 */
//     private newNetworkModal$: NzModalSubject;
//
//     /** 保存网络的模态框 */
//     private saveModal$: NzModalSubject;
//
//     public threeLinkData: any;
//     public province: any;
//     public city: any;
//     public area: any;
//
//     private validateFlag = false;
//
//     @ViewChild(TransferComponent) private childTransfer: TransferComponent;
//
//     /**
//      * 新建或者删除网络
//      * */
//     public netWorkEvent(flag: boolean) {
//         this.showModalForConfirm(flag);
//     }
//
//     /**
//      * 网络管理保存按钮事件
//      * */
//     public saveGlobalPageData() {
//         if (this.validateSSID()) {
//             this.message.error('部分数据不符合要求，请输入正确的数据再保存！！');
//             return;
//         }
//         this.showModalalert('是否进行保存！');
//     }
//
//     /**
//      * 添加或删除数据
//      * */
//     public deviceEvent(data: any) {
//         this.networkManagerModel.deviceAdd = data['add'];
//         this.networkManagerModel.deviceDel = data['del'];
//     }
//
//     /**
//      * 添加或删除数据
//      * */
//     public switchDeviceEvent(data: any) {
//         this.networkManagerModel.switchDeviceAdd = data['add'];
//         this.networkManagerModel.switchDeviceDel = data['del'];
//     }
//
//     /** 网络类型下拉菜单点击事件 */
//     public selectNetType(id: string) {
//         this.networkManagerModel.netInfo.netType = Number.parseInt(id);
//         this.staticData.setDefaultData(id);
//         switch (this.networkManagerModel.netInfo.netType) {
//             case 0:
//                 this.message.info('切换成AP组网，保存时将释放所选交换机设备');
//                 this.hasAPDevice = true;
//                 this.hasSwitchDevice = false;
//                 break;
//             case 1:
//                 this.message.info('切换成交换机组网，保存时将释放所选AP设备');
//                 this.hasAPDevice = false;
//                 this.hasSwitchDevice = true;
//                 break;
//             case 2:
//                 this.hasAPDevice = true;
//                 this.hasSwitchDevice = true;
//                 break;
//         }
//     }
//
//     /**ssid是开启还是关闭*/
//     getIsOpenOrClose(value, idx) {
//         this.networkManagerModel.ssidInfo[idx].ssidStatus = value;
//         this.networkManagerModel.ssidInfo[idx].ssidInfo["ssidStatus"] = value?1:0;
//         this.globalSsidInfo[idx].ssidStatus = value?1:0;
//         this.markAsDirtys();
//     }
//
//     /** SSID清单  */
//     public setSsidInfo(data: SsidConfModel, idx: number) {
//         this.globalSsidInfo[idx] = data.getData();
//     }
//
//     /**  5g信道  */
//     public setRadio(data: any) {
//         this.globalRadio = data;
//     }
//
//     /** 探针配置  */
//     public setProbe(data: any) {
//         this.globalProbe = data;
//     }
//
//     public validateSSID() {
//         this.markAsDirtys();
//         let flag = false;
//         this.globalSsidInfo.forEach(res => {
//             if(res.ssidStatus) {
//                 for (let item in res.validateFlagStack) {
//                     if(res.validateFlagStack[item]) {
//                         flag = true;
//                     }
//                 }
//             }
//         });
//         return flag;
//     }
//     outValidateFlag(data: boolean) {
//         this.validateFlag = data;
//     }
//
//     /**
//      * 打开是否保存的提示框
//      * @param message string
//      *              对话框提示信息
//      */
//     showModalForConfirm(message: boolean) {
//         const modalConfig = {
//             title: message === true ? '新增网络' : '删除网络',
//             content: NetworkManagerModalComponent,
//             onOk() {
//             },
//             onCancel() {
//             },
//             closable: false,
//             footer: false,
//             maskClosable: false,
//             componentParams: {
//                 name: message,
//                 netID: this.selectNetID,
//                 threeLinkData: this.threeLinkData
//             }
//         };
//
//         this.newNetworkModal$ = this.modalService.open(modalConfig);
//         this.newNetworkModal$.subscribe(result => {
//             let tmp = result.split('|');
//             switch (tmp.length) {
//                 /** 返回ID和名称 tmp[1]: ID tmp[2]:名称 tmp[0]标识符 */
//                 case 7:
//                     this.animation(tmp);
//                     break;
//                 case 2:
//                     this.delData = tmp[1];
//                     this.network.getDropDownData();
//                     break;
//             }
//         });
//     }
//
//     /**
//      * 保存数据
//      * @param message
//      * @description
//      *      1、弹出模态框确认是否保存
//      *      2、判断是否获取onOk
//      *      3、设置http请求头部ticket
//      *      4、请求接口，保存数据
//      *      5、成功或失败提示框
//      * */
//     showModalalert(message: string) {
//         const modalConfig = {
//             content: ConfirmModalComponent,
//             onOk() {
//             },
//             onCancel() {
//             },
//             footer: false,
//             maskClosable: false,
//             componentParams: {
//                 name: message
//             }
//         };
//
//         this.saveModal$ = this.modalService.open(modalConfig);
//         this.saveModal$.subscribe(result => {
//             if (result === 'onOk') {
//                 /**信道配置相关已经隐藏掉，保存时也要隐藏*/
//                 // this.networkManagerModel.setRadio(this.globalRadio);
//                 /**探针配置相关已经隐藏掉，保存时也要隐藏*/
//                 // this.networkManagerModel.setProbe(this.globalProbe);
//                 // this.judgeDeviceList();
//                 this.networkManagerModel.setSsid(this.globalSsidInfo);
//                 if (this.networkManagerModel.hasSameNoZeroVlanId()) {
//                     this.message.error('相同网络下，不能存在相同的非零VlanId！');
//                     return;
//                 }
//
//                 /**设置网络地址的经纬度*/
//                 let point = new BMap.Point();
//                 let myGeo = new BMap.Geocoder();
//                 let that = this;
//                 let keyword = this.networkManagerModel.netInfo.province +
//                     this.networkManagerModel.netInfo.city + this.networkManagerModel.netInfo.county +
//                     this.networkManagerModel.netInfo.detailAddress;
//                 return myGeo.getPoint(keyword, function (point) {
//                     if (point) {
//                         that.networkManagerModel.netInfo.longitude = point.lng;
//                         that.networkManagerModel.netInfo.latitude = point.lat;
//                         that.contentStatus = true;
//                         let requestArgs: RequestArgs = new RequestArgs();
//                         requestArgs.systemName = "wlanscope";
//                         requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
//                         requestArgs.body = that.networkManagerModel.getSaveData();
//                         requestArgs.url = '/api/v1/net_info/' + that.selectNetID + '/config';
//                         try {
//                             that.contentStatus = true;
//                             that.http.httpPatch(requestArgs).subscribe(
//                                 res => {
//                                     that.contentStatus = false;
//                                     if (res.code === 0) {
//                                         that.networkManagerModel.deviceAdd = undefined;
//                                         that.networkManagerModel.deviceDel = undefined;
//                                         that.networkManagerModel.switchDeviceAdd = undefined;
//                                         that.networkManagerModel.switchDeviceDel = undefined;
//                                         that.childTransfer.emptyData();
//                                         that.updateNetworkListInfo();
//                                         that.message.success('参数保存成功！');
//                                     } else {
//                                         that.message.error('参数保存失败！');
//                                         that.message.error(res.msg);
//                                         that.contentStatus = false;
//                                         console.log(that.contentStatus);
//                                     }
//                                 },() => {
//                                     that.contentStatus = false;
//                                 },() => {
//                                     that.contentStatus = false;
//                                 }
//                             );
//                         } catch(err) {
//                             console.log(err.message);
//                             that.contentStatus = false;
//                         } finally {
//                             // that.contentStatus = false;
//                         }
//
//                     } else {
//                         alert("您选择地址没有解析到结果!");
//                     }
//                 }, "");
//             }
//         });
//     }
//
//     /**
//      * 添加网络出现动画
//      * @param tmp
//      * @description
//      *      1、添加网络成功时3秒动画
//      *      2、将返回的数据添加到列表
//      *      3、网络列表中显示新增的网络
//      * */
//     private animation(tmp: any) {
//         this.contentStatus = true;
//         const stream$ = new Observable<number>(
//             observer => {
//                 let count = 3;
//                 const interval = setInterval(
//                     () => {
//                         observer.next(count--);
//                     }, 1000);
//                 return () => {
//                     clearInterval(interval);
//                 };
//             }
//         );
//         this.subscribe$ = stream$.subscribe(
//             value => {
//                 if (value === 0) {
//                     this.networkListInfo.push(
//                         {
//                             'netId': Number.parseInt(tmp[1]),
//                             'netName': tmp[2],
//                             'netType': 0,
//                             netTypeStr: 'AP组网',
//                             'province': tmp[3],
//                             'city': tmp[4],
//                             'county': tmp[5],
//                             'detailAddress': tmp[6],
//                         }
//                     );
//                     /** 将添加的数据发送至列表中 */
//                     this.addData = JSON.stringify(<DropDownsInterface> {id: tmp[1], name: tmp[2]});
//                     /** 设置新增的网络名称 */
//                     this.networkManagerModel.setNetInfo(tmp[1], tmp[2], 0, tmp[3], tmp[4], tmp[5], tmp[6]);
//                     /** 设置默认的网络类型 */
//                     this.staticData.setDefaultData('0');
//                     this.contentStatus = false;
//
//                     this.network.inDefault = tmp[2] + "配置";
//                     this.network.getDropDownData(tmp[2] + "配置");
//                 }
//             }
//         );
//     }
//
//     /**
//      * 获取网络ID
//      * @description
//      *      1、获取SSID信息
//      *      2、无线电配置
//      *      3、探针配置
//      * */
//     cloneNetWork(id: string) {
//         this.getSsidMessage(id);
//         // this.getGlobalValue(id);
//         // this.getGlobalProbeConfValue(id);
//     }
//
//     /**获取三级联动组件里面的数据
//      *      1. 即 判断省市区具体是哪个省 哪个市 哪个区
//      * */
//     outData(value) {
//         this.dealProCityArea(value);
//     }
//
//     /**选择三级联动里面的省市区，返回的数据*/
//     dealProCityArea(value) {
//         const value1 = JSON.parse(value);
//         this.province = value1.hasOwnProperty('_province') ? value1._province.name : '';
//         this.city = this.province && value1.hasOwnProperty('_city') ? value1._city.name : '';
//         this.area = this.city && value1.hasOwnProperty('_area') ? value1._area.name : '';
//
//         this.networkManagerModel.netInfo.province = this.province;
//         this.networkManagerModel.netInfo.city = this.city;
//         this.networkManagerModel.netInfo.county = this.area;
//     }
//
//     /**三级联动数据*/
//     getThreeLinkData() {
//         this.requestArgs.systemName = "test";
//         this.requestArgs.url = "assets/data/mock-data/area.json";
//         this.http.httpGet(this.requestArgs).subscribe(res => {
//             this.threeLinkData = res;
//         });
//     }
//
//     /**
//      * 销毁组件或指令
//      * */
//     ngOnDestroy(): void {
//         if (this.newNetworkModal$ != undefined) {
//             this.newNetworkModal$.destroy();
//         }
//
//         if (this.saveModal$ != undefined) {
//             this.saveModal$.destroy();
//         }
//     }
//
//     ngOnInit(): void {
//         this.getThreeLinkData();
//     }
//
// }
