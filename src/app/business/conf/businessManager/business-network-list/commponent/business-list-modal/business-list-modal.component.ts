import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../../../animations/route-animations";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {BusinessNetListModalInterface, BusinessNetListModalModel} from "../../model/businessNetListModal.model";

/**
 * 商户列表模态框模块
 * @class AssetDetailsModalComponent
*/
@Component
({
    selector: 'app-business-list-modal',
    templateUrl: './business-list-modal.component.html',
    styleUrls: ['./business-list-modal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class BusinessListModalComponent implements OnChanges,OnInit  {
    /**接收传递给模态框初始化的数据*/
    public value: BusinessNetListModalInterface;
    /**表单验证*/
    public validateForm: FormGroup;
    /** 0新增，1编辑 */
    public status: number;
    /**点击模态框确定按钮时，请求的 省*/
    private province: any;
    /**点击模态框确定按钮时，请求的 市*/
    private city: any;
    /**点击模态框确定按钮时，请求的 区*/
    private area: any;
    /**传递给three-link组件的 省*/
    public provinceLink:any;
    /**传递给three-link组件的 市*/
    public cityLink:any;
    /**传递给three-link组件的 区*/
    public areaLink:any;
    /**获取全国全部的省市区*/
    public threeLinkData: any;

    /**设备型号列表*/
    @Input() public apModelList: any;
    /**是否保存*/
    public isSave: any;
    /**商家列表*/
    private businessListData: any;
    public businessListShowData: any;
    private isSelected: boolean;

    /** 设备清单 */
    public deviceInventory: any[] = [];
    public deviceInventoryId: any[] = [];
    public textBoxData: any[] = [];
    public idBoxData: any[] = [];
    /** 设备数量 */
    public exceedNumFlag: boolean;
    /** 选中数量验证 */
    public selectDeviceInput: boolean;
    /**http请求*/
    private requestArgs: RequestArgs = new RequestArgs();

    /**商家列表模态框数据实体类*/
    public data: BusinessNetListModalModel = new BusinessNetListModalModel();

    @Output() public selectProCityArea = new EventEmitter<string>();
    /**接收传递给模态框初始化的数据*/
    @Input()
    set name(value: BusinessNetListModalInterface) {
        console.log(value);
        this.value = value;
        if (value) {
            this.provinceLink = value['province'];
            this.cityLink = value['city'];
            this.areaLink = value['county'];
        }
    }
    @Input()
    set businessList(value: any) {
        this.businessListData = value;
        this.businessListShowData = value;
    }
    constructor(private subject: NzModalSubject, private http: HttpClientService,
                private fb: FormBuilder, private message: NzMessageService,
                private el:ElementRef) {
        /**手机号校验*/
        const reg = /^1([345789][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        /**商家名称校验*/
        const regNet =  /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        /**联系人校验*/
        const regContact = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
        this.validateForm = this.fb.group({
            netName:[ null, [ Validators.required,
                Validators.minLength(2),
                Validators.maxLength(64),
                Validators.pattern(regNet)] ],
            businessName:[ null, [ Validators.required] ],
            detailAddress: [ null, [ Validators.required,
                Validators.minLength(0),
                Validators.maxLength(64)] ],
            dueTime: [null,[Validators.required ]],
            netContact:  [ null, [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(16),
                Validators.pattern(regContact)] ],
            netTel:  [ null, [Validators.required,
                Validators.pattern(reg)] ],
            assetModel: [ null ],
            assetCount: [ null, [ this.deviceQuantityNumberValidator ] ]
        });
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};

    }
    /**
     * 验证表单是否输入正确
     * */
    private validate(): boolean {
        let status: boolean = false;
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[ i ].markAsDirty();
            if (this.validateForm.controls[ i ].invalid) {
                status = true;
            }
        }
        return status;
    }
    /**判断编辑商家数据的时候，模态框内容是否更改
     *      1. 若更改了，返回true; 否则弹出警告
     * */
    private decodeBusinessData():boolean {
        if (this.data.businessName === this.value.businessName &&
            this.data.netContact === this.value.netContact &&
            this.data.netTel === this.value.netTel &&
            this.data.province === this.value.province &&
            this.data.city === this.value.city &&
            this.data.county === this.value.county &&
            this.data.dueTime === this.value.dueTime &&
            this.data.detailAddress === this.value.detailAddress ) {
            this.message.warning('数据无变化，无须提交！');
            return false;
        } else {
            return true;
        }
    }

    /**
     * 点击模块框确定按钮的事件
     * @description
     *        1、判断是否有修改内容
     *        2、没有修改内容，则页面显示提示信息
     *        3、否则将用户修改的数据提交至服务器
     *        4、并关闭模态框
     */
    handleOk() {
        this.isSave = true;
        if (this.deviceInventory.length === 0) {
            this.selectDeviceInput = false;
        } else {
            this.selectDeviceInput = true;
        }
        /** 表单校验成功 */
        if (!this.validate()) {
            this.data.completeAddress = String(this.data.province) + String(this.data.city) + String(this.data.county) + String(this.data.detailAddress);
            if (this.status === 0) { /**新增*/
                const obj = this.data.getNetListModalData(this.deviceInventoryId);
                if (obj.workOrderAssetList.length && this.data.province && this.data.city &&
                    this.data.county && this.data.detailAddress) {
                    this.subject.next(['add', obj]);
                    this.subject.destroy('onOk');
                }
            } else { /** 编辑 */
                const obj = this.data.getNetListModalEditData(this.value['netId']);
                if (this.data.province && this.data.city &&
                    this.data.county && this.data.detailAddress) {
                    this.subject.next(['edit', obj]);
                    this.subject.destroy('onOk');
                }
            }
        }
    }

    /** 点击退出后的事件，关闭模态框 */
    handleCancel() {
        this.subject.destroy('onCancel');
    }

    /**选择三级联动里面的省市区，返回的数据*/
    dealProCityArea(value) {

        const value1 = JSON.parse(value);

        this.province = value1.hasOwnProperty('_province') ? value1._province.name : this.data.province;

        if (!(this.province && !value1.hasOwnProperty('_city'))) {
            this.data.city = null;
        }


        this.city = this.province && value1.hasOwnProperty('_city') && value1._city ? value1._city.name : this.data.city;

        this.data.county = null;
        this.area = this.city && value1.hasOwnProperty('_area') && value1._area ? value1._area.name : this.data.county;


        this.data.province = this.province;
        this.data.city = this.city;
        this.data.county = this.area;

        console.log(this.data.province);
        console.log(this.data.city);
        console.log(this.data.county);
    }
    /**获取三级联动组件里面的数据
     *      1. 即 判断省市区具体是哪个省 哪个市 哪个区
     * */
    outData(value) {
        this.dealProCityArea(value);
    }

    onEnter() {
        let quantity = (/^[1-9]\d*$|^0$/.test(this.data.assetCount));
        if (quantity) {
            if (this.data.apModel && this.data.assetCount) {
                let invertory = this.data.apModel + ' ' + this.data.assetCount + '台 ';
                this.textBoxData.push(invertory);
                this.deviceInventory = this.mergeData(this.textBoxData);

                this.textBoxData = this.deviceInventory;
                let inventoryId = this.data.apModel + ' ' + this.data.assetCount + '台 ';
                this.idBoxData.push(inventoryId);
                this.deviceInventoryId = this.mergeData(this.idBoxData);
                console.log(this.deviceInventoryId);

                this.idBoxData = this.deviceInventoryId;
                this.selectDeviceInput = true;
                this.data.apModel = null;
                this.data.assetCount = null;
            } else {
                if (!this.data.apModel) {
                    this.message.warning("请选择设备型号！");
                }
                if (!this.data.assetCount) {
                    this.message.warning("请输入设备数量！");
                }
            }
        } else {
            if (!this.data.apModel) {
                this.message.warning("请选择设备型号！");
            }
            if (!this.data.assetCount) {
                this.message.warning("请输入设备数量！");
            }
            this.message.warning("设备数量为整数！");
        }
    }
    /** 富文本框中，将设备类型，设备型号相同的合并，数量相加 */
    private mergeData(data) {
        let data_two = [];
        for (let i = 0; i < data.length; i ++) {
            let index = data[i].split(' ');
            let num = index[1].substring(0, index[1].indexOf('台'));
            data_two.push({"name": index[0]+ ' ', "num": num});
        }

        for(let z = 0; z < data_two.length; z++) {
            for (let j = z + 1; j < data_two.length; j++) {
                if (data_two[z].name === data_two[j].name) {
                    data_two[z]['num'] = Number(data_two[z].num) + Number(data_two[j].num);
                    data_two.splice(j, 1);
                }
            }
        }

        let data_three = [];
        for (let c = 0; c < data_two.length; c ++) {
            data_three.push(data_two[c].name + data_two[c].num + '台 ');
        }

        return data_three;
    }

    /** 删除设备详情 */
    delInvebtory(idx) {
        this.textBoxData.splice(idx,1);
        this.idBoxData.splice(idx,1);
        this.deviceInventory.splice(idx,1);
        this.deviceInventoryId.splice(idx,1);

        if (this.deviceInventory.length === 0) {
            this.selectDeviceInput = false;
            this.textBoxData = [];
            this.idBoxData = [];
            this.deviceInventory = [];
            this.deviceInventoryId = [];
        }
    }
    /**
     * 设备数量
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    deviceQuantityNumberValidator = (control: FormControl): { [s: string]: boolean } => {
        let quantity = (/^[1-9]\d*$|^0$/.test(control.value));
        if (!control.value) {
            this.exceedNumFlag = true;
        } else {
            if (!quantity) {
                this.exceedNumFlag = false;
                return { duplicated: true };
            }
        }
    }

    /**三级联动数据*/
    private getThreeLinkData() {
        this.requestArgs.systemName = "test";
        this.requestArgs.url = "assets/data/mock-data/area.json";
        this.http.httpGet(this.requestArgs).subscribe(res => {
            this.threeLinkData = res;
        });
    }
    /**点击商家列表项*/
    searchBusiness() {
        this.el.nativeElement.querySelector('.ul_business').style.display = 'block';
        let data = this.businessListData;
        let array = [];
        for (let i = 0; i < data.length; i++) {
            if (String(data[i].businessName).indexOf(String(this.data.businessName)) >= 0 ) {
                array.push(data[i]);
            }
        }
        if (this.data.businessName == '') {
            this.data.businessId = null;
            this.businessListShowData = this.businessListData;
        }else{
            this.isSelected = false;
            this.businessListShowData = array;
        }
    }
    onclick() {
        if (!this.data.businessName) {
            this.businessListShowData = this.businessListData;
            this.el.nativeElement.querySelector('.ul_business').style.display = 'block';
        }
    }
    blur() {

    }
    liClick(item) {
        this.isSelected = true;
        this.data.businessId = item.businessId;
        this.data.businessName = item.businessName;
        this.el.nativeElement.querySelector('.ul_business').style.display = 'none';
    }
    /**时间变化*/
    dateChange(date) {
        if (date) {
            let d = new Date(date);
            const year = d.getFullYear();
            const month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0'+(d.getMonth() + 1);
            const day = d.getDate() >= 10 ? d.getDate() : '0'+ d.getDate();
            const hours = d.getHours() >= 10 ? d.getHours() : '0'+ d.getHours();
            const minutes = d.getMinutes() >= 10 ? d.getMinutes() : '0'+ d.getMinutes();
            const seconds = d.getSeconds() >= 10 ? d.getSeconds() : '0'+ d.getSeconds();
            let datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
            this.data.dueTime = datetime;
        }
    }
    ngOnChanges(): void {

    }
    /**模态框数据初始化
     *      1.getThreeLinkData获取全国省市区内容
     *      2.setBusinessData设置模态框初始化数据
     *      3.status新增还是编辑
     * */
    ngOnInit() {
        this.getThreeLinkData();
        if (this.value != null) {
            console.log(this.value);
            this.data.setNetListModalData(this.value);
            this.status = 1;
        } else {
            this.status = 0;
        }
        this.selectDeviceInput = true;
    }
}
