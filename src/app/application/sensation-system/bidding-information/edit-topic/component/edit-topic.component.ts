import {Component, OnInit, ViewChild} from '@angular/core';
import {EditTopicService} from "../service/edit-topic.service";
import {routerTransition} from "../../../../../animations/route-animations";
import {TopicModel} from "../model/topic-model";
import {ReceiveModel} from "../../../../../shared/model/receive.model";


@Component({
    selector: 'app-edit-topic',
    templateUrl: './edit-topic.component.html',
    styleUrls: ['./edit-topic.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class EditTopicComponent extends EditTopicService implements OnInit {
    public topicData: TopicModel = new TopicModel();
    /**产业列表*/
    public industryList: any;
    /**区域数据*/
    private selectAreaData: any;
    /** A 近一个月时间 B 自定义时间*/
    public radioValue: string = 'A';

    @ViewChild('topicTarget') private topicDom: any;
    @ViewChild('matchTarget') private matchDom: any;
    @ViewChild('misMatchTarget') private misMatchDom: any;
    /**初始化页面数据*/
    ngOnInit() {
        this.getIndustry()
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let obj = [];
                        res.result.forEach(val => obj.push({value: val['industryName'], label: val['industryName']}));
                        this.industryList = obj;

                        if (this.industryList) {
                            if (this.flag === "编辑") {
                                this.getTopicData(this.topicID)
                                    .subscribe(
                                        res => {
                                            if (res.code === 0) {
                                                this.topicData.setValue(res.result);
                                            }
                                        }
                                    );
                            }
                        }
                    }
                }
            );
    }
    /**页面回退按钮*/
    goBackShow() {
        this.router.navigateByUrl(this.url);
    }
    /**验证主题名称输入框是否输入正确*/
    themeValidate(event) {
        const regContact = /^[a-zA-Z\u4e00-\u9fa5]{2,30}$/;
        if (regContact.test(this.topicData.topicName)) {
            event.target.style.border = '1px solid #d9d9d9';
            this.isSuccess = false;
        } else {
            event.target.style.border = '1px solid red';
            this.isSuccess = true;
        }
    }
    /**点击保存主题 按钮*/
    saveTopic() {
        if (this.topicData.topicName === undefined) {
            this.isSuccess = true;
            this.topicDom.nativeElement.style.border = '1px solid red';
            this.message.error('主题名称必填!');
        }

        if (this.topicData.matchWord === undefined) {
            this.matchWordBool = true;
            this.matchDom.nativeElement.style.border = '1px solid red';
            this.message.error('匹配词必填!');
        }

        if (!this.isSuccess && !this.matchWordBool && ( this.topicData.mismatchWord && !this.removeWordBool )) {
            if (this.topicData.topicName !== undefined && this.topicData.topicName !== null) {
                if (this.topicData.webSiteInfo.length > 0) {
                    if (this.flag === "编辑") {
                        this.editTopic(this.topicData.getEditJson(this.topicID))
                            .subscribe(res => this.checkResult(res));
                    } else {
                        this.createTopic(this.topicData)
                            .subscribe(res => this.checkResult(res));
                    }
                }
                // else {
                //     this.message.warning("采集地址不能为空！");
                // }
            }
            // else {
            //     this.message.warning("主题名称不能为空！");
            // }
        }

    }
    /**设置网站 和 邮箱的默认值*/
    setTagValue(data: any, type: string) {
        if (type === "webSiteInfo") {
            this.topicData.webSiteInfo = data[0];
        } else {
            this.topicData.mailReceiver = data[0];
        }
    }
    /**选择区域*/
    selectArea(data: any) {
        this.selectAreaData = data;
    }
    /**点击添加区域按钮 事件*/
    addArea() {
        if (this.selectAreaData != undefined) {
            let value: string;

            if (this.selectAreaData[1].regionName === '不限') {
                value = this.selectAreaData[0].regionName;
                if (this.topicData.region.indexOf(value) < 0) {
                    this.topicData.region.push(value);
                    this.topicData.regionObject[value] = [value];
                }
            } else {
                value = this.selectAreaData[0].regionName + this.selectAreaData[1].regionName;
                if (this.topicData.region.indexOf(value) < 0) {
                    this.topicData.region.push(value);
                    this.topicData.regionObject[value] = [this.selectAreaData[0].regionName, this.selectAreaData[1].regionName];
                }
            }
        } else {
            this.message.warning("请选择区域!");
        }
    }
    /**关闭区域*/
    closeArea(value: string) {
        this.topicData.region.splice(this.topicData.region.indexOf(value), 1);
        delete this.topicData.regionObject[value];
    }
    /**判断保存数据是否成功*/
    private checkResult(res: ReceiveModel) {
        if (res.code === 0) {
            this.message.info("主题" + this.flag + "成功！");
            this.goBackShow();
        } else {
            this.message.error("主题" + this.flag + "失败!");
            this.message.error(res.msg);
        }
    }
    /**判断匹配词和关键字是否有重复*/
    checkArr(arr1, arr2) {
        let rs = false;
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr1[i] === arr2[j]) {
                    rs = true;
                    break;
                }
            }
        }
        return rs;
    }

    /**匹配词和排除词不能相同 校验*/
    onBlur() {
        let matchWord = this.topicData.matchWord;
        let misMatchWord = this.topicData.mismatchWord;
        if (matchWord && misMatchWord) {
            let matchWordArray = matchWord.split(",");
            let misMatchWordArray = misMatchWord.split(",");
            if (this.checkArr(matchWordArray, misMatchWordArray)) {
                this.matchDom.nativeElement.style.border = '1px solid red';
                this.misMatchDom.nativeElement.style.border = '1px solid red';
                this.message.error("排除词和匹配词不能相同");
            } else {
                this.matchDom.nativeElement.style.border = '1px solid #d9d9d9';
                this.misMatchDom.nativeElement.style.border = '1px solid #d9d9d9';
            }
        }
    }

    /**匹配词和排除词校验
     *      bool  true的时候为匹配词  false的时候为排除词
     * */
    wordValidate(bool,event) {
        const regContact = /^[a-zA-Z\u4e00-\u9fa5]+$/;
        if (bool) {
            let matchWord = this.topicData.matchWord.split(',');
            if (!matchWord[matchWord.length-1]) {
                matchWord.pop();
            }
            if (matchWord.length > 0 && matchWord.length < 6) {
                for (let item of matchWord) {
                    if (regContact.test(item)) {
                        event.target.style.border = '1px solid #d9d9d9';
                        this.matchWordBool = false;
                    } else {
                        event.target.style.border = '1px solid red';
                        this.matchWordBool = true;
                    }
                }
            } else {
                this.matchWordBool = true;
            }
        } else {
            let misMatchWord = this.topicData.mismatchWord.split(',');
            if (!misMatchWord[misMatchWord.length-1]) {
                misMatchWord.pop();
            }
            if (misMatchWord.length > 0 && misMatchWord.length < 6) {
                for (let item of misMatchWord) {
                    if (regContact.test(item)) {
                        event.target.style.border = '1px solid #d9d9d9';
                        this.removeWordBool = false;
                    } else {
                        event.target.style.border = '1px solid red';
                        this.removeWordBool = true;
                    }
                }
            } else {
                this.removeWordBool = true;
            }
        }

    }
}
