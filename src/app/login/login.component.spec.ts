import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {LoginComponent} from "./login.component";
import {LoginFormComponent} from "../plugins/component/login-from/login-form.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {HttpClientService} from "../shared/service/httpClient.service";
import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginElement: HTMLElement;
    let h1:        HTMLElement;
    let router: any;
    let http: any;

    beforeEach(async(() => {
        router = jasmine.createSpyObj('router', ['navigate']);
        const httpSpy = jasmine.createSpyObj('HttpClientService',['initModel']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                // LoginFormComponent
                // CommonModule,
                // NgZorroAntdModule.forRoot(),
            ],
            imports: [
                HttpClientTestingModule,
                // LoginFormComponent,
                CommonModule,
                NgZorroAntdModule.forRoot()
            ],
            providers:    [
                {provide: Router, useValue: routerSpy},
                {provide: HttpClientService, useValue: httpSpy}],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        loginElement = fixture.nativeElement;
        // h1 = fixture.nativeElement.querySelector('h1');
        fixture.detectChanges();
    });
    it("should be Defined", () => {
        expect(component).toBeDefined();
    });
    // xdescribe("#array",()=> {
    //     beforeEach(() => {
    //         fixture = TestBed.createComponent(LoginComponent);
    //         component = fixture.componentInstance;
    //         loginElement = fixture.nativeElement;
    //         fixture.detectChanges();
    //     });
    //     // it("should be Defined", () => {
    //     //     expect(h1.textContent).toContain(component.indexZ);
    //     // });
    //
    //     it('should be Defined', () => {
    //         expect(component.array).toBeDefined();
    //     });
    //     xit('should not be null', () => {
    //         expect(component.array).not.toBeNull();
    //     });
    //     it('should be object', () => {
    //         expect(typeof component.array).toBe("object");
    //     });
    // });
    describe("#array ",()=> {
        beforeEach(()=> {
            fixture.detectChanges();
        });
        it('should be Defined', () => {
            expect(component.array).toBeDefined();
        });
        it('should not be null', () => {
            expect(component.array).not.toBeNull();
        });
        it('should be Array', () => {
            expect(Array.isArray(component.array)).toBeTruthy();
        });
        it('should not be empty', () => {
            expect(component.array.length).toBeGreaterThan(0);
        });
    });
    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
