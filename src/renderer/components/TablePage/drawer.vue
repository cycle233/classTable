<template>
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
</template>

<script>
export default {
  name: 'drawer'
}
</script>

<style scoped>

</style>
