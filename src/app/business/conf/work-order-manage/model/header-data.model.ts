export class HeaderDataModel {
    tableInput: any;
    constructor() {
        this.tableInput = [
            {
                field: 'workOrderId',
                headName: '',
                hide: true
            },
            {
                field: 'workOrderNumber',
                headName: '工单编号'
            },
            {
                field: 'workOrderStatus',
                headName: '',
                hide: true
            },
            {
                field: 'workOrderStatusDesc',
                headName: '状态'
            },
            {
                field: 'businessName',
                headName: '企业名称'
            },
            {
                field: 'netName',
                headName: '网络名称'
            },
            {
                field: 'responsibleName',
                headName: '施工队'
            },
            {
                field: 'workOrderType',
                headName: '',
                hide: true
            },
            {
                field: 'workOrderTypeDesc',
                headName: '类别'
            },
            {
                field: 'workOrderDesc',
                headName: '工单描述'
            },
            {
                field: 'createTime',
                headName: '生成时间'
            },
            {
                field: 'finishTime',
                headName: '提交时间'
            },
        ];
    }
}
