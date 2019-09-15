import {
    Component, EventEmitter, Input, OnChanges, Output,
    SimpleChanges
} from '@angular/core';
import {GlobalRadioFreqModel} from "./model/global-radio-freq.model";

import {AllRadioFreqModel} from "../../model/all-radio-freq.model";

/**
 * 当日概况模块
 * @class OverviewComponent
*/
@Component
({
    selector: 'app-overall-radio-conf',
    templateUrl: './radio-frequency.component.html',
    styleUrls: ['./radio-frequency.component.scss'],
})

export class RadioFrequencyComponent implements OnChanges  {

    @Input() public inData: AllRadioFreqModel;
    /**输出射频管理页面 2.4GHz和5GHz的数据*/
    @Output() public outData: EventEmitter<any> = new EventEmitter<any>();

    public globalRadioFreq : GlobalRadioFreqModel = new GlobalRadioFreqModel();
    private pageValue : any;

    constructor() {
        this.pageValue = {"channel2": "", "power2": "", "channelWidth2":"",
            "channel5": "", "power5": "", "channelWidth5":"", "roamingInduction": "",
            "channel2Enable":"", "channel5Enable":"","id":null};
    }

    ngOnChanges(changes: SimpleChanges): void {
        let current = changes['inData'].currentValue;
        this.globalRadioFreq.setAllValue(current);
        this.pageValue = {
                "channel2": current.config2gChannelID,
                "power2": current.config2gPowerDbmID,
                "channelWidth2": current.config2g11nChannelWidthID,
                "channel5": current.config5gChannelID,
                "power5": current.config5gPowerDbmID,
                "channelWidth5": current.config5g11nChannelWidthID,
                "roamingInduction": current.roamingInduction,
                "channel2Enable": current.config2gStateID,
                "channel5Enable": current.config5gStateID,
                "id": current.id
        };
        this.outData.emit(this.pageValue);
    }

    // getDropDown(id,flag) {
    //     this.pageValue[flag] = id;
    //     this.outData.emit(this.pageValue);
    // }

    wireless2Enable(data,flag) {
        this.pageValue[flag] = data? 1: 0;
        this.outData.emit(this.pageValue);
    }
}
