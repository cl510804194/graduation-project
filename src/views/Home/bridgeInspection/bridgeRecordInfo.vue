<template>
  <div class="menu-manage-box">
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-tag type="info" class="birdgeint-tag">检查内容</el-tag>
            <div v-for="(item,index) in props.row.checkRegularDetails" :key="index">
              <el-form-item label="检查内容Id">
                <span>{{item.detailsId}}</span>
              </el-form-item>
              <el-form-item label="缺损范围">
                <span>{{item.defectScope}}</span>
              </el-form-item>
              <el-form-item label="缺损意见">
                <span>{{item.proposal}}</span>
              </el-form-item>
              <el-form-item label="缺损类型">
                <span>{{item.defectType}}</span>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="recordCode" label="记录编码"></el-table-column>
      <el-table-column prop="recordPrincipal" label="实际负责人"></el-table-column>
      <el-table-column prop="recorder" label="记录人"></el-table-column>
      <el-table-column prop="bridgeName" label="桥梁名称"></el-table-column>
      <el-table-column prop="checkDetails" label="检查描述"></el-table-column>
      <el-table-column prop="organizationName" label="单位名称"></el-table-column>
      <el-table-column prop="proposal" label="建议"></el-table-column>
      <el-table-column prop="checkTime" label="检查时间"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <!-- <el-table-column prop="createcreateTime" label="更新时间"></el-table-column> -->
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
        diseaseId: null,
        checkType: 1
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
      that.menuAddForm.diseaseId = that.tableData[index].diseaseId;
      console.log(that.menuAddForm.diseaseId);
      this.$router.push({
        name: "bridgeInspectionRecord",
        params: { diseaseId: that.menuAddForm.diseaseId }
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
    },
    getTable() {
      var that = this;
      if (this.menuAddForm.checkType == 1) {
        axios
          .post(
            "http://bridge.vipgz1.idcfengye.com/api/check/getRegularRecord",
            {
              currentPage: 0,
              pageSize: 0
            }
          )
          .then(function(response) {
            //console.log(response.data.data.list);
            that.tableData = [...response.data.data.list];
          })
          .catch(function(error) {
            //console.log(error);
          });
      }
      if (this.menuAddForm.checkType == 2) {
        axios
          .post(
            "http://bridge.vipgz1.idcfengye.com/api/check/getIntervalsRecord",
            {
              currentPage: 0,
              pageSize: 0
            }
          )
          .then(function(response) {
            //console.log(response.data.data.list);
            that.tableData = [...response.data.data.list];
          })
          .catch(function(error) {
            //console.log(error);
          });
      }
      if (this.menuAddForm.checkType == 3) {
        axios
          .post(
            "http://bridge.vipgz1.idcfengye.com/api/check/getSpecialRecord",
            {
              currentPage: 0,
              pageSize: 0
            }
          )
          .then(function(response) {
            //console.log(response.data.data.list);
            that.tableData = [...response.data.data.list];
          })
          .catch(function(error) {
            //console.log(error);
          });
      }
    },
    recoedType() {
      console.log(this.menuAddForm.checkType);
      this.getTable();
    }
  },

  mounted: function() {
    var that = this;
    axios
      .post("http://bridge.vipgz1.idcfengye.com/api/check/getRegularRecord", {
        currentPage: 0,
        pageSize: 0
      })
      .then(function(response) {
        //console.log(response.data.data.list);
        that.tableData = [...response.data.data.list];
      })
      .catch(function(error) {
        //console.log(error);
      });
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
</style>
