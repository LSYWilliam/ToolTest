/**设备资产管理平台 table表格数据接口*/
export interface PlantTableInterface {
    /**ap的Id*/
    apId? : number;
    /**ap的名称*/
    apName? : string;
    /**商家的名称*/
    businessName? : string;
    /**商家的Id*/
    businessId?: number;
    /**ap的序列号*/
    apSn? : string;
    /**ap的Mac地址*/
    apMac? : string;
    /**ap的是否已申购*/
    apBelong? : string;
    /**ap的型号*/
    apModel? : string;
    /**ap的型号说明*/
    apModelDescription? : string;
    /**ap的申购时间*/
    factoryTime? : string;
    /**备注*/
    remark: any;
}
