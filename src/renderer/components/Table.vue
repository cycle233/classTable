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
              <el-tooltip content="还在加急开发中" placement="top" effect="dark">
                <el-button type="text" @click="drawer = true">设置</el-button>
              </el-tooltip>
            </el-row>
          </div>
          <div>
            <el-form :model="formXghRef" ref="formXghRef" :rules="rules">
              <el-form-item prop="xgh">
                <el-input v-model="formXghRef.xgh" placeholder="请输入学号"></el-input>
              </el-form-item>
              <el-form-item prop="wek">
                <el-select v-model="formXghRef.wek" placeholder="请选择周数">
                  <el-option
                      v-for="(item, i) in weeks"
                      :key="i + 1"
                      :value="i + 1"
                      :label="item">
                    <span style="float: left">{{ item }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ (i + 1) + '周' }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-row type="flex" justify="space-between">
                <el-button type="text" @click="stroeClear">课表不准确？试试点我清除缓存</el-button>
                <el-button round @click="btnClick('formXghRef')">查询</el-button>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--    课表显示dialog-->
    <el-dialog :fullscreen="true" :center="true" width="100%"
               :visible.sync="formXghRef.dialogTableVisible" destroy-on-close
               @close="dialogClose">
      <el-table :data="formXghRef.classDatas" stripe >
        <el-table-column :label="'第'+this.formXghRef.wek+'周'" width="70px" align="center">
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
        <el-table-column label="周三">
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
    <!--菜单显示drawer-->
    <el-drawer
        :visible.sync="drawer"
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
        wek: [{validator: checkWek, trigger: 'blur'}]
      },
      weeks: [
        '2020-09-07~2020-09-13', '2020-09-14~2020-09-20', '2020-09-21~2020-09-27',
        '2020-09-28~2020-10-04', '2020-10-05~2020-10-11', '2020-10-12~2020-10-18',
        '2020-10-19~2020-10-25', '2020-10-26~2020-11-01', '2020-11-02~2020-11-08',
        '2020-11-09~2020-11-15', '2020-11-16~2020-11-22', '2020-11-23~2020-11-29',
        '2020-11-30~2020-12-06', '2020-12-07~2020-12-13', '2020-12-14~2020-12-20',
        '2020-12-21~2020-12-27', '2020-12-28~2021-01-03', '2021-01-04~2021-01-10',
        '2021-01-11~2021-01-17', '2021-01-18~2021-01-24'],
      courseTime: [
        ['08:30~10:00', '1-2'],
        ['10:20~11:50', '3-4'],
        ['13:30~15:00', '5-6'],
        ['15:10~16:40', '7-8'],
        ['18:30~20:00', '9-10']],
      isLoading: false,
      drawer: false,
      version: '',
      formXghRef: {
        dialogTableVisible: false,
        xgh: '',
        wek: '',
        classData: [['&nbsp;', '\u5927\u5b66\u82f1\u8bedIII<br>C212', 'Python\u7a0b\u5e8f\u5f00\u53d1<br>F204', '&nbsp;', '&nbsp;'], ['Python\u7a0b\u5e8f\u5f00\u53d1<br>F204', '&nbsp;', 'ASP.NET\u5e94\u7528\u5f00\u53d1<br>F206', '\u5927\u5b66\u82f1\u8bedIII<br>C212', 'ASP.NET\u5e94\u7528\u5f00\u53d1<br>F206'], ['&nbsp;', '\u8f6f\u4ef6\u6d4b\u8bd5\u57fa\u7840<br>F210', '&nbsp;', '&nbsp;', '\u8f6f\u4ef6\u6d4b\u8bd5\u57fa\u7840<br>F210'], ['&nbsp;', '\u4f53\u80b2\u9009\u9879-\u7537\u5b50\u7bee\u7403<br>\u4f53\u80b2\u9986', '&nbsp;', '&nbsp;', '&nbsp;'], ['&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;']],
        classDatas: []
      }
    }
  },
  created () {
    const Store = require('electron-store')
    const store = new Store()
    this.formXghRef.xgh = store.get('now')
    // this.version = app.getVersion()
    this.version = '0.0.2 beta'
    // console.log('v:', app.getAppPath())
    console.log(this.courseTime[0])
  },
  methods: {
    btnClick (formName) {
      this.isLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const Store = require('electron-store')
          const store = new Store()
          store.set('now', this.formXghRef.xgh)
          if (store.get(this.formXghRef.xgh + this.formXghRef.wek) === undefined) {
            console.log('post')
            this.getTables()
          } else {
            console.log('no-post')
            this.formXghRef.classDatas = store.get(this.formXghRef.xgh + this.formXghRef.wek)
            this.formXghRef.dialogTableVisible = true
          }
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
      this.sisoApi.getCourseTable(this.formXghRef.xgh, this.formXghRef.wek).then((res) => {
        res.json().then(data => {
          console.log('res', data)
          const Store = require('electron-store')
          const store = new Store()
          let classData = data
          let reg1 = new RegExp('&nbsp;', 'g')
          let courseData = []
          for (let day = 0; day < 5; day++) {
            courseData.push({
              d0: this.courseTime[day],
              d1: (classData[day][0] + '<br>8:30~10:00').replace(reg1, ' <br> ').split('<br>'),
              d2: (classData[day][1] + '<br>10:20~11:50').replace(reg1, ' <br> ').split('<br>'),
              d3: (classData[day][2] + '<br>13:30~15:00').replace(reg1, ' <br> ').split('<br>'),
              d4: (classData[day][3] + '<br>15:10~16:40').replace(reg1, ' <br> ').split('<br>'),
              d5: (classData[day][4] + '<br>18:30~19:10').replace(reg1, ' <br> ').split('<br>')
            })
          }
          store.set(this.formXghRef.xgh + this.formXghRef.wek, courseData)
          this.formXghRef.classDatas = store.get(this.formXghRef.xgh + this.formXghRef.wek)
          this.formXghRef.dialogTableVisible = true
        })
      }).catch((ex) => {
        console.log('ex', ex)
        this.$message({
          message: ex,
          type: 'warning'
        })
      })
    },
    dialogClose () {
      this.formXghRef.classDatas = []
    },
    stroeClear () {
      const Store = require('electron-store')
      const store = new Store()
      store.clear()
      this.$message({
        message: '清除成功',
        type: 'success'
      })
      // this.ftqq.sendMsgPost('sisoTable', '成功清除缓存')
    }
  }
}
</script>

<style>
.grid-content {
  border-radius: 4px;
  min-height: 50px;
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
