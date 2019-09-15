
export class VisitorCertificationRecordDataModel {
    public list:Array<VisitorCertRecordElement> = [];
}
/**用户table表格 每一行信息 接口*/
export class VisitorCertRecordElement {
    /**mac地址*/
    mac?;
    /**电话号*/
    tel?;
    /**nasId*/
    nasId?;
    /**ssidName*/
    ssidName?;
    /**设备类型*/
    deviceType?;
    /**是否允许经过认证*/
    authenticationResult?;
    /**认证状态，包括原因等*/
    authenticationStatus?;
    /**创建时间*/
    createTime?;
    /**更新时间*/
    updateTime?;
}
