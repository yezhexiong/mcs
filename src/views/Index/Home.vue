<template>
  <a-layout id="home-layout-top-side">
    <a-layout-header class="ant-header">
      <div class="ant-header-logo">
        <i class="ant-header-logo-img" />
        <span class="ant-header-logo-txt">医生会诊管理系统</span>
      </div>
    </a-layout-header>
    <a-layout class="ant-body">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsedWidth="50px" theme="light">
        <div class="ant-menu-toggle-collapsed" @click="() => (collapsed = !collapsed)">
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </div>
        <div class="layout-sider-menu">
          <a-menu
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            mode="inline"
            :inline-collapsed="collapsed"
          >
            <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="mail" /><span>会诊列表</span></span>
              <a-menu-item key="5">
                <router-link to="/Consultation">会诊管理</router-link>
              </a-menu-item>
              <a-menu-item key="6">
                <router-link to="/login">登录</router-link>
              </a-menu-item>
              <a-menu-item key="7">
                Option 7
              </a-menu-item>
              <a-menu-item key="8">
                Option 8
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
              <a-menu-item key="9">
                Option 9
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout>
        <!-- <a-breadcrumb style="margin: 16px 20px">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>height: fullHeight +'px',
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb> -->
        <a-layout-content>
          <router-view>
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    }
  },
  watch: {
  },
  mounted () {//mounted 是生命周期方法之一，会在对应生命周期时执行。
  },
  methods :{
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  }
};
</script>

