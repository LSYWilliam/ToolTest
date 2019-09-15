import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {RequestArgs} from '../../../../shared/model/request-args';
import {FirmwareManagementService} from '../service/firmware-management.service';
import {FirmwareListModel, SwitchFirmwareListModel} from "../model/firmware-list.model";
import {TableComponent} from "../../../../plugins/component/table/table.component";
import {UpdateRecordModel} from "../model/update-record.model";
import {UpdateParamModel} from "../model/update-param.model";
import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

/**
 * AP固件管理
 * @class FirmwareManagementComponent
 */
@Component
({
    selector: 'app-firmware-management',
    templateUrl: './firmware-management.component.html',
    styleUrls: ['./firmware-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class FirmwareManagementComponent extends FirmwareManagementService implements OnInit {

    /** 定义个windowHeight类型 */
    public windowHeight: number;

    /** 表格子组件 */
    @ViewChild('appTable') child: TableComponent;
    /** 表格子组件 */
    @ViewChild('switchTable') switchChild: TableComponent;
    /** http请求头部 */
    public requestArgs: RequestArgs = new RequestArgs();
    /** AP固件版本 */
    public firmwareListModel: FirmwareListModel = new FirmwareListModel();
    /** AP固件版本 */
    public switchFirmwareListModel: SwitchFirmwareListModel = new SwitchFirmwareListModel();
    /** 固件更新 */
    public updateRecordModel: UpdateRecordModel = new UpdateRecordModel();
    /** 组件类型 */
    public netVersionType: string;
    /** 是否显示固件管理 */
    public firmwareShow: boolean;
    /** 是否固件版本说明 */
    public verExplainShow: boolean;
    /** 是否显示更新记录 */
    public updateShow: boolean;

    public switchUpdateShow: boolean;
    /** 是否显示模态框 */
    public isVisible: boolean;
    /** 是否显示模态框 */
    public isSwitchVisible: boolean;
    /** 模态框-更新按钮是否显示加载中 */
    public isConfirmLoading: boolean;
    /** 选择更新版本 */
    public radioValue: string;
    /** 获取表格复选框选中一行的数据 */
    public tableModel: any[] = [];
    /** 更新固件版本需要的参数 */
    public updateData: UpdateParamModel = new UpdateParamModel();
    /** 网络下拉框ID */
    public infoDefaultId: string;
    /** 网络下拉框名称 */
    public infoDefaultName: string;
    /** 下载地址输入框 */
    public downloadAddress: any;
    /** 版本类型ID */
    public infoVersionId: string;
    /** 网络下拉框名称 */
    public infoVersionName: string;
    /** 版本下拉框名称 */
    public infoVersionTypeId: string;
    public infoVersionTypeValue: string;
    /** 交换机版本下拉框名称 */
    public infoSwitchVersionTypeId: string;
    public infoSwitchVersionTypeValue: string;

    public apListId: any[] = [];

    public switchListId: any[] = [];

    public nzSelectedIndex = 0;

    public numDropDownItem: number = 1;

    /**
     * 方法初始化
     * @description
     *      1、设置http请求头部
     *      2、设置显示固件管理，其余全部隐藏
     *      3、设置组件类型
     *      4、设置模态框不显示
     *      5、获取网络下拉框默认ID NAME
     *      6、执行方法并获取动态数据
     * */
    ngOnInit() {
        this.windowHeight = window.innerHeight - 190 - 72 - 30;
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.firmwareShow = true;
        this.verExplainShow = false;
        this.updateShow = false;
        this.switchUpdateShow = false;
        this.netVersionType = '固件版本';
        this.isVisible = false;
        this.isSwitchVisible = false;
        this.isConfirmLoading = false;
        this.infoDefaultId = this.bidDropDownModel.dropDowns[0].id;
        this.infoDefaultName = this.bidDropDownModel.dropDowns[0].name;
        // this.infoVersionId = this.bidDropDownModel.veriosnDropDowns[0].id;
        // this.infoVersionName = this.bidDropDownModel.veriosnDropDowns[0].name;
        // this.radioValue = this.bidDropDownModel.veriosnDropDowns[0].id;
        this.getData();
    }

    /**
     * 获取页面数据方法
     * @description
     *      1、获取最新版本
     *      2、获取固件版本列表
     *      3、获取更新需要的最新版本
     */
    getData() {
        super.getFirmwareVersionList(this.requestArgs, this.infoDefaultId);
        super.getSwitchFirmwareVersionList(this.requestArgs, this.infoDefaultId);
    }

    /** 下拉框 */
    getDropDownId(id) {
        this.infoDefaultId = id;
        super.getFirmwareVersionList(this.requestArgs, id);
        super.getSwitchFirmwareVersionList(this.requestArgs, id);
    }

    /** 表格事件
     * @param data
     * @description
     *      1、点击表格
     *      2、判断表头的field的
     *      3、根据field，执行其相应的方法*/
    explainShow(data) {
        switch (data.colDef.field) {
            case 'updateRecord':
                this.firmwareShow = false;
                this.verExplainShow = false;
                this.switchUpdateShow = false;
                this.updateShow = true;
                super.getUpdateNotes(this.requestArgs, data.data.apId);
                break;
        }
    }

    /** 表格事件
     * @param data
     * @description
     *      1、点击表格
     *      2、判断表头的field的
     *      3、根据field，执行其相应的方法*/
    switchExplainShow(data) {
        switch (data.colDef.field) {
            case 'updateRecord':
                this.firmwareShow = false;
                this.verExplainShow = false;
                this.updateShow = false;
                this.switchUpdateShow = true;
                super.getSwitchUpdateNotes(this.requestArgs, data.data.switchId);
                break;
        }
    }

    /**
     * 返回固件管理
     * @description
     *      1、显示固件管理，其余隐藏
     *      2、版本详情设空
     *      3、更新记录设空
     *      4、重新获取版本列表
     * */
    goBackShow() {
        this.firmwareShow = true;
        this.verExplainShow = false;
        this.updateShow = false;
        this.switchUpdateShow = false;
        this.firmwareManagementModel.versionDetails = '';
        this.firmwareManagementModel.upadteNote = [];
        this.switchFirmwareManagementModel.versionDetails = '';
        this.switchFirmwareManagementModel.upadteNote = [];
        this.bidDropDownModel.dropDowns.forEach(res => {
            if (res.id === this.infoDefaultId) {
                this.infoDefaultName = res.name;
            }
        });
        super.getFirmwareVersionList(this.requestArgs, this.infoDefaultId);
        super.getSwitchFirmwareVersionList(this.requestArgs, this.infoDefaultId);
    }

    /**
     * 打开模态框
     * @description
     *      1、清空表格
     *      2、获取选中的固件
     * */
    updateModel() {
        this.tableModel.splice(0, this.tableModel.length);
        this.updateData.apVersionId = null;
        this.updateData.apIdList.splice(0, this.updateData.apIdList.length);
        this.child.selectAll();
    }

    getVersionTypeId(id) {
        this.infoVersionTypeId = id;
    }

    getVersionTypeName(value) {
        this.infoVersionTypeValue = value;
    }

    /** 关闭 */
    handleCancel(e) {
        this.isVisible = false;
        this.isSwitchVisible = false;
    }

    /**
     * 更新
     * @description
     *      1、选择更新的版本
     *      2、判断所选中的版本中是否含有最新的
     *      3、调用接口，更新版本
     *      4、修改表格数据
     * */
    updateOk(e) {
        let data: any = {
            'apVersionId': this.infoVersionTypeId,
            'apIdList': this.apListId
        };
        super.getUpdate(this.requestArgs, data).subscribe(res => {
            if (res.code === 0) {
                for (let item of this.tableModel) {
                    item.version = this.infoVersionTypeValue;
                    this.child.editRow(item);
                }
                this.message.success("更新成功！");
                /** 关闭模态框 */
                this.isVisible = false;
            } else {
                this.isVisible = false;
                this.warning('提示', '更新失败' + ":" + res.msg);
            }

        });
    }

    /**
     * 打开交换机模态框
     * @description
     *      1、清空表格
     *      2、获取选中的固件
     * */
    updateSwitchModel() {
        this.tableModel.splice(0, this.tableModel.length);
        this.updateData.switchVersionId = null;
        this.updateData.switchIdList.splice(0, this.updateData.switchIdList.length);
        this.switchChild.selectAll();
    }

    getSwitchVersionTypeId(id) {
        this.infoSwitchVersionTypeId = id;
    }

    getSwitchVersionTypeName(value) {
        this.infoSwitchVersionTypeValue = value;
    }

    /** 关闭 */
    handleSwitchCancel(e) {
        this.nzSelectedIndex = 1;
        this.isSwitchVisible = false;
    }

    /**
     * 更新
     * @description
     *      1、选择更新的版本
     *      2、判断所选中的版本中是否含有最新的
     *      3、调用接口，更新版本
     *      4、修改表格数据
     * */
    updateSwitchOk(e) {
        let data: any = {
            'versionId': this.infoSwitchVersionTypeId,
            'deviceIdList': this.switchListId
        };
        super.getSwitchUpdate(this.requestArgs, data).subscribe(res => {
            if (res.code === 0) {
                for (let item of this.tableModel) {
                    item.version = this.infoSwitchVersionTypeValue;
                    this.switchChild.editRow(item);
                }
                this.message.success("更新成功！");
                this.nzSelectedIndex = 1;
                /** 关闭模态框 */
                this.isSwitchVisible = false;
            } else if (res.code === 10100) {
                this.nzSelectedIndex = 1;
                this.isSwitchVisible = false;
                this.warning('提示', res.msg);
            } else {
                this.nzSelectedIndex = 1;
                this.isSwitchVisible = false;
                this.warning('提示', res.msg);
            }

        });
    }

    /** 更新固件版本时提示框 */
    warning(title: string, content: string) {
        this.confirmServ.warning({
            title: title,
            content: content
        });
    }

    error(title: string, content: string) {
        this.confirmServ.error({
            title: title,
            content: content
        });
    }

    /** 用于监听子组件的全选时间 */
    selectSingRowEvent(data) {
        this.apListId = [];
        const len = data.length;
        if (len === 0) {
            this.message.warning('请选择需要更新的固件!');
        } else if (len > 1) {
            let flag = true;
            let tmpDeviceModel;
            data.forEach(res => {
                if (!tmpDeviceModel) {
                    tmpDeviceModel = res.data.apModel;
                } else {
                    if (tmpDeviceModel !== res.data.apModel && flag) {
                        this.message.warning('不同型号的AP无法批量更新固件！!');
                        flag = false;
                        return;
                    }
                }
                if (res.data.apStatusIcon === 'icon-wifi-gray' && flag) {
                    this.message.warning('部分ap设备处于停用状态，无法更新固件！');
                    flag = false;
                    return;
                } else if (res.data.apStatusIcon === 'icon-wifi-red' && flag) {
                    this.message.warning('部分ap设备处于告警状态，无法更新固件！');
                    flag = false;
                    return;
                }
            });
            if (flag) {
                /** 打开模态框 */
                for (let item of data) {
                    this.tableModel.push(item.data);
                }
                let tmpVersion: Array<DropDownsInterface> = [];
                this.tableModel.forEach((item, index) => {
                    tmpVersion.push(<DropDownsInterface> {'id': item.type, 'name': item.apModel});
                    this.apListId.push(item.apId);
                });
                super.getVersionList(this.requestArgs, tmpVersion[0].id, tmpVersion[0].name)
                    .subscribe(res => {
                        if (res.code === 0) {
                            let tmp: Array<DropDownsInterface> = [];
                            res.result.forEach(
                                item => {
                                    tmp.push(<DropDownsInterface> {id: item.id, name: item.version});
                                }
                            );
                            this.bidDropDownModel.veriosnDropDowns = tmp;
                            this.infoVersionTypeId = tmp[0].id;
                            this.infoVersionTypeValue = tmp[0].name;
                            this.numDropDownItem = tmp.length||1;
                            this.isVisible = true;
                        } else {
                            this.message.warning('暂无更新版本!');
                        }
                    });
            }
        } else if (len === 1) {
            if (data[0].data.apStatusIcon === 'icon-wifi-green') {
                /** 打开模态框 */
                for (let item of data) {
                    this.tableModel.push(item.data);
                }
                let tmpVersion: Array<DropDownsInterface> = [];
                this.tableModel.forEach((item, index) => {
                    tmpVersion.push(<DropDownsInterface> {'id': item.type, 'name': item.apModel});
                    this.apListId.push(item.apId);
                });
                super.getVersionList(this.requestArgs, tmpVersion[0].id, tmpVersion[0].name)
                    .subscribe(res => {
                        if (res.code === 0) {
                            let tmp: Array<DropDownsInterface> = [];
                            res.result.forEach(
                                item => {
                                    tmp.push(<DropDownsInterface> {id: item.id, name: item.version});
                                }
                            );
                            this.bidDropDownModel.veriosnDropDowns = tmp;
                            this.infoVersionTypeId = tmp[0].id;
                            this.infoVersionTypeValue = tmp[0].name;
                            this.numDropDownItem = tmp.length||1;
                            this.isVisible = true;
                        } else {
                            this.message.warning(res.msg);
                        }
                    });
            } else if (data[0].data.apStatusIcon === 'icon-wifi-gray') {
                this.message.warning('ap处于停用状态，无法更新固件！');
            } else if (data[0].data.apStatusIcon === 'icon-wifi-red') {
                this.message.warning('ap处于告警状态，无法更新固件！');
            }

        }
    }

    /** 用于监听子组件的全选时间 */
    switchSelectSingRowEvent(data) {
        this.switchListId = [];
        const len = data.length;
        if (len === 0) {
            this.message.warning('请选择需要更新的固件!');
        } else if (len > 1) {
            let flag = true;
            let tmpDeviceModel;
            data.forEach(res => {
                if (!tmpDeviceModel) {
                    tmpDeviceModel = res.data.switchModel;
                } else {
                    if (tmpDeviceModel !== res.data.switchModel) {
                        this.message.warning('不同型号的交换机无法批量更新固件！!');
                        flag = false;
                        return;
                    }
                }
                if (res.data.switchStatusIcon === 'icon-wifi-gray') {
                    this.message.warning('部分交换机处于停用状态，无法更新固件！');
                    flag = false;
                    return;
                } else if (res.data.switchStatusIcon === 'icon-wifi-red') {
                    this.message.warning('部分交换机处于告警状态，无法更新固件！');
                    flag = false;
                    return;
                }
            });
            if (flag) {
                /** 打开模态框 */
                for (let item of data) {
                    this.tableModel.push(item.data);
                }
                let tmpVersion: Array<DropDownsInterface> = [];
                this.tableModel.forEach((item, index) => {
                    tmpVersion.push(<DropDownsInterface> {'id': item.type, 'name': item.switchModel});
                    this.switchListId.push(item.switchId);
                });
                super.getVersionList(this.requestArgs, tmpVersion[0].id, tmpVersion[0].name)
                    .subscribe(res => {
                        if (res.code === 0) {
                            let tmp: Array<DropDownsInterface> = [];
                            res.result.forEach(
                                item => {
                                    tmp.push(<DropDownsInterface> {id: item.id, name: item.version});
                                }
                            );
                            this.bidDropDownModel.switchVeriosnDropDowns = tmp;
                            this.infoSwitchVersionTypeId = tmp[0].id;
                            this.infoSwitchVersionTypeValue = tmp[0].name;
                            this.numDropDownItem = tmp.length||1;
                            this.isSwitchVisible = true;
                        } else {
                            this.message.warning(res.msg);
                        }
                    });
            }
        } else if (len === 1) {
            if (data[0].data.switchStatusIcon === 'icon-wifi-green') {
                /** 打开模态框 */
                for (let item of data) {
                    this.tableModel.push(item.data);
                }
                let tmpVersion: Array<DropDownsInterface> = [];
                this.tableModel.forEach((item, index) => {
                    tmpVersion.push(<DropDownsInterface> {'id': item.type, 'name': item.switchModel});
                    this.switchListId.push(item.switchId);
                });
                super.getVersionList(this.requestArgs, tmpVersion[0].id, tmpVersion[0].name)
                    .subscribe(res => {
                        if (res.code === 0) {
                            let tmp: Array<DropDownsInterface> = [];
                            res.result.forEach(
                                item => {
                                    tmp.push(<DropDownsInterface> {id: item.id, name: item.version});
                                }
                            );
                            this.bidDropDownModel.switchVeriosnDropDowns = tmp;
                            this.infoSwitchVersionTypeId = tmp[0].id;
                            this.infoSwitchVersionTypeValue = tmp[0].name;
                            this.numDropDownItem = tmp.length||1;
                            this.isSwitchVisible = true;
                        } else {
                            this.message.warning(res.msg);
                        }
                    });
            } else if (data[0].data.switchStatusIcon === 'icon-wifi-gray') {
                this.message.warning('交换机处于停用状态，无法更新固件！');
            } else if (data[0].data.switchStatusIcon === 'icon-wifi-red') {
                this.message.warning('交换机处于告警状态，无法更新固件！');
            }
        }
    }

    /** 删除数组JSON中重复的对象 */
    deteleObject(obj) {
        const uniques = [];
        const stringify = {};
        for (let i = 0; i < obj.length; i++) {
            const keys = Object.keys(obj[i]);
            keys.sort(function (a, b) {
                return (Number(a) - Number(b));
            });
            let str = '';
            for (let j = 0; j < keys.length; j++) {
                str += JSON.stringify(keys[j]);
                str += JSON.stringify(obj[i][keys[j]]);
            }
            if (!stringify.hasOwnProperty(str)) {
                uniques.push(obj[i]);
                stringify[str] = true;
            }
        }
        return uniques.length;
    }
}
