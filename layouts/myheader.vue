<template>
  <div class="header-container">
    <div class="wrapper">
      <!-- logo -->
      <div class="left-wrapper v-link selected">
        <img style="width: 50px" width="50" height="50" src="~assets/images/logo.png">
        <span class="text">手工活外发平台</span>
      </div>
      <!-- 搜索框 -->
      <div class="search-wrapper">
        <div class="hospital-search animation-show">
          <div id="search" style="display: block;">
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              :trigger-on-focus="false"
              class="search-input"
              prefix-icon="el-icon-share"
              placeholder="点击输入医院名称"
              @select="handleSelect"
            >
              <span slot="suffix" class="search-btn v-link highlight clickable selected">搜索 </span>
            </el-autocomplete>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right-wrapper">
        <span class="v-link clickable">帮助中心</span>
        <!-- <el-dropdown >
          <span class="el-dropdown-link">
            晴天<i class="el-icon-arrow-down el-icon&#45;&#45;right"/>
          </span>
          <el-dropdown-menu slot="dropdown" class="user-name-wrapper">
            <el-dropdown-item>挂号订单</el-dropdown-item>
            <el-dropdown-item>就诊人管理</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <span class="v-link clickable" @click="dialogUserFormVisible = true">登录/注册</span>
      </div>
    </div>
  </div>

</template>
<script>
import mogApi from '@/api/mog'

export default {
  data() {
    return {
      state: ''
    }
  },
  methods: {
    // 在输入框输入值，弹出下拉框，显示相关内容
    querySearchAsync(detail, cb) {
      if (detail === '') return
      mogApi.getByDetail(detail).then(response => {
        // 将最多只有5条的结果赋值给搜索框提示内容
        const len = response.data.length>5 ? 5 : response.data.length
        for (let i = 0; i <len; i++) {
          response.data[i].value = response.data[i].ogTitle
          console.log(len)
        }
        cb(response.data)
      })
    },

    // 在下拉框选择某一个内容，执行下面方法，跳转到详情页面中
    handleSelect(item) {
      window.location.href = '/mog/' + item.ogId
    }
  }
}
</script>
