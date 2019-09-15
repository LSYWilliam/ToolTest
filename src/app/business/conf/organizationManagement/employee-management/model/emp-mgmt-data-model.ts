
export class EmpMgmtDataModel {
    public list:Array<EmpMgmtElement> = [];
}
/**用户table表格 每一行信息 接口*/
export class EmpMgmtElement {
    /**员工id*/
    id?;
    /**员工姓名*/
    empName?;
    /**员工性别*/
    empSex?;
    /**职位信息*/
    empPosition?;
    /**员工邮箱*/
    empEmail?;
    /**员工电话*/
    empMobile?;
    /**员工信息中的企业id*/
    businessId?;
    /**企业名称*/
    businessName?;
    /**所属全部的部门名称字符串*/
    deptNameList?;
    /**员工工号*/
    jobNumber?;

    deptIdList?;
}
