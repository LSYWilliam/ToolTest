import {Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import {routerTransition} from '../../../../animations/route-animations';
import {FirmwareManagementPlatformService} from '../service/firmware-management-platform.service';
import {RequestArgs, RequestArgsInterface} from '../../../../shared/model/request-args';
import {VersionListModel} from '../model/version-list.model';
import {VersionUploadModel} from "../model/version-upload.model";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TableComponent} from "../../../../plugins/component/table/table.component";
import {ConfirmModalComponent} from "../../../../shared/component/confirm-modal/confirm-modal.component";
import {forkJoin} from "rxjs/observable/forkJoin";
import {DeviceModelResolverModel} from "../../../../shared/model/device-model-resolver.model";
import {DeviceTypeResolverModel} from "../../../../shared/model/device-type-resolver.model";
import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

/**
 * AP固件版本管理（平台）
 * @class FirmwareManagementPlatformComponent
 */
@Component
({
    selector: 'app-firmware-management',
    templateUrl: './firmware-management-platform.component.html',
    styleUrls: ['./firmware-management-platform.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class FirmwareManagementPlatformComponent extends FirmwareManagementPlatformService implements OnInit {

    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /** 子组件 */
    @ViewChild(TableComponent) child: TableComponent;
    /** http请求头部实例化 */
    public requestArgs: RequestArgs = new RequestArgs();
    /** 文件上传DOM */
    @ViewChild('fileUpLaod') private flieLoad:ElementRef;
    /** 页面类型 */
    public firmwareManagement: string;
    /** input 版本号 */
    public enterValue: string;
    /** 设备类型 */
    public deveiceType: string;
    /** 设备型号 */
    public deveiceModel: string;
    /** 版本表格 */
    public versionListModel: VersionListModel = new VersionListModel();
    /** 版本上传 */
    public versionUploadModel: VersionUploadModel = new VersionUploadModel;
    /** 表单验证 */
    public validateForm: FormGroup;
    /** 查询参数存储对象*/
    public queryParameter: any;
    ngOnInit () {
        this.windowHeight = window.innerHeight-250;
        this.firmwareManagement = 'versionManagement';
        /** http请求头部 */
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.getFireWareData();
        localStorage.removeItem('queryParameter');
        /** 添加版本-表单验证 */
        this.validateForm = this.fb.group({
            version         : [ null, [ Validators.required ] ],
            checkMd5        : [ null, [ Validators.required ] ],
            type            : [ null, [ Validators.required ] ],
            deviceModel     : [ null, [ Validators.required ] ],
            upload          : [ null, [ Validators.required ] ],
            instruction     : [ null, [ Validators.required, Validators.maxLength(4000) ] ],
        });
        this.enterValue = '';
        this.deveiceType = '';
        this.deveiceModel = '';
        this.versionUploadModel.type = this.versionTypeDropDown.uploadDeviceType[0].id?Number(this.versionTypeDropDown.uploadDeviceType[0].id):null;
        this.versionUploadModel.deviceModel = this.versionTypeDropDown.uploadDeviceModel[0].name;
    }

    /**
     * 获取页面数据方法
     * @description
     *      1、获得当前版本数据
     *      2、获得固件版本列表版本
     */
    getFireWareData() {
        super.getFileUploadServer(this.requestArgs);
        super.getFirmwareVersionList(this.requestArgs);

    }

    /** 进入添加版本上传页 */
    upload() {
        if (this.firmwareManagementPlatformModel.fileUploadServer === '暂无服务器地址') {
            this.message.warning("暂无服务器地址，无法上传！");
        } else {
            this.firmwareManagement = 'versionUpload';
        }
    }

    onInputMax(event) {
        if (this.versionUploadModel.version !== undefined && this.versionUploadModel.version.length > 15) {
            const keyCode = event.keyCode;
            if (keyCode !== 8) {
                return false;
            }
        }
    }

    OnPasteInput(event) {
        setTimeout( () => {
            const inputVal = event.target.value;
            const verLen = event.target.value.length;
            // if (verLen > 16) {
            //     this.versionUploadModel.version = inputVal.substring(0, 16);
            // }
        }, 0);
    }

    onTextMax(event) {
        if (this.versionUploadModel.instruction !== undefined && this.versionUploadModel.instruction.length > 3999) {
            const keyCode = event.keyCode;
            if (keyCode !== 8) {
                return false;
            }
        }
    }

    OnPasteText(event) {
        setTimeout( () => {
            const inputVal = event.target.value;
            const verLen = event.target.value.length;
            if (verLen > 4000) {
                this.versionUploadModel.instruction = inputVal.substring(0, 4000);
            }
        }, 0);
    }

    /** 版本号模糊查询 */
    onInputChanged() {
        this.requestArgs.url = this.getUrl(this.deveiceType, this.deveiceModel, this.enterValue);
        super.getFilterList(this.requestArgs)
            .subscribe(res => {
                    if (res.code === 0) {
                        this.firmwareManagementPlatformModel.tableData = res.result;
                    } else {
                        this.firmwareManagementPlatformModel.tableData = [];
                    }
                }
            );
    }

    /** 设备类型 */
    getDeviceType(event) {
        if (event === undefined) {
            this.deveiceType = '';
        } else {
            this.deveiceType = event;
        }

        switch (""+this.deveiceType) {
            case "1":
                this.searchDeviceModelDropDown = this.versionTypeDropDown.deviceModel;
                break;
            case "2":
                this.searchDeviceModelDropDown = this.versionTypeDropDown.switchDeviceModel;
                break;
            default:
                this.searchDeviceModelDropDown = this.unchosenDeviceModelDropDown;
        }
        // super.getModelList(this.deveiceType);
        this.requestArgs.url = this.getUrl(this.deveiceType, this.deveiceModel, this.enterValue);
        super.getFilterList(this.requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.firmwareManagementPlatformModel.tableData = res.result;
            } else {
                this.firmwareManagementPlatformModel.tableData = [];
            }
        });
    }

    getDeviceTypeName(event) {
        this.verType = event;
    }

    /** 设备型号 */
    getDeviceModel(event) {
    }

    /** 获取type的型号和数据list */
    getDeviceModelName(event) {
        this.verModel = event;
        if (event === '请选择型号') {
            this.deveiceModel = '';
        } else {
            this.deveiceModel = event;
        }
        this.requestArgs.url = this.getUrl(this.deveiceType, this.deveiceModel, this.enterValue);
        super.getFilterList(this.requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.firmwareManagementPlatformModel.tableData = res.result;
            } else {
                this.firmwareManagementPlatformModel.tableData = [];
            }
        });
    }

    /** 清空筛选参数 */
    clearDropDown() {
        this.enterValue = '';
        super.getTypeList();
        this.searchDeviceModelDropDown = this.unchosenDeviceModelDropDown;
        // super.getModelList('');
        this.requestArgs.url = this.getUrl('', '', '');
        super.getFilterList(this.requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.firmwareManagementPlatformModel.tableData = res.result;
            } else {
                this.firmwareManagementPlatformModel.tableData = [];
            }
        });
    }

    /**
     * 表格事件
     * @param data
     * @description
     *      1、点击表格
     *      2、判断表头的field的
     *      3、根据field，执行其相应的方法
     * */
    operateStop(data) {
        switch (data.colDef.field) {
            case 'instruction':
                this.firmwareManagement = 'versionExplanation';
                this.queryParameter = {
                    enterValue: this.enterValue,
                    verType: this.verType,
                    deveiceType: this.deveiceType,
                    verModel: this.verModel,
                    deveiceModel: this.deveiceModel
                };
                localStorage.setItem('queryParameter', JSON.stringify(this.queryParameter));
                super.getVersionExplain(this.requestArgs, data.data.id);
                break;
            case 'delFlag':
                if (data.data['delFlag'] === 0) {
                    let id = data.data['id'];
                    this.showModalForConfirm("是否确认停用此版本，注意：一旦停用，不能再次启用？", id, data);
                } else {
                    this.message.error("版本已停用！");
                }
                break;
        }
    }

    /**
     * 是否确认停用提示框
     * @param message string
     * @description
     *      1、对话框提示信息
     *      2、确认是否停用
     *      3、调用接口停用
     */
    showModalForConfirm(message: string, id: string, data: any) {
        const modalConfig = {
            content        : ConfirmModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: message
            }
        };
        const subscription$ = this.modalService.open(modalConfig);
        subscription$.subscribe(result => {
            if (result === 'onOk') {
                // 停用
                super.getVersionStop(this.requestArgs, id).subscribe(res => {
                    if (res.code === 0) {
                        this.message.success("停用成功！");
                        data.data.delFlag = 1;
                        this.child.editRow(data.data);
                    } else {
                        this.message.error("停用失败！");
                    }
                });
            }
        });
    }

    /**
     * 表单
     * @description
     *      表单验证
     * */
    getFormControl(name) {
        return this.validateForm.controls[ name ];
    }

    goBackShowWithMessage(message) {
        const modalConfig = {
            content        : ConfirmModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: message
            }
        };
        const subscription$ = this.modalService.open(modalConfig);
        subscription$.subscribe(result => {
            if (result === 'onOk') {
                this.validateForm.reset();
                this.uploadDeviceType = "请选择类型";
                this.firmwareManagement = 'versionManagement';
                // super.getFirmwareVersionList(this.requestArgs);
                this.getPageDefaultData();
            }

        });
    }

    /** 返回版本管理 */
    goBackShow(message) {
        // const modalConfig = {
        //     content        : ConfirmModalComponent,
        //     onOk() {},
        //     onCancel() {},
        //     footer         : false,
        //     maskClosable : false,
        //     componentParams: {
        //         name: message
        //     }
        // };
        // const subscription$ = this.modalService.open(modalConfig);
        // subscription$.subscribe(result => {
        //     if (result === 'onOk') {
                this.validateForm.reset();
                this.firmwareManagement = 'versionManagement';
                // super.getFirmwareVersionList(this.requestArgs);
                this.getPageDefaultData();
        //     }
        // });

    }
    /**点击返回按钮设置默认数据*/
    getPageDefaultData() {
        const obj = JSON.parse(localStorage.getItem('queryParameter'));
        /**获取操作的数据*/
        if (obj && !(obj.deveiceType === null && obj.deveiceModel === '' && this.enterValue === '')) {
            this.requestArgs.url = this.getUrl(obj.deveiceType, obj.deveiceModel, this.enterValue);
            super.getFilterList(this.requestArgs).subscribe(res => {
                if (res.code === 0) {
                    this.firmwareManagementPlatformModel.tableData = res.result;
                } else {
                    this.firmwareManagementPlatformModel.tableData = [];
                }
            });
        } else {
            super.getFirmwareVersionList(this.requestArgs);
        }
    }
    /** 版本类型选择 */
    getDropDownType(id) {
        this.versionUploadModel.type = id;
        switch (""+this.versionUploadModel.type) {
            case "1":
                this.uploadDeviceModelDropDown = this.versionTypeDropDown.uploadDeviceModel;
                break;
            case "2":
                this.uploadDeviceModelDropDown = this.versionTypeDropDown.switchUploadDeviceModel;
                break;
            default:
                this.uploadDeviceModelDropDown = this.unchosenDeviceModelDropDown;
        }
    }

    /** 版本类型选择 */
    getDropDownModel(value) {
        if (value === '请选择型号') {
            this.versionUploadModel.deviceModel = undefined;
        } else {
            this.versionUploadModel.deviceModel = value;
        }
    }

    /** 获取URL地址 */
    getUrl(type, deviceModel, version) {
        if (type === '' && deviceModel === '' && version === '') {
            return '/api/v1/firmware_version';
        }

        if (type === '' && deviceModel !== '' && version !== '') {
            return '/api/v1/firmware_version?version=' + version + '&deviceModel=' + deviceModel;
        }

        if (type === '' && deviceModel === '' && version !== '') {
            return '/api/v1/firmware_version?version=' + version;
        }

        if (type === '' && deviceModel !== '' && version === '') {
            return '/api/v1/firmware_version?deviceModel=' + deviceModel;
        }

        if (type !== '' && deviceModel !== '' && version !== '') {
            return '/api/v1/firmware_version?version=' + version + '&type=' + type + '&deviceModel=' + deviceModel;
        }

        if (type !== '' && deviceModel === '' && version === '') {
            return '/api/v1/firmware_version?type=' + type;
        }

        if (type !== '' && deviceModel !== '' && version === '') {
            return '/api/v1/firmware_version?type=' + type + '&deviceModel=' + deviceModel;
        }

        if (type !== '' && deviceModel === '' && version !== '') {
            return '/api/v1/firmware_version?version=' + version + '&type=' + type;
        }

    }

    /**
     * 版本上传
     * @description
     *      1、限制上传的文件为压缩文件
     *      2、上传文件为文件流
     *      3、调用接口，上传文件
     */
    doUpload(event: any) {
        /** 文件解析 */
        let fileList = event.target.files;
        /** 文件不为空 */
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let fileName = file.name.lastIndexOf(".");
            let fileNameLen = file.name.length;
            let suffixName = file.name.substring(fileName+1, fileNameLen);
            if (suffixName === 'bin') {
                if (file.size > 100*1024*1024) {
                    this.flieLoad.nativeElement.value = '';
                    this.message.error('上传版本大于100M！');
                    return false;
                } else {
                    // 上传的文件的文件流
                    let formData = new FormData();
                    formData.append('file', file, file.name);
                    /** 上传接口 */
                    super.getVersionUpload(this.requestArgs, formData).subscribe(res => {
                        if (res.code === 0) {
                            this.versionUploadModel.filePath = res.result.filePath;
                            this.versionUploadModel.fileSize = file.size;
                            this.versionUploadModel.type = res.result.type?res.result.type:this.versionUploadModel.type;
                            this.versionUploadModel.version = res.result.version?res.result.version:this.versionUploadModel.version;

                            this.versionTypeDropDown.uploadDeviceType.forEach(glt=> {
                                if(glt.id === res.result.type) {
                                    this.uploadDeviceType = glt.name;
                                    this.getDropDownType(glt.id);
                                }
                            });
                        } else {
                            this.message.error("上传失败！");
                            this.message.error(res.msg);
                        }
                    });
                }
            } else {
                this.message.error('上传版本文件类型不正确！');
                this.flieLoad.nativeElement.value = '';
            }
        }
    }

    /**
     * 版本上传-版本保存
     * @description
     *      1、点击保存
     *      2、获取版本参数，并判断参数不为空
     *      3、调用接口，保存版本
     *      4、重置表单
     * */
    saveUpload() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[ i ].markAsDirty();
        }
        if (this.versionUploadModel.version !== null &&
            this.versionUploadModel.type !== null &&
            this.versionUploadModel.deviceModel !== null &&
            this.versionUploadModel.filePath !== null &&
            this.versionUploadModel.instruction !== null &&
            this.versionUploadModel.fileSize !== null) {
            let data = {
                'version': this.versionUploadModel.version,
                'checkMd5': this.versionUploadModel.checkMd5?this.versionUploadModel.checkMd5:null,
                'type': this.versionUploadModel.type,
                'deviceModel': this.versionUploadModel.deviceModel,
                'filePath': this.versionUploadModel.filePath,
                'instruction': this.versionUploadModel.instruction,
                'fileSize': this.versionUploadModel.fileSize,
            };
            const require1: RequestArgs = new RequestArgs();
            require1.systemName = 'wlanscope';
            require1.header = {'ticket': sessionStorage.getItem('ticket')};
            require1.url = '/api/v1/firmware_version';
            require1.body = data;

            const require2: RequestArgs = new RequestArgs();
            require2.systemName = 'wlanscope';
            require2.header = {'ticket': sessionStorage.getItem('ticket')};
            require2.url = '/api/v1/firmware_version';

            forkJoin(
                this.http.httpPost(require1),
                this.http.httpGet(require2)
            ).subscribe(
                ([dataPut, dataGet]) => {
                    if (dataPut.code === 0) {
                        this.message.warning("保存成功！");
                        this.validateForm.reset();
                        this.flieLoad.nativeElement.value = '';
                        /** 版本上传设备类型下拉框 */
                        this.versionTypeDropDown.uploadDeviceType = new DeviceTypeResolverModel(this.activatedRoute).deviceType2;
                        /** 版本上传设备型号下拉框 */
                        this.versionTypeDropDown.uploadDeviceModel = new DeviceModelResolverModel(this.activatedRoute).deviceModel2;
                        // 返回资源列表
                        this.firmwareManagement = 'versionManagement';
                        this.firmwareManagementPlatformModel.versionDetails = '';
                        this.versionUploadModel.type = Number(this.versionTypeDropDown.uploadDeviceType[0].id);
                        this.versionUploadModel.deviceModel = this.versionTypeDropDown.uploadDeviceModel[0].name;
                        this.versionUploadModel.fileSize = null;
                        if (dataGet.code === 0) {
                            this.firmwareManagementPlatformModel.tableData = dataGet.result;
                        }
                        super.getFirmwareVersionListTwo(this.requestArgs);
                    } else {
                        this.message.error(dataPut.msg);
                        this.message.error("保存失败！");
                    }
                }
            );
        } else {
            this.message.error("保存失败！");
        }
    }

}
