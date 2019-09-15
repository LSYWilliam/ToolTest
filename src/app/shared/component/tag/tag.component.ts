import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";

/**
 * 删除模态框模块
 * @class TagComponent
 */
@Component
({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
})

export class TagComponent implements OnChanges,OnInit  {

    /**网站标签*/
    public tags = [];
    /**input 输入框是否可见*/
    public inputVisible = false;
    /**input框的值*/
    public inputValue = '';
    /**获取tag标签 title*/
    @Input() private type: boolean;
    @Input() private title: string;
    @Input() private defaultValue: any;
    @Input() private maxLength: number;
    /**获取input框的元素*/
    @ViewChild('inputElement') inputElement: ElementRef;
    @Output() public tagValue: EventEmitter<any> = new EventEmitter<any>();
    constructor(public message: NzMessageService) {

    }

    /**网站搜索*/
    handleClose(removedTag: {}): void {
        this.tags = this.tags.filter(tag => tag !== removedTag);
        this.type ?  this.tagValue.emit([this.tags,true]) : this.tagValue.emit([this.tags,false]);
    }
    /**显示tag标签的名称*/
    sliceTagName(tag: string): string {
        const isLongTag = tag.length > 20;
        return isLongTag ? `${tag.slice(0, 20)}...` : tag;
    }
    /**点击新增的tag标签的事件*/
    showInput(): void {
        if (this.maxLength) {
            if (this.tags.length >= this.maxLength) {
                this.inputVisible = false;
                this.message.error('最多只能添加'+ this.maxLength + '项!');
            } else {
                this.inputVisible = true;
                setTimeout(() => {
                    this.inputElement.nativeElement.focus();
                }, 10);
            }
        } else {
            this.inputVisible = true;
            setTimeout(() => {
                this.inputElement.nativeElement.focus();
            }, 10);
        }
    }

    /**网站校验*/
    validateWebSite() {
        const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        if (!reg.test(this.inputValue)) {
            this.message.error("网址格式不正确");
            return false;
        } else {
            return true;
        }
    }
    /**邮箱校验*/
    validateEmail() {
        const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (!EMAIL_REGEXP.test(this.inputValue)) {
            this.message.error("邮箱不正确");
            return false;
        } else {
            return true;
        }
    }
    /**输入内容之后 回车 or 失去焦点*/
    handleInputConfirm(): void {
        if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
            switch (this.type) {
                case true:
                    if (this.validateWebSite()) {
                        this.tags.push(this.inputValue);
                    }
                    break;
                case false:
                    if (this.validateEmail()) {
                        this.tags.push(this.inputValue);
                    }
                    break;
                default:
                    break;
            }

        } else if ((this.inputValue && this.tags.indexOf(this.inputValue) !== -1)) {
            this.message.error('网站名称不能相同!');
        }
        this.inputValue = '';
        this.inputVisible = false;
        this.type ?  this.tagValue.emit([this.tags,true]) : this.tagValue.emit([this.tags,false]);
    }
    ngOnChanges() {
        if (this.defaultValue) {
            this.tags = this.defaultValue;
        }
    }
    ngOnInit() {}
}
