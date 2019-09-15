import {trigger, state, animate, style, transition} from '@angular/animations';

export function routerTransition() {
    return slideToLeft();
}

export function slideToLeft() {
    return trigger('routerTransition', [
        state('void', style({width:'100%'}) ),
        state('*', style({ width:'100%'}) ),
        transition(':enter', [
            style({transform: 'translateX(100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
        ])
    ]);
}
