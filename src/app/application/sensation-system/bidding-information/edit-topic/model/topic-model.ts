import {s} from "@angular/core/src/render3";

export class TopicModel {
    topicName: string;
    webSiteInfo: Array<string> = [];
    matchWord: string;
    mismatchWord: string;
    industry: Array<string> = [];
    region: Array<string> = [];
    area: any;
    pushNotice: boolean = false;
    mailReceiver: Array<string> = [];
    regionObject: any = {};

    setValue(data: any) {
        this.topicName = data['teName'];
        // this.webSiteInfo = data['webSiteInfo'].split(",");
        if (data['webSiteInfo'] === "") {
            this.webSiteInfo = [];
        } else {
            this.webSiteInfo = data['webSiteInfo'].split(",");
        }

        this.matchWord = data['teMatchWord'];
        this.mismatchWord = data['teNoMatchWord'];
        this.industry = data['teCrawlerIndustry'].split(",");
        this.pushNotice = Number(data['teMailStatus']) === 0 ? false : true;
        // this.mailReceiver = data['teMailReceiver'].split(",");

        if (data['teMailReceiver'] === '') {
            this.mailReceiver = [];
        } else {
            this.mailReceiver = data['teMailReceiver'].split(",");
        }

        this.convert(data['teCrawlerRegion']);
    }

    toArray1(value) {
        let arr = value.split("]");
        let array = [];
        for (let item of arr) {
            array.push(item.substring(item.indexOf("[")+1,item.length));
        }
        let result = [];
        array.pop();
        for (let item of array) {
            result.push([item]);
        }
        return result;
    }


    private convert(value) {
        let name: string;
        if (value.length > 0) {
         let  value1 = this.toArray1(value.substring(1,value.length-1));
            value1.forEach(
                val => {
                    if (val.length === 2) {
                        name = val[0] + val[1];
                        this.region.push(name);
                        this.regionObject[name] = [val[0], val[1]];
                    } else {
                        this.region.push(val[0]);
                        this.regionObject[val[0]] = [ val[0] ];
                    }
                }
            )
        }
    }

    private convertRegion() {
        let data = [];
        for (let key in this.regionObject) {
            data.push(this.regionObject[key]);
        }
        let crawler = "";
        for(let i = 0 ; i <data.length;i++) {
            let cell = "[";
            cell = "["+ data[i].join(',') + "]";
            crawler = crawler+cell
            if(i<data.length-1)
                crawler = crawler+",";
        }
        if (crawler) {
           return "["+ crawler+"]";
        } else {
            return "";
        };
        // return data;
    }

    getCreateJson() {
        return {
            teName: this.topicName,
            teMatchWord: this.matchWord,
            teCrawlerIndustry: this.industry.toString(),
            // teCrawlerRegion: this.region.toString(),
            teCrawlerRegion: this.convertRegion(),
            webSiteInfo: this.webSiteInfo.toString(),
            teMailStatus: this.pushNotice? 1: 0,
            teMailReceiver: this.mailReceiver.toString(),
            teNoMatchWord: this.mismatchWord
        };
    }

    getEditJson(topicID: string) {
        return {
            teId: topicID,
            teName: this.topicName,
            teMatchWord: this.matchWord,
            teCrawlerIndustry: this.industry.toString(),
            // teCrawlerRegion: this.region.toString(),
            teCrawlerRegion: this.convertRegion(),
            webSiteInfo: this.webSiteInfo.toString(),
            teMailStatus: this.pushNotice? 1: 0,
            teMailReceiver: this.mailReceiver.toString(),
            teNoMatchWord: this.mismatchWord
        };
    }
}
