<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.appName" clearable placeholder="输入应用名称查询" style="width: 200px" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker v-model="query.createTime" class="date-item" />
        <rr-operation />
      </div>
      <!--增删改查-->
      <crud-operation :permission="permission">
        <template slot="right">
          <el-button v-permission="['admin','deploy:add']" :disabled="!selectIndex" class="filter-item" size="mini" type="primary"
                     icon="el-icon-upload" @click="sysRestore">系统还原</el-button>
          <el-button v-permission="['admin','deploy:add']" :disabled="!selectIndex" class="filter-item" size="mini" type="primary"
                     icon="el-icon-upload" @click="serverStatus">状态查询</el-button>
          <el-button v-permission="['admin','deploy:add']" :disabled="!selectIndex" class="filter-item" size="mini" type="success"
                     icon="el-icon-upload" @click="startServer">启动</el-button>
          <el-button v-permission="['admin','deploy:add']" :disabled="!selectIndex" class="filter-item" size="mini" type="danger"
                     icon="el-icon-upload" @click="stopServer">停止</el-button>
          <el-button v-permission="['admin','deploy:add']" :disabled="!selectIndex" class="filter-item" size="mini" type="warning"
                     icon="el-icon-upload" @click="deploy">一键部署</el-button>
        </template>
      </crud-operation>
    </div>

    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" highlight-current-row stripe style="width: 100%" @selection-change="handleCurrentChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="app.name" label="应用名称" />
      <el-table-column prop="servers" label="服务器列表" />
      <el-table-column prop="createTime" label="部署日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-permission="['admin','deploy:edit','deploy:del']" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <ud-operation :data="scope.row" :permission="permission" />
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <pagination />

  </div>
</template>

<script>

  import crudDeploy from '../../../api/mnt/deploy'    //部署相关api

  import CRUD, { presenter, header, form, crud } from '@crud/crud'
  import rrOperation from '@crud/RR.operation'
  import crudOperation from '@crud/CRUD.operation'
  import udOperation from '@crud/UD.operation'
  import pagination from '@crud/Pagination'
  import DateRangePicker from '@/components/DateRangePicker'

  export default {
    name: "Deploy",
    components: {
      pagination,
      crudOperation,
      rrOperation,
      udOperation,
      DateRangePicker
    },
    cruds() {
      return CRUD({ title: '部署', url: 'api/deploy', crudMethod: { ...crudDeploy }})
    },
    mixins: [presenter(), header(), form(defaultForm), crud()],
    data() {
      return {
        currentRow: {}, selectIndex: '', appName: '', urlHistory: '',
        times: 0, appId: '', deployId: '', apps: [], servers: [],
        permission: {
          add: ['admin', 'deploy:add'],
          edit: ['admin', 'deploy:edit'],
          del: ['admin', 'deploy:del']
        },
        rules: {
          'app.id': [
            { required: true, message: '应用不能为空', trigger: 'blur', type: 'number' }
          ],
          deploys: [
            { required: true, message: '服务器不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //系统还原
      sysRestore() {
        this.$refs.sysRestore.dialog = true
      },
      //状态查询
      serverStatus() {
        crudDeploy.serverStatus(JSON.stringify(this.currentRow))
          .then(res => {
          })
          .catch(err => {
            console.log('error:' + err.response.data.message)
          })
      },
      //启动服务
      startServer() {
        crudDeploy.startServer(JSON.stringify(this.currentRow))
          .then(res => {
          })
          .catch(err => {
            console.log('error:' + err.response.data.message)
          })
      },
      //停止服务
      stopServer() {
        crudDeploy.stopServer(JSON.stringify(this.currentRow))
          .then(res => {
          })
          .catch(err => {
            console.log('error:' + err.response.data.message)
          })
      },
      //部署服务
      deploy() {
        this.$refs.deploy.dialog = true
        this.$refs.deploy.deployInfo = this.currentRow
      },
    }
  }
</script>

<style scoped>

</style>
