<template>
  <div class="app-container">
    <div class="head-container">
      <!--搜索框-->
      <search />
      <!--增删改查按钮组-->
      <crud-operation>
        <el-button slot="left" class="filter-item" type="danger" icon="el-icon-delete" size="mini" :loading="crud.delAllLoading" @click="confirmDelAll()">清空</el-button>
      </crud-operation>
    </div>

    <!--日志数据表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column type="expand">
        <!--请求日志详情-->
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="请求方法">
              <span>{{ props.row.method }}</span>
            </el-form-item>
            <el-form-item label="请求参数">
              <span>{{ props.row.params }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="requestIp" label="IP" />
      <el-table-column :show-overflow-tooltip="true" prop="address" label="IP来源" />
      <el-table-column prop="browser" label="浏览器" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="time" label="请求耗时" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.time <= 300">{{ scope.row.time }}ms</el-tag>
          <el-tag v-else-if="scope.row.time <= 1000" type="warning">{{ scope.row.time }}ms</el-tag>
          <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="180px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>

  import { delAllInfo } from "../../../api/monitor/log"   //日志相关api
  import Search from './search'

  import CRUD, { presenter } from '@crud/crud'
  import crudOperation from '@crud/CRUD.operation'
  import pagination from '@crud/Pagination'

  export default {
    name: "Log",
    components: {
      Search,
      crudOperation,
      pagination
    },
    cruds() {
      return CRUD({ title: '日志', url: 'api/logs' })
    },
    mixins: [presenter()],
    created() {
      this.crud.optShow = {   //只显示删除按钮
        add: false,
        edit: false,
        del: false,
        download: true
      }
    },
    methods: {
      confirmDelAll() {     //删除所有日志
        this.$confirm(`确认清空所有操作日志吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.crud.delAllLoading = true
          //调用接口删除所有日志
          delAllInfo().then(res => {
            this.crud.delAllLoading = false
            this.crud.dleChangePage(1)
            this.crud.delSuccessNotify()
            this.crud.toQuery()
          }).catch(err => {
            this.crud.delAllLoading = false
            console.log(err.response.data.message)
          })
        }).catch(() => {
        })
      }
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 70px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .demo-table-expand .el-form-item__content {
    font-size: 12px;
  }
</style>
