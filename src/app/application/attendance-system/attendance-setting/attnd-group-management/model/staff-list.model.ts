export class StaffListModel {
    staffList: Array<StaffElemet> = [];
}

export class StaffElemet {
    id?: string;
    empName?: string;
    empSex?: string;
    empPosition?: string;
    empEmail?: string;
    empMobile?: string;
    businessId?: string;
    businessName?: string;
    deptNameList?: string;
    jobNumber?: string;
    deptIdList?: string;
}
