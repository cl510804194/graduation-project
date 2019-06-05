<template>
  <div>
    <div class="structure-input">
      <div class="change-struc">
        <el-select v-model="structForm.bridgeCode" @change="this.getStructure" placeholder="请选择桥梁">
          <el-option
            v-for="item in bridgeNameList"
            :key="item.bridgeCode"
            :label="item.bridgeName"
            :value="item.bridgeCode"
          ></el-option>
        </el-select>
      </div>
      <div class="change-struc">
        <el-select @change="this.struChange" v-model="strucValue" placeholder="查询桥梁结构">
          <el-option
            v-for="item in strucOptions"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="change-struc">
        <el-button @click="changeBoolStru">添加构件</el-button>
      </div>
    </div>
    <div class="structrue-box">
      <div v-if="boolStru===2" class="tree-box">
        <el-tree
          :data="dataList"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :highlight-current="true"
          :default-expand-all="true"
        ></el-tree>
        <div class="search-box">
          <el-row :gutter="20">
            <el-col :span="24">
              <label for>
                构件名称:
                <span>{{structForm.componentName}}</span>
              </label>
            </el-col>
            <el-col :span="24">
              <label for>
                构件Id:
                <span>{{structForm.componentIdP}}</span>
              </label>
            </el-col>
            <el-col :span="24">
              <label for>
                构件Code:
                <span>{{structForm.componentCode}}</span>
              </label>
            </el-col>
            <el-col :span="24">
              <label for>
                结构分类:
                <span>{{structForm.bridgeEntityTypeName}}</span>
              </label>
            </el-col>
            <el-col :span="24">
              <label for>
                部件分类:
                <span>{{structForm.partName}}</span>
              </label>
            </el-col>
            <el-col :span="24">
              <label for>
                构件位置:
                <span>{{structForm.componentLocation}}</span>
              </label>
            </el-col>
            <el-col :span="24">
              <label for>
                构件材料:
                <span>{{structForm.componentMaterials}}</span>
              </label>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="boolStru===3" style="width: 100%; text-align: center;">
        <div>
          <el-select
            @change="this.struBridgeChange"
            v-model="strucBridgeValue"
            placeholder="请选择桥梁结构"
          >
            <el-option
              v-for="item in strucBridgeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>

        <el-form label-width="100px" size="mini" inline>
          <div v-if="strucBridgeValue===1">
            <el-tag type="info">上部结构</el-tag>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="上部承重构件"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[10].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in bearingOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="上部一般构件"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[11].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in bearingOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="支座"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[9].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in supportOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
          </div>
          <div v-if="strucBridgeValue===2">
            <el-tag type="info">下部结构</el-tag>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="桥台"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[5].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in abutmentOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="翼墙、耳墙"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[0].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in bearingOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="锥坡、护坡"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[1].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in slopeOptins"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>

            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="桥墩"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[4].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in pierOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>

            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="墩台基础"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[8].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in pierOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="河床"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[6].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in pierOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="调治构造物"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[7].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in  regulatingOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
          </div>
          <div v-if="strucBridgeValue===3">
            <el-tag type="info">桥面系</el-tag>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="桥面铺装"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[12].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in  matOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="伸缩缝装置"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[13].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in  expansionOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="人行道"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[2].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in  walkOptinos"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="栏杆、护栏"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[3].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in  railingOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="排水系统"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[14].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in  drainageOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
            <bridgeComponent :bridgeCode="structForm.bridgeCode">
              <el-form-item slot="header" label="照明"></el-form-item>
              <i class="struc-number" slot="number">{{bridgeItemList[15].componentNum}}个</i>
              <el-option
                slot="footer"
                v-for="item in  IlluminatedOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </bridgeComponent>
          </div>
        </el-form>
      </div>

      <div class="struc-table" v-if="boolStru===1">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="componentName" label="构件名称"></el-table-column>
          <el-table-column prop="componentCode" label="构件Code"></el-table-column>
          <el-table-column prop="componentLocation" label="构件位置"></el-table-column>
          <el-table-column prop="componentMaterials" label="构件材料"></el-table-column>
          <el-table-column prop="partName" label="部件类型"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import bridgeComponent from "../bridgeAdd/bridgeComponents.vue";
