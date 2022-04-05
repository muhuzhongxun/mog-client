<template>
  <div style="top:50px">
    <!-- <div class="demo-box">
      <div class="demo-body">
        <button class="m-button m-button-primary" @click="handleDelChat">删除会话</button>
        <button class="m-button m-button-primary" @click="config.brief= !config.brief">简约模式</button>
      </div>
    </div> -->
    <button class="m-button m-button-primary" style="display:none" @addChat="addChat">增加会话</button>

    <mchat
      ref="mchat"
      :config="config"
      :chats="chats"
      :mine="mine"
      @removeChat="handleChatRemove"
      @talkUserClick="handleTalkUserClick"
      @talkClick="handleTalkClick"
      @chatInfo="handleChatInfo"
      @sendMessage="sendMessage"
      @loadHistory="handleHistory"
      @uploadEvent="handleUpload"
    >
      <!-- <mchat-right-box>
        <template slot-scope="props">
          <mchat-group-list
            v-if="props.chat.type == 'group'"
            :notices="props.chat.notices"
            :user-list="props.chat.userList"
            :filter-user-method="filterUser"
            @click="handleRightEvent"
          />
          <div v-else>发挥你的想象</div>
        </template>
      </mchat-right-box> -->
    </mchat>

  </div>
</template>
<script>

import { mapGetters } from 'vuex'

import chat from '@/api/chat.js'

// 红色语录
var replay = [
  '我认识的人很多，而且我的同志遍布五湖四海。emoji[嘻嘻]',
  '(*^__^*) emojio[嘻嘻] ，请我喝咖啡吗？',
  '我喜欢你，emoji[爱你]从初级阶段直到共产主义。',
  '(*^__^*) emojio[嘻嘻] ，请我喝咖啡吗？',
  '(*^__^*) emojio[嘻嘻] ，请我喝咖啡吗？',
  '(*^__^*) emojio[嘻嘻] ，请我喝咖啡吗？',
  '中国真好，下次还来。',
  '生而为人，为人民服务。',
  '<（@￣︶￣@）>',
  '(*^__^*) emojio[嘻嘻] ，请我喝咖啡吗？'
]

