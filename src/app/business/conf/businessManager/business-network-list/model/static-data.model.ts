export class StaticDataModel {
    tableInput: any;
    constructor() {
        this.tableInput = [
            {
                field: 'netStatus',
                headName: '',
                hide: true
            },
            {
                field: 'netStatusIcon',
                headName: '网络状态',
                icon: true
            },
            {
                field: 'businessName',
                headName: '企业',
                search: true,
                sort: true
            },
            {
                field: 'businessId',
                headName: '',
                hide: true
            },
            {
                field: 'province',
                headName: '',
                hide: true
            },
            {
                field: 'city',
                headName: '',
                hide: true
            },
            {
                field: 'county',
                headName: '',
                hide: true
            },
            {
                field: 'netName',
                headName: '网络名称',
                search: true
            },
            {
                field: 'netId',
                headName: '',
                hide: true
            },
            {
                field: 'assetCount',
                headName: '',
                hide: true
            },
            {
                field: 'apList',
                headName: '',
                hide: true
            },
            {
                field: 'apModel',
                headName: '',
                hide: true
            },
            {
                field: 'apSn',
                headName: '',
                hide: true
            },
            {
                field: 'apName',
                headName: '',
                hide: true
            },
            {
                field: 'apId',
                headName: '',
                hide: true
            },
            {
                field: 'detailAddress',
                headName: '',
                hide: true
            },
            {
                field: 'completeAddress',
                headName: '地址'
            },
            {
                field: 'dueTime',
                headName: '有效日期'
            },
            {
                field: 'netContact',
                headName: '联系人'
            },
            {
                field: 'netTel',
                headName: '联系方式'
            },
            {
                field: 'operate',
                headName: '网络配置',
                clickRoute: true,
                action: [{name:'点击配置', disabled: false}]
            },
            {
                field: 'assetsDesc',
                headName: '设备信息',
                clickRoute: true
            }
        ];
    }
}