import bridgeDisease from "../../bridgeDisease/bridgeDisease.vue";
export default {
  components: {
    bridgeDisease,

    bridgeComponent
  },
  data() {
    return {
      strucNumber: [],
      truebool: true,
      boolStru: 1,

      tableData: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      bridgeItemList: [
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        },
        {
          bridgeCode: null,
          bridgePartId: null,
          componentNum: 0,
          partName: null
        }
      ],
      strucValue: "",
      value: "",
      data: [],
      strucOptions: [
        { id: 1, value: "查询构件(表格格式)" },
        { id: 2, value: "查询构件(树形格式)" }
      ],
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
        partName: null,
        componentLocation: null,
        componentMaterials: null,
        componentCode: null
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
      strucBridgeOptions: [
        {
          id: 1,
          name: "上部结构"
        },
        {
          id: 2,
          name: "下部结构"
        },
        {
          id: 3,
          name: "桥面系"
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
        { id: 2, name: "级配碎石" },
        { id: 3, name: "水泥稳定土" },
        { id: 4, name: "水泥混凝土" },
        { id: 5, name: "水泥砂浆" }
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
        { id: 2, name: "亚克力材料" },
        { id: 3, name: "树脂材料" }
      ],
      strucBridgeValue: 1
    };
  },
  methods: {
    changeBoolStru() {
      this.boolStru = 3;
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    struBridgeChange(data) {},
    struChange(data) {
      console.log(data);
      if (data == 1) {
        this.boolStru = 1;
      }
      if (data == 2) {
        this.boolStru = 2;
      }
    },
    getStructure() {
      var that = this;
      that.getBridgeItem();
      this.getComponent();

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
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[0].children[0].children.push(newChild);
              }

              if (that.data[x].partName === "上部一般构件") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[0].children[1].children.push(newChild);
              }
              if (that.data[x].partName === "支座") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
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
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[0].children.push(newChild);
              }
              if (that.data[x].partName === "锥坡护坡") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[1].children.push(newChild);
              }
              if (that.data[x].partName === "桥墩") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[2].children.push(newChild);
              }
              if (that.data[x].partName === "桥台") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[3].children.push(newChild);
              }
              if (that.data[x].partName === "墩台基础") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[4].children.push(newChild);
              }
              if (that.data[x].partName === "河床") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[5].children.push(newChild);
              }
              if (that.data[x].partName === "调治构造物") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
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
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[0].children.push(newChild);
              }
              if (that.data[x].partName === "伸缩缝装置") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[1].children.push(newChild);
              }
              if (that.data[x].partName === "人行道") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[2].children.push(newChild);
              }
              if (that.data[x].partName === "栏杆护栏") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[3].children.push(newChild);
              }
              if (that.data[x].partName === "排水系统") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[4].children.push(newChild);
              }
              if (that.data[x].partName === "照明标志") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["id"] = that.data[x].componentId;
                newChild["componentName"] = that.data[x].componentName;
                newChild["partName"] = that.data[x].partName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["componentCode"] = that.data[x].componentCode;
                newChild["componentMaterials"] =
                  that.data[x].componentMaterials;
                newChild["componentLocation"] = that.data[x].componentLocation;
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
    getBridgeItem() {
      var that = this;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/bridge/getBridge", {
          bridge: {
            bridgeCode: this.structForm.bridgeCode
          }
        })
        .then(function(response) {
          that.bridgeItemList = [...response.data.data.list[0].bridgeParts];
          console.log(that.bridgeItemList);
        })
        .catch(function(error) {});
    },
    getComponent() {
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
          console.log("3553");
          console.log(response.data.data.list);
          that.tableData = [...response.data.data.list];
        })
        .catch(function(error) {
          console.log(error);
          console.log("??>?");
        });
    },
    handleNodeClick(data) {
      console.log(data);
      this.structForm.bridgeEntityTypeName = data.bridgeEntityTypeName;
      this.structForm.componentName = data.label;
      this.structForm.partName = data.partName;
      this.structForm.componentIdP = data.componentId;
      this.structForm.componentLocation = data.componentLocation;
      this.structForm.componentMaterials = data.componentMaterials;
      this.structForm.componentCode = data.componentCode;
    }
  },
  mounted() {
    this.getBridge();
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
  width: 230px !important;
  margin-top: 10px;
  menu-shadow();
  margin-right: 10px;
  min-height: 500px;
}

.el-col-24 {
  margin-bottom: 30px !important;
  text-align: center !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
  font-size: 20px !important;
}

.structure-input {
  display: inline-block;
}

.structrue-box {
  display: flex;
  menu-shadow();
  padding: 10px;
  margin-top: 10px;
}

.struc-table {
  width: 100%;
  menu-shadow();
}

.el-form--inline .el-form-item {
  margin-right: 0px !important;
}

.el-form-item .el-form-item--mini {
  margin-right: 0px !important;
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

.struc-number {
  font-size: 12px;
  color: red;
}

.change-struc {
  display: inline-block;
  margin: 10px;
  menu-shadow();
}

.search-box {
  margin-top: 10px;
  menu-shadow();
  margin-left: 140px;
  margin-right: 10px;
  width: 400px;
  padding: 10px;
  height: 450px;
  background: #FFF;
}

.tree-box {
  display: flex;
}
</style>