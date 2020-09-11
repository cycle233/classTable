<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
      <el-col :xs="20" :sm="15" :md="12" :lg="8" :xl="5">
        <el-card shadow="hover" class="box-card" v-loading="isLoading">
          <div slot="header" class="clearfix">
            <el-row type="flex" justify="space-between" align="middle">
              <el-badge>{{ '课表查询 ' + version }}</el-badge>
              <el-dropdown @command="handleCommand">
                <el-link icon="el-icon-more-outline" :underline="false"></el-link>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-wind-power" command="dialogHistory">历史记录</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-setting" command="drawerSetting" divided>设置</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-row>
          </div>
          <div>
            <el-form :model="formXghRef" ref="formXghRef" :rules="rules">
              <el-form-item prop="xgh">
                <el-input v-model="formXghRef.xgh" placeholder="请输入学号"></el-input>
              </el-form-item>
              <el-form-item prop="zc">
                <el-select v-model="formXghRef.zc" placeholder="请选择第几周">
                  <el-option
                      v-for="data in weeks"
                      :key="data.wek"
                      :value="data.wek"
                      :label="data.date">
                    <span style="float: left">{{ data.date }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ data.wek + '周' }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-row type="flex" justify="space-between">
                <el-button type="text" @click="cacheStoreClear">课表不准确？试试点我清除缓存</el-button>
                <el-button round @click="btnClick('formXghRef')">查询</el-button>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--课表显示dialog-->
    <el-dialog :fullscreen="true" :center="true" width="100%"
               :visible.sync="dialogClassTable" destroy-on-close
               @close="dialogClose">
      <el-table :data="classData" stripe>
        <el-table-column :label="'第'+this.formXghRef.zc+'周'" width="70px" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <p>节数: {{ scope.row.d0[1] }}</p>
              <p>时间: {{ scope.row.d0[0] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" effect="plain" type="info">
                  <i class="el-icon-time"></i>
                  {{ scope.row.d0[1] }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="周一" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right" v-if="scope.row.d1[0] !== scope.row.d1[1]">
              <p>课名: {{ scope.row.d1[0] }}</p>
              <p>教室: {{ scope.row.d1[1] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.d1[0] }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="周二" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right" v-if="scope.row.d2[0] !== scope.row.d2[1]">
              <p>课名: {{ scope.row.d2[0] }}</p>
              <p>教室: {{ scope.row.d2[1] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.d2[0] }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="周三" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" v-if="scope.row.d3[0] !== scope.row.d3[1]">
              <p>课名: {{ scope.row.d3[0] }}</p>
              <p>教室: {{ scope.row.d3[1] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.d3[0] }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="周四" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="left" v-if="scope.row.d4[0] !== scope.row.d4[1]">
              <p>课名: {{ scope.row.d4[0] }}</p>
              <p>教室: {{ scope.row.d4[1] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.d4[0] }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="周五" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="left" v-if="scope.row.d5[0] !== scope.row.d5[1]">
              <p>课名: {{ scope.row.d5[0] }}</p>
              <p>教室: {{ scope.row.d5[1] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.d5[0] }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--历史记录dialog-->
    <el-dialog :fullscreen="true" :center="true" width="100%" destroy-on-close :visible.sync="dialogHistory">
      <el-table :data="historyData" stripe>
        <el-table-column property="date" label="时间戳" align="center"></el-table-column>
        <el-table-column property="xgh" label="学号" align="center"></el-table-column>
        <el-table-column property="zc" label="第几周" align="center"></el-table-column>
        <el-table-column property="state" label="状态" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="center" align="middle" style="margin: 10px">
        <el-button round @click="historyStoreClear">清空历史记录</el-button>
      </el-row>
    </el-dialog>
    <!--菜单显示drawer-->
    <el-drawer
        :visible.sync="drawerSetting"
        :with-header="false">
      <el-row type="flex" justify="center">
        <el-image
            style="width: 120px; height: 120px; margin: 10px"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599797537230&di=7859b6935ffd8d26d4e4983fe72ba15d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F01%2F20150901162425_GnQtz.png"
            lazy>
        </el-image>
      </el-row>
      <el-row type="flex" justify="center">
        <el-tag type="danger">正在加急开发中</el-tag>
      </el-row>
      <el-row type="flex" justify="center">
        <el-tag type="danger">有建议或问题联系作者</el-tag>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data () {
    const checkXgh = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学号不能为空'))
      }
      setTimeout(() => {
        const numReg = new RegExp(/^[0-9]*$/)
        if (!numReg.test(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value.length !== 9) {
            callback(new Error('学号必须为9位'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    const checkWek = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        return callback(new Error('请选择周数'))
      }
      setTimeout(() => {
        if (value <= 20 && value >= 1) {
          callback()
        }
        callback(new Error('周数错误'))
      }, 500)
    }
    return {
      rules: {
        xgh: [{validator: checkXgh, trigger: 'blur'}],
        zc: [{validator: checkWek, trigger: 'blur'}]
      },
      weeks: [
        {date: '2020-09-07~2020-09-13', wek: '1'}, {date: '2020-09-14~2020-09-20', wek: '2'},
        {date: '2020-09-21~2020-09-27', wek: '3'}, {date: '2020-09-28~2020-10-04', wek: '4'},
        {date: '2020-10-05~2020-10-11', wek: '5'}, {date: '2020-10-12~2020-10-18', wek: '6'},
        {date: '2020-10-19~2020-10-25', wek: '7'}, {date: '2020-10-26~2020-11-01', wek: '8'},
        {date: '2020-11-02~2020-11-08', wek: '9'}, {date: '2020-11-09~2020-11-15', wek: '10'},
        {date: '2020-11-16~2020-11-22', wek: '11'}, {date: '2020-11-23~2020-11-29', wek: '12'},
        {date: '2020-11-30~2020-12-06', wek: '13'}, {date: '2020-12-07~2020-12-13', wek: '14'},
        {date: '2020-12-14~2020-12-20', wek: '15'}, {date: '2020-12-21~2020-12-27', wek: '16'},
        {date: '2020-12-28~2021-01-03', wek: '17'}, {date: '2021-01-04~2021-01-10', wek: '18'},
        {date: '2021-01-11~2021-01-17', wek: '19'}, {date: '2021-01-18~2021-01-24', wek: '20'}],
      courseTime: [
        ['08:30~10:00', '1-2'],
        ['10:20~11:50', '3-4'],
        ['13:30~15:00', '5-6'],
        ['15:10~16:40', '7-8'],
        ['18:30~20:00', '9-10']],
      isLoading: false,
      drawerSetting: false,
      dialogClassTable: false,
      dialogHistory: false,
      classData: [],
      historyData: [],
      version: '',
      formXghRef: {
        xgh: '',
        zc: ''
      }
    }
  },
  created () {
    const query = this.storePkg.getClassQueryLast()
    if (query !== undefined) {
      this.formXghRef.xgh = query.xgh
      this.formXghRef.zc = query.zc
    }
    // this.version = app.getVersion()
    this.version = '0.0.3 alpha'
    let a = ['1', '2']
    a.pop()
    console.log(a)
  },
  methods: {
    btnClick (formName) {
      console.log(this.formXghRef.xgh, this.formXghRef.zc)
      this.isLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const timeStamp = this.storePkg.pushHistoryQuery(this.formXghRef.xgh, this.formXghRef.zc)
          const classData = this.storePkg.getCacheClass(this.formXghRef.xgh, this.formXghRef.zc)
          let state = ''
          if (classData === undefined) {
            console.log('post')
            state = this.getTables()
          } else {
            console.log('no-post')
            this.classData = classData
            this.dialogClassTable = true
            state = 'success'
          }
          this.storePkg.setHistoryQueryState(timeStamp, state)
        } else {
          this.$message({
            message: '表单验证错误',
            type: 'warning'
          })
        }
      })
      this.isLoading = false
    },
    getTables () {
      this.sisoPkg.getCourseTable(this.formXghRef.xgh, this.formXghRef.zc).then((res) => {
        res.json().then(data => {
          console.log('res', data)
          let resData = data
          let reg1 = new RegExp('&nbsp;', 'g')
          let classData = []
          for (let day = 0; day < 5; day++) {
            classData.push({
              d0: this.courseTime[day],
              d1: (resData[day][0] + '<br>8:30~10:00').replace(reg1, ' <br> ').split('<br>'),
              d2: (resData[day][1] + '<br>10:20~11:50').replace(reg1, ' <br> ').split('<br>'),
              d3: (resData[day][2] + '<br>13:30~15:00').replace(reg1, ' <br> ').split('<br>'),
              d4: (resData[day][3] + '<br>15:10~16:40').replace(reg1, ' <br> ').split('<br>'),
              d5: (resData[day][4] + '<br>18:30~19:10').replace(reg1, ' <br> ').split('<br>')
            })
          }
          this.storePkg.setCacheClass(this.formXghRef.xgh, this.formXghRef.zc, classData)
          this.classData = classData
          this.dialogClassTable = true
          return 'success'
        })
      }).catch((ex) => {
        console.log('ex', ex)
        this.$message({
          message: ex,
          type: 'warning'
        })
        return 'error'
      })
    },
    dialogClose () {
      this.classData = []
      this.historyData = []
    },
    cacheStoreClear () {
      this.storePkg.clearCacheStore()
      this.$message({
        message: '清除成功',
        type: 'success'
      })
      // this.ftqqPkg.sendMsgPost('sisoTable', '成功清除缓存')
    },
    historyStoreClear () {
      this.storePkg.clearHistoryStore()
      this.dialogHistory = false
      this.$message({
        message: '清除成功',
        type: 'success'
      })
    },
    handleCommand (command) {
      if (command === 'drawerSetting') {
        this.drawerSetting = true
      } else if (command === 'dialogHistory') {
        this.historyData = this.storePkg.getHistoryQuery()
        this.dialogHistory = true
      }
    }
  }
}
</script>

<style>
.grid-content {
  border-radius: 4px;
  min-height: 90px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.el-select, .el-table {
  width: 100%;
}

.el-dialog__center {
  padding-top: 10px;
}

.el-dialog__center, .el-dialog__body {
  padding: 0;
}

.el-drawer:focus, .el-drawer__header:focus, .el-tag:focus {
  outline: 0;
}

.el-drawer__body {
  padding: 10px;
}

.el-tag {
  margin: 5px 0;
}

.el-image {
  border-radius: 120px;
}
</style>
