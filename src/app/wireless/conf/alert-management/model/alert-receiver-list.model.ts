export class AlertReceiverListModel {
    alertReceiverMemberArray:Array<AlertReceiverMember>;
}

export class AlertReceiverMember {
    userId?:number;
    username:string;
    contactTele:number;
    contactEmail:string;
    rolesStr:string;
}
