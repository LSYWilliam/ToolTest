import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';

/**
  * 没有权限组件
  * @class NoAuthErrorComponent
*/
@Component({
  templateUrl: './noAuth-error.component.html',
  styleUrls: ['./noAuth-error.component.scss']
})

export class NoAuthErrorComponent {
    /** 定时器秒数 */
    public time: number;

    /** 构造函数 */
    constructor(private route: Router) {
        const stream$ = new Observable<number>(
            observer => {
                let count = 5;
                const interval = setInterval(
                    () => {
                        observer.next(count--);
                    }, 1000);
                    return () => {
                        clearInterval(interval);
                    };
            }
        );

        const subscribe$ = stream$.subscribe(
              value => {
                  this.time = value;
                  if (value === 0) {
                      this.route.navigateByUrl('/login');
                      subscribe$.unsubscribe();
                  }
              }
        );
    }
}



