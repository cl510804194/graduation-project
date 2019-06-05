<template>
  <div>
    <div class="number-box">
      <el-row :gutter="20" type="flex" justify="space-between">
        <el-col :span="6">
          <div class="sum bridge-long">
            <span>{{bridgeAllLong}}</span>
            <p>桥梁总长</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="sum bridge-number">
            <span>{{bridgeAllNum}}</span>
            <p>桥梁数量</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="sum bridge-cost">
            <span>{{bridgeAllCost}}</span>
            <p>桥梁总造价</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="sum bridge-traffic">
            <span>1453</span>
            <p>桥梁总年日均交通量</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex">
      <el-col :span="18" class="histogram-box" style="height:640px">
        <el-row type="flex">
          <el-col :span="6">
            <div class="histogram" ref="myechart" id="main"></div>
          </el-col>
          <el-col :span="6">
            <div class="histogram" ref="myechart3"></div>
          </el-col>
          <el-col :span="6">
            <div class="histogram" ref="myechart9"></div>
          </el-col>
          <el-col :span="6">
            <div class="histogram" ref="myechart8"></div>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <div class="histogram" ref="myechart11"></div>
          </el-col>
            <el-col :span="6">
            <div class="histogram" ref="myechart10"></div>
          </el-col>
          <el-col :span="6">
            <el-select
              class="echart-select"
              @change="bridgeNameChange()"
              size="mini"
              v-model="bridgeCode"
              placeholder="请选择桥梁"
            >
              <el-option
                v-for="(item,index) in bridgeNameList"
                :key="index"
                :label="item.bridgeName"
                :value="item.bridgeCode"
              ></el-option>
            </el-select>
            <div class="histogram" ref="myechart4"></div>
          </el-col>
          <el-col :span="6">
            <el-cascader
              size="mini"
              expand-trigger="hover"
              :options="dataList"
              v-model="structureCodeOptions"
              @change="structureCodeChange"
            ></el-cascader>
            <div class="histogram" ref="myechart12"></div>
          </el-col>
        
        </el-row>
      </el-col>
      <el-col class="pie-box" :span="6">
        <el-row type="flex">
          <el-col :span="24">
            <div class="pie" ref="myechart5"></div>
            <div class="pie" ref="myechart6"></div>
            <div class="pie" ref="myechart7"></div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- <div style="margin-bottom: 10px;">
      <el-select
        class="echart-select"
        @change="organizationChange()"
        size="mini"
        v-model="organizationId"
        placeholder="请选择"
      >
        <el-option
          v-for="item in organizationOptin"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        ></el-option>
      </el-select>

      <el-select
        style="margin-left: 673px;"
        class="echart-select"
        @change="bridgeNameChange()"
        size="mini"
        v-model="bridgeCode"
        placeholder="请选择"
      >
        <el-option
          v-for="(item,index) in bridgeNameList"
          :key="index"
          :label="item.bridgeName"
          :value="item.bridgeCode"
        ></el-option>
      </el-select>
    </div>
    <div style="margin:0 auto">
      <div class="HelloWorld" ref="myechart" id="main" v-show="bool"></div>
      <div class="HelloWorld" ref="myechart2" id="main" v-show="!bool"></div>
      <div class="HelloWorld" ref="myechart3" id="main" v-show="bool2"></div>
      <div class="HelloWorld" ref="myechart4" id="main" v-show="bool2"></div>
    </div>-->
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      bool: true,
      bool2: true,
      structureCodeOptions: [],
      bridgeList: [],
      dataList: [
        {
          value: 1,
          label: "上部结构",
          children: []
        },
        {
          value: 2,
          label: "下部结构",
          children: []
        },
        {
          value: 3,
          label: "桥面系",
          children: []
        }
      ],
      organizationOptin: [
        {
          id: 1,
          value: "桥梁分类"
        },
        {
          id: 2,
          value: "路线类型"
        }
      ],
      pieCheckId: 1,
      pieCheckOptions: [
        {
          id: 1,
          name: "经常性检查"
        },
        {
          id: 2,
          name: "定期检查"
        },
        {
          id: 3,
          name: "特殊检查"
        }
      ],
      bridgeTable: [],
      bridgeNameList: [],
      bridgeCode: "K0250",
      bridgeCodeForDisease: [],
      organizationId: 1,
      checkList: [],
      option: {
        title: {
          subtext: "根据桥梁分类查桥梁数量",
          top: 20
        },
        tooltip: {},
        legend: {
          data: ["桥梁数量"]
        },
        xAxis: {
          data: ["特大", "大", "中", "小"],

          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "桥梁数量",
            type: "bar",
            itemStyle: {
              normal: { color: "#447eff" }
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            // data: dataShadow,
            animation: true,
            data: []
          }
        ]
      },
      diseaseArray: [],
      option2: {
        title: {
          subtext: "根据路线类型查桥梁数量",
          top: 20
        },
        tooltip: {},
        legend: {
          data: ["数量"]
        },
        xAxis: {
          data: ["左线", "右线", "跨线", "匝道"]
        },
        yAxis: {
          nameGap: 1
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: []
          }
        ]
      },
      option4: {
        title: {
          show: true,
          top: 20,
          subtext: "根据单个桥梁查病害数量"
        },
        tooltip: {},
        legend: {
          data: ["病害数量"]
        },
        xAxis: {
          data: [],

          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            align: "center"
          }
        },
        series: [
          {
            name: "病害数量",
            type: "bar",
            itemStyle: {
              normal: { color: "#447eff" }
            },
            barWidth: 30,
            data: []
          }
        ]
      },
      option3: {
        title: {
          show: true,
          //是否显示
          subtext: "根据病害类型查桥梁数量",
          top: 20
        },
        tooltip: {},
        legend: {
          data: ["桥梁数量"]
        },
        xAxis: {
          data: [],

          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            align: "center"
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            name: "构件数量",
            type: "bar",
            itemStyle: {
              normal: { color: "#447eff" }
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            // data: dataShadow,
            animation: true,
            data: []
          }
        ]
      },
      option12: {
        title: {
          show: true,
          //是否显示
          subtext: "根据构件查询病害",
          top: 20
        },
        tooltip: {},
        legend: {
          data: ["病害数量"]
        },
        xAxis: {
          data: [],

          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            align: "center"
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            name: "病害数量",
            type: "bar",
            itemStyle: {
              normal: { color: "#447eff" }
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            // data: dataShadow,
            animation: true,
            data: []
          }
        ]
      },
      option5: {
        title: {
          text: "巡检情况",
          left: "center",
          top: 20
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "检查情况",
            type: "pie",
            labelLine: {
              show: true
            },
            radius: "45%",

            data: [],
            roseType: "radius"
          }
        ]
      },
      option8: {
        title: {
          subtext: "根据结构类型查询构件数量",
          top: 20
        },
        tooltip: {},
        legend: {
          data: ["构件数量"]
        },
        xAxis: {
          data: ["上部结构", "下部结构", "桥面系"],
          nameLocation: "center",
          axisLabel: {
            interval: 0
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          nameGap: 1,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            align: "center"
          }
        },
        series: [
          {
            name: "构件数量",
            type: "bar",
            itemStyle: {
              normal: { color: "#447eff" }
            },
            barWidth: 25,
            data: [14, 17, 23]
          }
        ]
      },
      option9: {
        title: {
          show: true,
          //是否显示
          subtext: "根据年限查询桥梁数量",
          top: 20
        },
        tooltip: {},
        legend: {
          data: ["桥梁数量"]
        },
        xAxis: {
          data: ["2015", "2016", "2017", "2018"],

          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            align: "center"
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            name: "桥梁数量",
            type: "bar",
            itemStyle: {
              normal: { color: "#447eff" }
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            // data: dataShadow,
            animation: true,
            data: [7, 4, 5, 6]
          }
        ]
      },
      option10: {
        title: {
          show: true,
          //是否显示
          subtext: "维修记录完成情况",
          top: 40,
          left: 60
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["已完成", "未完成"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        color: ["#447eff", "#92b3fc", "yellow", "blueviolet"],
        series: [
          {
            name: "维修记录",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 12, name: "已完成" }, { value: 7, name: "未完成" }]
          }
        ]
      },
      option11: {
        title: {
          show: true,
          //是否显示
          subtext: "根据结构查询病害数量",
          top: 20
        },
        legend: {
          data: ["病害数量"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },

        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: ["上部结构", "下部结构", "桥面系"]
        },
        series: [
          {
            name: "病害数量",
            type: "bar",
            itemStyle: {
              normal: { color: "#447eff" }
            },
            barWidth: 30,
            data: [14, 25, 34]
          }
        ]
      }
    };
  },
  computed: {
    bridgeAllNum() {
      let allNum = this.bridgeList.length;
      return allNum;
    },
    bridgeAllLong() {
      let allLong = 0;
      for (let item of this.bridgeList) {
        allLong = allLong + item.bridgeLength;
      }
      return allLong;
    },
    bridgeAllCost() {
      let allCost = 0;
      for (let item of this.bridgeList) {
        allCost = allCost + item.bridgeCost;
      }
      return allCost;
    },
    bridgeAllTrafic() {
      let allAvgTraffic = 0;
      for (let item of this.bridgeList) {
        allAvgTraffic = allAvgTraffic + item.avgTraffic;
      }
      return allAvgTraffic;
    }
  },
  methods: {
    organizationChange() {
      var that = this;
      if (this.organizationId == 1) {
        this.bool = true;
      }
      if (this.organizationId == 2) {
        this.bool = false;
      }
    },
    getBridgeAll() {
      var that = this;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/bridge/getBridge", {})
        .then(function(response) {
          that.bridgeList = [...response.data.data.list];
        })
        .catch(function(error) {});
    },
    getBridge() {
      var that = this;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/bridge/getBridge", {
          bridge: {
            bridgeManageMaintenance: that.organizationId
          }
        })
        .then(function(response) {
          that.bridgeTable = [...response.data.data.list];
        })
        .catch(function(error) {});
    },
    getbridgeFication() {
      var that = this;
      let myechart = this.$echarts.init(this.$refs.myechart);
      console.log(myechart);
      myechart.setOption(this.option);
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/const/getData", {
          searchType: 2
        })
        .then(function(response) {
          //console.log(response.data.data);
          let largeNum = response.data.data.largeNum;
          let mediumNum = response.data.data.mediumNum;
          let smallNum = response.data.data.smallNum;
          let superLargeNum = response.data.data.superLargeNum;
          myechart.setOption({
            series: [
              {
                // 根据名字对应到相应的系列

                data: [superLargeNum, largeNum, mediumNum, smallNum]
              }
            ]
          });
        })
        .catch(function(error) {});
    },
    getRoadType() {
      var that = this;
      let myechart = this.$echarts.init(this.$refs.myechart2);
      myechart.setOption(this.option2);
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/const/getData", {
          searchType: 1
        })
        .then(function(response) {
          //console.log(response.data.data);
          let leftLineNum = response.data.data.leftLineNum;
          let rightLineNum = response.data.data.rightLineNum;
          let overLineNum = response.data.data.overLineNum;
          let rampNum = response.data.data.rampNum;

          myechart.setOption({
            series: [
              {
                // 根据名字对应到相应的系列
                name: "数量",
                data: [leftLineNum, rightLineNum, overLineNum, rampNum]
              }
            ]
          });
        })
        .catch(function(error) {});
    },
    getDisease() {
      var that = this;
      let diseaseList = [];
      let diseaseNameList = new Set();
      let diseaseNameListArray = [];
      let diseaseNameKeyList = [];
      let diseaseNameValueList = [];
      let myechart = this.$echarts.init(this.$refs.myechart3);
      myechart.setOption(this.option3);
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/disease/getDisease", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
          diseaseList = [...response.data.data.list];
          for (let a of diseaseList) {
            diseaseNameList.add(a.diseaseTypeCode);
          }
          console.log(2);

          diseaseNameListArray = Array.from(diseaseNameList);
          console.log(diseaseNameListArray);
          axios
            .post(
              "http://bridge.vipgz1.idcfengye.com/api/const/getDiseaseData",
              {
                currentPage: 0,
                pageSize: 0,
                checkDisease: {
                  diseaseTypes: diseaseNameListArray
                }
              }
            )
            .then(function(response) {
              let map = response.data.data.diseaseData;
              for (let key in map) {
                diseaseNameKeyList.push(key);
                diseaseNameValueList.push(map[key]);
              }
              console.log(diseaseNameKeyList);
              console.log(diseaseNameValueList);
              myechart.setOption({
                xAxis: {
                  data: diseaseNameKeyList
                },
                series: [
                  {
                    // 根据名字对应到相应的系列
                    name: "桥梁数量",
                    data: diseaseNameValueList
                  }
                ]
              });
            })
            .catch(function(error) {});
        })
        .catch(function(error) {});
    },
    getBridgeFromName() {
      var that = this;

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/bridge/getBridge", {})
        .then(function(response) {
          console.log(1);
          console.log(response);
          that.bridgeNameList = [...response.data.data.list];
        })
        .catch(function(error) {});
    },
    bridgeNameChange() {
      var that = this;
      let diseaseNameKeyList = [];
      let diseaseNameValueList = [];
      let myechart = this.$echarts.init(this.$refs.myechart4);
      myechart.setOption(this.option4);
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/const/getDiseaseData", {
          checkDisease: {
            bridgeCode: this.bridgeCode
          }
        })
        .then(function(response) {
          console.log(response);

          let map = response.data.data.diseaseData;
          for (let key in map) {
            diseaseNameKeyList.push(key);
            diseaseNameValueList.push(map[key]);
          }
          myechart.setOption({
            xAxis: {
              data: diseaseNameKeyList
            },
            series: [
              {
                // 根据名字对应到相应的系列
                name: "病害数量",
                data: diseaseNameValueList
              }
            ]
          });
          that.getStructure();
        })
        .catch(function(error) {});
    },
    getCheckNum(pieCheckId, myechartName) {
      let that = this;
      let myechart = this.$echarts.init(myechartName);
      myechart.setOption(this.option5);
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/const/getData", {
          searchType: 3
        })
        .then(function(response) {
          //console.log(response.data.data);
          console.log("Check");
          console.log(response.data.data.checkPlanData);
          let checkOptinos = { ...response.data.data.checkPlanData };

          var Finished;
          var Overdue;
          var Total;
          var Text;
          if (pieCheckId === 1) {
            Finished = checkOptinos["regularFinished"];
            Overdue = checkOptinos["regularOverdue"];
            Total = checkOptinos["regularTotal"];
            Text = "巡检情况";
          }
          if (pieCheckId === 2) {
            Finished = checkOptinos["intervalsFinished"];
            Overdue = checkOptinos["intervalsOverdue"];
            Total = checkOptinos["intervalsTotal"];
            Text = "定检情况";
          }
          if (pieCheckId === 3) {
            Finished = checkOptinos["specialFinished"];
            Overdue = checkOptinos["specialOverdue"];
            Total = checkOptinos["specialTotal"];
            Text = "特检情况";
          }
          myechart.setOption({
            title: {
              text: Text,
              left: "center",
              top: 20,
              textStyle: {
                color: "#ccc"
              }
            },

            series: [
              {
                data: [
                  { value: Total, name: "已逾期" },
                  { value: Overdue, name: "未完成" },
                  { value: Finished, name: "已完成" }
                ]
              }
            ]
          });
        })
        .catch(function(error) {});
    },
    pieCheckChange() {
      this.getCheckNum();
    },
    echartsStrucNum() {
      let that = this;
      let myechart = this.$echarts.init(this.$refs.myechart8);
      myechart.setOption(this.option8);
    },
    echartsDiseaseNumfromStru() {
      let that = this;
      let myechart = this.$echarts.init(this.$refs.myechart11);
      myechart.setOption(this.option11);
    },
    echartsMaintennanceNum() {
      let that = this;
      let myechart = this.$echarts.init(this.$refs.myechart10);
      myechart.setOption(this.option10);
    },
    getBirdgeNumFromYears() {
      let that = this;
      let myechart = this.$echarts.init(this.$refs.myechart9);
      myechart.setOption(this.option9);
    },
    getStructure() {
      var that = this;
      axios
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/bridge/getBridgeComponent",
          {
            bridgeComponent: {
              bridgeCode: this.bridgeCode
            }
          }
        )
        .then(function(response) {
          that.data = [...response.data.data.list];
          console.log(153);
          console.log(that.data);
          that.dataList = [
            {
              value: 1,
              label: "上部结构",
              children: [
                {
                  value: 1,
                  label: "上部承重构件",
                  children: []
                },
                {
                  value: 2,
                  label: "上部一般构件",
                  children: []
                },
                {
                  value: 3,
                  label: "支座",
                  children: []
                }
              ]
            },
            {
              value: 2,
              label: "下部结构",
              children: [
                {
                  value: 1,
                  label: "翼墙耳墙",
                  children: []
                },
                {
                  value: 2,
                  label: "锥坡护坡",
                  children: []
                },
                {
                  value: 3,
                  label: "桥墩",
                  children: []
                },
                {
                  value: 4,
                  label: "桥台",
                  children: []
                },
                {
                  value: 5,
                  label: "墩台基础",
                  children: []
                },
                {
                  value: 6,
                  label: "河床",
                  children: []
                },
                {
                  value: 7,
                  label: "调治构造物",
                  children: []
                }
              ]
            },
            {
              value: 3,
              label: "桥面系",
              children: [
                {
                  value: 1,
                  label: "桥面铺装",
                  children: []
                },
                {
                  value: 2,
                  label: "伸缩缝装置",
                  children: []
                },
                {
                  value: 3,
                  label: "人行道",
                  children: []
                },
                {
                  value: 4,
                  label: "栏杆护栏",
                  children: []
                },
                {
                  value: 5,
                  label: "排水系统",
                  children: []
                },
                {
                  value: 6,
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
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[0].children[0].children.push(newChild);
              }

              if (that.data[x].partName === "上部一般构件") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[0].children[1].children.push(newChild);
              }
              if (that.data[x].partName === "支座") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
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
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[0].children.push(newChild);
              }
              if (that.data[x].partName === "锥坡护坡") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[1].children.push(newChild);
              }
              if (that.data[x].partName === "桥墩") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[2].children.push(newChild);
              }
              if (that.data[x].partName === "桥台") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[3].children.push(newChild);
              }
              if (that.data[x].partName === "墩台基础") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[4].children.push(newChild);
              }
              if (that.data[x].partName === "河床") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[1].children[5].children.push(newChild);
              }
              if (that.data[x].partName === "调治构造物") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
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
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[0].children.push(newChild);
              }
              if (that.data[x].partName === "伸缩缝装置") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[1].children.push(newChild);
              }
              if (that.data[x].partName === "人行道") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[2].children.push(newChild);
              }
              if (that.data[x].partName === "栏杆护栏") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[3].children.push(newChild);
              }
              if (that.data[x].partName === "排水系统") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
                newChild["partName"] = that.data[x].partName;
                newChild["bridgeEntityTypeName"] =
                  that.data[x].bridgeEntityTypeName;
                that.dataList[2].children[4].children.push(newChild);
              }
              if (that.data[x].partName === "照明标志") {
                let newChild = {};
                newChild["label"] = that.data[x].componentName;
                newChild["componentId"] = that.data[x].componentId;
                newChild["value"] = that.data[x].componentId;
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
    getDiseaseByStruc(componentId) {
      var that = this;
      let myechart = this.$echarts.init(this.$refs.myechart12);
      myechart.setOption(this.option12);
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/disease/getDisease", {
          currentPage: 0,
          pageSize: 0,
          checkDisease: {
            structuralPartCode: componentId
          }
        })
        .then(function(response) {
          let resList = [...response.data.data.list];
          console.log("dsadas");

          that.diseaseArray = [...response.data.data.list];
          console.log(that.diseaseArray);
          let diseaseNameList = [];
          let diseaseNumList = [];
          for (let i in that.diseaseArray) {
            console.log(that.diseaseArray[i].diseaseName);
            diseaseNameList.push(that.diseaseArray[i].diseaseName);
            diseaseNumList.push(1);
          }
          myechart.setOption({
            xAxis: {
              data: diseaseNameList
            },
            series: [
              {
                // 根据名字对应到相应的系列
                data: diseaseNumList
              }
            ]
          });
        })
        .catch(function(error) {});
    },
    structureCodeChange(label) {
      console.log(label[2]);
      this.getDiseaseByStruc(label[2]);
    }
  },
  mounted() {
    this.getBridgeAll();
    this.getbridgeFication();
    this.getCheckNum(1, this.$refs.myechart5);
    this.getCheckNum(2, this.$refs.myechart6);
    this.getCheckNum(3, this.$refs.myechart7);
    this.bridgeNameChange();
    this.echartsStrucNum();
    this.getDisease();
    this.getBridgeFromName();
    this.getBirdgeNumFromYears();
    this.getDiseaseByStruc(1);
    this.echartsMaintennanceNum();
    this.echartsDiseaseNumfromStru();
    //console.log(this.$echarts);
  }
};
</script>
<style lang="stylus" >
menu-shadow() {
  border-radius: 4px;
  border: 4px solid #E9EEF3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
}

