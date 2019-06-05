<template>
  <div class="birdgecomponents-title-box">
    <div class="birdgecomponents-title">
      <el-tag type="info">部件类别</el-tag>
      <el-card class="box-card">
        <div v-for="item in componentsList" :key="item.id" class="box-card-item">{{item.name}}</div>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from "../../../vuex/store";
export default {
  props: {
    componentsList: Array
  },
  data() {
    return {};
  },
  methods: {
    submitForm() {
      console.log("请求父组件方法");
      this.$emit("submitForm");
    }
  }
};
</script>
<style lang="stylus" scoped>
menu-shadow() {
  border-radius: 4px;
  border: 4px solid #E9EEF3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
}

.birdgecomponents-title-box {
  flex: 1;

  .birdgecomponents-title {
    menu-shadow();

    .el-tag {
      text-align: center;
      width: 100%;
    }

    .box-card-item {
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }
  }
}

.next-button {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
  background-color: #545c64;
  color: #eee;
  margin-left: 60px;
  margin-top: 20px;
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
