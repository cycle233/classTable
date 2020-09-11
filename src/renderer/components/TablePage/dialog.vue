<template>
  <el-dialog :fullscreen="true" :center="true"
             :visible.sync="formXghRef.dialogTableVisible" destroy-on-close
             @close="dialogClose">
    <el-table :data="formXghRef.classDatas" stripe>
      <el-table-column :label="'第'+this.formXghRef.wek+'周'">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{ scope.row.d0 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="周一">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right" v-if="scope.row.d1[0] !== scope.row.d1[1]">
            <p>课名: {{ scope.row.d1[0] }}</p>
            <p>教室: {{ scope.row.d1[1] }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.d1[0] }}</el-tag>
            </div>
          </el-popover>
          <el-popover v-else></el-popover>
        </template>
      </el-table-column>
      <el-table-column label="周二">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right" v-if="scope.row.d2[0] !== scope.row.d2[1]">
            <p>课名: {{ scope.row.d2[0] }}</p>
            <p>教室: {{ scope.row.d2[1] }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.d2[0] }}</el-tag>
            </div>
          </el-popover>
          <el-popover v-else></el-popover>
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
          <el-popover v-else></el-popover>
        </template>
      </el-table-column>
      <el-table-column label="周四">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left" v-if="scope.row.d4[0] !== scope.row.d4[1]">
            <p>课名: {{ scope.row.d4[0] }}</p>
            <p>教室: {{ scope.row.d4[1] }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.d4[0] }}</el-tag>
            </div>
          </el-popover>
          <el-popover v-else></el-popover>
        </template>
      </el-table-column>
      <el-table-column label="周五">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left" v-if="scope.row.d5[0] !== scope.row.d5[1]">
            <p>课名: {{ scope.row.d5[0] }}</p>
            <p>教室: {{ scope.row.d5[1] }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.d5[0] }}</el-tag>
            </div>
          </el-popover>
          <el-popover v-else></el-popover>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'dialog'
}
</script>

<style scoped>

</style>
