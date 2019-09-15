export class UserManagementModel {
  public userElementList:Array<UserElement> = [];
}
/**用户table表格 每一行信息 接口*/
export interface UserElement {
    /**商户id*/
    businessId?;
    /**商户名称*/
    businessName?;
    /**联系人邮箱*/
    contactEmail?;
    /**联系人名称*/
    contactName?;
    /**联系人电话*/
    contactTele?;
    /**创建时间*/
    createTime?;
    id?;
    /**用户id*/
    userId?;
    /**ip地址*/
    ipAddress?;
    /**最近登录时间 格式*/
    latestLoginTime?;
    /**最近登录时间 戳*/
    latestLoginTimeStr?;
    /**允许在线登录人数*/
    peakConcurrentUsers?;
    /**角色*/
    roles?:Role;
    userStatusStr?;
    /**用户名*/
    username?;
    /**角色Id*/
    roleId?;
    /**角色名称*/
    roleName?;
    /**用户密码*/
    password?;
    /**用户操作*/
    operation?;
    /**用户状态*/
    userStatus?;
}
export class Role {
  public id;
  public roleName;
}
