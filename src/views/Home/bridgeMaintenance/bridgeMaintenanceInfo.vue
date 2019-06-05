<template>
  <div class="menu-manage-box">
    <div class="inspection-choose">
      <el-button class="inspect-button" @click="toMatintenance()">添加维修计划</el-button>
    </div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="planId" label="计划Id"></el-table-column>
      <el-table-column prop="planCode" label="计划编码"></el-table-column>
      <el-table-column prop="bridgeCode" label="桥梁编码"></el-table-column>
      <el-table-column prop="personName" label="创建人"></el-table-column>
      <el-table-column prop="bepersonName" label="负责人"></el-table-column>
      <el-table-column prop="maintainRange" label="维修范围"></el-table-column>
      <el-table-column prop="maintainRanking" label="维修等级"></el-table-column>
      <el-table-column prop="quantities" label="预计工程量"></el-table-column>
      <el-table-column prop="proposer" label="养护建议"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size="mini">删除</el-button> -->
          <el-button @click.native.prevent="recordRow(scope.$index, tableData) " size="mini">添加记录</el-button>
        </template>
      </el-table-column>
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
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      parentMenuName: "",
      show2: false,
      show: false,
      index: null,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      insprectionTypeOptions: [
        {
          id: 1,
          value: "经常性检查"
        },
        {
          id: 2,
          value: "定期检查"
        },
        {
          id: 3,
          value: "特殊检查"
        }
      ],
      parentMenu: [
        {
          menuName: "无",
          menuId: 0
        }
      ],
      menuTypeForm: [
        {
          menuTypeId: 0,
          menuTypeName: "管理菜单"
        },
        {
          menuTypeId: 1,
          menuTypeName: "应用菜单"
        }
      ],
      tableData: [],
      menuAddForm: {
        planId: null
      },
      rules: {
        menuCode: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        menuName: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        menuId: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        meneUrl: [{ required: true, message: "信息不能为空", trigger: "blur" }],
        menuIco: [{ required: true, message: "信息不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    toMatintenance() {
      this.$router.push("/bridgeMaintenance");
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    showMenu() {
      var that = this;
      that.show = true;
      if (that.parentMenu.length != 1) {
        that.parentMenu.splice(1, that.parentMenu.length);
      }
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/getAllMenu", {
          currentPage: 0,
          pageSize: 0,
          powerMenu: {
            parentMenuId: 0
          }
        })
        .then(function(response) {
          //console.log(response.data.data.list);
          for (let i = 0; i < response.data.data.list.length; i++) {
            that.parentMenu.push(response.data.data.list[i]);
          }
          //console.log(that.parentMenu);
        })
        .catch(function(error) {
          //console.log(error);
        });
    },
    editRow(index, rows) {
      var that = this;
      that.show2 = true;
      //console.log(this.tableData);
      that.menuAddForm.menuId = that.tableData[index].menuId;
      that.menuAddForm.menuName = that.tableData[index].menuName;

      that.menuAddForm.menuCode = that.tableData[index].menuCode;
      that.menuAddForm.meneUrl = that.tableData[index].meneUrl;
      that.menuAddForm.menuIco = that.tableData[index].menuIco;
      if (that.parentMenu.length != 1) {
        that.parentMenu.splice(1, that.parentMenu.length);
      }
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/getAllMenu", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
          //console.log(response.data.data.list);
          for (let i = 0; i < response.data.data.list.length; i++) {
            that.parentMenu.push(response.data.data.list[i]);
          }

          for (let x in that.parentMenu) {
            if (that.parentMenu[x].menuId == that.tableData[index].menuId) {
              that.index = that.parentMenu[x].parentMenuId;

              break;
            }
            for (let x in that.menuTypeForm) {
              if (
                that.menuTypeForm[x].menuTypeId ==
                that.tableData[index].menuType
              ) {
                //console.log("我找到了");
                that.menuAddForm.menuType = that.menuTypeForm[x].menuTypeId;
                break;
              }
            }
          }
          //for(let x in that.parentMenu)
          //console.log(that.parentMenu);
        })
        .catch(function(error) {
          //console.log(error);
        });
    },
    recordRow(index, rows) {
      var that = this;
      //console.log(this.tableData);
      that.menuAddForm.planId = that.tableData[index].planId;
      console.log(that.menuAddForm.planId);
      this.$router.push({
        name: "bridgeMaintenanceRecrod",
        params: { planId: that.menuAddForm.planId }
      });
    },

    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.show = false;
        } else {
          that.show = true;
        }
      });
      if (that.show == false) {
        axios
          .post("http://bridge.vipgz1.idcfengye.com/api/menu/addMenu", {
            menuCode: this.menuAddForm.menuCode,
            menuName: this.menuAddForm.menuName,
            parentMenuId: this.parentMenu.menuId,
            meneUrl: this.menuAddForm.meneUrl,
            menuIco: this.menuAddForm.menuIco,
            menuType: this.menuTypeForm.menuTypeId
          })
          .then(function(response) {})
          .catch(function(error) {
            //console.log(error);
          });

        axios
          .post("http://bridge.vipgz1.idcfengye.com/api/menu/getAllMenu", {
            currentPage: 0,
            pageSize: 0
          })
          .then(function(response) {
            // //console.log(response.data.data.list);
            // for (let i = 0; i < response.data.data.list.length; i++) {
            //   that.tableData.push(response.data.data.list[i]);
            // }
            // //console.log(that.tableData);
            that.tableData = [...response.data.data.list];
          })
          .catch(function(error) {
            //console.log(error);
          });
      }
      that.menuAddForm.menuCode = null;
      that.menuAddForm.menuName = null;
      that.menuAddForm.menuId = null;
      that.menuAddForm.meneUrl = null;
      that.menuAddForm.menuIco = null;
    },
    submitEditForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.show2 = false;
        } else {
          that.show2 = true;
        }
      });

      if (that.show2 == false) {
        axios
          .post("http://bridge.vipgz1.idcfengye.com/api/menu/updateMenu", {
            menuCode: that.menuAddForm.menuCode,
            menuName: that.menuAddForm.menuName,
            menuId: that.menuAddForm.menuId,
            meneUrl: that.menuAddForm.meneUrl,
            menuIco: that.menuAddForm.menuIco,
            parentMenuId: that.parentMenu.menuId
          })
          .then(function(response) {
            that.show2 = false;
            //console.log(response);
          })
          .catch(function(error) {
            that.show2 = true;
            //console.log(error);
          });
      }

      that.tableData = [];
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/getAllMenu", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
          //console.log(response.data.data.list);
          for (let i = 0; i < response.data.data.list.length; i++) {
            that.tableData.push(response.data.data.list[i]);
          }
          //console.log(that.tableData);
        })
        .catch(function(error) {
          //console.log(error);
        });
    },

    deleteRow(index, rows) {
      var that = this;

      //console.log(this.tableData);
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/deleteMenu", {
          menuId: that.tableData[index].menuId
        })
        .then(function(response) {
          //console.log(1);
        })
        .catch(function(error) {
          //console.log(error);
        });
      rows.splice(index, 1);
    }
  },

  mounted: function() {
    var that = this;
    axios
      .post(
        "http://bridge.vipgz1.idcfengye.com/api/maintain/getCheckMaintainPlan",
        {
          currentPage: 0,
          pageSize: 0
        }
      )
      .then(function(response) {
        //console.log(response.data.data.list);
        for (let i = 0; i < response.data.data.list.length; i++) {
          that.tableData.push(response.data.data.list[i]);
        }
      })
      .catch(function(error) {
        //console.log(error);
      });
    //console.log(that.tableData);
  }
};
</script>
<style lang="stylus" scoped>
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

.el-row {
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
</style>
