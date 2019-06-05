<template>
  <div class="birdgecomponents-box">
    <bridgeComponentsName :componentsList="componentsList" @submitForm="submitForm"></bridgeComponentsName>
    <bridgeComponentsItem
      :componentsList="componentsList"
      :wall="wall"
      :slope="slope"
      :sideWalk="sideWalk"
      :Railing="Railing"
      ref="bridgeComponentsItem"
    ></bridgeComponentsItem>
  </div>
</template>
<script>
import bridgeComponentsName from "./bridgeComponentsName";
import bridgeComponentsItem from "./bridgeComponentsItem";
import axios from "axios";
import store from "../../../vuex/store";
export default {
  components: {
    bridgeComponentsName,
    bridgeComponentsItem
  },
  props: {},
  data() {
    return {
      componentsList: [
        { id: 1, name: "翼墙、耳墙", mark: null }, //0
        { id: 2, name: "锥坡、护坡", mark: null }, //0
        { id: 3, name: "桥墩", mark: null }, //1
        // { id: 4, name: "桥台", mark: null }, //0
        { id: 5, name: "河床", mark: null },
        { id: 6, name: "调治构造物", mark: null },
        { id: 7, name: "墩台基础", mark: null }, //1
        { id: 8, name: "支座", mark: null }, //1
        { id: 9, name: "上部承重构件", mark: null }, //1
        { id: 10, name: "上部一般构件", mark: null }, //1
        { id: 11, name: "桥面铺装", mark: null },
        { id: 12, name: "伸缩缝装置", mark: null }, //1
        { id: 13, name: "排水系统", mark: null },
        { id: 14, name: "照明", mark: null },
        { id: 15, name: "人行道", mark: null },
        { id: 16, name: "栏杆、护栏", mark: null }
      ],
      wall: [
        { id: 0, name: "0个", mark: null },
        { id: 1, name: "1个", mark: null },
        { id: 2, name: "2个", mark: null },
        { id: 3, name: "3个", mark: null },
        { id: 4, name: "4个", mark: null }
      ],
      slope: [
        { id: 0, name: "0个", mark: null },
        { id: 1, name: "1个", mark: null },
        { id: 2, name: "2个", mark: null },
        { id: 3, name: "3个", mark: null },
        { id: 4, name: "4个", mark: null }
      ],
      sideWalk: [
        { id: 0, name: "0个", mark: null },
        { id: 1, name: "1个", mark: null },
        { id: 2, name: "2个", mark: null }
      ],
      Railing: [
        { id: 0, name: "0个", mark: null },
        { id: 1, name: "1个", mark: null },
        { id: 2, name: "2个", mark: null }
      ]
    };
  },
  methods: {
    submitForm() {
      this.$refs.bridgeComponentsItem.submitForm("bridgeComponentsForm");
    }
  }
};
</script>
<style lang="stylus" scoped>
.birdgecomponents-box {
  display: flex;
}
</style>
