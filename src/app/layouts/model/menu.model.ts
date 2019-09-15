export class MenuModel {
    /* 数据监控台 */
    private _wholeNetworkMonitor: [ boolean, string ];
    /* 数据监控台 - 企业当日概况 */
    private _overview: [ boolean, string, string ];
    /* 数据监控台 - 企业网络概况 */
    private _networkOverview: [ boolean, string, string ];
    /* 数据监控台 - 企业设备概况 */
    private _enterpriseOverview: [ boolean, string];
    /* 数据监控台 - 企业设备概况 - AP清单 */
    private _apList: [ boolean, string, string ];

    /* 数据监控台 - 企业设备概况 - 交换机列表 */
    private _switchDeviceList: [ boolean, string, string ];
    /* 企业中心 - 交换机设备管理 */
    private _switchDeviceManagement: [ boolean, string, string ];

    /* 我的设备 */
    private _myDevice: [ boolean, string ];
    /* 我的设备 - 我的AP */
    private _myAp: [ boolean, string ];
    /* 我的设备 - 我的AP - SSID清单 */
    private _ssidDetails: [ boolean, string, string ];
    /* 我的设备 - 我的AP - 射频管理 */
    private _radioFrequencyManagement: [ boolean, string, string ];

    /* 我的网络 */
    private _myNetwork: [ boolean, string ];
    /* 我的网络 - 网络管理 */
    private _networkManagement: [ boolean, string, string ];
    /* 我的网络 - 3A服务器 */
    private _authentication: [ boolean, string, string ];
    /* 我的网络 - 探针配置 */
    private _probeConf: [ boolean, string, string ];
    /* 我的网络 - 日志管理 */
    private _logManagement: [ boolean, string, string ];
    /* 我的网络 - 在线用户管理 */
    private _onlineClientManagement: [ boolean, string, string ];
    /* 我的网络 - 告警接收管理 */
    private _alertManagement: [ boolean, string, string ];

    /* 企业中心 */
    private _corporateCenter: [ boolean, string ];
    /* 企业中心 - 企业信息 */
    private _businessInformation: [ boolean, string, string ];
    /* 企业中心 - 企业管理 */
    private _businessList: [ boolean, string, string ];
    /*  企业中心 - 网络列表*/
    private _businessNetworkList: [ boolean, string, string ];
    /* 企业中心 - 用户管理 */
    private _userManage: [ boolean, string, string ];
    /* 企业中心 - 角色管理 */
    private _roleManage: [ boolean, string, string ];
    // /* 企业中心 - 设备资产管理 */
    /* 企业中心 - 设备管理 */
    private _plantAssetManagement: [ boolean, string, string ];
    /* 企业中心 - 设备资产管理 */
    private _equipmentAssetManagement: [ boolean, string, string ];
    /* 企业中心 - 认证用户列表 */
    private _authenticateUserList: [ boolean, string, string ];


    /* 企业中心 - 组织管理 */
    private _organizationManagement: [ boolean, string ];
    /* 企业中心 - 组织管理 - 部门管理 */
    private _departmentManagement: [ boolean, string, string ];
    /* 企业中心 - 组织管理 - 员工管理 */
    private _employeeManagement: [ boolean, string, string ];
    /* 企业中心 - 组织管理 - 员工终端管理 */
    private _employeeTerminalManagement: [ boolean, string, string ];
    /* 企业中心 - 组织管理 - 访客认证记录 */
    private _visitorCertificationRecord: [ boolean, string, string ];
    /* 企业中心 - 企业钉钉 */
    private _businessDingTalk: [ boolean, string, string ];

    /* 设备管理 */
    private _deviceCenter: [ boolean, string ];
    /* 设备管理 - AP注册管理 */
    private _apRegisterManagement: [ boolean, string ];
    /* 设备管理 - AP注册管理 - AP注册 */
    private _apRegister: [ boolean, string, string ];
    /* 设备管理 - AP注册管理 - 适配器管理 */
    private _adapterManagement: [ boolean, string, string ];
    /* 设备管理 - AP注册管理 - AP资源监控 */
    private _apResourceMonitor: [ boolean, string, string ];
    /* 设备管理 - 版本资源库 */
    private _firmwareManagementPlatform: [ boolean, string, string ];
    /* 设备管理 - 设备更新管理 */
    private _firmwareManagement: [ boolean, string, string ];
    /* 设备管理 - 适配器组管理 */
    private _adapterGroupRegisterManagement: [ boolean, string ];
    /* 设备管理 - 适配器组管理 - 适配器组注册 */
    private _adapterGroupRegister: [ boolean, string, string ];
    /* 设备管理 - 适配器组管理 - 适配组管理 */
    private _adapterGroupManagement: [ boolean, string, string ];

    /* 企业考勤 */
    private _attendenceSystem: [ boolean, string ];
    /* 企业考勤 - 系统管理 */
    private _systemManagement: [ boolean, string ];
    /* 企业考勤 - 系统管理 - 部门基本信息管理 */
    private _deptBasicInfoManagement: [ boolean, string, string ];
    /* 企业考勤 - 系统管理 - 员工基本信息管理 */
    private _staffBasicInfoManagement: [ boolean, string, string ];
    /* 企业考勤 - 网络管理 */
    private _asNetworkManagement: [ boolean, string ];
    /* 企业考勤 - 网络管理 - 终端管理 */
    private _terminalInformation: [ boolean, string, string ];
    /* 企业考勤 - 访客管理 */
    private _visitorManagement: [ boolean, string ];
    /* 企业考勤 - 访客管理 - 在线访客 */
    private _onlineVisitors: [ boolean, string, string ];
    /* 企业考勤 - 访客管理 - 联网访客 */
    private _networkVisitor: [ boolean, string, string ];
    /* 企业考勤 - 访客管理 - 访客登记 */
    private _visitorRegistration: [ boolean, string, string ];
    /* 企业考勤 - 考勤设置 */
    private _attendanceSetting: [ boolean, string ];
    /* 企业考勤 - 考勤设置 - 考勤组管理 */
    private _attndGroupManagement: [ boolean, string, string ];
    /* 企业考勤 - 考勤设置 - 班次管理 */
    private _workShiftManagement: [ boolean, string, string ];
    /* 企业考勤 - 员工考勤 */
    private _staffAttendance: [ boolean, string ];
    /* 企业考勤 - 员工考勤 - 在线员工 */
    private _onlineStaff: [ boolean, string, string ];
    /* 企业考勤 - 员工考勤 - 每日统计 */
    private _dailyStatistics: [ boolean, string, string ];
    /* 企业考勤 - 员工考勤 - 月度汇总 */
    private _monthlySummary: [ boolean, string, string ];
    /* 企业考勤 - 员工考勤 - 在线用户 */
    private _onlineUsers: [ boolean, string, string ];

    /* 无限商情 */
    private _sensationSystem: [ boolean, string ];
    /* 无限商情 - 招投标信息 */
    private _biddingInformation: [ boolean, string ];
    /* 无限商情 - 招投标信息 - 查看我的主题 */
    private _examineMyTheme: [ boolean, string, string ];
    /* 无限商情 - 招投标信息 - 管理我的主题 */
    private _manageMyTheme: [ boolean, string, string ];
    /* 无限商情 - 我的跟踪 */
    private _myTrack: [ boolean, string ];
    /* 无限商情 - 我的跟踪 - 我的关注 */
    private _myAttention: [ boolean, string, string ];
    /* 无限商情 - 我的跟踪 - 我的删除 */
    private _myRecycleBin: [ boolean, string, string ];
    /* 无限商情 - 我的跟踪 - 即将开标 */
    private _openBid: [ boolean, string, string ];
    /* 无限商情 - 政府政策信息 */
    private _governmentInformation: [ boolean, string ];
    /* 无限商情 - 政府政策信息 - 查看我的嗅探 */
    private _examineMySniffer: [ boolean, string, string ];
    /* 无限商情 - 政府政策信息 - 管理我的嗅探 */
    private _manageMySniffer: [ boolean, string, string ];

    /** 工单管理 */
    private _workOrderManage: [ boolean, string, string ];

    /** 安装记录 */
    private _installRecord: [ boolean, string, string ];

    /** 365微信编辑器 */
    private _wxEdit: [ boolean, string, string ];

    /* 应用市场 */
    private _applicationStore: [ boolean, string, string ];

    constructor() {
        this.setFalseRole();
        // this.setTrueRole();
    }

    private setTrueRole() {
        this.wholeNetworkMonitor= [ true, '数据监控台'];
        this.overview= [ true, '企业当日概况','/overview' ];
        this.networkOverview= [ true, '企业网络概况','/network-overview' ];
        this.enterpriseOverview = [ true, '企业设备概况'];
        this.apList = [ true, 'AP清单','/ap-list' ];

        this.myDevice = [ true, '我的设备' ];
        this.myAp = [ true, '我的AP' ];
        this.ssidDetails = [ true, 'SSID清单','/ssid-details' ];
        this.radioFrequencyManagement = [ true, '射频管理','/radio-frequency-management' ];

        this.myNetwork = [ true, '我的网络' ];
        this.networkManagement= [ true, '网络管理','/network-management' ];
        this.authentication= [ true, '3A服务器','/authentication' ];
        this.probeConf= [ true, '探针配置','/probe-conf' ];
        this.logManagement= [ true, '日志管理','/log-management' ];
        this.onlineClientManagement= [ true, '在线用户管理','/online-client-management/business/0/0' ];
        this.alertManagement = [ true, '告警接收管理' ,'/alert-management'];

        this.corporateCenter = [ true, '企业中心' ];
        this.businessInformation= [ true, '企业信息','/business-information' ];
        this.businessList= [ true, '企业管理','/business-list' ];
        this.businessNetworkList= [ true, '网络列表管理','/business-network-list' ];
        this.userManage = [true, '用户管理', '/user-management'];
        this.roleManage = [true, '角色管理', '/role-management'];
        // this.plantAssetManagement= [ true, '设备资产管理','/plant-asset-management' ];
        this.plantAssetManagement= [ true, '设备管理','/plant-asset-management' ];
        this.equipmentAssetManagement= [ true, '设备资产管理','/equipment-asset-management' ];
        this.authenticateUserList= [ true, '认证用户列表','/authenticate-user-list' ];
        this.organizationManagement = [ true, '组织管理', '/organization-management' ];
        this.departmentManagement = [ true, '部门管理', '/department-management' ];
        this.employeeManagement = [ true, '员工管理', '/employee-management' ];
        this.employeeTerminalManagement = [ true, '员工终端管理', '/employee-terminal-management' ];
        this.visitorCertificationRecord = [ true, '访客认证记录', '/visitor-certification-record'];
        this.businessDingTalk = [ true, '企业钉钉', '/business-ding-talk' ];

        this.deviceCenter = [true, '设备管理'];
        this.apRegisterManagement= [ true, 'AP注册管理' ];
        this.apRegister= [ true, 'AP注册', '/ap-register' ];
        this.adapterManagement= [ true, '适配器管理', '/adapter-management' ];
        this.apResourceMonitor= [ true, 'AP资源监控', '/ap-resource-monitor' ];
        this.firmwareManagementPlatform= [ true, '版本资源库','/firmware-management-platform' ];
        this.firmwareManagement= [ true, '设备更新管理', '/firmware-management' ];
        this.adapterGroupRegisterManagement= [ true, '适配器组管理' ];
        this.adapterGroupRegister= [ true, '适配器组注册', '/adapter-group-register' ];
        this.adapterGroupManagement= [ true, '适配器组管理', '/adapter-group-management' ];

        this.attendenceSystem= [ true, '考勤应用' ];
        this.systemManagement= [ true, '系统管理' ];
        this.deptBasicInfoManagement= [ true, '部门基本信息管理', '/dept-basic-info-management' ];
        this.staffBasicInfoManagement= [ true, '员工基本信息管理', '/staff-basic-info-management' ];
        this.asNetworkManagement= [ true, '网络管理' ];
        this.terminalInformation= [ true, '终端信息', '/terminal-information' ];
        this.visitorManagement= [ true, '访客管理' ];
        this.onlineVisitors= [ true, '在线访客', '/online-visitors' ];
        this.networkVisitor= [ true, '联网访客', '/network-visitor' ];
        this.visitorRegistration= [ true, '访客登记', '/visitor-registration' ];
        this.attendanceSetting= [ true, '考勤设置' ];
        this.attndGroupManagement= [ true, '考勤组管理', '/attnd-group-management' ];
        this.workShiftManagement= [ true, '班次管理', '/work-shift-management' ];
        this.staffAttendance= [ true, '员工考勤' ];
        this.onlineStaff= [ true, '在线员工', '/online-staff' ];
        this.dailyStatistics= [ true, '每日统计', '/daily-statistics' ];
        this.monthlySummary= [true, '月度汇总', '/monthly-summary' ];
        this.onlineUsers= [ true, '在线用户', '/online-users' ];

        this.sensationSystem = [true, '无线商情'];
        this.biddingInformation = [true, '招投标信息'];
        this.examineMyTheme = [true, '查看我的主题', '/examine-my-theme'];
        this.manageMyTheme = [true, '管理我的主题', '/manage-my-theme'];
        this.myTrack = [true, '我的跟踪'];
        this.myAttention = [true, '我的关注', '/my-attention'];
        this.myRecycleBin = [true, '我的删除', '/my-recycle-bin'];
        this.openBid = [true, '即将开标', '/open-bid'];
        this.governmentInformation = [true, '政府政策信息'];
        this.examineMySniffer = [true, '查看我的嗅探', '/examine-my-sniffer'];
        this.manageMySniffer = [true, '管理我的嗅探', '/manage-my-sniffer'];

        this.switchDeviceList = [ true, '交换机列表', '/switch-device-list' ];
        this.switchDeviceManagement = [ true, '交换机设备管理', '/switch-device-management' ];

        this.workOrderManage = [ true, '工单管理', '/work-order-manage' ];

        this.installRecord = [ true, '安装记录', '/install-record' ];

        this.wxEdit = [ true, '微信编辑', '/wx-edit' ];

        this.applicationStore = [ true, '应用市场' ,'/application-store'];

    }

    private setFalseRole() {
        this.wholeNetworkMonitor= [ false, '数据监控台'];
        this.overview= [ false, '企业当日概况','/overview' ];
        this.networkOverview= [ false, '企业网络概况','/network-overview' ];
        this.enterpriseOverview = [ false, '企业设备概况'];
        this.apList = [ false, 'AP清单','/ap-list' ];

        this.myDevice = [ false, '我的设备' ];
        this.myAp = [ false, '我的AP' ];
        this.ssidDetails = [ false, 'SSID清单','/ssid-details' ];
        this.radioFrequencyManagement = [ false, '射频管理','/radio-frequency-management' ];

        this.myNetwork = [ false, '我的网络' ];
        this.networkManagement= [ false, '网络管理','/network-management' ];
        this.authentication= [ false, '3A服务器','/authentication' ];
        this.probeConf= [ false, '探针配置','/probe-conf' ];
        this.logManagement= [ false, '日志管理','/log-management' ];
        this.onlineClientManagement= [ false, '在线用户管理','/online-client-management' ];
        this.alertManagement = [ false, '告警接收管理' ,'/alert-management'];

        this.corporateCenter = [ false, '企业中心' ];
        this.businessInformation= [ false, '企业信息','/business-information' ];
        this.businessList= [ false, '企业管理','/business-list' ];
        this.businessNetworkList= [ false, '网络列表管理','/business-network-list' ];
        this.userManage = [false, '用户管理', '/user-management'];
        this.roleManage = [false, '角色管理', '/role-management'];
        // this.plantAssetManagement= [ false, '设备资产管理','/plant-asset-management' ];
        this.plantAssetManagement= [ false, '设备管理','/plant-asset-management' ];
        this.equipmentAssetManagement= [ true, '设备资产管理','/equipment-asset-management' ];
        this.authenticateUserList= [ true, '认证用户列表','/authenticate-user-list' ];
        this.organizationManagement = [ false, '组织管理', '/organization-management' ];
        this.departmentManagement = [ false, '部门管理', '/department-management' ];
        this.employeeManagement = [ false, '员工管理', '/employee-management' ];
        this.employeeTerminalManagement = [ false, '员工终端管理', '/employee-terminal-management' ];
        this.visitorCertificationRecord = [ false, '访客认证记录', '/visitor-certification-record'];
        this.businessDingTalk = [ false, '企业钉钉', '/business-ding-talk' ];

        this.deviceCenter = [false, '设备管理'];
        this.apRegisterManagement= [ false, 'AP注册管理' ];
        this.apRegister= [ false, 'AP注册', '/ap-register' ];
        this.adapterManagement= [ false, '适配器管理', '/adapter-management' ];
        this.apResourceMonitor= [ false, 'AP资源监控', '/ap-resource-monitor' ];
        this.firmwareManagementPlatform= [ false, '版本资源库','/firmware-management-platform' ];
        this.firmwareManagement= [ false, '设备更新管理', '/firmware-management' ];
        this.adapterGroupRegisterManagement= [ false, '适配器组管理' ];
        this.adapterGroupRegister= [ false, '适配器组注册', '/adapter-group-register' ];
        this.adapterGroupManagement= [ false, '适配器组管理', '/adapter-group-management' ];

        this.attendenceSystem= [ false, '考勤应用' ];
        this.systemManagement= [ false, '系统管理' ];
        this.deptBasicInfoManagement= [ false, '部门基本信息管理', '/dept-basic-info-management' ];
        this.staffBasicInfoManagement= [ false, '员工基本信息管理', '/staff-basic-info-management' ];
        this.asNetworkManagement= [ false, '网络管理' ];
        this.terminalInformation= [ false, '终端信息', '/terminal-information' ];
        this.visitorManagement= [ false, '访客管理' ];
        this.onlineVisitors= [ false, '在线访客', '/online-visitors' ];
        this.networkVisitor= [ false, '联网访客', '/network-visitor' ];
        this.visitorRegistration= [ false, '访客登记', '/visitor-registration' ];
        this.attendanceSetting= [ false, '考勤设置' ];
        this.attndGroupManagement= [ false, '考勤组管理', '/attnd-group-management' ];
        this.workShiftManagement= [ false, '班次管理', '/work-shift-management' ];
        this.staffAttendance= [ false, '员工考勤' ];
        this.onlineStaff= [ false, '在线员工', '/online-staff' ];
        this.dailyStatistics= [ false, '每日统计', '/daily-statistics' ];
        this.monthlySummary= [false, '月度汇总', '/monthly-summary' ];
        this.onlineUsers= [ false, '在线用户', '/online-users' ];

        this.sensationSystem = [false, '无线商情'];
        this.biddingInformation = [false, '招投标信息'];
        this.examineMyTheme = [false, '查看我的主题', '/examine-my-theme'];
        this.manageMyTheme = [false, '管理我的主题', '/manage-my-theme'];
        this.myTrack = [false, '我的跟踪'];
        this.myAttention = [false, '我的关注', '/my-attention'];
        this.myRecycleBin = [false, '我的删除', '/my-recycle-bin'];
        this.openBid = [false, '即将开标', '/open-bid'];
        this.governmentInformation = [false, '政府政策信息'];
        this.examineMySniffer = [false, '查看我的嗅探', '/examine-my-sniffer'];
        this.manageMySniffer = [false, '管理我的嗅探', '/manage-my-sniffer'];

        this.switchDeviceList = [ false, '交换机列表', '/switch-device-list' ];
        this.switchDeviceManagement = [ false, '交换机设备管理', '/switch-device-management' ];

        this.workOrderManage = [ false, '工单管理', '/work-order-manage' ];

        this.installRecord = [ false, '安装记录', '/install-record' ];

        this.wxEdit = [ true, '微信编辑', '/wx-edit' ];

        this.applicationStore = [ false, '应用市场' ,'/application-store'];
    }

    public getFirstLink(data: any ): string {
        let links = [
            'overview', 'networkOverview', 'apList', 'ssidDetails', 'radioFrequencyManagement',
            'networkManagement','authentication', 'onlineClientManagement','alertManagement',
            'businessInformation','businessList','businessNetworkList', 'userManage', 'roleManage','plantAssetManagement', 'equipmentAssetManagement', 'authenticateUserList',
            'apRegister','adapterManagement','apResourceMonitor','firmwareManagementPlatform', 'firmwareManagement',
            'deptBasicInfoManagement','staffBasicInfoManagement','terminalInformation','onlineVisitors','networkVisitor',
            'visitorRegistration', 'attndGroupManagement','workShiftManagement','onlineStaff','dailyStatistics','monthlySummary','onlineUsers',
            'examineMyTheme','manageMyTheme','myAttention','myRecycleBin','openBid','examineMySniffer','manageMySniffer',
            'organizationManagement','departmentManagement','employeeManagement','employeeTerminalManagement','businessDingTalk',
            'adapterGroupRegister','adapterGroupManagement','switchDeviceList','switchDeviceManagement','probeConf','logManagement',
            'workOrderManage', 'installRecord', 'wx-edit', 'applicationStore','visitorCertificationRecord'
        ];

        for (let obj of links) {
            if (data.indexOf(obj) >= 0) {
                return obj;
            }
        }
    }


    get wholeNetworkMonitor(): [boolean, string] {
        return this._wholeNetworkMonitor;
    }

    set wholeNetworkMonitor(value: [boolean, string]) {
        this._wholeNetworkMonitor = value;
    }

    get overview(): [boolean, string, string] {
        return this._overview;
    }

    set overview(value: [boolean, string, string]) {
        this._overview = value;
    }

    get networkOverview(): [boolean, string, string] {
        return this._networkOverview;
    }

    set networkOverview(value: [boolean, string, string]) {
        this._networkOverview = value;
    }

    get enterpriseOverview(): [boolean, string] {
        return this._enterpriseOverview;
    }

    set enterpriseOverview(value: [boolean, string]) {
        this._enterpriseOverview = value;
    }

    get apList(): [boolean, string, string] {
        return this._apList;
    }

    set apList(value: [boolean, string, string]) {
        this._apList = value;
    }

    get myDevice(): [boolean, string] {
        return this._myDevice;
    }

    set myDevice(value: [boolean, string]) {
        this._myDevice = value;
    }

    get myAp(): [boolean, string] {
        return this._myAp;
    }

    set myAp(value: [boolean, string]) {
        this._myAp = value;
    }

    get ssidDetails(): [boolean, string, string] {
        return this._ssidDetails;
    }

    set ssidDetails(value: [boolean, string, string]) {
        this._ssidDetails = value;
    }

    get radioFrequencyManagement(): [boolean, string, string] {
        return this._radioFrequencyManagement;
    }

    set radioFrequencyManagement(value: [boolean, string, string]) {
        this._radioFrequencyManagement = value;
    }

    get myNetwork(): [boolean, string] {
        return this._myNetwork;
    }

    set myNetwork(value: [boolean, string]) {
        this._myNetwork = value;
    }

    get networkManagement(): [boolean, string, string] {
        return this._networkManagement;
    }

    set networkManagement(value: [boolean, string, string]) {
        this._networkManagement = value;
    }

    get authentication(): [boolean, string, string] {
        return this._authentication;
    }

    set authentication(value: [boolean, string, string]) {
        this._authentication = value;
    }

    get onlineClientManagement(): [boolean, string, string] {
        return this._onlineClientManagement;
    }

    set onlineClientManagement(value: [boolean, string, string]) {
        this._onlineClientManagement = value;
    }

    get alertManagement(): [boolean, string, string] {
        return this._alertManagement;
    }

    set alertManagement(value: [boolean, string, string]) {
        this._alertManagement = value;
    }

    get corporateCenter(): [boolean, string] {
        return this._corporateCenter;
    }

    set corporateCenter(value: [boolean, string]) {
        this._corporateCenter = value;
    }

    get businessInformation(): [boolean, string, string] {
        return this._businessInformation;
    }

    set businessInformation(value: [boolean, string, string]) {
        this._businessInformation = value;
    }

    get businessList(): [boolean, string, string] {
        return this._businessList;
    }

    set businessList(value: [boolean, string, string]) {
        this._businessList = value;
    }
    get businessNetworkList(): [boolean, string, string] {
        return this._businessNetworkList;
    }

    set businessNetworkList(value: [boolean, string, string]) {
        this._businessNetworkList = value;
    }

    get userManage(): [boolean, string, string] {
        return this._userManage;
    }

    set userManage(value: [boolean, string, string]) {
        this._userManage = value;
    }

    get roleManage(): [boolean, string, string] {
        return this._roleManage;
    }

    set roleManage(value: [boolean, string, string]) {
        this._roleManage = value;
    }

    get plantAssetManagement(): [boolean, string, string] {
        return this._plantAssetManagement;
    }

    set plantAssetManagement(value: [boolean, string, string]) {
        this._plantAssetManagement = value;
    }

    get equipmentAssetManagement(): [boolean, string, string] {
        return this._equipmentAssetManagement;
    }

    set equipmentAssetManagement(value: [boolean, string, string]) {
        this._equipmentAssetManagement = value;
    }

    get authenticateUserList(): [boolean, string, string] {
        return this._authenticateUserList;
    }

    set authenticateUserList(value: [boolean, string, string]) {
        this._authenticateUserList = value;
    }

    get deviceCenter(): [boolean, string] {
        return this._deviceCenter;
    }

    set deviceCenter(value: [boolean, string]) {
        this._deviceCenter = value;
    }

    get apRegisterManagement(): [boolean, string] {
        return this._apRegisterManagement;
    }

    set apRegisterManagement(value: [boolean, string]) {
        this._apRegisterManagement = value;
    }

    get apRegister(): [boolean, string, string] {
        return this._apRegister;
    }

    set apRegister(value: [boolean, string, string]) {
        this._apRegister = value;
    }

    get adapterManagement(): [boolean, string, string] {
        return this._adapterManagement;
    }

    set adapterManagement(value: [boolean, string, string]) {
        this._adapterManagement = value;
    }

    get apResourceMonitor(): [boolean, string, string] {
        return this._apResourceMonitor;
    }

    set apResourceMonitor(value: [boolean, string, string]) {
        this._apResourceMonitor = value;
    }

    get firmwareManagementPlatform(): [boolean, string, string] {
        return this._firmwareManagementPlatform;
    }

    set firmwareManagementPlatform(value: [boolean, string, string]) {
        this._firmwareManagementPlatform = value;
    }

    get firmwareManagement(): [boolean, string, string] {
        return this._firmwareManagement;
    }

    set firmwareManagement(value: [boolean, string, string]) {
        this._firmwareManagement = value;
    }

    get attendenceSystem(): [boolean, string] {
        return this._attendenceSystem;
    }

    set attendenceSystem(value: [boolean, string]) {
        this._attendenceSystem = value;
    }

    get systemManagement(): [boolean, string] {
        return this._systemManagement;
    }

    set systemManagement(value: [boolean, string]) {
        this._systemManagement = value;
    }

    get deptBasicInfoManagement(): [boolean, string, string] {
        return this._deptBasicInfoManagement;
    }

    set deptBasicInfoManagement(value: [boolean, string, string]) {
        this._deptBasicInfoManagement = value;
    }

    get staffBasicInfoManagement(): [boolean, string, string] {
        return this._staffBasicInfoManagement;
    }

    set staffBasicInfoManagement(value: [boolean, string, string]) {
        this._staffBasicInfoManagement = value;
    }

    get asNetworkManagement(): [boolean, string] {
        return this._asNetworkManagement;
    }

    set asNetworkManagement(value: [boolean, string]) {
        this._asNetworkManagement = value;
    }

    get terminalInformation(): [boolean, string, string] {
        return this._terminalInformation;
    }

    set terminalInformation(value: [boolean, string, string]) {
        this._terminalInformation = value;
    }

    get visitorManagement(): [boolean, string] {
        return this._visitorManagement;
    }

    set visitorManagement(value: [boolean, string]) {
        this._visitorManagement = value;
    }

    get onlineVisitors(): [boolean, string, string] {
        return this._onlineVisitors;
    }

    set onlineVisitors(value: [boolean, string, string]) {
        this._onlineVisitors = value;
    }

    get networkVisitor(): [boolean, string, string] {
        return this._networkVisitor;
    }

    set networkVisitor(value: [boolean, string, string]) {
        this._networkVisitor = value;
    }

    get visitorRegistration(): [boolean, string, string] {
        return this._visitorRegistration;
    }

    set visitorRegistration(value: [boolean, string, string]) {
        this._visitorRegistration = value;
    }

    get attendanceSetting(): [boolean, string] {
        return this._attendanceSetting;
    }

    set attendanceSetting(value: [boolean, string]) {
        this._attendanceSetting = value;
    }

    get attndGroupManagement(): [boolean, string, string] {
        return this._attndGroupManagement;
    }

    set attndGroupManagement(value: [boolean, string, string]) {
        this._attndGroupManagement = value;
    }

    get workShiftManagement(): [boolean, string, string] {
        return this._workShiftManagement;
    }

    set workShiftManagement(value: [boolean, string, string]) {
        this._workShiftManagement = value;
    }

    get staffAttendance(): [boolean, string] {
        return this._staffAttendance;
    }

    set staffAttendance(value: [boolean, string]) {
        this._staffAttendance = value;
    }

    get onlineStaff(): [boolean, string, string] {
        return this._onlineStaff;
    }

    set onlineStaff(value: [boolean, string, string]) {
        this._onlineStaff = value;
    }

    get dailyStatistics(): [boolean, string, string] {
        return this._dailyStatistics;
    }

    set dailyStatistics(value: [boolean, string, string]) {
        this._dailyStatistics = value;
    }

    get monthlySummary(): [boolean, string, string] {
        return this._monthlySummary;
    }

    set monthlySummary(value: [boolean, string, string]) {
        this._monthlySummary = value;
    }

    get onlineUsers(): [boolean, string, string] {
        return this._onlineUsers;
    }

    set onlineUsers(value: [boolean, string, string]) {
        this._onlineUsers = value;
    }

    get sensationSystem(): [boolean, string] {
        return this._sensationSystem;
    }

    set sensationSystem(value: [boolean, string]) {
        this._sensationSystem = value;
    }

    get biddingInformation(): [boolean, string] {
        return this._biddingInformation;
    }

    set biddingInformation(value: [boolean, string]) {
        this._biddingInformation = value;
    }

    get examineMyTheme(): [boolean, string, string] {
        return this._examineMyTheme;
    }

    set examineMyTheme(value: [boolean, string, string]) {
        this._examineMyTheme = value;
    }

    get manageMyTheme(): [boolean, string, string] {
        return this._manageMyTheme;
    }

    set manageMyTheme(value: [boolean, string, string]) {
        this._manageMyTheme = value;
    }

    get myTrack(): [boolean, string] {
        return this._myTrack;
    }

    set myTrack(value: [boolean, string]) {
        this._myTrack = value;
    }

    get myAttention(): [boolean, string, string] {
        return this._myAttention;
    }

    set myAttention(value: [boolean, string, string]) {
        this._myAttention = value;
    }

    get myRecycleBin(): [boolean, string, string] {
        return this._myRecycleBin;
    }

    set myRecycleBin(value: [boolean, string, string]) {
        this._myRecycleBin = value;
    }

    get openBid(): [boolean, string, string] {
        return this._openBid;
    }

    set openBid(value: [boolean, string, string]) {
        this._openBid = value;
    }

    get governmentInformation(): [boolean, string] {
        return this._governmentInformation;
    }

    set governmentInformation(value: [boolean, string]) {
        this._governmentInformation = value;
    }

    get examineMySniffer(): [boolean, string, string] {
        return this._examineMySniffer;
    }

    set examineMySniffer(value: [boolean, string, string]) {
        this._examineMySniffer = value;
    }

    get manageMySniffer(): [boolean, string, string] {
        return this._manageMySniffer;
    }

    set manageMySniffer(value: [boolean, string, string]) {
        this._manageMySniffer = value;
    }

    get organizationManagement(): [boolean, string] {
        return this._organizationManagement;
    }

    set organizationManagement(value: [boolean, string]) {
        this._organizationManagement = value;
    }

    get departmentManagement(): [boolean, string, string] {
        return this._departmentManagement;
    }

    set departmentManagement(value: [boolean, string, string]) {
        this._departmentManagement = value;
    }

    get employeeManagement(): [boolean, string, string] {
        return this._employeeManagement;
    }

    set employeeManagement(value: [boolean, string, string]) {
        this._employeeManagement = value;
    }

    get employeeTerminalManagement(): [boolean, string, string] {
        return this._employeeTerminalManagement;
    }

    set employeeTerminalManagement(value: [boolean, string, string]) {
        this._employeeTerminalManagement = value;
    }

    get businessDingTalk(): [boolean, string, string] {
        return this._businessDingTalk;
    }

    set businessDingTalk(value: [boolean, string, string]) {
        this._businessDingTalk = value;
    }

    get adapterGroupRegister(): [boolean, string, string] {
        return this._adapterGroupRegister;
    }

    set adapterGroupRegister(value: [boolean, string, string]) {
        this._adapterGroupRegister = value;
    }

    get adapterGroupManagement(): [boolean, string, string] {
        return this._adapterGroupManagement;
    }

    set adapterGroupManagement(value: [boolean, string, string]) {
        this._adapterGroupManagement = value;
    }

    get adapterGroupRegisterManagement(): [boolean, string] {
        return this._adapterGroupRegisterManagement;
    }

    set adapterGroupRegisterManagement(value: [boolean, string]) {
        this._adapterGroupRegisterManagement = value;
    }

    get switchDeviceList(): [boolean, string, string] {
        return this._switchDeviceList;
    }

    set switchDeviceList(value: [boolean, string, string]) {
        this._switchDeviceList = value;
    }

    get switchDeviceManagement(): [boolean, string, string] {
        return this._switchDeviceManagement;
    }

    set switchDeviceManagement(value: [boolean, string, string]) {
        this._switchDeviceManagement = value;
    }

    get probeConf(): [boolean, string, string] {
        return this._probeConf;
    }

    set probeConf(value: [boolean, string, string]) {
        this._probeConf = value;
    }

    get logManagement(): [boolean, string, string] {
        return this._logManagement;
    }

    set logManagement(value: [boolean, string, string]) {
        this._logManagement = value;
    }

    get workOrderManage(): [boolean, string, string] {
        return this._workOrderManage;
    }

    set workOrderManage(value: [boolean, string, string]) {
        this._workOrderManage = value;
    }

    get installRecord(): [boolean, string, string] {
        return this._installRecord;
    }

    set installRecord(value: [boolean, string, string]) {
        this._installRecord = value;
    }

    get wxEdit(): [boolean, string, string] {
        return this._wxEdit;
    }

    set wxEdit(value: [boolean, string, string]) {
        this._wxEdit = value;
    }

    get applicationStore(): [boolean, string, string] {
        return this._applicationStore;
    }

    set applicationStore(value: [boolean, string, string]) {
        this._applicationStore = value;
    }

    get visitorCertificationRecord(): [boolean, string, string] {
        return this._visitorCertificationRecord;
    }

    set visitorCertificationRecord(value: [boolean, string, string]) {
        this._visitorCertificationRecord = value;
    }
}
