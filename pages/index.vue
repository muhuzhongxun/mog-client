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
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            class="search-input"
            prefix-icon="el-icon-search"
            placeholder="你想找什么？"
            @select="handleSelect"
          >
            <span slot="suffix" class="search-btn v-link highlight clickable selected">搜索 </span>
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
              <!-- <img
                :src="'data:image/jpeg;base64,'+item.logoData"
                :alt="item.industry"
                class="hospital-img"> -->
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="right">
        <div class="common-dept">
          <div class="header-wrapper">

            <div class="title"> 常见科室</div>
            <div class="all-wrapper"><span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <span class="item v-link clickable dark">神经内科 </span>
            <span class="item v-link clickable dark">消化内科 </span>
            <span class="item v-link clickable dark">呼吸内科 </span>
            <span class="item v-link clickable dark">内科 </span>
            <span class="item v-link clickable dark">神经外科 </span>
            <span class="item v-link clickable dark">妇科 </span>
            <span class="item v-link clickable dark"> 产科 </span>
            <span class="item v-link clickable dark">儿科 </span>
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
              <span class="notice v-link clickable dark">关于延长北京大学国际医院放假的通知 </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark">北京中医药大学东方医院部分科室医生门诊医 </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark"> 武警总医院号源暂停更新通知 </span>
            </div>
          </div>
        </div>
        <div class="suspend-notice-list space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">停诊公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark"> 中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告 </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark"> 首都医科大学附属北京潞河医院老年医学科门诊停诊公告 </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"/>
              <span class="notice v-link clickable dark">中日友好医院中西医结合心内科门诊停诊公告 </span>
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
      searchObj: {},
      state: '',
      // 搜索框的数据绑定
      parms: {
        detail: '',
        industry: '',
        provinceCode: '',
        cityCode: '',
        curentPage: 1,
        pageSize: 10,
        total: 0
      },
      page: 1,
      limit: 10,
      list: [],

      detail: '', // 搜索框内容
      industryList: [], // 各行业集合
      districtList: [], // 地区集合

      industryActiveIndex: 0, // 行业集合激活序列
      provinceActiveIndex: 0 // dq
    }
  },
  created() {
    this.init()
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

      // 查询第一页外发信息数据
      this.getList()
    },

    // 查询医院列表
    getList() {
      mogApi.getPageList(this.parms)
        .then(response => {
          for (const i in response.data.records) {
            this.list.push(response.data.records[i])
          }
          // console.log(this.list)
          this.page = response.data.total
        })
    },

    // 根据医院等级查询
    industrytypeSelect(hostype, index) {
      // 准备数据
      this.list = []
      this.page = 1
      this.industryActiveIndex = index
      this.searchObj.hostype = hostype
      // 调用查询医院列表方法
      this.getList()
    },

    // 根据地区查询医院
    districtSelect(districtCode, index) {
      this.list = []
      this.page = 1
      this.parms.provinceCode = districtCode
      this.provinceActiveIndex = index
      this.searchObj.districtCode = districtCode
      this.getList()
    },

    // 在输入框输入值，弹出下拉框，显示相关内容
    querySearchAsync(queryString, cb) {
      // this.searchObj = []
      if (queryString === '') return
      mogApi.getByHosname(queryString).then(response => {
        for (let i = 0, len = response.data.length; i <len; i++) {
          response.data[i].value = response.data[i].ogTitle
        }
        cb(response.data)
      })
    },

    // 在下拉框选择某一个内容，执行下面方法，跳转到详情页面中
    handleSelect(item) {
      window.location.href = 'http://localhost:8089/client/api/business/ToMogDetail/' + item.ogId
    },

    // 点击某个医院名称，跳转到详情页面中
    show(ogId) {
      window.location.href = 'http://localhost:8089/client/api/business/ToMogDetail/' + ogId
    }
  }
}
</script>
