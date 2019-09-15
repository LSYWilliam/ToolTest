import {ThresholdComponent} from "../../../../plugins/component/tree-table/threshold/threshold.component";
import {EditComponent} from "../../../../plugins/component/tree-table/edit/edit.component";
import {StatusComponent} from "../../../../plugins/component/tree-table/status/status.component";

export class AlertHeadModel {
    private _tableInput: TreeTableInterface;

    get tableInput(): TreeTableInterface {
        this._tableInput = {
            treeTableHeaderData: [
                {
                    headerName: 'id',
                    field: 'id',
                    hide: true,
                },
                {
                    headerName: '警报类型',
                    field: 'typeDes',
                    cellRenderer: 'agGroupCellRenderer',
                    cellRendererParams: {
                        checkbox: true,
                    },
                    headerCheckboxSelection: true,
                    width: 300,
                    minWidth: 200,
                    maxWidth: 300,
                    suppressSizeToFit: true

                },
                {
                    headerName: '阀值',
                    field: 'threshold',
                    width: 100,
                    minWidth: 80,
                    maxWidth: 300,
                    cellRendererFramework: ThresholdComponent,
                    // suppressSizeToFit: true
                },
                {
                    headerName: '邮件接收',
                    field: 'isEmailDes',
                    width: 100,
                    minWidth: 100,
                    maxWidth: 300,
                    cellRendererFramework: StatusComponent,
                    // suppressSizeToFit: true
                },
                {
                    headerName: '警报接收人',
                    field: 'receiversDes',
                    width: 200,
                    minWidth: 200,
                    maxWidth: 300,
                    cellRendererFramework: EditComponent,
                    suppressSizeToFit: true
                },
            ],
            tableRowHeight: 35,
        };
        return this._tableInput;
    }

    set tableInput(value: TreeTableInterface) {
        this._tableInput = value;
    }
}
