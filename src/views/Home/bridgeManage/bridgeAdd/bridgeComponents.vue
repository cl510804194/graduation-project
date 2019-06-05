<template>
  <div class="bridge-component">
    <slot name="header"></slot>
    <slot name="number"></slot>
    <el-form-item label="构件名称 :" label-width="80px">
      <el-input class="component-bridge-name" v-model="componentForm.componentName"></el-input>
    </el-form-item>
    <el-form-item label="构件编码 :" label-width="80px">
      <el-input v-model="componentForm.componentCode"></el-input>
    </el-form-item>
    <el-form-item label="构件位置 :" label-width="80px">
      <el-input
        class="component-bridge-number"
        v-model="componentForm.componentBridgeNum"
        ref="uniqe"
        v-show="show"
      ></el-input>
      <i v-show="show">联</i>
      <el-input
        class="component-bridge-number"
        v-model="componentForm.compoentStrideNum"
        ref="stride"
        v-show="show"
      ></el-input>
      <i v-show="show">跨</i>

      <el-input v-model="componentForm.componentLocation"></el-input>
    </el-form-item>
    <el-form-item slot="footer" label="构件材料 :" label-width="80px">
      <el-select v-model="componentForm.componentMaterials" placeholder="请选择">
        <slot name="footer"></slot>
      </el-select>
    </el-form-item>

    <el-button @click="addComponent($event)">添加</el-button>
  </div>
</template>
<script>
import store from "../../../../vuex/store";
import axios from "axios";
export default {
  data() {
    return {
      show: true,
      componentForm: {
        componentBridgeNum: null,
        compoentStrideNum: null,
        componentId: null,
        bridgeCode: null,
        bridgeEntityTypeName: null,
        partName: null,
        componentName: null,
        componentLocation: null,
        componentMaterials: null,
        componentCode: null
      }
    };
  },
  props: {
    bridgeCode: String
  },
  methods: {
    addComponent(e) {
      var that = this;
      console.log(e.currentTarget);
      let boolType =
        e.currentTarget.parentElement.firstElementChild.firstElementChild
          .innerHTML;
      console.log(boolType);
      if (
        boolType == "上部承重构件" ||
        boolType == "上部一般构件" ||
        boolType == "支座"
      ) {
        that.componentForm.bridgeEntityTypeName = "上部结构";
        console.log(that.componentForm.bridgeEntityTypeName);
      }
      if (
        boolType == "翼墙、耳墙" ||
        boolType == "锥坡、护坡" ||
        boolType == "桥墩" ||
        boolType == "桥台" ||
        boolType == "墩台基础" ||
        boolType == "河床" ||
        boolType == "调治构造物"
      ) {
        that.componentForm.bridgeEntityTypeName = "下部结构";
        console.log(that.componentForm.bridgeEntityTypeName);
      }
      if (
        boolType == "桥面铺装" ||
        boolType == "伸缩缝装置" ||
        boolType == "人行道" ||
        boolType == "栏杆、护栏" ||
        boolType == "排水系统" ||
        boolType == "照明"
      ) {
        that.componentForm.bridgeEntityTypeName = "桥面系";
      }
      let componentLocation =
        that.componentForm.componentBridgeNum +
        "梁" +
        that.componentForm.compoentStrideNum +
        "跨" +
        that.componentForm.componentLocation;
      axios
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/bridge/addBridgeComponent",
          {
            componentId: that.componentForm.componentId,
            bridgeCode: this.bridgeCode,
            bridgeEntityTypeName: that.componentForm.bridgeEntityTypeName,
            partName: boolType,
            componentCode: that.componentForm.componentCode,
            componentName:
              that.componentForm.componentCode +
              that.componentForm.componentName,
            componentLocation: componentLocation,
            componentMaterials: that.componentForm.componentMaterials
          }
        )
        .then(res => {
          console.log(res.data.ret);
          if (res.data.ret == 0) {
            that.componentForm.componentId = null;
            (that.componentForm.bridgeEntityTypeName = null),
              (that.componentForm.componentName = null),
              (that.componentForm.componentLocation = null),
              (that.componentForm.componentMaterials = null);
            that.componentForm.componentCode = null;
          }
          if (res.data.ret == 1) {
            alert("该构件数量已达过上限");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {
    let uniqeInnerHTML = this.$refs.uniqe.$el.parentElement.parentElement
      .parentElement.firstElementChild.firstElementChild.innerHTML;
    console.log(uniqeInnerHTML);
    if (uniqeInnerHTML === "桥台") {
      this.show = false;
    } else {
      this.show = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-tag {
  display: block;
  width: 100%;
}

.component-bridge-number {
  width: 30px !important;
  height: 20px !important;
}

.component-bridge-name {
  width: 100px !important;
}

label {
  font-size: 14px;
}

.el-button {
  margin-left: 15px;
  padding: 7px 20px;
}

.bridge-component {
  padding: 10px;

  .el-input {
  }
}
</style>