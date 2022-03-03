<template>
  <div class="home page-component">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="~assets/images/web-banner2.jpg" alt="">
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索 -->
    <div class="search-container">
      <div class="search-wrapper">
        <div class="hospital-search">
          <el-autocomplete
            v-model="parms.detail"
            :fetch-suggestions="querySearchAsync"
            class="search-input"
            prefix-icon="el-icon-tab"
            placeholder="你想找什么？"
            @select="handleSelect"
            @keyup.enter.native="getList"
          >
            <span slot="suffix" class="search-btn v-link highlight clickable selected" @click="getList">搜索 </span>
          </el-autocomplete>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class="bottom">
      <div class="left">
        <div class="home-filter-wrapper">
          <div class="title"> 外发</div>
          <div>
            <div class="filter-wrapper">
              <span
                class="label">行业：</span>
              <div class="condition-wrapper">
                <span
                  v-for="(item,index) in industryList"
                  :class="industryActiveIndex == index ? 'selected' : ''"
                  :key="item.id"
                  class="item v-link clickable"
                  @click="industrytypeSelect(item.value, index)">{{ item.name }}</span>
              </div>

            </div>
            <div class="filter-wrapper">
              <span
                class="label">地区：</span>
              <div class="condition-wrapper">
                <span
                  v-for="(item,index) in districtList"
                  :class="provinceActiveIndex == index ? 'selected' : ''"
                  :key="item.id"
                  class="item v-link clickable"
                  @click="districtSelect(item.value, index)">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="v-scroll-list hospital-list"><div v-for="item in list" :key="item.ogId" class="v-card clickable list-item">
          <div class="">
            <div class="hospital-list-item hos-item" index="0" @click="show(item.ogId)">
              <div class="wrapper">
                <div class="hospital-title"> {{ item.ogTitle }}</div>
                <div class="bottom-container">
                  <div class="icon-wrapper">
                    <span class="iconfont"></span>{{ item.unitPrice }}元/{{ item.quantitUnit }}
                  </div>
                  <div class="icon-wrapper">
                    <span class="iconfont"></span>{{ item.ogDateStart.substring(0,10) }}
                  </div>
                </div>
              </div>
              <!-- 外发信息的展示图 -->
              <img
                :src="'http://127.0.0.1:8089/images/20220216205508b55b6ded95be49118a4b68ab1fee1dea.jpg'"
                class="hospital-img">
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="right">
        <div class="common-dept">
          <div class="header-wrapper">

            <div class="title"> 常见种类</div>
            <div class="all-wrapper"><span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <span class="item v-link clickable dark">摆挂饰类</span>
            <span class="item v-link clickable dark">个人饰品</span>
            <span class="item v-link clickable dark">办公文具</span>
            <span class="item v-link clickable dark">家纺产品</span>
            <span class="item v-link clickable dark">礼品包装</span>
            <span class="item v-link clickable dark">家居生活</span>
            <span class="item v-link clickable dark">办公装潢</span>
          </div>
        </div>
        <div class="space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper"><span
                class="iconfont title-icon"></span>
              </div>
              <span class="title">平台公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark">关于延长北京大学国际放假的通知 </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark">谨防上当受骗</span>
            </div>
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark">欢迎各大供应商入驻</span>
            </div>
          </div>
        </div>
        <div class="suspend-notice-list space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">最新加工厂家</span>
            </div>
            <!-- <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div> -->
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark">·莆田市祯祥鸿运工艺品有限公司</span>
            </div>
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark">·湖南博雅礼品有限公司</span>
            </div>
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark">·东莞市昱明鞋材有限公司</span>
              <!-- ·山东久道贸易有限公司·东莞市富特王五金制品有限公司·东莞市沃冶合金科技有限公司  -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mogApi from '@/api/mog'
import dictApi from '@/api/dict'

