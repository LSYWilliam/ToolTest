export class TableLocaleModel {
    private _localText : any;


    get localText(): any {
        return {
            // for filter panel
            page: '页',
            more: '更多',
            to: '-',
            of: 'Of',
            next: '下一页',
            last: '最后一页',
            first: '第一页',
            previous: '上一页',
            loadingOoo: '加载中...',

            // for set filter
            selectAll: 'daSelect Allen',
            searchOoo: 'daSearch...',
            blanks: 'daBlanc',

            // for number filter and text filter
            filterOoo: '请输入关键字...',
            applyFilter: 'daApplyFilter...',

            // for number filter
            notEqual:'不等于',
            notContains:'不包含',
            equals: '等于',
            lessThan: '小于',
            greaterThan: '大于',

            // for text filter
            contains: '包含',
            startsWith: '从',
            endsWith: '到',

            // the header of the default group column
            group: '组',

            // tool panel
            columns: 'laColumns',
            rowGroupColumns: 'laPivot Cols',
            rowGroupColumnsEmptyMessage: 'la drag cols to group',
            valueColumns: 'laValue Cols',
            pivotMode: 'laPivot-Mode',
            groups: 'laGroups',
            values: 'laValues',
            pivots: 'laPivots',
            valueColumnsEmptyMessage: 'la drag cols to aggregate',
            pivotColumnsEmptyMessage: 'la drag here to pivot',
            toolPanelButton: 'la tool panel',

            // other
            noRowsToShow: '没有数据',

            // enterprise menu
            pinColumn: 'laPin Column',
            valueAggregation: 'laValue Agg',
            autosizeThiscolumn: 'laAutosize Diz',
            autosizeAllColumns: '自动调整大小',
            groupBy: 'laGroup by',
            ungroupBy: 'laUnGroup by',
            resetColumns: '复位列',
            expandAll: 'laOpen-em-up',
            collapseAll: 'laClose-em-up',
            toolPanel: 'laTool Panelo',
            export: '导出',
            csvExport: '以CSV格式导出',
            excelExport: '以Excel格式导出',

            // enterprise menu pinning
            pinLeft: 'laPin <<',
            pinRight: 'laPin >>',
            noPin: 'laDontPin <>',

            // enterprise menu aggregation and status panel
            sum: '求和',
            min: '最小值',
            max: '最大值',
            // first: '第一页',
            // last: '最后一页',
            none: 'laNone',
            count: 'laCount',
            average: 'laAverage',

            // standard menu
            copy: '复制',
            copyWithHeaders: 'laCopy Wit hHeaders',
            ctrlC: 'ctrl n C',
            paste: 'laPaste',
            ctrlV: 'ctrl n C',
        };
    }

    set localText(value: any) {
        this._localText = value;
    }
}