export default {
  name: 'IChatTest',
  data() {
    return {
      ws: null,
      // 获取主面板列表信息，下文会做进一步介绍
      config: {
        // 是否有下拉按钮
        downBtn: true,
        rightBox: true,
        // 简约模式
        brief: true,
        // 是否开启桌面消息提醒，即在浏览器之外的提醒
        notice: false,
        // 设定
        voice: true,
        // 上传文件的扩展名
        fileExt: '',
        tabRemove: false,
        // 窗口是否固定
        fixed: false
      },
      // 我的信息
      // mine: CONST.mine,
      mine: {
        // 昵称
        username: 'muhuzhongxun', // this.$store.getters.name,
        // 用户id
        id: 1, // this.$store.getters.userId,
        // 状态
        status: 'online'
        // 签名
        // sign: '与其感慨路难行,不如马上出发！',
        // avatar: this.$host + 'avatar/' + this.$store.getters.avatar
      },
      // 会话
      // chats: CONST.chats
      chats: [{
        id: -1,
        name: '系统消息',
        type: 'sys_msg',
        online: false,
        avatar: 'http://127.0.0.1:8089/images/avatar/youshu.png'
      },
      {
        id: 1,
        name: '万能的管理员',
        type: 'friend',
        online: true,
        avatar: 'http://127.0.0.1:8089/images/avatar/Kamado.png'
      },
      {
        id: 2,
        name: '万恶的资本家',
        type: 'friend',
        online: true,
        avatar: 'http://127.0.0.1:8089/images/avatar/ue.png'
      }]

    }
  },
  computed: {
    ...mapGetters([
      'name',
      'userId',
      'roles'
    ])
  },
  mounted() {
    this.initWebSocket()
    chat.$on('addChat', (id) => {
      // console.log('添加会话：' + id)
      this.addChat(id)
    })
  },
  methods: {
    filterUser(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // fetchNotices() {
    //   return CONST.notice_list
    // },
    // handleChatRemove(item, { id, name, type }) {
    handleChatRemove(item) {
      console.log('事件名：removeChat。点击对话标签删除或择对话框关闭触发', item)
      // const channels = this.chats
      // const len = channels.length
      // if (len < 1) return
      // const ary = []
      // for (let i = 0; i < len; i++) {
      //   const model = channels[i]
      //   if (model.id !== id) {
      //     ary.push(model)
      //   }
      // }
      // this.chats = ary
      // 暂时用移除
      this.chats.pop()
    },
    handleRightEvent(event) {
      console.log('右边框事件', event)
    },
    handleHistory(data) {
      // eslint-disable-next-line no-unused-vars
      const { chat, last, callback } = data
      console.log('获取历史记录', data)
      const history = [
        {
          username: '历史记录',
          avatar: 'http://127.0.0.1:8089/images/avatar/xue.png',
          id: 1,
          type: 'group',
          content: 'audio[https://www.w3school.com.cn/i/horse.mp3]',
          cid: parseInt(Math.random() * 10, 10),
          mine: false,
          fromid: 3,
          timestamp: new Date()
        }
      ]
      callback(history)
    },

    sendMessage(data) {
      console.log('发送内容', { data })
      const { mine, to, content, timestamp } = data
      const message = {
        // 消息来源用户名
        username: mine.username,
        // 消息来源用户头像
        avatar: mine.avatar,
        // 消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
        fromid: mine.id,
        // 消息的接收者ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
        id: to.id,
        // 聊天窗口来源类型，从发送消息传递的to里面获取
        type: to.type,
        // 消息内容
        content,
        // 消息id，可不传。除非你要对消息进行一些操作（如撤回）
        cid: 0,
        // 是否我发送的消息，如果为true，则会显示在右方
        mine: true,
        // 服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
        timestamp
      }
      //
      this.ws.send(JSON.stringify(message))
      console.log('getMessage:', { message })
      // 聊天框显示自己发送的信息
      this.$refs.mchat.getMessage(message)
      if (message.id === -1) {
        // 若发信息给系统(id: -1)触发自动回复
        const authReplay = {
          username: '系统消息',
          avatar: 'http://127.0.0.1:8089/images/avatar/youshu.png',
          id: to.id,
          type: to.type,
          content: replay[(Math.random() * 9) | 0],
          cid: 0,
          mine: false,
          fromid: 1,
          timestamp: new Date()
        }
        console.log(authReplay)
        this.$im.emit('getMessage', authReplay)
      }
    },
    // 添加回话
    addChat(id) {
      var s = true
      console.log(this.chats)
      this.chats.forEach(element => {
        // 只要会话列表有该会话则不再添加该会话
        if (element.id === id) { s = false }
      })
      if (s) {
        const newChat = {
          id: id,
          name: '新会话',
          type: 'friend',
          online: true,
          avatar: 'http://127.0.0.1:8089/images/avatar/xue.png'
        }
        this.chats.push(newChat)
        this.$message.success('添加用户：' + id + '会话成功！')
      }
    },
    // handleDelChat() {
    //   this.chats.pop()
    // },
    handleUpload(data, fn) {
      console.log('文件上传', data)
    },
    handleTalkUserClick(item) {
      console.log('事件名：talkUserClick。对话用户头像点击事件', item)
    },
    handleTalkClick(item) {
      console.log('事件名：talkClick。对话内容点击事件', item)
    },
    handleChatInfo(item) {
      console.log('事件名：chatInfo。点击窗口对话头像触发', item)
    },

    // 进入页面创建websocket连接
    initWebSocket() {
      const _this = this
      // 判断页面有没有存在websocket连接
      if (window.WebSocket) {
        // const sip = '房间号'
        // var url = 'ws://' + this.$backhost + 'Chat/' + sip + '/' + this.userId // `ws://127.0.0.1/8089/Chat/10086/聊天室`
        var url = 'ws://' + this.$backhost + 'Chat/1' // `ws://127.0.0.1/8089/Chat/${fromid}/`
        console.log(url)
        // 实例化socket
        const ws = new WebSocket(url)
        _this.ws = ws
        // 监听socket连接成功
        ws.onopen = function(e) {
          console.log('服务器连接成功: ' + url)
        }
        // 监听socket连接失败
        ws.onclose = function(e) {
          console.log('服务器连接关闭: ' + url)
        }
        // 监听socket错误信息
        ws.onerror = function() {
          console.log('服务器连接出错: ' + url)
        }
        // 监听socket消息
        ws.onmessage = function(e) {
          // 接收服务器返回的数据
          // console.log('e:')
          // console.log(e.data)
          const resData = JSON.parse(e.data)
          // console.log(resData)

          // console.log(..._this.list)
          // _this.list = [
          //   ..._this.list,
          //   { userId: resData.fromid, username: resData.username, avatar: resData.avatar, content: resData.content }
          // ]
          // console.log(_this.list)

          // 将监听到的消息 处理后显示出来
          resData.mine = 0
          resData.id = resData.fromid
          resData.fromid = _this.mine.id
          console.log(resData)
          _this.$refs.mchat.getMessage(resData)
        }
      }
    }
  }
}
</script>

<style lang="scss">

    .demo-box {
        border: 1px solid #ebeef5;
        background-color: #fff;
        color: #303133;
        transition: .3s;
        border-radius: 4px;
        overflow: hidden;
        .demo-header {
            padding: 18px 20px;
            border-bottom: 1px solid #ebeef5;
            box-sizing: border-box;
            .demo-title {
            }
        }
        .demo-body {
            padding: 20px;

        }

    }
</style>
