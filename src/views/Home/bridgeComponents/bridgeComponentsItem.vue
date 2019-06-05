<template>
  <div class="bridgecomponents-item">
    <el-form
      :model="bridgeComponentsForm"
      :rules="rules"
      label-width="110px"
      class="wallslope-box"
      ref="bridgeComponentsForm"
    >
      <div class="wall-slope">
        <div v-for="(item,index) in wallSlopeList" :key="item.id" class="wall-slope-item">
          <el-tag type="info">{{item.name}}</el-tag>
          <div style="margin: 15px 0;"></div>
          <el-select v-model="wallNum" placeholder="请选择结构部件" v-if="index==0">
            <el-option v-for="item in wall" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>

          <el-select v-model="checkSlope" placeholder="请选择结构部件" v-else-if="index==1">
            <el-option v-for="item in slope" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>

          <!-- <el-checkbox-group v-else-if="index==1" v-model="checkSlope">
            <el-checkbox v-for="itemSlope in slope" :label="itemSlope.name" :key="itemSlope.id"></el-checkbox>
          </el-checkbox-group>-->
        </div>
      </div>

      <div class="wall-slope">
        <div v-for="item in sideWalkRailingList" :key="item.id" class="wall-slope-item">
          <el-tag type="info">{{item.name}}</el-tag>

          <div style="margin: 15px 0;"></div>

          <el-select v-model="checkSideWalk" placeholder="请选择结构部件" v-if="item.id==15">
            <el-option v-for="item in sideWalk" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>

          <!-- <el-checkbox-group v-if="item.id==15" v-model=" checkSideWalk">
            <el-checkbox
              v-for="itemsideWalk in sideWalk"
              :label="itemsideWalk.name"
              :key="itemsideWalk.id"
            ></el-checkbox>
          </el-checkbox-group>-->

          <el-select v-model="checkRailing" placeholder="请选择结构部件" v-else-if="item.id==16">
            <el-option v-for="item in Railing" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>

          <!-- <el-checkbox-group v-else-if="item.id==16" v-model="checkRailing">
            <el-checkbox
              v-for="itemRailing in Railing"
              :label="itemRailing.name"
              :key="itemRailing.id"
            ></el-checkbox>
          </el-checkbox-group>-->
        </div>
      </div>
      <div class="otherlist-box">
        <div v-for="(item,index) in otherList" :key="index" class="otherlist-item">
          <el-tag type="info">{{item.name}}</el-tag>
          <el-input v-model="item.mark" placeholder></el-input>
          <i>个</i>
        </div>
        <div class="otherlist-item">
          <el-tag type="info">桥台</el-tag>
          <el-input v-model="abutmentWall" placeholder disabled></el-input>
          <i>个</i>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import store from "../../../vuex/store.js";
export default {
  props: {
    componentsList: Array,
    wall: Array,
    slope: Array,
    sideWalk: Array,
    Railing: Array
  },

  data() {
    return {
      abutmentWall: 2,
      wallNum: 0,
      checkWall: [],
      checkSlope: 0,
      checkSideWalk: 0,
      checkRailing: 0,
      bool: true,
      bridgeComponentsForm: {
        bridgePartId: null,
        bridgeCode: null,
        partId: null,
        partName: null,
        componentNum: null
      }
    };
  },
  computed: {
    wallSlopeList: function() {
      //   this.newComponentsList=[...this.componentsList];
      return this.componentsList.filter(item => item.id <= 2);
    },
    otherList: function() {
      return this.componentsList.filter(item => item.id > 2 && item.id < 15);
    },
    sideWalkRailingList: function() {
      return this.componentsList.filter(item => item.id >= 15);
    }
  },
  methods: {
    submitForm(formName) {
      var that = this;
      console.log(this.$store.state.bridgeCode);
      this.bridgeComponentsForm.bridgeCode = this.$store.state.bridgeCode;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.bool = true;
        } else {
          //console.log('error submit!!');
          that.bool = false;
          return false;
        }
      });
      if (this.bool == true) {
        axios
          .post("http://bridge.vipgz1.idcfengye.com/api/bridge/addBridgePart", {
            bridge: {
              bridgeParts: [
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,
                  partName: this.wallSlopeList[0].name,
                  componentNum: this.wallNum
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.wallSlopeList[1].name,
                  componentNum: this.checkSlope
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.sideWalkRailingList[0].name,
                  componentNum: this.checkSideWalk
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.sideWalkRailingList[1].name,
                  componentNum: this.checkRailing
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.otherList[0].name,
                  componentNum: parseInt(this.otherList[0].mark)
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,
                  partName: "桥台",
                  componentNum: 2
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.otherList[1].name,
                  componentNum: parseInt(this.otherList[1].mark)
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.otherList[2].name,
                  componentNum: parseInt(this.otherList[2].mark)
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.otherList[3].name,
                  componentNum: parseInt(this.otherList[3].mark)
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.otherList[4].name,
                  componentNum: parseInt(this.otherList[4].mark)
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,
                  partName: this.otherList[5].name,
                  componentNum: parseInt(this.otherList[5].mark)
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,
                  partName: this.otherList[6].name,
                  componentNum: parseInt(this.otherList[6].mark)
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.otherList[7].name,
                  componentNum: parseInt(this.otherList[7].mark)
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.otherList[8].name,
                  componentNum: parseInt(this.otherList[8].mark)
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.otherList[9].name,
                  componentNum: parseInt(this.otherList[9].mark)
                },
                {
                  bridgeCode: this.bridgeComponentsForm.bridgeCode,

                  partName: this.otherList[10].name,
                  componentNum: parseInt(this.otherList[10].mark)
                }
              ]
            }
          })
          .then(function(response) {})
          .catch(function(error) {
            //console.log(error);
          });
        //   this.$store.state.active++;
        //   this.$store.state.chooseItem++;
        // this.$router.push('/bridgeinfo')
      }
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

.bridgecomponents-item {
  flex: 4;
  font-size: 14px;
  display: flex;
  menu-shadow();
  flex-wrap: wrap;

  .el-tag {
    text-align: center;
    width: 100%;
  }

  .wallslope-box {
    flex: 1;

    .wall-slope {
      margin: 5px 0;
      display: flex;
      menu-shadow();

      .wall-slope-item {
        flex: 1;
        padding: 10px;
        background: #eee;
        text-align: center;

        .el-checkbox-group {
          text-align: center;
        }
      }
    }

    .otherlist-box {
      margin: 5px 0;
      menu-shadow();
      display: flex;
      flex-wrap: wrap;
      text-align: center;

      .otherlist-item {
        padding: 10px;
        width: 21%;
      }

      .el-input {
        width: 40px;
        height: 20px;
        margin-top: 10px;
      }
    }
  }
}
</style>