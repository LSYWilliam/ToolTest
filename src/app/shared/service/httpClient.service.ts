import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {RequestArgs} from "../model/request-args";
import {InitModel} from "../model/init.model";
import {Observable} from "rxjs/Observable";
import {ReceiveModel} from "../model/receive.model";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError} from "rxjs/operators";
import {AppConfig} from "../../app.config";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

@Injectable()
export class HttpClientService {

    private initModel: InitModel = new InitModel();

    /**constructor构造函数
     *      1.设置不同平台的访问地址
     * */
    constructor(private http: HttpClient, private config: AppConfig, private router: Router, public message: NzMessageService) {
        if (this.config.getAll() === null) {
            this.router.navigateByUrl("/systemError");
        } else {
            this.initModel.wlanscopeIP = this.config.getEnv("wLanScope");
            this.initModel.wlanscopeIP2 = this.config.getEnv("wLanScope2");
            this.initModel.systemIP = this.config.getEnv("system");
            this.initModel.attendanceIP = this.config.getEnv("attendance");
            this.initModel.sensationIP = this.config.getEnv("sensation");
            this.initModel.testIP = "";
        }
    }

    /**
     * 根据不同平台获取不同的请求的url地址
     * */
    public getUrl(requestArgs: RequestArgs): string {
        let url: string;
        switch (requestArgs.systemName) {
            case "system":
                url = this.initModel.systemIP + requestArgs.url;
                break;
            case "wlanscope":
                url = this.initModel.wlanscopeIP + requestArgs.url;
                break;
            case "wlanscope2":
                url = this.initModel.wlanscopeIP2 + requestArgs.url;
                break;
            case "attendance":
                url = this.initModel.attendanceIP + requestArgs.url;
                break;
            case "sensation":
                url = this.initModel.sensationIP + requestArgs.url;
                break;
            default:
                url = requestArgs.url;
        }
        return url;
    }

    public httpPatch(requestArgs: RequestArgs): Observable<ReceiveModel> {
        return this.http.patch<ReceiveModel>(this.getUrl(requestArgs),
            requestArgs.body,
            {headers: requestArgs.getHeaders()});
    }
    public httpPatch1(requestArgs: RequestArgs): Observable<ReceiveModel> {
        return this.http.patch<ReceiveModel>(this.getUrl(requestArgs),
            requestArgs.body,
            {headers: requestArgs.getXwfuHeaders()});
    }
    /**
     * get请求
     * */
    public httpGet(requestArgs: RequestArgs): Observable<ReceiveModel> {
        return this.http.get<ReceiveModel>(this.getUrl(requestArgs),
            {headers: requestArgs.getHeaders(), params: requestArgs.body}).filter(res => {
            if (res && res.code !== 1103) {
                return true;
            } else {
                this.message.error( res.msg );
                this.router.navigateByUrl('/login');
                return false;
            }
        });
    }

    /**
     * 用于模板下载的get请求
     * */
    public httpGet2(requestArgs: RequestArgs): Observable<ReceiveModel> {
        return this.http.get<ReceiveModel>(
            this.getUrl(requestArgs),
            {
                headers: requestArgs.getHeaders(),
                responseType: requestArgs.response(),
                params: requestArgs.body
            });
    }

    public httpPut(requestArgs: RequestArgs): Observable<ReceiveModel> {
        return this.http.put<ReceiveModel>(this.getUrl(requestArgs),
            requestArgs.body,
            {headers: requestArgs.getHeaders()});
    }

    public httpDelete(requestArgs: RequestArgs): Observable<ReceiveModel> {
        return this.http.request<ReceiveModel>('delete', this.getUrl(requestArgs),
            {headers: requestArgs.getHeaders(), body: requestArgs.body});
    }

    /**
     * post请求
     * */
    public httpPost(requestArgs: RequestArgs): Observable<ReceiveModel> {
        const httpOptions = {
            headers: requestArgs.getHeaders()
        };

        return this.http.post<ReceiveModel>(this.getUrl(requestArgs), requestArgs.body, httpOptions)
            .pipe(
                catchError(this.handleError)
            ).filter(res => {
                if (res && res.code !== 1103) {
                    return true;
                } else {
                    this.message.error( res.msg );
                    this.router.navigateByUrl('/login');
                    return false;
                }
            });
    }

    /**
     * 用于导入文件的post请求
     * */
    public httpPost2(requestArgs: RequestArgs): Observable<ReceiveModel> {
        const httpOptions = {
            headers: requestArgs.getHeaders2()
        };
        return this.http.post<ReceiveModel>(this.getUrl(requestArgs), requestArgs.body, httpOptions)
            .pipe(
                catchError(this.handleError)
            ).filter(res => {
                if (res && res.code !== 1103) {
                    return true;
                } else {
                    this.message.error( res.msg );
                    this.router.navigateByUrl('/login');
                    return false;
                }
            });
    }

    // application/x-www-form-urlencoded
    public httpPost4(requestArgs: RequestArgs): Observable<ReceiveModel> {
        const httpOptions = {
            headers: requestArgs.getXwfuHeaders()
        };
        return this.http.post<ReceiveModel>(this.getUrl(requestArgs), requestArgs.body, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * 用于模板下载的post请求
     * */
    public httpPost3(requestArgs: RequestArgs): Observable<ReceiveModel> {
        let httpOptions = {
            headers: requestArgs.getHeaders(),
            responseType: requestArgs.response()
        };

        return this.http.post<ReceiveModel>(this.getUrl(requestArgs), requestArgs.body, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * 处理请求出错的情况
     * */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    };
}
