<template>
  <div>
    <div class="structure-input">
      <el-select v-model="structForm.bridgeCode" @change="this.getStructure" placeholder="请选择桥梁">
        <el-option
          v-for="item in bridgeNameList"
          :key="item.bridgeCode"
          :label="item.bridgeName"
          :value="item.bridgeCode"
        ></el-option>
      </el-select>
    </div>
    <div class="structrue-box">
      <div>
        <el-tree
          :data="dataList"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :highlight-current="true"
          :default-expand-all="true"
        ></el-tree>
      </div>
      <div>
        <bridgeDisease
          :bridgeEntityTypeName="structForm.bridgeEntityTypeName"
          :bridgeCode="structForm.bridgeCode"
          :partName="structForm.partName"
          :componentIdP="structForm.componentIdP"
        ></bridgeDisease>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import bridgeComponent from "../../Home/bridgeManage/bridgeAdd/bridgeComponents";
import bridgeDisease from "./bridgeDisease.vue";
export default {
  components: {
    bridgeDisease,
    bridgeComponent
  },
  data() {
    return {
      truebool: true,
      value: "",
      bridgeCodeRou: this.$route.params.bridgeCode,
      data: [],

      defaultProps: {
        children: "children",
        label: "label"
      },
      bridgeNameList: [],
      dataList: [
        {
          id: 1,
          label: "上部结构",
          children: []
        },
        {
          id: 2,
          label: "下部结构",
          children: []
        },
        {
          id: 3,
          label: "桥面系",
          children: []
        }
      ],
      structForm: {
        bridgeCode: null,
        bridgeEntityTypeName: null,
        componentIdP: null,
        partName: null
      },
      bearingOptions: [
        {
          id: 1,
          name: "砖木"
        },
        {
          id: 2,
          name: "砖混"
        },
        {
          id: 3,
          name: "钢筋混凝土"
        },
        {
          id: 4,
          name: "钢结构"
        },
        {
          id: 5,
          name: "钢一钢筋混凝土"
        }
      ],
      supportOptions: [
        { id: 1, name: "钢支座" },
        { id: 2, name: "是否带滑动能力划分支座" },
        { id: 3, name: "橡胶支座" }
      ],
      slopeOptins: [{ id: 1, name: "浆砌片石" }],
      pierOptions: [
        { id: 1, name: "木料" },
        { id: 2, name: "石料" },
        { id: 3, name: "混凝土" },
        { id: 4, name: "钢筋混凝土" },
        { id: 5, name: "钢材" }
      ],
      abutmentOptions: [{ id: 1, name: "石砌" }, { id: 2, name: "素混凝土" }],
      regulatingOptions: [
        { id: 1, name: "导流建筑物" },
        { id: 2, name: "挑流建筑物" },
        { id: 3, name: "固底建筑物" },
        { id: 4, name: "边坡加固物" }
      ],
      matOptions: [
        { id: 1, name: "沥青混凝土" },
        { id: 1, name: "级配碎石" },
        { id: 1, name: "水泥稳定土" },
        { id: 1, name: "水泥混凝土" },
        { id: 1, name: "水泥砂浆" }
      ],
      expansionOptions: [
        { id: 1, name: "镀锌薄钢板" },
        { id: 2, name: "橡胶伸缩缝" }
      ],
      walkOptinos: [
        { id: 1, name: "透水砖" },
        { id: 2, name: "面包砖" },
        { id: 3, name: "混凝土" },
        { id: 4, name: "鹅卵石" }
      ],
      railingOptions: [
        { id: 1, name: "镀锌管" },
        { id: 2, name: "不锈钢" },
        { id: 3, name: "木材" }
      ],
      drainageOptions: [{ id: 1, name: "PVC塑料管" }],
      IlluminatedOptions: [
        { id: 1, name: "金属材料" },
        { id: 1, name: "亚克力材料" },
        { id: 1, name: "树脂材料" }
      ]
    };
  },
  methods: {
    getStructure() {
      var that = this;

      axios
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/bridge/getBridgeComponent",
          {
            bridgeComponent: {
              bridgeCode: this.structForm.bridgeCode
            }
          }
        )
        .then(function(response) {
          that.data = [...response.data.data.list];
          console.log(153);
          console.log(that.data);
          that.dataList = [
            {
              id: 1,
              label: "上部结构",
              children: [
                {
                  id: 1,
                  label: "上部承重构件",
                  children: []
                },
                {
                  id: 2,
                  label: "上部一般构件",
                  children: []
                },
                {
                  id: 3,
                  label: "支座",
                  children: []
                }
              ]
            },
            {
              id: 2,
              label: "下部结构",
              children: [
                {
                  id: 1,
                  label: "翼墙耳墙",
                  children: []
                },
                {
                  id: 2,
                  label: "锥坡护坡",
                  children: []
                },
                {
                  id: 3,
                  label: "桥墩",
                  children: []
                },
                {
                  id: 4,
                  label: "桥台",
                  children: []
                },
                {
                  id: 5,
                  label: "墩台基础",
                  children: []
                },
                {
                  id: 6,
                  label: "河床",
                  children: []
                },
                {
                  id: 7,
                  label: "调治构造物",
                  children: []
                }
              ]
            },
            {
              id: 3,
              label: "桥面系",
              children: [
                {
                  id: 1,
                  label: "桥面铺装",
                  children: []
                },
                {
                  id: 2,
                  label: "伸缩缝装置",
                  children: []
                },
                {
                  id: 3,
                  label: "人行道",
                  children: []
                },
                {
                  id: 4,
                  label: "栏杆护栏",
                  children: []
                },
                {
                  id: 5,
                  label: "排水系统",
                  children: []
                },
                {
                  id: 6,
                  label: "照明标志",
                  children: []
                }
              ]
            }
          ];

          for (let x in that.data) {
            if (that.data[x].bridgeEntityTypeName === "上部结构") {
              if (that.data[x].partName === "上部承重构件") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[0].children[0].children.push(newChild);
              }

              if (that.data[x].partName === "上部一般构件") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[0].children[1].children.push(newChild);
              }
              if (that.data[x].partName === "支座") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[0].children[2].children.push(newChild);
              }
            }
          }
          for (let x in that.data) {
            if (that.data[x].bridgeEntityTypeName === "下部结构") {
              if (that.data[x].partName === "翼墙耳墙") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[0].children.push(newChild);
              }
              if (that.data[x].partName === "锥坡护坡") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[1].children.push(newChild);
              }
              if (that.data[x].partName === "桥墩") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[2].children.push(newChild);
              }
              if (that.data[x].partName === "桥台") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[3].children.push(newChild);
              }
              if (that.data[x].partName === "墩台基础") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[4].children.push(newChild);
              }
              if (that.data[x].partName === "河床") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[5].children.push(newChild);
              }
              if (that.data[x].partName === "调治构造物") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[6].children.push(newChild);
              }
            }
          }
          for (let x in that.data) {
            if (that.data[x].bridgeEntityTypeName === "桥面系") {
              if (that.data[x].partName === "桥面铺装") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[0].children.push(newChild);
              }
              if (that.data[x].partName === "伸缩缝装置") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[1].children.push(newChild);
              }
              if (that.data[x].partName === "人行道") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[2].children.push(newChild);
              }
              if (that.data[x].partName === "栏杆护栏") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[3].children.push(newChild);
              }
              if (that.data[x].partName === "排水系统") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[4].children.push(newChild);
              }
              if (that.data[x].partName === "照明标志") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["id"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[5].children.push(newChild);
              }
            }
          }
        })
        .catch(function(error) {});
    },
    getBridge() {
      var that = this;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/bridge/getBridge", {})
        .then(function(response) {
          //console.log(response.data.data.list);
          that.bridgeNameList = [...response.data.data.list];
        })
        .catch(function(error) {});
    },
    handleNodeClick(data) {
      console.log(data);
      this.structForm.bridgeEntityTypeName = data.bridgeEntityTypeName;
      this.structForm.partName = data.partName;
      this.structForm.componentName = data.label;
      this.structForm.componentIdP = data.componentId;
      console.log(this.structForm);
    }
  },
  mounted() {
    this.getBridge();
    this.structForm.bridgeCode = this.bridgeCodeRou;
    // axios
    //   .post(
    //     "http://bridge.vipgz1.idcfengye.com/api/bridge/getBridgeComponent",
    //     {}
    //   )
    //   .then(res => {
    //     console.log(res.data.data);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }
};
</script>
<style lang="stylus">
menu-shadow() {
  border-radius: 4px;
  border: 4px solid #E9EEF3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
}

.el-tree {
  width: 178px;
  margin-top: 10px;
  menu-shadow();
  margin-right: 10px;
  min-height: 500px;
}

.structure-input {
  menu-shadow();
  display: inline-block;
}

.structrue-box {
  display: flex;
}

.el-form--inline .el-form-item {
  margin-right: 0px;
}

.el-tag {
  display: block;
  width: 100%;
}

label {
  font-size: 14px;
}

.el-button {
  padding: 7px 20px;
}

.bridge-component {
  padding: 20px;

  .el-input {
    width: 130px;
  }
}
</style>