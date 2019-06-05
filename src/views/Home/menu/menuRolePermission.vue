<template>
  <div class="menu-manage-box">
    <el-row>
      <el-button @click.native.prevent="showMenu(show)">添加</el-button>
      <el-dialog title="添加角色权限" :visible.sync="show" width="30%">
        <el-form
          :model="menuAddForm"
          ref="menuAddForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色 :">
            <el-select v-model="menuAddForm.roleId" placeholder="请选择" style=" display: block">
              <el-option
                v-for="item in roleForm"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="菜单 :">
            <el-select
              @change="menuChange"
              v-model="menuAddForm.menuId"
              placeholder="请选择"
              style=" display: block"
            >
              <el-option
                v-for="item in menuForm"
                :key="item.menuId"
                :label="item.menuName"
                :value="item.menuId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="功能 :">
            <el-select
              v-model="menuAddForm.menuFunctionId"
              placeholder="请选择"
              style=" display: block"
            >
              <el-option
                v-for="(item,index) in functionForm"
                :key="index"
                :label="item.menuFunctionName"
                :value="item.menuFunctionId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('menuAddForm')">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="编辑菜单" :visible.sync="show2" width="30%">
        <el-form
          :model="menuAddForm"
          ref="menuAddForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色 :">
            <el-select v-model="menuAddForm.roleId" placeholder="请选择" style=" display: block">
              <el-option
                v-for="item in roleForm"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="菜单 :">
            <el-select
              @change="menuChange"
              v-model="menuAddForm.menuId"
              placeholder="请选择"
              style=" display: block"
            >
              <el-option
                v-for="item in menuForm"
                :key="item.menuId"
                :label="item.menuName"
                :value="item.menuId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="功能 :">
            <el-select
              v-model="menuAddForm.menuFunctionId"
              placeholder="请选择"
              style=" display: block"
            >
              <el-option
                v-for="(item,index) in functionForm"
                :key="index"
                :label="item.menuFunctionName"
                :value="item.menuFunctionId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitEditForm('menuAddForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="roleMenuFunctionId" label="角色权限ID"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="menuName" label="菜单名称"></el-table-column>
      <el-table-column prop="menuFunctionName" label="菜单功能名称"></el-table-column>
      <el-table-column prop="code" label="code"></el-table-column>
      <el-table-column prop="menuId" label="菜单Id" v-if="false"></el-table-column>
      <el-table-column prop="roleId" label="角色Id" v-if="false"></el-table-column>
      <el-table-column prop="menuFunctionId" label="菜单功能Id" v-if="false"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size="mini">删除</el-button>
          <el-button @click.native.prevent="editRow(scope.$index, tableData) " size="mini">编辑</el-button>
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
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      parentMenu: [
        {
          menuName: "无",
          menuId: 0
        }
      ],
      tableData: [],
      menuForm: [],
      functionForm: [],
      roleForm: [],
      menuAddForm: {
        roleMenuFunctionId: null,
        roleId: null,
        menuFunctionId: null
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
            menuType: 1
          }
        })
        .then(function(response) {
          //   for (let i = 0; i < response.data.data.list.length; i++) {
          //     that.menuForm.push(response.data.data.list[i]);
          //   }
          that.menuForm = [...response.data.data.list];
        })
        .catch(function(error) {});

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/role/getAllRole", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
          that.roleForm = [...response.data.data.list];
          //console.log("roleform")
          //console.log(that.roleForm)
        })
        .catch(function(error) {});
    },
    menuChange() {
      var that = this;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/getNoMenuFunction", {
          currentPage: 0,
          pageSize: 0,
          powerMenu: {
            roleId: this.menuAddForm.roleId,
            menuId: this.menuAddForm.menuId
          }
        })
        .then(function(response) {
          //console.log(response.data.data.list);
          //   for (let i = 0; i < response.data.data.list.length; i++) {
          //     that.functionForm.push(response.data.data.list[i]);
          //   }
          //   //console.log(that.functionForm)
          that.functionForm = [...response.data.data.list];
        })
        .catch(function(error) {});
    },

    editRow(index, rows) {
      var that = this;
      that.show2 = true;
      //console.log(this.tableData);
      that.menuAddForm.roleMenuFunctionId =
        that.tableData[index].roleMenuFunctionId;
      that.menuAddForm.roleName = that.tableData[index].roleName;
      that.menuAddForm.menuName = that.tableData[index].menuName;
      that.menuAddForm.menuFunctionName =
        that.tableData[index].menuFunctionName;
      that.menuAddForm.menuId = that.tableData[index].menuId;
      that.menuAddForm.roleId = that.tableData[index].roleId;
      that.menuAddForm.menuFunctionId = that.tableData[index].menuFunctionId;
      that.menuAddForm.code = that.tableData[index].code;

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/getAllMenu", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
          //   for (let i = 0; i < response.data.data.list.length; i++) {
          //     that.menuForm.push(response.data.data.list[i]);
          //   }
          that.menuForm = [...response.data.data.list];
        })
        .catch(function(error) {});

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/role/getAllRole", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
          that.roleForm = [...response.data.data.list];
          //console.log("roleform")
          //console.log(that.roleForm)
        })
        .catch(function(error) {});

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/getMenuFunction", {
          currentPage: 0,
          pageSize: 0,
          menuFunction: {
            menuId: that.menuAddForm.menuId
          }
        })
        .then(function(response) {
          //console.log(response.data.data.list);

          that.functionForm = [...response.data.data.list];
        })
        .catch(function(error) {});
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
          .post(
            "http://bridge.vipgz1.idcfengye.com/api/permission/addPermission",
            {
              roleMenuFunctionId: this.menuAddForm.roleMenuFunctionId,
              roleId: this.menuAddForm.roleId,
              menuFunctionId: this.menuAddForm.menuFunctionId
            }
          )
          .then(function(response) {
            axios
              .post(
                "http://bridge.vipgz1.idcfengye.com/api/permission/getAllPermission",
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
          })
          .catch(function(error) {
            //console.log(error);
          });
      }
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
          .post(
            "http://bridge.vipgz1.idcfengye.com/api/permission/updatePermission",
            {
              roleMenuFunctionId: this.menuAddForm.roleMenuFunctionId,
              roleId: this.menuAddForm.roleId,
              menuFunctionId: this.menuAddForm.menuFunctionId
            }
          )
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
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/permission/getAllPermission",
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
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/permission/deletePermission",
          {
            menuId: that.tableData[index].menuId
          }
        )
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
        "http://bridge.vipgz1.idcfengye.com/api/permission/getAllPermission",
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
    //console.log("角色权限");
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