.menu-manage-box {
  padding: 20px;
  menu-shadow();
}

.el-table {
  menu-shadow();
}

.bridgeinfo-box {
  border-radius: 4px;
  border: 4px solid #E9EEF3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
  padding: 19px;
}

.bridge-table-border {
  border-radius: 4px;
  border: 4px solid #e9eef3;
  -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}

.birdgeint-tag {
  display: block;
  text-align: center;
}

.el-row .bridge-dropdown {
  display: inline-block;
  menu-shadow();
  margin: 20px;
}

.el-button {
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

.number-box {
  menu-shadow();

  ul {
    height: 130px;

    li {
      float: left;
    }
  }
}

.sum {
  height: 135px;
  text-align: center;
  color: #fff;

  span {
    display: inline-block;
    margin: 25px 0 15px 0;
    font-size: 30px;
  }

  p {
    font-size: 14px;
  }
}

.bridge-long {
  background: rgb(88, 202, 154);
  border-radius: 6px;
}

.bridge-number {
  background: rgb(238, 112, 109);
  border-radius: 6px;
}

.bridge-cost {
  background: rgb(247, 218, 71);
  border-radius: 6px;
}

.bridge-traffic {
  background: rgb(68, 126, 255);
  border-radius: 6px;
}

.histogram {
  height: 300px;
  width: 100%;
}

.histogram-box {
  menu-shadow();
  padding: 10px;
  margin-top: 20px;
  margin-left: 0px !important;
}

.pie-box {
  menu-shadow();
  margin-top: 20px;
  padding: 10px;
  margin-left: 15px;
}

.el-col .el-col-6 {
  text-align: center;
}

.pie {
  width: 260px;
  height: 300px;
}
</style>
