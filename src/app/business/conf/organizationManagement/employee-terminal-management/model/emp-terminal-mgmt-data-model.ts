
export class EmpTerminalMgmtDataModel {
    public list:Array<EmpMgmtElement> = [];
}
/**用户table表格 每一行信息 接口*/
export interface EmpMgmtElement {
    /**终端id*/
    id?;
    /**mac地址*/
    macAddr?;
    /**设备资产编号*/
    equipmentNumber?;
    /**设备类型*/
    equipmentType?;
    /**所属员工id*/
    empId?;
    /**员工姓名*/
    empName?;
    /**员工所属部门的名称字符串*/
    deptNameList?;
    /**企业id*/
    businessId?;
    /**员工所属部门的id字符串*/
    deptIdList?;
}
