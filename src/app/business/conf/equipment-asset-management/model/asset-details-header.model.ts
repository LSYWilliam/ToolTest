export class AssetDetailsHeaderModel {
    tableInput: any;
    constructor() {
        this.tableInput = [
            {
                field: 'dateTime',
                headName: '更改时间'
            },
            {
                field: 'status',
                headName: '设备状态'
            },
            {
                field: 'businessName',
                headName: '设备所属'
            }
        ];
    }
}
