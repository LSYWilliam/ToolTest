import {
    Directive, ElementRef, Input, AfterViewInit,
    OnChanges, SimpleChanges
} from '@angular/core';

/**
 * 布局权限指令
 * @class LayoutDirective
*/
@Directive({
     selector: '[appSSid]'
})
export class SsidDirective implements AfterViewInit,OnChanges {

    /** 接收是否有权限 */
    @Input() ssidStatus: any;

    /**
      * 构造函数
      * @param elRef ElementRef
    */
    constructor(private elRef: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        let current = changes['ssidStatus'].currentValue;
        if (current != undefined) {
            this.setStyle();
        }
    }

    private setStyle() {
        if (this.ssidStatus == 'false') {
            this.elRef.nativeElement.style.background = '#f7f7f7';
            this.elRef.nativeElement.style.color = 'rgb(191, 191, 191)';
        } else {
            this.elRef.nativeElement.style.background = '#ffffff';
            this.elRef.nativeElement.style.color = '#666';
        }
    }

    /** 组件加载成功后执行 */
    ngAfterViewInit(): void {
        this.setStyle();
    }
}
