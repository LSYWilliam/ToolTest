export class StaticDataModel {
    tableInput: any;
    constructor() {
        this.tableInput = [
            {
                field: 'account',
                headName: '账号',
                search: true
            },
            {
                field: 'apMac',
                headName: 'mac地址',
                search: true
            },
            {
                field: 'businessName',
                headName: '企业',
                search: true
            },
            {
                field: 'network',
                headName: '网络',
                search: true
            },
            {
                field: 'employee',
                headName: '员工',
                search: true
            },
            {
                field: 'verificationMethod',
                headName: '认证方式',
                filter: true
            },
            {
                field: 'onlineTime',
                headName: '上线时间'
            },
            {
                field: 'offlineDuration',
                headName: '在线时长'
            },
            {
                field: 'offlineTime',
                headName: '下线时间'
            },
            // {
            //     field: 'operate',
            //     headName: '操作',
            //     action: ['编辑', '删除']
            // }
        ];
    }
}
