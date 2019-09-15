 export interface ApListModalInterface {
     /**apID*/
     apId: any;
     /**apIp*/
     apIp: any;
     /**apMac地址*/
     apMac: any;
     /**ap型号*/
     apModel: any;
     /**ap名称*/
     apName: any;
     /**ap序列号*/
     apSn: any;
     /**ap状态*/
     apStatus: any;
     /**ap状态图标*/
     apStatusIcon: any;
     /**ap在线客户端数*/
     clientNum: any;
     /**今日转发流量*/
     dayTraffic: any;
     /**本地Ip*/
     localIp: any;
     /**mac地址*/
     mac: any;
     /**备注*/
     remark: any;
     /**状态*/
     status: any;
 }
/**设置商户列表表格行数据*/
export function setApListRow(rowData: any, updateData: ApListModalInterface) {
    rowData.apId = updateData.apId;
    rowData.apIp = updateData.apIp;
    rowData.apModel = updateData.apModel;
    rowData.apName = updateData.apName;
    rowData.apMac = updateData.apMac;
    rowData.apSn = updateData.apSn;
    rowData.apStatus = updateData.apStatus;
    // rowData.apStatusIcon = updateData.apStatusIcon;
    rowData.clientNum = updateData.clientNum;
    rowData.dayTraffic = updateData.dayTraffic;
    rowData.localIp = updateData.localIp;
    rowData.mac = updateData.mac;
    rowData.remark = updateData.remark;
    // rowData.status = updateData.status;
    return rowData;
}
