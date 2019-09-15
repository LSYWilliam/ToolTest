export class QueryDataModel {
    /** 类型复选框 */
    /** 全选按钮 */
    allCheck: boolean = true;
    indeterminate: boolean = false;
    /** 其他类型的复选框按钮 */
    typeCheckOptions: any = [
        { label: '通知',  checked: true },
        { label: '公告',  checked: true },
        { label: '政策法规',  checked: true },
        { label: '规划计划',  checked: true }
    ];

    /** 日期单选按钮 */
    dateRadioValue: string = "A";
    dateRange: any;

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
