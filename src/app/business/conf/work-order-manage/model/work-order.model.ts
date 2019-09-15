/**工单列表模态框数据接口*/
export interface WorkOrderModelInterface {
    /**工单编号*/
    workNum?: string;
    /** 工单创建时间 */
    createTime?: string;
    /** 工单结束时间 */
    endTime?: string;
    /** 企业 */
    enterprise?: string;
    /** 设备类型 */
    deviceType?: string;
    /** 设备型号 */
    deviceModel?: string;
    /** 设备数量 */
    deviceQuantity?: string;
    /** 设备型号数量 */
    deviceModelQuantity?: string;
    /** 设备清单 */
    deviceInventory?: any[];
    /** 责任人ID*/
    responsibleId?: number;
    /** 责任人 */
    responsible?: string;
    /** 联系方式 */
    contactMethod?: string;
    /** 工单状态 */
    workStatus?: string;
    /** 工单状态Test */
    workStatusTest?: string;
    /** 安装状态 */
    installResult?: string;
    /** 工单反馈 */
    workFeedback?: string;
    /** 备注 */
    remarks?: string;
}

/**工单模态框数据实体类*/
export class WorkOrderModel {
    /**工单编号*/
    private _workNum: string;
    /** 工单创建时间 */
    private _createTime: string;
    /** 工单结束时间 */
    private _endTime: string;
    /** 企业 */
    private _enterprise: string;
    /** 设备类型 */
    private _deviceType: string;
    /** 设备型号 */
    private _deviceModel: string;
    /** 设备数量 */
    private _deviceQuantity: string;
    /** 设备型号数量 */
    private _deviceModelQuantity: string;
    /** 设备清单 */
    private _deviceInventory: any[];
    /** 责任人ID */
    private _responsibleId: number;
    /** 责任人 */
    private _responsible: string;
    /** 联系方式 */
    private _contactMethod: string;
    /** 工单状态 */
    private _workStatus: string;
    /** 工单状态Test */
    private _workStatusTest: boolean;
    /** 安装状态 */
    private _installResult: string;
    /** 工单反馈 */
    private _workFeedback: string;
    /** 备注 */
    private _remarks: string;

    constructor() {
        this.workNum = '';
        this.createTime = '';
        this.endTime = '';
        this.enterprise = '';
        this.deviceType = '';
        this.deviceModel = '';
        this.deviceQuantity = '';
        this.deviceModelQuantity = '';
        this.responsible = '';
        this.contactMethod = '';
        this.workStatus = '';
        this.installResult = '';
        this.workFeedback = '';
        this.remarks = '';
    }

    /** 设置结束工单模态框数据 */
    getWorkOrderEnd() {
        return {
            'workNum' : this.workNum,
            'workStatus' : this.workStatus,
            'workFeedback' : this.workFeedback
        };
    }


    /**设置工单列表模态框数据*/
    public setWorkData(data: WorkOrderModelInterface) {
        let inventory: any[] = [];
        let devicetype: any[] = data.deviceType.split('/');
        let devicemodelquantity: any[] = data.deviceModelQuantity.split('/');

        for (let i in devicetype) {
            let item = {
                'deviceType': devicetype[i],
                'deviceModel': devicemodelquantity[i].split(':')[0],
                'deviceQuantity': devicemodelquantity[i].split(':')[1],
            };
            inventory.push(item);
        }

        if (data.workStatus === '已完结') {
            this.workStatusTest = true;
        } else {
            this.workStatusTest = false;
        }

        this.workNum = data.workNum;
        this.enterprise = data.enterprise;
        this.deviceInventory = inventory;
        this.responsibleId = data.responsibleId;
        this.responsible = data.responsible;
        this.workStatus = data.workStatus;
        this.installResult = data.installResult;
        this.workFeedback = data.workFeedback;
    }

    get workNum(): string {
        return this._workNum;
    }

    set workNum(value: string) {
        this._workNum = value;
    }

    get createTime(): string {
        return this._createTime;
    }

    set createTime(value: string) {
        this._createTime = value;
    }

    get endTime(): string {
        return this._endTime;
    }

    set endTime(value: string) {
        this._endTime = value;
    }

    get enterprise(): string {
        return this._enterprise;
    }

    set enterprise(value: string) {
        this._enterprise = value;
    }

    get deviceType(): string {
        return this._deviceType;
    }

    set deviceType(value: string) {
        this._deviceType = value;
    }

    get deviceModel(): string {
        return this._deviceModel;
    }

    set deviceModel(value: string) {
        this._deviceModel = value;
    }

    get deviceQuantity(): string {
        return this._deviceQuantity;
    }

    set deviceQuantity(value: string) {
        this._deviceQuantity = value;
    }

    get deviceModelQuantity(): string {
        return this._deviceModelQuantity;
    }

    set deviceModelQuantity(value: string) {
        this._deviceModelQuantity = value;
    }

    get deviceInventory(): any[] {
        return this._deviceInventory;
    }

    set deviceInventory(value: any[]) {
        this._deviceInventory = value;
    }

    get responsibleId(): number {
        return this._responsibleId;
    }

    set responsibleId(value: number) {
        this._responsibleId = value;
    }

    get responsible(): string {
        return this._responsible;
    }

    set responsible(value: string) {
        this._responsible = value;
    }

    get contactMethod(): string {
        return this._contactMethod;
    }

    set contactMethod(value: string) {
        this._contactMethod = value;
    }

    get workStatus(): string {
        return this._workStatus;
    }

    set workStatus(value: string) {
        this._workStatus = value;
    }

    get workStatusTest(): boolean {
        return this._workStatusTest;
    }

    set workStatusTest(value: boolean) {
        this._workStatusTest = value;
    }

    get installResult(): string {
        return this._installResult;
    }

    set installResult(value: string) {
        this._installResult = value;
    }

    get workFeedback(): string {
        return this._workFeedback;
    }

    set workFeedback(value: string) {
        this._workFeedback = value;
    }

    get remarks(): string {
        return this._remarks;
    }

    set remarks(value: string) {
        this._remarks = value;
    }
}

/**设置商户列表表格行数据*/
export function setWorkOrderRow(rowData: any, updateData: WorkOrderModelInterface) {
    rowData.workNum = updateData.workNum;
    rowData.createTime = updateData.createTime;
    rowData.endTime = updateData.endTime;
    rowData.enterprise = updateData.enterprise;
    rowData.deviceType = updateData.deviceType;
    rowData.deviceModelQuantity = updateData.deviceModelQuantity;
    rowData.responsibleId = updateData.responsibleId;
    rowData.responsible = updateData.responsible;
    rowData.contactMethod = updateData.contactMethod;
    rowData.workStatus = updateData.workStatus;
    rowData.workFeedback = updateData.workFeedback;
    rowData.remarks = updateData.remarks;
    return rowData;
}
