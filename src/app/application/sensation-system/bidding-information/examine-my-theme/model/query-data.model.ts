export class QueryDataModel {
    /** 类型复选框 */
    /** 全选按钮 */
    allCheck: boolean = true;
    indeterminate: boolean = false;
    /** 其他类型的复选框按钮 */
    typeCheckOptions: any = [
        { label: '招标预告',  checked: true },
        { label: '招标公告',  checked: true },
        { label: '变更公告',  checked: true },
        { label: '中标公告',  checked: true }
    ];

    /** 日期单选按钮 */
    dateRadioValue: string = "A";
    dateRange: any;

    /**产业*/
    industryCheck: any;
    /**区域*/
    areaCheck: any;

    _startDate: any;
    _endDate: any;

    public setAllChecked() {
        this.indeterminate = false;
        if (this.allCheck) {
            this.typeCheckOptions.forEach(item => item.checked = true);
        } else {
            this.typeCheckOptions.forEach(item => item.checked = false);
        }
    }

    public setSingleChecked() {
        if (this.typeCheckOptions.every(item => item.checked === false)) {
            this.allCheck = false;
            this.indeterminate = false;
        } else if (this.typeCheckOptions.every(item => item.checked === true)) {
            this.allCheck = true;
            this.indeterminate = false;
        } else {
            this.indeterminate = true;
        }
    }

    public initData() {
        this.allCheck = false;
        this.typeCheckOptions.forEach(val => val.checked = false);
        this.indeterminate = false;
        this.dateRadioValue = "A";
        this.dateRange = null;
    }
}
