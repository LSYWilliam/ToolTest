/**
 * 表格组件入参实体类
 * @class TableModel
 */
export class TableModel {
    /**table表头数据*/
    public tableHeaderData: any;
    /**table表格是否分页*/
    public paginationBool: boolean;
    /**table表格每一页的大小*/
    public sizeEveryPage: number;
    /**table表的行高*/
    public tableRowHeight: number;
    /**table表的整体样式*/
    public tableStyle: any;
    /**表格是否可以多选*/
    public tableSelection: any;
    public rightMenu: boolean;

    constructor(tableInput: TableInterface) {
        /**table表头数据*/
        if (tableInput.tableHeaderData) {
            this.tableHeaderData = tableInput.tableHeaderData;
        } else {
            this.tableHeaderData = [];
        }
        /**table表格是否分页*/
        if (tableInput.paginationBool) {
            this.paginationBool = tableInput.paginationBool;
        } else {
            this.paginationBool = false;
        }
        /**table表格每一页的大小*/
        if (tableInput.sizeEveryPage) {
            this.sizeEveryPage = tableInput.sizeEveryPage;
        } else {
            this.sizeEveryPage = 2;
        }
        /**table表格每一行的行高*/
        if (tableInput.tableRowHeight) {
            this.tableRowHeight = tableInput.tableRowHeight;
        } else {
            this.tableRowHeight = 35;
        }
        /**table表的整体样式*/
        if (tableInput.tableStyle) {
            this.tableStyle = tableInput.tableStyle;
        } else {
            this.tableStyle = {};
        }
        /**table表的整体样式*/
        if (tableInput.tableSelection) {
            this.tableSelection = tableInput.tableSelection;
        } else {
            this.tableSelection = 'multiple';
        }

        this.rightMenu = !tableInput.rightMenu;
    }
}
