/**
 * 表格组件入参实体类
 * @class EditTableModel
 */
export class EditTableModel {
    /**edit-table表头数据*/
    public editTableHeaderData: any;
    /**edit-table表格是否分页*/
    public paginationBool: boolean;
    /**edit-table表格每一页的大小*/
    public sizeEveryPage: number;
    /**edit-table表的行高*/
    public tableRowHeight: number;
    /**edit-table表的整体样式*/
    public tableStyle: any;
    /**edit-table表是否可编辑整行*/
    public editType: any;
    /**edit-table表是否可多选行*/
    public rowSelection: any;
    constructor(editTableInput: EditTableInterface) {
        /**edit-table表头数据*/
        if (editTableInput.editTableHeaderData) {
            this.editTableHeaderData = editTableInput.editTableHeaderData;
        } else {
            this.editTableHeaderData = [];
        }
        /**edit-table表格是否分页*/
        if (editTableInput.paginationBool) {
            this.paginationBool = editTableInput.paginationBool;
        } else {
            this.paginationBool = false;
        }
        /**edit-table表格每一页的大小*/
        if (editTableInput.sizeEveryPage) {
            this.sizeEveryPage = editTableInput.sizeEveryPage;
        } else {
            this.sizeEveryPage = 2;
        }
        /**edit-table表格每一行的行高*/
        if (editTableInput.tableRowHeight) {
            this.tableRowHeight = editTableInput.tableRowHeight;
        } else {
            this.tableRowHeight = 20;
        }
        /**edit-table表的整体样式*/
        if (editTableInput.tableStyle) {
            this.tableStyle = editTableInput.tableStyle;
        } else {
            this.tableStyle = {};
        }
        /**edit-table表是否可编辑整行*/
        if (editTableInput.editType) {
            this.editType = editTableInput.editType;
        } else {
            this.editType = '';
        }
        /**edit-table表是否可多选行*/
        if (editTableInput.rowSelection) {
            this.rowSelection = editTableInput.rowSelection;
        } else {
            this.rowSelection = '';
        }

    }
}
