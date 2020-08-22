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

    <!--新增、修改部署表单-->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="应用" prop="app.id">
          <el-select v-model.number="form.app.id" placeholder="请选择" style="width: 370px">
            <el-option v-for="item in apps" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务器" prop="deploys">
          <el-select v-model="form.deploys" multiple placeholder="请选择" style="width: 370px">
            <el-option v-for="item in servers" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>

    <!--系统还原组件-->
    <f-form ref="sysRestore" :key="times" :app-name="appName" />

    <!--部署组件-->
    <d-form ref="deploy" />

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

  import dForm from './deploy'    //部署组件
  import fForm from './sysRestore'  //备份还原组件

  import CRUD, { presenter, header, form, crud } from '@crud/crud'
  import rrOperation from '@crud/RR.operation'
  import crudOperation from '@crud/CRUD.operation'
  import udOperation from '@crud/UD.operation'
  import pagination from '@crud/Pagination'
  import DateRangePicker from '@/components/DateRangePicker'

  //部署表单默认属性
  const defaultForm = { id: null, app: { id: null }, deploys: [] }

  export default {
    name: "Deploy",
    components: {
      pagination,
      crudOperation,
      rrOperation,
      udOperation,
      DateRangePicker,
      dForm,
      fForm
    },
    cruds() {
      return CRUD({ title: '部署', url: 'api/deploy', crudMethod: { ...crudDeploy }})
    },
    mixins: [presenter(), header(), form(defaultForm), crud()],
    data() {
      return {
        currentRow: {},
        selectIndex: '',
        appName: '',
        urlHistory: '',
        times: 0,
        appId: '',
        deployId: '',
        apps: [],
        servers: [],
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
      handleCurrentChange(selection) {
        this.crud.selections = selection
        if (selection.length === 1) {
          const row = selection[0]
          this.selectIndex = row.id
          this.currentRow = row
          this.appName = row.app.name
          this.times = this.times + 1
          this.appId = row.appId
          this.deployId = row.id
        } else {
          this.currentRow = {}
          this.selectIndex = ''
        }
      },
      initSelect() {
        crudDeploy.getApps().then(res => {
          this.apps = res.content
        })
        crudDeploy.getServers().then(res => {
          this.servers = res.content
        })
      },
      //-----------------------------------------------------------
      [CRUD.HOOK.beforeRefresh]() {
        this.selectIndex = ''
        return true
      },
      // 新增编辑前做的操作
      [CRUD.HOOK.beforeToCU](crud, form) {
        this.initSelect()
        const deploys = []
        form.deploys.forEach(function(deploy, index) {
          deploys.push(deploy.id)
        })
        this.form.deploys = deploys
      },
      // 提交前
      [CRUD.HOOK.beforeSubmit]() {
        const deploys = []
        this.form.deploys.forEach(function(data, index) {
          const deploy = { id: data }
          deploys.push(deploy)
        })
        this.form.deploys = deploys
        return true
      },
    }
  }
</script>

<style scoped>

</style>
