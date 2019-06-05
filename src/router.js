import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home/Home.vue";
import bridgeAdd from "./views/Home/bridgeManage/bridgeAdd/bridgeAdd.vue";
import bridgeInfo from "./views/Home/bridgeManage/bridgeInfo/bridgeInfo.vue";
import bridgeComponents from "./views/Home/bridgeComponents/bridgeComponents.vue";
import Count from "./views/Home/bridgeManage/Count.vue";
import Login from "./views/Login/Login.vue";
import Directive from "./apis/directive.vue";
import menuRole from "./views/Home/menu/menuRole.vue";
import menuManage from "./views/Home/menu/menuManage.vue";
import menuUser from "./views/Home/menu/menuUser.vue";
import menuFunction from "./views/Home/menu/menuFunction.vue";
import menuFunctionManage from "./views/Home/menu/menuFunctionManage";
import menuRolePermission from "./views/Home/menu/menuRolePermission";
import menuOrganization from "./views/Home/menu/menuOrganization";
import bridgeDisease from "./views/Home/bridgeDisease/bridgeDisease.vue";
import bridgeInspection from "./views/Home/bridgeInspection/bridgeInspection";
import bridgeDiseaseRecord from "./views/Home/bridgeDisease/bridgeDiseaseRecord.vue";
import bridgeDiseaseRecordInfo from "./views/Home/bridgeDisease/bridgeDiseaseRecordInfo.vue";
import bridgeInspectionInfo from "./views/Home/bridgeInspection/bridgeInspectionInfo";
import bridgeDiseaseInfo from "./views/Home/bridgeDisease/bridgeDiseaseInfo";
import inspectionInfo from "./views/Home/bridgeInspection/inspectionInfo";
import bridgeInspectionRecord from "./views/Home/bridgeInspection/bridgeInspectionRecord";
import bridgeRecordInfo from "./views/Home/bridgeInspection/bridgeRecordInfo";
import bridgeMaintenance from "./views/Home/bridgeMaintenance/bridgeMaintenance";
import bridgeMaintenanceInfo from "./views/Home/bridgeMaintenance/bridgeMaintenanceInfo";
import bridgeMaintenanceRecrod from "./views/Home/bridgeMaintenance/bridgeMaintenanceRecrod";
import bridgeMaintenanceRecrodinfo from "./views/Home/bridgeMaintenance/bridgeMaintenanceRecrodinfo";
import bridgeechat from "./views/Home/bridgeechat";
import bridgeRegularInspectionInfo from "./views/Home/bridgeInspection/bridgeRegularInspectionInfo";
import bridgeRegularRecordInfo from "./views/Home/bridgeInspection/bridgeRegularRecordInfo";
import bridgeSpecialInspectionInfo from "./views/Home/bridgeInspection/bridgeSpecialInspectionInfo";
import bridgeSpecialRecordInfo from "./views/Home/bridgeInspection/bridgeSpecialRecordInfo";
import bridgeStructureInfo from "./views/Home/bridgeManage/bridgeStructureInfo/bridgeStructureInfo";
import bridgeDiseaseAdd from "./views/Home/bridgeDisease/bridgeDiseaseAdd";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "",
      redirect: "/bridgeechat"
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: { requireAuth: true },
      children: [
        {
          path: "/bridgeadd",
          name: "bridgeadd",
          meta: { requireAuth: true },
          component: bridgeAdd
        },
        {
          path: "/bridgeinfo",
          name: "bridgeinfo",
          meta: { requireAuth: true },
          component: bridgeInfo
        },
        {
          path: "/count",
          name: "Count",
          meta: { requireAuth: true },
          component: Count
        },

        {
          path: "/menurole",
          name: "menurole",
          meta: { requireAuth: true },
          component: menuRole
        },
        {
          path: "/menumanage",
          name: "menumanage",
          meta: { requireAuth: true },
          component: menuManage
        },
        {
          path: "/menuuser",
          name: "menuuser",
          meta: { requireAuth: true },
          component: menuUser
        },
        {
          path: "/menufunction",
          name: "menufunction",
          meta: { requireAuth: true },
          component: menuFunction
        },
        {
          path: "/menufunctionmanage",
          name: "menufunctionmanage",
          meta: { requireAuth: true },
          component: menuFunctionManage
        },
        {
          path: "/menurolepermission",
          name: "menurolepermission",
          meta: { requireAuth: true },
          component: menuRolePermission
        },
        {
          path: "/menuorganization",
          name: "menuorganization",
          meta: { requireAuth: true },
          component: menuOrganization
        },
        {
          path: "/bridgecomponents",
          name: "bridgecomponents",
          meta: { requireAuth: true },
          component: bridgeComponents
        },
        {
          path: "/bridgeinspection",
          name: "bridgeinspection",
          meta: { requireAuth: true },
          component: bridgeInspection
        },
        {
          path: "/bridgedisease/:bridgeCode",
          name: "bridgedisease",
          meta: { requireAuth: true },
          component: bridgeDisease
        },
        {
          path: "/bridgeDiseaseRecord/:diseaseId",
          name: "bridgeDiseaseRecord",
          meta: { requireAuth: true },
          component: bridgeDiseaseRecord
        },
        {
          path: "/bridgediseaseinfo",
          name: "bridgediseaseinfo",
          meta: { requireAuth: true },
          component: bridgeDiseaseInfo
        },
        {
          path: "/bridgeDiseaseRecordInfo",
          name: "bridgeDiseaseRecordInfo",
          meta: { requireAuth: true },
          component: bridgeDiseaseRecordInfo
        },
        {
          path: "/inspectionInfo",
          name: "inspectionInfo",
          meta: { requireAuth: true },
          component: inspectionInfo
        },
        {
          path: "/bridgeInspectionInfo",
          name: "bridgeInspectionInfo",
          meta: { requireAuth: true },
          component: bridgeInspectionInfo
        },

        {
          path: "/bridgeInspectionRecord/:planId",
          name: "bridgeInspectionRecord",
          meta: { requireAuth: true },
          component: bridgeInspectionRecord
        },
        {
          path: "/bridgeRecordInfo",
          name: "bridgeRecordInfo",
          meta: { requireAuth: true },
          component: bridgeRecordInfo
        },
        {
          path: "/bridgeMaintenance",
          name: "bridgeMaintenance",
          meta: { requireAuth: true },
          component: bridgeMaintenance
        },
        {
          path: "/bridgeMaintenanceInfo",
          name: "bridgeMaintenanceInfo",
          meta: { requireAuth: true },
          component: bridgeMaintenanceInfo
        },
        {
          path: "/bridgeMaintenanceRecrod/:planId",
          name: "bridgeMaintenanceRecrod",
          meta: { requireAuth: true },
          component: bridgeMaintenanceRecrod
        },
        {
          path: "/bridgeMaintenanceRecrodinfo",
          name: "bridgeMaintenanceRecrodinfo",
          meta: { requireAuth: true },
          component: bridgeMaintenanceRecrodinfo
        },

        {
          path: "/bridgeechat",
          name: " bridgeechat",
          meta: { requireAuth: true },
          component: bridgeechat
        },
        {
          path: "/bridgeRegularInspectionInfo",
          name: " bridgeRegularInspectionInfo",
          meta: { requireAuth: true },
          component: bridgeRegularInspectionInfo
        },
        {
          path: "/bridgeRegularRecordInfo",
          name: "bridgeRegularRecordInfo",
          meta: { requireAuth: true },
          component: bridgeRegularRecordInfo
        },
        {
          path: "/bridgeSpecialInspectionInfo",
          name: "bridgeSpecialInspectionInfo",
          meta: { requireAuth: true },
          component: bridgeSpecialInspectionInfo
        },
        {
          path: "/bridgeSpecialRecordInfo",
          name: "bridgeSpecialRecordInfo",
          meta: { requireAuth: true },
          component: bridgeSpecialRecordInfo
        },
        {
          path: "/bridgeStructureInfo",
          name: " bridgeStructureInfo",
          meta: { requireAuth: true },
          component: bridgeStructureInfo
        },
        {
          path: "/bridgeDiseaseAdd",
          name: "bridgediseaseadd",
          meta: { requireAuth: true },
          component: bridgeDiseaseAdd
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },

    {
      path: "/directive",
      name: "directive",
      meta: { requireAuth: true },
      component: Directive
    }
  ]
});
