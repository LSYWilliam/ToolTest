export class AssetDetailsHeaderModel {
    tableInput: any;
    constructor() {
        this.tableInput = [
            {
                field: 'apId',
                headName: '',
                hide: true
            },
            {
                field: 'apName',
                headName: '',
                hide: true
            },
            {
                field: 'apMac',
                headName: '',
                hide: true
            },
            {
                field: 'apModel',
                headName: '设备型号'
            },
            {
                field: 'apSn',
                headName: '设备序列号'
            }
        ];
    }
}
