<template>

  <!-- header -->
  <div class="nav-container page-component">
    <!--左侧导航 #start -->
    <div class="nav left-nav">
      <!-- 计划：     将此处冗余过多的目录改成接口获取目录循环输出 -->
      <div :class="{selected: isActive === 'box1'}" class="nav-item">
        <!-- <span :onclick="'javascript:window.location=\'/hospital/'+mog.ogId+'\''" class="v-link selected dark">外发信息</span> -->
        <span :class="{selected: isActive === 'box1'}" class="v-link clickable dark" @click="go('box1')">外发信息</span>
      </div>
      <div :class="{selected: isActive === 'box2'}" class="nav-item ">
        <span :class="{selected: isActive === 'box2'}" class="v-link clickable dark" @click="go('box2')">产品详情</span>
      </div>
      <div :class="{selected: isActive === 'box3'}" class="nav-item">
        <span :class="{selected: isActive === 'box3'}" class="v-link clickable dark" @click="go('box3')">评论信息</span>
      </div>
      <div :class="{selected: isActive === 'box4'}" class="nav-item ">
        <span :class="{selected: isActive === 'box4'}" class="v-link clickable dark" @click="go('box4')">相关外发</span>
      </div>
      <div :class="{selected: isActive === 'box5'}" class="nav-item ">
        <span :class="{selected: isActive === 'box5'}" class="v-link clickable dark" @click="go('box5')">供应商详情</span>
      </div>
      <div class="nav-item ">
        <span class="v-link clickable dark" @click="message()">投诉/举报</span>
      </div>
    </div>
    <!-- 左侧导航 #end -->

    <!-- 右侧内容 #start -->
    <div class="page-container">
      <div class="hospital-home">
        <div class="common-header">
          <div class="title-wrapper">
            <span id="box1" class="hospital-title">{{ mog.ogTitle }}</span>
            <div class="icon-wrapper">
              <span class="iconfont"></span>{{ mog.industry }}
            </div>
          </div>
        </div>
        <div class="info-wrapper">
          <img :src="'http://127.0.0.1:8089/images/20220216205508b55b6ded95be49118a4b68ab1fee1dea.jpg'" :alt="mog.ogId" class="hospital-img">
          <div class="content-wrapper">
            <div>{{ mog.details }}</div>
            <div class="line" style="float:right">
              <el-tooltip v-if="true" class="item" effect="dark" content="已实名认证" placement="top-start">
                <i class="el-icon-s-custom"/>
              </el-tooltip>
              <el-tooltip v-if="true" class="item" effect="dark" content="已企业认证" placement="top-start">
                <i class="el-icon-s-shop"/>
              </el-tooltip>
              <div @click="addChats(ogId)">
                <el-tooltip class="item" effect="dark" content="点击复制联系电话" placement="top-start">
                  <i class="el-icon-s-comment"/>
                </el-tooltip>
              </div>
              <div @click="collection()">
                <el-tooltip v-if="collect" class="item" effect="dark" content="点击收藏" placement="top-start">
                  <i class="el-icon-star-off"/>
                </el-tooltip>
                <el-tooltip v-else class="item" effect="dark" content="已收藏" placement="top-start">
                  <i class="el-icon-star-on"/>
                </el-tooltip>
              </div>
              <div><span class="mog-price">单价: </span><span class="mog-price">{{ mog.unitPrice }}/元</span></div>
            </div>
            <div class="line">
              <div><span class="label">供货量: </span><span>{{ mog.quantity }}{{ mog.quantitUnit }}</span></div>
              <div class="space"><span class="label">所在地区: </span><span >{{ mog.provinceCode }}-{{ mog.cityCode }}</span></div>
            </div>
            <div class="line">
              <span class="label">外发时间: </span><span>{{ mog.ogDateStart }}</span>
              <div class="space"><span class="label">外发截止时间: </span><span>{{ mog.ogDateEnd }}</span></div>
            </div>

            <div style="margin-top:20px"> 备注: </div>
            <div class="rule-wrapper">
              <ol>
                <!-- <li v-for="item in bookingRule.rule" :key="item">{{ item }}</li> -->
                <a >{{ mog.remark }}</a>
              </ol>
            </div>
          </div>
        </div>
        <!-- 产品图片展示 -->
        <div id="box2" class="title select-title"> 产品图片展示</div>
        <div class="select-dept-wrapper">
          <div class="demo-image__preview">
            <div v-for="(item, index) in pictureSet" :key="index">
              <el-image
                :src="item"
                :preview-src-list="pictureSet"
              />
            </div>
          </div>
        </div>

        <!-- 评论信息 -->
        <div id="box3" class="title select-title"> 评论信息</div>
        <div class="commentBox">
          <p v-if="message.comment.length==0">暂无评论，我来发表第一篇评论！</p>
          <div v-else>
            <div v-for="(item,index) in message.comment" :key="index" :index="index" class="comment" >
              <b>{{ item.name }}<span>{{ item.time }}</span></b>
              <p @click="changeCommenter(item.name,index)">{{ item.content }}</p>
              <div v-if="item.reply.length > 0">
                <div v-for="(reply,index) in item.reply" :key="index" class="reply">
                  <b>&nbsp;&nbsp;&nbsp;&nbsp;{{ reply.responder }}&nbsp;&nbsp;回复&nbsp;&nbsp;{{ reply.reviewers }}<span>{{ reply.time }}</span></b>
                  <p @click="changeCommenter(reply.responder,index)">&nbsp;&nbsp;&nbsp;&nbsp;{{ reply.content }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="title select-title"> 发表评论</div>
          <b v-if="message.type">你回复&nbsp;{{ name }}</b>
          <textarea v-model="message.commentText" name="" value="请填写评论内容" style="width:100%;height:50px;"/>
          <el-button type="primary" round @click="addComment">发表</el-button>
          <el-button round @click="canelComment">取消</el-button>
        </div>

        <!-- 供应商其余外发信息 -->
        <div id="box4" class="title select-title"> 供应商其余外发信息</div>
        <div class="select-dept-wrapper">
          <div class="department-wrapper">
            <div class="hospital-department">
              <div class="dept-list-wrapper el-scrollbar" style="height: 100%;">
                <div class="dept-list el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                  <div class="el-scrollbar__view">
                    <div v-for="(item,index) in UserAllPublishMogList" :key="item.industry" :class="index == activeIndex ? 'selected' : ''" class="sub-item" @click="move(index,item.industry)"> {{ item.industry }}</div>
                  </div>
                </div>
                <div class="el-scrollbar__bar is-horizontal">
                  <div class="el-scrollbar__thumb" style="transform: translateX(0%);"/>
                </div>
                <div class="el-scrollbar__bar is-vertical">
                  <div class="el-scrollbar__thumb" style="transform: translateY(0%); height: 91.4761%;"/>
                </div>
              </div>
            </div>
          </div>
          <div id="行业" class="sub-dept-container">
            <template v-for="item in UserAllPublishMogList">
              <div v-if="item.industry !== '全部'" :key="item.industry" :id="item.industry" :name="item.industry" class="sub-dept-wrapper selected">
                <div class="sub-title">
                  <div class="block selected"/>{{ item.industry }}
                </div>
                <div class="sub-item-wrapper">
                  <div v-for="it in item.children" :key="it.ogId" class="sub-item" @click="show(it.ogId)"><span class="v-link clickable">{{ it.ogTitle }} </span></div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- 供应商信息 -->
        <div id="box5" class="title select-title"> 供应商信息</div>
        <!-- 企业/用户信息 -->
        <div class="select-dept-wrapper"/>

      </div>
    </div>
    <!-- 右侧内容 #end -->
  </div>
  <!-- footer -->
</template>

<script>
import '~/assets/css/hospital_personal.css'
import '~/assets/css/hospital.css'

// import cookie from 'js-cookie'
import mogApi from '@/api/mog'
// import userInfoApi from '@/api/user/userInfo'

import chat from '@/api/chat.js'

export default {
  data() {
    return {
      ogId: null,
      isActive: 'box1',
      activeIndex: 0,
      // 外发基本信息
      mog: {
        param: {}
      },
      // 外发图片信息
      pictureSet: ['http://127.0.0.1:8089/images/202202151921008164953123fb45eea934d7a53a4174ce.jpg', 'http://127.0.0.1:8089/images/202202151921032b6e10fa14994836bb48536a113623e1.jpg'],
      collect: true,
      // 评论功能
      message: {
        commenter: 'muhuzhongxun', // 评论人
        type: 0, // 0为评论作者1为评论别人的评论2为评论别人的别人
        name: '',
        commentText: '',
        oldComment: null,
        chosedIndex: -1, // 被选中的评论的index
        comment: [
          {
            name: '有毒的黄同学',
            time: '2022-01-17',
            content: '好,讲得非常好，good',
            reply: [
              {
                responder: '有毒的黄同学',
                reviewers: '傲娇的',
                time: '2022-02-05',
                content: '你说得对'
              },
              {
                responder: '傲娇的',
                reviewers: '有毒的黄同学',
                time: '2022-02-05',
                content: '很强'
              }
            ]
          },
          {
            name: 'Freedom小黄',
            time: '2022-01-17',
            content: '好,讲得非常好，good',
            reply: []
          }
        ]
      },
      bookingRule: {},
      UserAllPublishMogList: []
    }
  },

  created() {
    // 根据路由获取信息编号
    this.ogId = this.$route.params.ogId

    this.init()
  },

  methods: {
    init() {
      // 根据mog编号查询详情信息
      mogApi.show(this.ogId).then(response => {
        this.mog = response.data
        console.log(this.mog)
        var i = 1
        // this.bookingRule = response.data.bookingRule
        this.UserAllPublishMogList = [{ index: 0, industry: '全部' }]
        // 根据mog.userId查询其所有外发信息tree
        mogApi.findAllPublishMog(this.mog.userId).then(response => {
          if (response.code === 200) {
            response.data.forEach(element => {
              element.index = i++
              this.UserAllPublishMogList.push(element)
            })
            // this.UserAllPublishMogList = response.data
            // this.UserAllPublishMogList.forEach(element => {
            //   element.ogId = i++
            // })
            console.log(this.UserAllPublishMogList)
          }
        })
      })
    },

    // 浮动窗 锚点事件
    go(id) {
      // console.log(document.getElementById(id))
      this.isActive = id
      document.getElementById(id).scrollIntoView()
    },

    addChats(id) {
      chat.$emit('addChat', parseInt(id))
    },

    // 收藏图标点击事件
    collection() {
      if (this.collect === true) {
        this.collect = false
      } else {
        this.collect = true
      }
    },

    // 评论功能
    // addComment: function() {
    //   this.$emit('submit', this.commentText)
    //   this.commentText = ''
    // },
    // changeCommenter: function(name, index) {
    //   this.$emit('change', name, index)
    // },
    // canelComment: function() {
    //   this.$emit('canel')
    //   this.commentText = ''
    // },
    addComment: function(data) {
      if (this.message.type === 0) {
        this.message.comment.push({
          name: 'session',
          time: new Date(),
          content: data,
          reply: []
        })
        // 服务器端变
      } else if (this.message.type === 1) {
        this.message.comment[this.message.chosedIndex].reply.push({
          responder: 'session',
          reviewers: this.message.comment[this.message.chosedIndex].name,
          time: new Date(),
          content: data
        })
        this.message.type = 0
      }
    },
    changeCommenter: function(name, index) {
      this.message.oldComment = name
      this.message.chosedIndex = index
      this.message.type = 1
    },
    canelComment: function() {
      this.message.commentText = ''
      this.message.type = 0
    },

    // 点击供应商其他外发行业信息事件
    move(index, industry) {
      this.activeIndex = index
      // 获取div-id为行业的子div
      var divarr = document.getElementById('行业').children
      // console.log(divarr)
      // 点击具体某个行业，则隐藏其余行业信息
      if (industry !== '全部') {
        for (var i = 0; i<divarr.length; i++) {
          if (industry === divarr[i].getAttribute('name')) {
            divarr[i].style.display = 'block'
          } else {
            divarr[i].style.display = 'none'
          }
        }
        // document.getElementById(industry).scrollIntoView()
      } else {
        // 点击全部则显示全部信息
        for (var j = 0; j<divarr.length; j++) {
          divarr[j].style.display = 'block'
        }
        // ，并把跳转到详细信息的锚点
        // divarr[0].scrollIntoView()
      }
    },

    // 点击其他外发信息，跳转到详情页面中
    show(ogId) {
      window.location.href = '/mog/' + ogId
    }

    // schedule(industry) {
    //   debugger
    //   // 登录判断
    //   const token = cookie.get('token')
    //   if (!token) {
    //     loginEvent.$emit('loginDialogEvent')
    //     return
    //   }

    //   // 判断认证
    //   userInfoApi.getUserInfo().then(response => {
    //     const authStatus = response.data.authStatus
    //     // 状态为2认证通过
    //     if (!authStatus || authStatus != 2) {
    //       window.location.href = '/user'
    //       return
    //     }
    //   })

    //   window.location.href = '/mog/schedule?ogId=' + this.mog.ogId + '&industry=' + industry
    // }
  }
}
</script>

<style>
.nav-container .left-nav {
    position: fixed;
    top: 70px; /*刚好是header组件的高度*/
    float: left
}

.mog-price {
    font-size: 24px;
    color: #d10504;
    font-weight: bold;
    font-family: Tahoma;
}

/* 修改图标样式达到与单价保持一致 */
[class*=" el-icon-"], [class^=el-icon-] {
  padding: 5px;
  font-size: 24px;
  color: #4490f1;
}

/* 修复浏览图片时，图片铺满全屏的问题 */
img{
  width:auto
}

/* 评论样式 */
.el-button.is-round {
    border-radius: 100px;
    padding: 5px 20px;
}
</style>
