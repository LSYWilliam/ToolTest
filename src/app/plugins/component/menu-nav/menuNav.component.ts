import {Component, Input, OnInit} from '@angular/core';
import {MenuModel} from "../../../layouts/model/menu.model";

/**
 * 布局组件
 * @class MenuNavComponent
 */
@Component({
    selector: 'app-menu-nav',
    templateUrl: './menuNav.component.html',
    styleUrls: ['./menuNav.component.scss']
})

export class MenuNavComponent implements OnInit {
    @Input() public menuList: MenuModel;
    /**menu导航折叠展开的方式*/
    private isCollapsed: any;
    isOpenOne = true;
    isOpenTwo = false;
    isOpenThree = false;
    isOpenFour = false;
    isOpenFive = false;
    isOpenSix = false;
    isOpenSeven = false;


    isOpenEight = false;
    isOpenNine = false;
    isOpenTen = false;
    isOpenEleven = false;
    isOpenTwelve = false;
    isOpenThirteen = false;
    isOpenFourteen = false;
    isOpenFifteen = false;

    isOpenSixteen = false;
    isOpenSeventeen = false;
    isOpenEighteen = false;


    openChange(value) {

        if (value === 'one') {
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = false;
            this.isOpenSeven = false;

            this.isOpenEight = false;
            this.isOpenNine = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'two') {
            this.isOpenOne = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = false;
            this.isOpenSeven = false;

            this.isOpenEight = false;
            this.isOpenNine = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'three') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = false;
            this.isOpenSeven = false;

            this.isOpenEight = false;
            this.isOpenNine = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'four') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFive = false;
            this.isOpenSix = false;
            this.isOpenSeven = false;

            this.isOpenEight = false;
            this.isOpenNine = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'five') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenSix = false;
            this.isOpenSeven = false;

            this.isOpenEight = false;
            this.isOpenNine = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'six') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSeven = false;

            this.isOpenEight = false;
            this.isOpenNine = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'seven') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = false;

            this.isOpenEight = false;
            this.isOpenNine = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'eight') {
            this.isOpenOne = true;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = false;

            this.isOpenSeven = false;
            this.isOpenNine = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'nine') {
            this.isOpenOne = false;
            this.isOpenTwo = true;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = false;

            this.isOpenSeven = false;
            this.isOpenEight = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'ten') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = true;

            this.isOpenSeven = false;
            this.isOpenEight = false;

            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'eleven') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = true;

            this.isOpenSeven = false;
            this.isOpenEight = false;

            this.isOpenTen = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'twelve') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = true;

            this.isOpenSeven = false;
            this.isOpenEight = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'thirteen') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = false;

            this.isOpenSeven = true;
            this.isOpenEight = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'fourteen') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = false;

            this.isOpenSeven = true;
            this.isOpenEight = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFifteen = false;
            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'fifteen') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = false;
            this.isOpenSix = false;

            this.isOpenSeven = true;
            this.isOpenEight = false;

            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;

            this.isOpenSixteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'sixteen') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = true;
            this.isOpenFive = false;
            this.isOpenSix = false;
            this.isOpenSeven = false;

            this.isOpenEight = false;
            this.isOpenNine = false;
            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;

            this.isOpenSeventeen = false;
            this.isOpenEighteen = false;
        } else if (value === 'seventeen') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = true;
            this.isOpenSix = false;
            this.isOpenSeven = false;

            this.isOpenEight = false;
            this.isOpenNine = false;
            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;

            this.isOpenEighteen = false;
        } else if (value === 'eighteen') {
            this.isOpenOne = false;
            this.isOpenTwo = false;
            this.isOpenThree = false;
            this.isOpenFour = false;
            this.isOpenFive = true;
            this.isOpenSix = false;
            this.isOpenSeven = false;

            this.isOpenEight = false;
            this.isOpenNine = false;
            this.isOpenTen = false;
            this.isOpenEleven = false;
            this.isOpenTwelve = false;
            this.isOpenThirteen = false;
            this.isOpenFourteen = false;
            this.isOpenFifteen = false;

            this.isOpenSeventeen = false;
        }
    }

    /** 构造函数 */
    constructor() {
        this.isCollapsed = true;
    }

    ngOnInit() {
    }
}