<style>
#home-layout-top-side{
  height:100%;
}
#home-layout-top-side .ant-header {
  height:40px;
  padding:0;
  background:#08979C;
}
#home-layout-top-side .ant-header-logo{
  display:flex;align-items:center; height:40px;color:#fff;font-size:18px;font-weight:700;padding-left:12px;
}
#home-layout-top-side .ant-header-logo-img{
  vertical-align:middle;
  display:inline-block;
  width:24px;height:24px;
  background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4NCiAgICA8dGl0bGU+bG9nbzwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGcgaWQ9ImxvZ28iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8cGF0aCBkPSJNODkuMjc0ODcxMSwyMjguMjIwMTQ2IEwyNC4zMjE2NTg0LDE1Ni4yNjEyNDQgTDE0Ni42MjgxNjIsMTQ2Ljk4NjI0MyBMMTY2LjA1NzMzNywxNjcuMDU2NDg2IEw4Ni44MTEzNTA4LDE3My4xOTA1MjYgTDk3LjI0MTUwNzMsMTgzLjkyNTUxNyBMMTc2LjM0OTQxOSwxNzguODEyODcyIEwxOTkuNDM0NDc0LDIwMy4yNDkwMDIgTDExOS4zNjk1NDksMjA5LjUxMzEwNiBMMTI5Ljg2NTE4LDIyMC40OTU4OTQgTDIwOS40MTU4NDgsMjE0LjEwNzI5NCBMMjIzLjAwNDM5NywyMjguNTUwMDM3IEMyMjkuOTIzMDg2LDIzNi44Mjg2MjcgMjM0LjE4MzYwOCwyMzcuMDI1OTc3IDIyNi41NTUwNTgsMjM5LjI0MDk4NCBMMTMzLjU1NjYxNSwyNDYuOTg2MjM3IEMxMjAuOTAxODcsMjQ3LjY2NjE4MyA5Ny41MjA1MjE2LDIzNy4xMjkzMTUgODkuMjc0ODcxMSwyMjguMjIwMTQ2IFoiIGlkPSJGaWxsLTM4OCIgZmlsbD0iI0RERERERCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTI3LjQ2NDk2NCwgMTk3LjAwMTg4MCkgcm90YXRlKC0yMS4wMDAwMDApIHRyYW5zbGF0ZSgtMTI3LjQ2NDk2NCwgLTE5Ny4wMDE4ODApICI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBkPSJNMTcuMjg5OTk4OSw4LjU4NDgxMDQ4IEwxMjcuNjU1MzU1LDYxLjM1MDQ3OTYgTDEyNy42NTUzNTUsOTcuNDc3ODM1IEw1Ny4yNTMxMzQ5LDY1LjUwMDQyMzkgTDU3LjI1MzEzNDksODAuNTIyNTk5NyBMMTI2LjUwODA0NCwxMTMuMTAzMTQxIEwxMjYuNTA4MDQ0LDE0Ny4xNDYyMzEgTDU3LjI1MzEzNDksMTE1LjE5NjEyNiBMNTcuMjUzMTM0OSwxMzAuNDg5ODkxIEwxMjYuNTA4MDQ0LDE2My40NzMyNDIgTDEyNi41MDgwNDQsMTc5LjI5MTE4MiBDMTI2LjUwODA0NCwxODYuNzMxMjMgMTI2LjUwODA0NCwxOTIuNDg0Mzg2IDEyNi41MDgwNDQsMTk2LjU1MDY0OSBMMjEuODU4MTY5NSwxNDcuNDY2OTIyIEMxOS4wNzAzODAxLDE0Ni4xNTkzNzEgMTcuMjg5OTk4OSwxNDMuMzU3ODM3IDE3LjI4OTk5ODksMTQwLjI3ODYzOSBMMTcuMjg5OTk4OSw4LjU4NDgxMDQ4IFoiIGlkPSJGaWxsLTM4OC1Db3B5IiBmaWxsPSIjRjJGMkYyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3Mi40NzI2NzcsIDEwMi41Njc3MzApIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTcyLjQ3MjY3NywgLTEwMi41Njc3MzApICI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBkPSJNMTI2LjM1ODExMyw4LjQwMDY5MjE1IEwyMzguMjA5NzYsNjEuNzgxNDIwNiBDMjM5LjU5MDU0MSw2Mi40NDAzOTIzIDI0MC40Njk3NSw2My44MzQxOTU1IDI0MC40Njk3NSw2NS4zNjQxNjIxIEwyNDAuNDY5NzUsOTcuMjU4NTkyMiBMMTY0Ljk4ODM5OSw2NS42NTUyMjU0IEwxNjQuOTg4Mzk5LDgwLjc0MjE4NjkgTDIzNS42ODc5NjEsMTExLjM5MDMzOCBDMjM4LjU5MTAzNCwxMTIuNjQ4ODE2IDI0MC40Njk3NSwxMTUuNTEwODgzIDI0MC40Njk3NSwxMTguNjc0OTk1IEwyNDAuNDY5NzUsMTQ3LjY1MzE0NCBMMTY0Ljk4ODM5OSwxMTUuNTY1MjQ5IEwxNjQuOTg4Mzk5LDEzMC45MjQ5NyBMMjM4LjA5NTI0MSwxNjMuMDA4NDk0IEMyMzkuNTM3OTg3LDE2My42NDE2NTUgMjQwLjQ2OTc1LDE2NS4wNjgxMDkgMjQwLjQ2OTc1LDE2Ni42NDM2NzYgTDI0MC40Njk3NSwxNzkuOTM2NzI1IEMyNDAuNDY5NzUsMTkxLjE0NDkyNyAyNDEuMDg3MjMsMTkzLjA3MTY1NyAyMzguMTM4MTA1LDE5Ny4zMDA5MTYgTDEyNi4zNTgxMTMsMTQ0Ljg4ODk5MiBMMTI2LjM1ODExMyw4LjQwMDY5MjE1IFoiIGlkPSJGaWxsLTM4OCIgZmlsbD0iI0YyRjJGMiI+PC9wYXRoPg0KICAgIDwvZz4NCjwvc3ZnPg==) no-repeat 50%;
  background-size:24px auto;
}
#home-layout-top-side .ant-header-logo-txt{
  margin-left:8px;
}
#home-layout-top-side .ant-body{
  overflow: hidden;
}

#home-layout-top-side .trigger {
  transition: color 0.3s;
}
#home-layout-top-side .trigger:hover {
  color: #1890ff;
}
#home-layout-top-side .ant-menu-toggle-collapsed{display:flex;align-items:center;justify-content:center;height:30px;background:#ebebeb;color:rgba(0,0,0,.65);font-size:16px;cursor:pointer}

/******************************************
  覆盖antd menu组件样式，
 1、为防止污染包一层div并将class赋值，
 2、F12找到对应的class，并进行重写
 3、如果不起作用则加!important
******************************************/

/* 菜单a-menu-item项目背景色*/
.layout-sider-menu{
    background-color: #F5F5F5;
    height: 100%;
    overflow: hidden;
}
.layout-sider-menu .ant-menu-item{
    background-color: #e6e6e6;
    margin: 0px!important;
}
.layout-sider-menu .ant-menu-submenu-title{
    background-color: #F5F5F5;
    margin: 0px!important;
}
 
</style>
