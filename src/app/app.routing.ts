import { NgModule } from '@angular/core';
import {Routes, RouterModule, NoPreloading} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layouts/layout.component';
import {NoLoginErrorComponent} from "./plugins/component/error/noLogin-error/noLogin-error.component";
import {NotFoundErrorComponent} from "./plugins/component/error/notFound-error/notFound-error.component";
import {MenuResolverService} from "./shared/service/menu-resolver.service";
import {AuthGuardService} from "./shared/service/authGuard.service";
import {SystemErrorComponent} from "./plugins/component/error/system-error/system-error.component";
import {WorkOrderInfoModule} from "./business/conf/work-order-info/work-order-info.module";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component : LoginComponent,
    },
    {
        path: '',
        component: LayoutComponent,
        resolve: { menu: MenuResolverService },
        children:
            [
                {
                    /** 全网 / 监控器 / 概览 (刘洋)*/
                    path: 'overview',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './whole-network/overview/overview.module#OverviewModule'
                },
                {
                    /** 全网 / 监控器 / 网络概览 (雷旭)*/
                    path: 'network-overview',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './whole-network/network-overview/network-overview.module#NetworkOverviewModule'
                },
                {
                    /** 全网 / 监控器 / 网络详情 (雷旭)*/
                    path: 'network-details/:id/:name/:url',
                    loadChildren: './whole-network/network-details/network-details.module#NetworkDetailsModule'
                },
                {
                    /** 无线 / 监控器 / AP清单 (刘洋)*/
                    path: 'ap-list',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './wireless/monitor/ap-list/ap-list.module#ApListModule'
                },
                {
                    /** 无线 / 监控器 / AP详情 (雷旭-2)*/
                    path: 'ap-details/:id/:url/:apSn',
                    loadChildren: './wireless/monitor/ap-details/ap-details.module#ApDetailsModule'
                },
                {
                    /** 无线 / 配置 / SSID （吴双）*/
                    path: 'ssid-details',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './wireless/conf/ssid-details/ssid-details.module#SsidDetailsModule'
                },
                {
                    /** 无线 / 配置 / SSID （吴双）*/
                    path: 'ssid-details/:netId',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './wireless/conf/ssid-details/ssid-details.module#SsidDetailsModule'
                },
                {
                    /** 无线 / 配置 / SSID （吴双）*/
                    path: 'ssid-details-copy/:netId',
                    loadChildren: './wireless/conf/ssid-details-copy/ssid-details-copy.module#SsidDetailsCopyModule'
                },
                {
                    /** 无线 / 配置 / SSID配置 （吴双）*/
                    path: 'ssid-conf/:ssid/:netId',
                    loadChildren: './wireless/conf/ssid-conf/ssid-conf.module#SsidConfModule'
                },
                {
                    /** 无线 / 配置 / SSID配置 （吴双）*/
                    path: 'ssid-conf-copy/:ssid/:netId',
                    loadChildren: './wireless/conf/ssid-conf-copy/ssid-conf-copy.module#SsidConfCopyModule'
                },
                {
                    /** 无线 / 配置 / 黑白名单（吴双） */
                    path: 'black-white-list/:id/:name/:type',
                    loadChildren: './wireless/conf/black-white-list/black-white-list.module#BlackWhiteListModule'
                },
                {
                    /** 无线 / 配置 / 警报接收管理  NONE */
                    path: 'alert-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './wireless/conf/alert-management/alert-management.module#AlertManagementModule'
                },
                {
                    /** 无线 / 配置 / 警报接收列表 NONE */
                    path: 'alert-receiver-list',
                    loadChildren: './wireless/conf/alert-receiver-list/alert-receiver-list.module#AlertReceiverListModule'
                },
                {
                    /** 无线 / 配置 / 警报接收人配置 NONE */
                    path: 'alert-receiver-conf',
                    loadChildren: './wireless/conf/alert-receiver-conf/alert-receiver-conf.module#AlertReceiverConfModule'
                },
                {
                    /** 无线 / 配置 / 射频管理 (刘洋)*/
                    path: 'radio-frequency-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './wireless/conf/radio-frequency-management/radio-frequency-management.module#RadioFrequencyManagementModule'
                },
                {
                    /** 无线 / 配置 / 探针管理 (刘洋)*/
                    path: 'probe-conf',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './wireless/conf/probe-conf/probe-conf.module#ProbeConfModule'
                },
                {
                    /** 无线 / 配置 / 日志管理*/
                    path: 'log-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './wireless/conf/log-management/log-management.module#LogManagementModule'
                },
                {
                    /** 应用市场*/
                    path: 'application-store',
                    // canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/application-store/application-store.module#ApplicationStoreModule'
                },
                {
                    /** 商户 / 监视器 / 在线客户端管理 (李书悦-1)*/
                    path: 'online-client-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/monitor/online-client-management/online-client-management.module#OnlineClientManagementModule'
                },
                {
                    /** 商户 / 监视器 / 在线客户端管理 (李书悦-1)*/
                    path: 'online-client-detail/:type/:id/:url',
                    loadChildren: './business/monitor/online-client-management/online-client-management.module#OnlineClientManagementModule'
                },
                {
                    /** 商户 / 配置 / 商户管理 / 商户列表 (李书悦-1)*/
                    path: 'business-list',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/businessManager/business-list/business-list.module#BusinessListModule'
                },
                {
                    /** 商户 / 配置 / 商户管理 / 商户网络列表 (吴双)*/
                    path: 'business-network-list',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/businessManager/business-network-list/business-network-list.module#BusinessNetworkListModule'
                },
                {
                    /** 商户 / 配置 / 商户管理 / 用户列表 (李书悦-2)*/
                    path: 'user-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/businessManager/user-management/user-management.module#UserManagementModule'
                },
                {
                    /** 商户 / 配置 / 商户管理 / 权限管理 (李书悦-3)*/
                    path: 'role-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/businessManager/role-management/role-management.module#RoleManagementModule'
                },
                {
                    /** 商户 / 配置 / 商户管理 / 设备管理 (李书悦-4)*/
                    path: 'device-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/businessManager/device-management/device-management.module#DeviceManagementModule'
                },
                {
                    /** 商户 / 配置 / 固件管理(平台) */
                    path: 'firmware-management-platform',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/firmware-management-platform/firmware-management-platform.module#FirmwareManagementPlatformModule'
                },
                {
                    /** 商户 / 配置 / 固件管理 (雷旭-3)*/
                    path: 'firmware-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/firmware-management/firmware-management.module#FirmwareManagementModule'
                },
                {
                    /** 商户 / 配置 / 商户信息 (刘洋)*/
                    path: 'business-information',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/business-information/business-information.module#BusinessInformationModule'
                },
                {
                    /** 商户 / 配置 / 网络管理 (吴双-1)*/
                    path: 'network-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/network-management/network-management.module#NetworkManagementModule'
                },
                {
                    // /** 商户 / 配置 / 设备资产管理 */
                    /** 商户 / 配置 / 设备管理 */
                    path: 'plant-asset-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/plant-asset-management/plant-asset-management.module#PlantAssetManagementModule'
                },
                {
                    /** 商户 / 配置 / 设备资产管理 */
                    path: 'equipment-asset-management',
                    // canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/equipment-asset-management/equipment-asset-management.module#EquipmentAssetManagementModule'
                },
                {
                    /** 商户 / 配置 / 认证用户列表 */
                    path: 'authenticate-user-list',
                    // canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/authenticate-user-list/authenticate-user-list.module#AuthenticateUserListModule'
                },
                {
                    /** 商户 / 配置 / AP注册管理 / 适配器管理 */
                    path: 'adapter-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/ap-register-management/adapter-management/adapter-management.module#AdapterManagementModule'
                },
                {
                    /** 商户 / 配置 / AP注册管理 / AP注册 */
                    path: 'ap-register',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/ap-register-management/ap-register/ap-register.module#ApRegisterModule'
                },
                {
                    /** 商户 / 配置 / AP资源注册管理 / AP资源监控 */
                    path: 'ap-resource-monitor',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/ap-register-management/ap-resource-monitor/ap-resource-monitor.module#ApResourceMonitorModule'
                },
                {
                    /** 商户 / 配置 / 适配器组管理 / 适配器组管理 */
                    path: 'adapter-group-management',
                    // canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/adapter-group-management/adapter-group-management/adapter-group-management.module#AdapterGroupManagementModule'
                },
                {
                    /** 商户 / 配置 / 适配器组管理 / 适配器组注册 */
                    path: 'adapter-group-register',
                    // canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/adapter-group-management/adapter-group-register/adapter-group-register.module#AdapterGroupRegisterModule'
                },
                {
                    /** 商户 / 配置 / 认证计费 (雷旭-4)*/
                    path: 'authentication',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/authentication/authentication.module#AuthenticationModule'
                },
                {
                    /** 应用 / 考勤系统 / 考勤设置 / 考勤组管理 (李书悦)*/
                    path: 'attnd-group-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/attendance-setting/attnd-group-management/attnd-group-management.module#AttndGroupManagementModule'
                },
                {
                    /** 应用 / 考勤系统 / 考勤设置 / 班次管理 (李书悦)*/
                    path: 'work-shift-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/attendance-setting/work-shift-management/work-shift-management.module#WorkShiftManagementModule'
                },
                {
                    /** 应用 / 考勤系统 / 网络管理 / 终端信息 (李书悦)*/
                    path: 'terminal-information',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/network-management/terminal-information/terminal-information.module#TerminalInformationModule'
                },
                {
                    /** 应用 / 考勤系统 / 员工考勤 / 每日统计 (李书悦)*/
                    path: 'daily-statistics',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/staff-attendance/daily-statistics/daily-statistics.module#DailyStatisticsModule'
                },
                {
                    /** 应用 / 考勤系统 / 员工考勤 / 月度汇总 (李书悦)*/
                    path: 'monthly-summary',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/staff-attendance/monthly-summary/monthly-summary.module#MonthlySummaryModule'
                },
                {
                    /** 应用 / 考勤系统 / 员工考勤 / 在线员工 (李书悦)*/
                    path: 'online-staff',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/staff-attendance/online-staff/online-staff.module#OnlineStaffModule'
                },
                {
                    /** 应用 / 考勤系统 / 员工考勤 / 在线用户 (李书悦)*/
                    path: 'online-users',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/staff-attendance/online-users/online-users.module#OnlineUsersModule'
                },
                {
                    /** 应用 / 考勤系统 / 系统管理 / 部门基本信息管理 (李书悦)*/
                    path: 'dept-basic-info-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/system-management/dept-basic-info-management/dept-basic-info-management.module#DeptBasicInfoManagementModule'
                },
                {
                    /** 应用 / 考勤系统 / 系统管理 / 员工基本信息管理 (李书悦)*/
                    path: 'staff-basic-info-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/system-management/staff-basic-info-management/staff-basic-info-management.module#StaffBasicInfoManagementModule'
                },
                {
                    /** 应用 / 考勤系统 / 访客管理 / 连网访客 (李书悦)*/
                    path: 'network-visitor',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/visitor-management/network-visitor/network-visitor.module#NetworkVisitorModule'
                },
                {
                    /** 应用 / 考勤系统 / 访客管理 / 在线访客 (李书悦)*/
                    path: 'online-visitors',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/visitor-management/online-visitors/online-visitors.module#OnlineVisitorsModule'
                },
                {
                    /** 应用 / 考勤系统 / 访客管理 / 访客登记 (李书悦)*/
                    path: 'visitor-registration',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/attendance-system/visitor-management/visitor-registration/visitor-registration.module#VisitorRegistrationModule'
                },
                {
                    /** 应用 / 舆情系统 / 招标信息 / 查看我的主题 (吴双)*/
                    path: 'examine-my-theme',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/sensation-system/bidding-information/examine-my-theme/examine-my-theme.module#ExamineMyThemeModule'
                },
                {
                    /** 应用 / 舆情系统 / 招标信息 / 管理我的主题 (吴双)*/
                    path: 'manage-my-theme',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/sensation-system/bidding-information/manage-my-theme/manage-my-theme.module#ManageMyThemeModule'
                },
                {
                    /** 应用 / 舆情系统 / 招标信息 / 编辑我的主题 (吴双)*/
                    path: 'edit-topic/:status/:id/:url',
                    // canActivate: [ AuthGuardService ],
                    loadChildren: './application/sensation-system/bidding-information/edit-topic/edit-topic.module#EditTopicModule'
                },
                {
                    /** 应用 / 舆情系统 / 我的跟踪 / 我的关注 (吴双)*/
                    path: 'my-attention',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/sensation-system/my-track/my-attention/my-attention.module#MyAttentionModule'
                },
                {
                    /** 应用 / 舆情系统 / 我的跟踪 / 我的删除 (吴双)*/
                    path: 'my-recycle-bin',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/sensation-system/my-track/my-recycle-bin/my-recycle-bin.module#MyRecycleBinModule'
                },
                {
                    /** 应用 / 舆情系统 / 我的跟踪 / 即将开标 (吴双)*/
                    path: 'open-bid',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/sensation-system/my-track/open-bid/open-bid.module#OpenBidModule'
                },
                {
                    /** 应用 / 舆情系统 / 政府政策信息 / 查看我的嗅探 (吴双)*/
                    path: 'examine-my-sniffer',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/sensation-system/government-information/examine-my-sniffer/examine-my-sniffer.module#ExamineMySnifferModule'
                },
                {
                    /** 应用 / 舆情系统 / 招标信息 / 编辑(管理)我的嗅探 (吴双)*/
                    path: 'edit-sniffer/:status/:id/:url',
                    loadChildren: './application/sensation-system/government-information/edit-sniffer/edit-sniffer.module#EditSnifferModule'
                },
                {
                    /** 应用 / 舆情系统 / 政府政策信息 / 管理我的嗅探 (吴双)*/
                    path: 'manage-my-sniffer',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './application/sensation-system/government-information/manage-my-sniffer/manage-my-sniffer.module#ManageMySnifferModule'
                },
                {
                    /** 企业中心 / 组织管理 / 部门管理 */
                    path: 'department-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/organizationManagement/department-management/department-management.module#DepartmentManagementModule'
                },
                {
                    /** 数据监控台 / 企业设备概况 / 交换机列表 */
                    path: 'switch-device-list',
                    loadChildren: './business/monitor/switch-device-list/switch-device-list.module#SwitchDeviceListModule'
                },
                {
                    /** 企业中心 / 配置 / 交换机设备管理(吴双) */
                    path: 'switch-device-management',
                    loadChildren: './business/conf/switch-device-management/switch-device-management.module#SwitchDeviceManagementModule'
                },
                {
                    /** 企业中心 / 组织管理 / 员工管理 */
                    path: 'employee-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/organizationManagement/employee-management/employee-management.module#EmployeeManagementModule'
                },
                {
                    /** 企业中心 / 组织管理 / 员工终端管理 */
                    path: 'employee-terminal-management',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/organizationManagement/employee-terminal-management/employee-terminal-management.module#EmployeeTerminalManagementModule'
                },
                {
                    /** 企业中心 / 组织管理 / 终端认证记录 */
                    path: 'visitor-certification-record',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/organizationManagement/visitor-certification-record/visitor-certification-record.module#VisitorCertificationRecordModule'
                },
                {
                    /** 企业中心 / 企业钉钉 */
                    path: 'business-ding-talk',
                    canActivate: [ AuthGuardService ],
                    loadChildren: './business/conf/business-ding-talk/business-ding-talk.module#BusinessDingTalkModule'
                },
                {
                    /** 工单管理*/
                    path: 'work-order-manage',
                    loadChildren: './business/conf/work-order-manage/work-order-manage.module#WorkOrderManageModule'
                },
                {
                    /** 安装记录*/
                    path: 'install-record',
                    loadChildren: './business/conf/install-record/install-record.module#InstallRecordModule'
                },
                {
                    /** 安装记录*/
                    path: 'work-order-info',
                    loadChildren: './business/conf/work-order-info/work-order-info.module#WorkOrderInfoModule'
                }
            ]
    },
    {
        path: 'noLogin',
        component : NoLoginErrorComponent,
    },
    // {
    //     path: 'noAuth',
    //     component : NoAuthErrorComponent,
    // },
    {
        path: 'notFound',
        component: NotFoundErrorComponent
    },
    {
        path: 'systemError',
        component: SystemErrorComponent
    },
    {
        path: '**',
        redirectTo: 'notFound'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { preloadingStrategy:  NoPreloading }) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
