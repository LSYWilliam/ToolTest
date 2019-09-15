export class StaticDataModel {
    tableInput: any;
    constructor() {
        this.tableInput = [
            {
                field: 'assetId',
                headName: '',
                hide: true
            },
            {
                field: 'assetName',
                headName: '设备名称',
                editCell: true
            },
            {
                field: 'assetStatus',
                headName: '',
                hide: true
            },
            {
                field: 'assetStatusDes',
                headName: '设备状态',
                filter: true
            },
            {
                field: 'assetSn',
                headName: '设备序列号',
                search: true,
            },
            {
                field: 'assetMac',
                headName: 'mac地址',
                search: true,
            },
            {
                field: 'assetModel',
                headName: '型号',
                search: true,
            },
            {
                field: 'assetModelDescription',
                headName: '型号说明'
            },
            {
                field: 'businessId',
                headName: '',
                hide: true
            },
            {
                field: 'businessName',
                headName: '设备归属',
                search: true
            },
            {
                field: 'remark',
                headName: '备注',
                editCell: true
            },
            {
                field: 'factoryTime',
                headName: '出厂时间',
                sort: true
            },
            {
                field: 'installTime',
                headName: '安装时间',
                sort: true
            },
            {
                field: 'abandonedTime',
                headName: '废弃时间',
                sort: true
            },
            // {
            //     field: 'isAbandonedIcon',
            //     headName: '是否废弃',
            //     icon: true
            // },
            // {
            //     field: 'details',
            //     headName: '详情'
            // },
            {
                field: 'operate',
                headName: '操作',
                action: [{name:'废弃', disabled: true}, {name:'详情', disabled: false}]
            }
        ];
    }
}
