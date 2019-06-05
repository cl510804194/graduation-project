<template>
  <div class="home">
    <el-container>
      <el-header>
        <p class="brige-title">区域化桥梁管养综合业务系统</p>   
        <router-link  v-on:click.native="logout()" class="bridge-loout" tag="span"  to="/login"><a >注销</a></router-link>
        <!-- <span class="bridge-loout">您好! <b></b> </span> -->
      </el-header>
      <el-container class="content-size">
        <el-aside width="200px" style="height:600px">
          <el-scrollbar style="height:100%" :native="false">
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :router="true">
              <el-submenu   
                v-for="(item,i) in parentTable"
                :key="i"
                :index="item.menuId.toString()"
              >
                 <template slot="title">
              
                  <span slot="title">{{item.menuName}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item 
                   v-for="(child,i) in childTable"  
                   v-if="item.menuId===child.parentMenuId"
                  :key="i"
                   :index="child.meneUrl">
                   {{child.menuName}}
                  </el-menu-item>
             
              
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-container>
          <el-main>
            
           
            <router-view>
            
            </router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>  </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      menuTable: [],
      parentTable:[],
      childTable:[],
  
    };
  },
  components: {},

  methods:{
    logout(){
      var that=this;
      axios
      .post("http://bridge.vipgz1.idcfengye.com/sso/user/logout", {
        
      })
      .then(function(response) {
        console.log(response)
        localStorage.removeItem('token')
        
      })
      .catch(function(error) {
        //console.log(error);
      });
    }
  },
  mounted: function() {
    var that=this;
        that.menuTable=[];
        that.parentTable=[];
        that.childTable=[];
    axios
      .post("http://bridge.vipgz1.idcfengye.com/api/menu/getMenu", {
        currentPage: 0,
        pageSize: 0
      })
      .then(function(response) {
        console.log(response)
        //console.log(response);
        that.menuTable = [...response.data.data.list];
        that.parentTable=that.menuTable.filter(item => item.menuType==0 )
        that.childTable=that.menuTable.filter(item => item.menuType==1 )
      })
      .catch(function(error) {
        //console.log(error);
      });
    
  }

};
</script>
<style lang="stylus" scoped>
.el-aside {
  border-radius: 4px;
  border: 1px solid #b5b5b5;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
}
.home .el-menu-item
  font-size 12px
.brige-title
  float left
.bridge-loout
  float right
  color:#eee
  margin:0px 5px 0px
  a
    color:#eee
    text-decoration none
</style>