
export class DeptMgmtDataModel {
    public list:Array<DeptMgmtElement> = [];
}
/**用户table表格 每一行信息 接口*/
export class DeptMgmtElement {
    /**部门id*/
    id?;
    /**部门名称*/
    deptName?;
    /**部门编号*/
    deptCode?;
    /**上级部门*/
    parentName?;
    /**上级部门id*/
    parentId?;
    /**部门人数*/
    member?;
    /**负责人*/
    managerName?;

}