export default {
  data() {
    return {
      // 搜索框的数据绑定
      parms: {
        detail: '', // 搜索栏内容
        industry: '', // 激活的行业
        provinceCode: '', //  激活的省code
        cityCode: '', // 激活的市code
        curentPage: 1, // 显示第一页
        pageSize: 10, // 每页显示十条内容
        total: 0 // 搜索总数
      },
      page: 1,
      limit: 10,
      list: [],

      deatilList: [], // 搜索栏远程搜索内容 由this.getQueryDetail()得到

      industryList: [], // 各行业集合
      districtList: [], // 地区集合

      industryActiveIndex: 0, // 行业集合激活序列
      provinceActiveIndex: 0 // dq
    }
  },
  created() {
    this.init()
    this.getQueryDetail()
  },
  methods: {
    // 查询各行业数据列表 和 所有地区列表
    init() {
      // 查询各行业数据列表
      dictApi.findByDictCode('Industry')
        .then(response => {
          // industryList清空
          this.industryList = []
          // 向industryList添加全部值
          this.industryList.push({ 'name': '全部', 'value': '' })
          // 把接口返回数据，添加到industryList
          for (var i = 0; i<response.data.length; i++) {
            this.industryList.push(response.data[i])
          }
        })

      // 查询省地区数据
      dictApi.findByDictCode('Province')
        .then(response => {
          this.districtList = []
          this.districtList.push({ 'name': '全部', 'value': '' })
          for (const i in response.data) {
            this.districtList.push(response.data[i])
          }
        })

      // 初始化搜索框内容
      // this.parms.detail = ''
      // 查询第一页外发信息数据
      this.getList()
    },

    // 查询mog信息列表
    getList() {
      // 清空展示列表
      this.list = []
      mogApi.getPageList(this.parms)
        .then(response => {
          for (const i in response.data.records) {
            this.list.push(response.data.records[i])
          }
          // console.log(this.list)
          this.page = response.data.total
        })
    },

    // 根据 具体行业 查询
    industrytypeSelect(industry, index) {
      // 清空mog列表
      this.list = []
      // 设置默认展示第一页
      this.page = 1
      // 更改搜索条件：行业编号(industry)
      this.parms.industry = industry
      // 激活选中<行业>集合文字高亮
      this.industryActiveIndex = index
      // 调用查询mog列表方法
      this.getList()
    },

    // 点击地区事件，根据 省份地区 查询mog列表
    districtSelect(provinceCode, index) {
      // 清空mog列表
      this.list = []
      // 设置默认展示第一页
      this.page = 1
      // 更改搜索条件：省编号(provinceCode)
      this.parms.provinceCode = provinceCode
      // 激活选中<省>文字高亮
      this.provinceActiveIndex = index
      this.getList()
    },

    // 在输入框输入值，弹出下拉框，显示相关内容
    querySearchAsync(detail, cb) {
      var results = detail ? this.deatilList.filter(this.createStateFilter(detail)) : this.deatilList
      console.log(results)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return (deatilList) => {
        return (deatilList.value.indexOf(queryString) === 0)
      }
    },

    // 在下拉框选择某一个内容，执行下面方法，跳转到详情页面中
    handleSelect(item) {
      // 跳转到动态路由page/mog下的_ogid.vue
      window.location.href = '/mog/' + item.ogId
    },

    // 点击某个医院名称，跳转到详情页面中
    show(ogId) {
      window.location.href = '/mog/' + ogId
    },

    // 初始化获得搜索框需要的提示信息
    getQueryDetail() {
      mogApi.getAllMOG().then(response => {
        // 将最多只有5条的结果赋值给搜索框提示内容
        response.data.forEach(element => {
          this.deatilList.push({ 'value': element.ogTitle })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 展示框展示图片
img{
  width: 100%;
  height: 100%;
}

// 通过限制最小高度，解决了指示器激活时，激活中的指示器高度提高到30px，而导致其余的元素跟随着抖动
::v-deep .el-carousel__indicators--outside {
  min-height: 30px;
}
</style>
