export class AlertListModel {
    alertItem: Array<AlertItem>;
}

export class AlertItem {
    typeDes: string;
    participants: Array<AlertElement>;
}

export class AlertElement {
    typeDes: string;
    id: string;
    threshold: string;
    isEmailDes: string;
    receiversDes: string;
}
