import {
    Directive, ElementRef, Input, AfterViewInit,
    OnChanges, SimpleChanges
} from '@angular/core';

/**
 * 布局权限指令
 * @class LayoutDirective
*/
@Directive({
     selector: '[appLink]'
})
export class LinkDirective implements AfterViewInit,OnChanges {

    /** 接收是否有权限 */
    @Input() linkStatus: any;

    /**
      * 构造函数
      * @param elRef ElementRef
    */
    constructor(private elRef: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        let current = changes['linkStatus'].currentValue;
        if (current != undefined) {
            this.setStyle();
        }
    }

    private setStyle() {
        if (this.linkStatus == 'false') {
            this.elRef.nativeElement.style.pointerEvents = 'none';
            this.elRef.nativeElement.style.color = 'rgb(191, 191, 191)'
        } else {
            this.elRef.nativeElement.style.pointerEvents = 'auto';
            this.elRef.nativeElement.style.color = 'rgb(16,142,233)'
        }
    }

    /** 组件加载成功后执行 */
    ngAfterViewInit(): void {
        this.setStyle();
    }
}
