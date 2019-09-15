import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {RequestArgs} from '../../../../shared/model/request-args';
import {HeaderDataModel} from '../model/header-data.model';
import {WorkOrderManageService} from "../service/work-order-manage.service";
import {NzModalSubject} from "ng-zorro-antd";
import {ConfirmModalComponent} from "../../../../shared/component/confirm-modal/confirm-modal.component";

/**
 * 工单管理
 * @class WorkOrderManageComponent
 */
@Component
({
    selector: 'app-work-order-manage',
    templateUrl: './work-order-manage.component.html',
    styleUrls: ['./work-order-manage.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class WorkOrderManageComponent extends WorkOrderManageService implements OnInit, OnDestroy {

    /**表格每页大小*/
    public pageSize: any;
    /**表格索引值*/
    private pageIndex: any;
    /**操作类型 0 手动关闭 or 1 确认完成*/
    private operate: any;
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /**表格静态数据 实体类*/
    public headerDataModel: HeaderDataModel = new HeaderDataModel();
    /** 模态框名称 */
    public modalTitle: string;
    /** 工单状态列表 */
    public workOrderStatusData: any;
    /** 工单类别列表 */
    public workOrderTypeData: any;
    /** 工单状态默认值 */
    public inDefault: string;
    /** 工单类别默认值 */
    public inTypeDefault: string;
    /** 添加工单列表 确认完成 or 手动关闭 模态框 */
    private confirmModal$: NzModalSubject;

    /**排序类型  升序 or 降序*/
    private sortCondition: Array<any> = [];
    private createTime: any;
    private finishTime: any;

    /** 筛选工单状态ID */
    getWorkStatusId(value?: any) {
        this.filterWorkOrder.workOrderStatus = value;
    }
    /**筛选获取工单类别ID*/
    getWorkOrderTypeId(value?: any) {
        this.filterWorkOrder.workOrderType = value;
    }

    /** 查询筛选条件 */
    inquireWorkFliter() {
        this.getWorkOrderTableData(this.pageIndex, this.pageSize, this.sortCondition);
    }

    /** 清空筛选条件 */
    clearWorkFliter() {
        if (this.inDefault === '请选择工单状态 ') {
            this.inDefault = '请选择工单状态';
        } else {
            this.inDefault = '请选择工单状态 ';
        }

        if (this.inTypeDefault === '请选择工单类别 ') {
            this.inTypeDefault = '请选择工单类别';
        } else {
            this.inTypeDefault = '请选择工单类别 ';
        }

        this.filterWorkOrder.getClear();
        this.getWorkOrderTableData(this.pageIndex, this.pageSize, this.sortCondition);

    }

    /** 手动关闭 */
    endWorkOrder() {
        this.modalTitle = '手动关闭';
        this.operate = 0;
        this.child.selectedData();
    }
    /** 确认完成 */
    finishedWorkOrder() {
        this.modalTitle = '确认完成';
        this.operate = 1;
        this.child.selectedData();
    }

    /**用于监听子组件的全选*/
    /**选中某一行的数据*/
    // selectAllEvent(options) {
    //     const len = options.length;
    //     if (len <= 0) {
    //         this.message.warning('请选择一行进行编辑！');
    //     } else if ( len > 1) {
    //         this.message.warning('只能对单行进行编辑！');
    //     } else {
    //         if (this.operate == 0) {
    //             options[0].workOrderStatus === 0 ? this.showModalForConfirm('确认要手动关闭这些数据？', options[0])
    //                 :  this.message.warning('只能在未开始状态下才能手动关闭！');
    //         }else if (this.operate == 1) {
    //             options[0].workOrderStatus === 2 ? this.showModalForConfirm('确认这些数据完成？', options[0])
    //                 : this.message.warning('只能在已提交状态下才能确认完成！');
    //         }
    //     }
    // }

    selectAllEvent(options) {
        const len = options.length;
        if (len <= 0) {
            this.message.warning('请选择一行进行编辑！');
        } else {
            if (this.operate == 0) { /**手动关闭*/
                const closeData = options.filter( item => item.workOrderStatus !== 0);
                let closeArr = [];
                if (!closeData.length) {
                    options.forEach( item => closeArr.push(item.workOrderId));
                    this.showModalForConfirm('确认要手动关闭这些数据？', closeArr);
                } else {
                    this.message.warning('只能在未开始状态下才能手动关闭！');
                }
                // options[0].workOrderStatus === 0 ? this.showModalForConfirm('确认要手动关闭这些数据？', options[0])
                //     :  this.message.warning('只能在未开始状态下才能手动关闭！');

            }else if (this.operate == 1) { /**确认完成*/
                const finishedData = options.filter( item => item.workOrderStatus !== 2);
                let finishedArr = [];
                if (!finishedData.length) {
                    options.forEach( item => finishedArr.push(item.workOrderId));
                    this.showModalForConfirm('确认这些数据完成？', finishedArr);
                } else {
                    this.message.warning('只能在已提交状态下才能确认完成！');
                }
                // options[0].workOrderStatus === 2 ? this.showModalForConfirm('确认这些数据完成？', options[0])
                //     : this.message.warning('只能在已提交状态下才能确认完成！');
            }
        }
    }

    /**显示删除模态框*/
    showModalForConfirm(message: string, data) {
        const modalConfig = {
            content        : ConfirmModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: message
            }
        };

        this.confirmModal$ = this.modal.open(modalConfig);
        this.confirmModal$.subscribe(result => {
             if ( result === 'onOk') {
                 if (this.operate == 0) {
                     this.endWorkOrderData(data).subscribe(res => {
                         if (res.code === 0) {
                             this.getWorkOrderTableData(this.pageIndex, this.pageSize, this.sortCondition);
                         } else {
                             this.message.error(res.msg);
                         }
                     });
                 } else if (this.operate == 1) {
                     this.finishedWorkOrderData(data).subscribe(res => {
                         if (res.code === 0) {
                             this.getWorkOrderTableData(this.pageIndex, this.pageSize, this.sortCondition);
                         } else {
                             this.message.error(res.msg);
                         }
                     });
                 }
             }
        })
    }

    /**表格索引值大小改变的事件*/
    pageIndexEvent(value) {
        this.pageIndex = --value;
        this.getWorkOrderTableData(this.pageIndex, this.pageSize, this.sortCondition);
    }

    /**排序事件*/
    sortEvent(value) {
        let str;
        switch(value[0]) {
            case 'descend':
                str = 'desc';
                break;
            case 'ascend':
                str = 'asc';
                break;
        }
        switch(value[1]) {
            case 'createTime':
                this.createTime = str ? str+ ","+ value[1] : undefined;
                break;
            case 'finishTime':
                this.finishTime = str ? str+ ","+ value[1] : undefined;
                break;
        }
        this.sortCondition = [this.createTime, this.finishTime];

        const arr = this.sortCondition.filter( item =>  item !== undefined);
        this.sortCondition = arr.length ? this.sortCondition : null;
        this.getWorkOrderTableData(this.pageIndex, this.pageSize, this.sortCondition);
    }

    /** 默认显示表格数据 */
    getData() {
        this.pageIndex = 0;
        this.pageSize = 10;
        this.sortCondition = null;
        this.getWorkOrderTableData(this.pageIndex, this.pageSize, this.sortCondition);
    }

    /**
     * 销毁组件或指令
     * */
    ngOnDestroy(): void {
        if (this.confirmModal$ !== undefined) {
            this.confirmModal$.destroy();
        }
    }

    /**
     * 方法初始化
     * @description
     *      1、设置http请求头部
     *      2、设置获取工单列表
     * */
    ngOnInit() {

        this.inDefault = '请选择工单状态';
        this.inTypeDefault = '请选择工单类别';

        this.workOrderStatusData = [
            {
                'id': 0,
                'name': '未开始'
            },
            {
                'id': 1,
                'name': '进行中'
            },
            {
                'id': 2,
                'name': '已提交'
            },
            {
                'id': 3,
                'name': '已完成'
            },
            {
                'id': 4,
                'name': '已关闭'
            },
        ];
        this.workOrderTypeData = [
            {
                'id': 1,
                'name': '新增'
            },
            {
                'id': 2,
                'name': '变更'
            },
            {
                'id':3,
                'name': '运营'
            },
            {
                'id':4,
                'name': '下线'
            }
        ];
        this.windowHeight = window.innerHeight-300;
        this.getData();
    }
}
