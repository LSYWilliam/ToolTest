export interface FilterWorkOrderInterface {
    businessName?: string;
    responsibleName?: string;
    workOrderStatus?: any;
    workOrderType?: any;
}

export class FilterWorkOrder {

    private _businessName: string;
    private _responsibleName: string;
    private _workOrderStatus: any;
    private _workOrderType: any;

    constructor () {
        this.businessName = '';
        this.responsibleName = '';
        this.workOrderStatus = null;
        this.workOrderType = null;
    }

    getClear() {
        this.businessName = '';
        this.responsibleName = '';
        this.workOrderStatus = null;
        this.workOrderType = null;
    }

    get businessName(): string {
        return this._businessName;
    }

    set businessName(value: string) {
        this._businessName = value;
    }

    get responsibleName(): string {
        return this._responsibleName;
    }

    set responsibleName(value: string) {
        this._responsibleName = value;
    }

    get workOrderStatus(): any {
        return this._workOrderStatus;
    }

    set workOrderStatus(value: any) {
        this._workOrderStatus = value;
    }

    get workOrderType(): any {
        return this._workOrderType;
    }

    set workOrderType(value: any) {
        this._workOrderType = value;
    }
}
