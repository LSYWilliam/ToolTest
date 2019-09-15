import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from "./app.component";
import {By} from "@angular/platform-browser";
import {RouterLinkDirectiveStub} from "../testing";
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let routerLinks: RouterLinkDirectiveStub[];
    let linkDes: DebugElement[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent,
                RouterLinkDirectiveStub],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement
            .queryAll(By.directive(RouterLinkDirectiveStub));

        // get attached link directive instances
        // using each DebugElement's injector
        // routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    xit('can get RouterLinks from template', () => {
        expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
        expect(routerLinks[0].linkParams).toBe('/dashboard');
        expect(routerLinks[1].linkParams).toBe('/heroes');
        expect(routerLinks[2].linkParams).toBe('/about');
    });
});
