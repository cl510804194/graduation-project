<template>
  <el-form label-width="110px" size="mini" inline>
    <div class="inspection-header">
      <el-form-item label="检查记录编码:">
        <el-input v-model="menuForm.planCode" disabled></el-input>
      </el-form-item>

      <el-form-item label="检查类型:">
        <el-select v-model="menuForm.checkType" placeholder="请选择检查类型" disabled>
          <el-option
            v-for="item in insprectionTypeOptions"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button class="next-button" style="margin-top: 12px;" @click="submitForm()">下一步</el-button>
    </div>

    <bridgeInsepectionRecordOften
      v-if="menuForm.checkType==0"
      :planList="planList"
      ref="bridgeInsepectionRecordOften"
    ></bridgeInsepectionRecordOften>
    <bridgeInspectionRecrodRegular
      v-if="menuForm.checkType==1"
      :planList="planList"
      ref="bridgeInspectionRecrodRegular"
    ></bridgeInspectionRecrodRegular>
    <bridgeInspectionRecordSpecial
      v-if="menuForm.checkType==2"
      :planList="planList"
      ref="bridgeInspectionRecordSpecial"
    ></bridgeInspectionRecordSpecial>
  </el-form>
</template>
<script>
import axios from "axios";
import inspectionContent from "./components/content";
import bridgeInsepectionRecordOften from "./bridgeInsepectionRecordOften";
import bridgeInspectionRecrodRegular from "./bridgeInspectionRecrodRegular";
import bridgeInspectionRecordSpecial from "./bridgeInspectionRecordSpecial";
export default {
  components: {
    inspectionContent,
    bridgeInsepectionRecordOften,
    bridgeInspectionRecrodRegular,
    bridgeInspectionRecordSpecial
  },
  data() {
    return {
      insprectionTypeOptions: [
        {
          id: 0,
          value: "经常性检查"
        },
        {
          id: 1,
          value: "定期检查"
        },
        {
          id: 2,
          value: "特殊检查"
        }
      ],
      statusOptions: [
        {
          id: 0,
          value: "未完成"
        },
        {
          id: 1,
          value: "已完成"
        },
        {
          id: 2,
          value: "已逾期"
        }
      ],
      invalidOptins: [
        {
          id: 0,
          value: "失效"
        },
        {
          id: 1,
          value: "正常"
        }
      ],
      planList: [],
      getbridgeForm: [],
      getUserList: [],
      menuForm: {
        planId: this.$route.params.planId,
        planCode: null,
        recordId: null,
        recordCode: null,
        bridgeCode: null,
        checkType: null,
        organizationId: null,
        recordPrincipal: null,
        personId: null,
        recorder: null,
        checkDetails: null,
        proposal: null,
        remark: null,
        status2: null,
        checkTime: null,
        createTime: null,
        updateTime: null,
        checkType: null
      }
    };
  },
  methods: {
    getBridge() {
      var that = this;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/bridge/getBridge", {})
        .then(function(response) {
          that.getbridgeForm = [...response.data.data.list];
        })
        .catch(function(error) {});
    },
    getLoginUser() {
      var that = this;

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/user/getUserInfo", {})
        .then(function(response) {
          console.log(response.data.data);
          that.menuForm.bepersonId = response.data.data.personId;
          that.menuForm.bepersonName = response.data.data.personName;
        })
        .catch(function(error) {});
    },
    getUser() {
      var that = this;

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/user/getUser", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
          console.log(response);
          that.getUserList = [...response.data.data.list];
        })
        .catch(function(error) {});
    },
    submitForm() {
      var that = this;
      if (that.menuForm.checkType == 0) {
        this.$refs.bridgeInsepectionRecordOften.submitForm(
          this.menuForm.checkType
        );
      }
      if (that.menuForm.checkType == 1) {
        this.$refs.bridgeInspectionRecrodRegular.submitForm(
          this.menuForm.checkType
        );
      }
      if (that.menuForm.checkType == 2) {
        this.$refs.bridgeInspectionRecordSpecial.submitForm(
          this.menuForm.checkType
        );
      }
    },
    getPlan() {
      var that = this;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/check/getCheckPlan", {
          currentPage: 0,
          pageSize: 0,
          checkPlan: {
            planId: that.menuForm.planId
          }
        })
        .then(function(response) {
          that.planList = [...response.data.data.list];
          console.log(that.planList);
          that.menuForm.planCode = that.planList[0].planCode;
          that.menuForm.checkType = that.planList[0].checkType;
          that.menuForm.planId = that.planList[0].planId;
          that.menuForm.bridgeCode = that.planList[0].bridgeCode;
        })
        .catch(function(error) {});
    }
  },
  mounted: function() {
    this.getPlan();
  }
};
</script>
<style lang="stylus" scoped>
menu-shadow() {
  border-radius: 4px;
  border: 4px solid #E9EEF3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
}

.inspection-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  menu-shadow();
  padding: 5px;

  .el-form-item--mini.el-form-item {
    margin-bottom: 0px;
  }

  .next-button {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
    background-color: #545c64;
    color: #eee;
    border: 0px;
    margin-bottom: 10px;

    &:hover {
      background-color: #eee;
      color: #545c64;
    }

    &:active {
      background-color: #eee;
      color: #545c64;
    }
  }
}

.inspection-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  menu-shadow();
  margin-top: 10px;
  padding-top: 10px;

  .el-date-editor.el-input {
    width: 100%;
  }
}
</style>