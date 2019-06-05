<template>
  <div class="brigde">
    <div class="bridge-steps">
      <el-steps :active="$store.state.active" finish-status="success" direction="vertical">
        <el-step title="识别"></el-step>
        <el-step title="结构"></el-step>
        <el-step title="经济"></el-step>
        <el-step title="档案"></el-step>
        <el-step title="桥牌"></el-step>
      </el-steps>

      <el-button v-if="show" class="next-button" style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
    <div class="bridge-collapse">
      <bridgeIdent ref="bridgeIdent"></bridgeIdent>
      <bridgeStructure ref="bridgeStructure" :identBridgeCode="bridgeCode"></bridgeStructure>
      <bridgeEconomic ref="bridgeEconomic" :identBridgeCode="bridgeCode"></bridgeEconomic>
      <bridgeArchives ref="bridgeArchives" :identBridgeCode="bridgeCode"></bridgeArchives>
      <bridgeCard
        ref="bridgeCard"
        :identBridgeCode="bridgeCode"
        :identBridgeName="bridgeName"
        :identRoadNumber="roadNumber"
        :identRoadName="roadName"
        :identBridgeCenterMilestone="bridgeCenterMilestone"
        :identBridgeType="bridgeType"
      ></bridgeCard>
      <bridgeComponents ref="bridgeComponents" v-if="$store.state.chooseItem===5"></bridgeComponents>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from "../../../../vuex/store";
import bridgeIdent from "./bridgeIdent";
import bridgeStructure from "./bridgeStructure";
import bridgeEconomic from "./bridgeEconomic";
import bridgeArchives from "./bridgeArchives";
import bridgeCard from "./bridgeCard";
import bridgeComponents from "../../bridgeComponents/bridgeComponents";
export default {
  components: {
    bridgeIdent,
    bridgeStructure,
    bridgeEconomic,
    bridgeArchives,
    bridgeCard,
    bridgeComponents
  },
  data() {
    return {
      //  active: 0,
      activeName: "1",
      // chooseItem: 0,
      value: "",
      show: true,
      //识别
      bridgeCode: null,
      bridgeName: null,
      roadNumber: null,
      roadName: null,
      bridgeCenterMilestone: null,
      bridgeType: null
    };
  },

  methods: {
    next() {
      if (this.$store.state.active === 0) {
        this.$refs.bridgeIdent.submitForm("sizeForm");
        this.bridgeCode = this.$refs.bridgeIdent.sizeForm.bridgeCode;
        this.$store.state.bridgeCode = this.bridgeCode;
        console.log(this.$store.state.bridgeCode);
        this.bridgeName = this.$refs.bridgeIdent.sizeForm.bridgeName;
        this.roadNumber = this.$refs.bridgeIdent.sizeForm.roadNumber;
        this.roadName = this.$refs.bridgeIdent.sizeForm.roadName;
        this.bridgeCenterMilestone = this.$refs.bridgeIdent.sizeForm.bridgeCenterMilestone;
        this.bridgeType = this.$refs.bridgeIdent.sizeForm.bridgeType;
      }
      if (this.$store.state.active === 1) {
        this.$refs.bridgeStructure.submitForm("structureForm");
      }
      if (this.$store.state.active === 2) {
        this.$refs.bridgeEconomic.submitForm("economicForm");
      }
      if (this.$store.state.active === 3) {
        this.$refs.bridgeArchives.submitForm("archivesForm");
      }
      if (this.$store.state.active === 4) {
        this.$refs.bridgeCard.submitForm("cardForm");
        this.show = false;
        this.$store.state.active = 0;
        this.$store.state.chooseItem = 0;
        this.$router.push("/bridgeinfo");
      }
      if (this.$store.state.active === 5) {
      }
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="stylus" scoped>
.brigde {
  display: flex;
}

.bridge-steps {
  height: 400px;
  margin-right: 10px;
}

.bridge-collapse {
  flex: 1;
  border-radius: 4px;
  border: 4px solid #E9EEF3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
  padding: 18px;
}

.next-button {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
  background-color: #545c64;
  color: #eee;
  margin: 2px;
  border: 0px;

  &:hover {
    background-color: #eee;
    color: #545c64;
  }

  &:active {
    background-color: #eee;
    color: #545c64;
  }
}
</style>