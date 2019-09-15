/**商家信息接口*/
export class BusinessInfomationInterface {
    id?: number;
    /**商家Id*/
    businessId?: number;
    /**商家名称*/
    businessName?: string;
    /**联系人*/
    businessContact?:string;
    /**电话*/
    businessTel?:string;
    /**省*/
    province?:string;
    /**市*/
    city?:string;
    /**区*/
    district?:string;
    /**地址*/
    businessAddr?:string;
    /**创建时间*/
    createTime?:string;
}
