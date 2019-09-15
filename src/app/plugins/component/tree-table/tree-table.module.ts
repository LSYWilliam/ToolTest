
/**
 * 树形表格组件入参实体类
 * @class TreeTableModel
 */

export class TreeTableModel {
    /**edit-table表头数据*/
    public treeTableHeaderData: any;
    /**筛选enableFilter*/
    public enableFilter: any;
    /**设置tableRowHeight*/
    public tableRowHeight: any;

    constructor(treeTableInterface: TreeTableInterface) {
        /**tree-table表头数据*/
        if (treeTableInterface.treeTableHeaderData) {
            this.treeTableHeaderData = treeTableInterface.treeTableHeaderData;
        } else {
            this.treeTableHeaderData = [];
        }

        /**筛选enableFilter*/
        if (treeTableInterface.enableFilter) {
            this.enableFilter = treeTableInterface.enableFilter;
        } else {
            this.enableFilter = false;
        }

        /**筛选enableFilter*/
        if (treeTableInterface.tableRowHeight) {
            this.tableRowHeight = treeTableInterface.tableRowHeight;
        } else {
            this.tableRowHeight = 35;
        }
    }
}
