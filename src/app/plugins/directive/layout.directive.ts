import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

/**
 * 布局权限指令
 * @class LayoutDirective
*/
@Directive({
     selector: '[appLayout]'
})
export class LayoutDirective implements AfterViewInit {
    /** 接收是否有权限 */
    @Input() appLayout: boolean;

    /**
      * 构造函数
      * @param elRef ElementRef
    */
    constructor(private elRef: ElementRef) {}

    /** 组件加载成功后执行 */
    ngAfterViewInit(): void {
        if (this.appLayout === false) {
          this.elRef.nativeElement.remove();
        }
    }
}
