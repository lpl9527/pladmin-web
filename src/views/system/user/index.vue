<template>
    <div class="app-container">
      <el-row :gutter="20">
        <!--左侧部门数据-->
        <el-col :xs="9" :sm="6" :md="5" :lg="4" :xl="4">
          <div class="header-container">
            <el-input v-model="deptName" clearable size="small" placeholder="输入部门名称搜索" prefix-icon="el-icon-search" class="filter-item" @input="getDeptDatas" />
          </div>
          <el-tree :data="deptDatas" :load="getDeptDatas" :props="defaultProps" :expand-on-click-node="false" lazy @node-click="handleNodeClick" />
        </el-col>
        <!--用户数据-->
        <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
          <!--用户工具栏-->
          <div class="header-container">
            <!--搜索框-->
            <div v-if="crud.props.searchToggle">
              <!--搜索框-->
              <el-input v-model="query.blurry" clearable size="small" placeholder="输入名称或者邮箱搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
              <!--日期时间选择器-->
              <date-range-picker v-model="query.createTime" class="date-item" />
            </div>
            <!--增删改查工具条-->
            <crud-operation show="" :permission="permission" />
          </div>
          <!--表格渲染-->
          <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
            <el-table-column :selectable="checkboxT" type="selection" width="55" />
            <el-table-column :show-overflow-tooltip="true" prop="username" label="用户名" />
            <el-table-column :show-overflow-tooltip="true" prop="nickName" label="昵称" />
            <el-table-column prop="gender" label="性别" />
            <el-table-column :show-overflow-tooltip="true" prop="phone" width="100" label="电话" />
            <el-table-column :show-overflow-tooltip="true" prop="email" width="135" label="邮箱" />
            <el-table-column :show-overflow-tooltip="true" prop="dept" label="部门">
              <template slot-scope="scope">
                <div>{{scope.row.dept.name}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="enabled" align="center" label="状态">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enabled"
                  :disabled="user.id === scope.row.id"
                  active-color="#409EFF"
                  inactive-color="#F56C6C"
                  @change="changeEnabled(scope.row, scope.row.enabled)"
                />
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" width="135" label="创建日期">
              <template slot-scope="scope">
                <span>{{parseTime(scope.row.createTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column v-permission="['admin','user:edit','user:del']" label="操作" width="115" align="center" fixed="right">
              <template slot-scope="scope">
                <ud-operation :data="scope.row" :permission="permission" :disabled-dle="scope.row.id === user.id" />
              </template>
            </el-table-column>
          </el-table>

          <!--分页组件-->
          <pagination />
        </el-col>
      </el-row>
    </div>
</template>

<script>

  import { getDepts,getDeptSuperior } from "../../../api/system/dept";  //部门相关api
  import crudUser from '../../../api/system/user'

  import DateRangePicker from '@/components/DateRangePicker'    //引入日期时间选择器

  import CRUD, {presenter, header, form, crud} from '../../../components/Crud/crud'  //增删改查相关
  import rrOperation from '@crud/RR.operation'
  import crudOperation from '@crud/CRUD.operation'
  import udOperation from '@crud/UD.operation'
  import pagination from '@crud/Pagination'

  import TreeSelect from '@riophae/vue-treeselect'  //安装： npm install --save @riophae/vue-treeselect
  import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import { mapGetters } from 'vuex'

  //---------------------------------------------------------------------------
  //用户角色
  let userRoles = []
  //用户岗位
  let userJobs = []

  //设置表单数据默认值
  const defaultForm = {id: null, username: null, nickName: null, gender: '男', email : null, enabled: 'false', roles: [], jobs: [], dept: {id: null}, phone: null}

  export default {
		name: "User",
    components: {
      DateRangePicker,
      TreeSelect,
      rrOperation,
      crudOperation,
      udOperation,
      pagination
    },
    cruds() {
		  return CRUD({title: '用户', url: 'api/users', crudMethod: {...crudUser}})
    },
    mixins: [presenter(), header(), form(defaultForm), crud()],   //混入增删改查组件
    dicts: ['user_status'],
    data() {
		  return {
        height: document.documentElement.clientHeight - 180 + 'px;',
		    deptName: '',
        depts: [],
        deptDatas: [],
        jobs: [],
        roles: [],
        level: 3,
        defaultProps: {children: 'children', label: 'name', isLeaf: 'leaf'},
        permission: {
          add: ['admin', 'user:add'],
          edit: ['admin', 'user:edit'],
          del: ['admin', 'user:del']
        }
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    created() {
		  this.crud.msg.add = '新增成功，默认密码：123456'
    },
    mounted() {
		  const that = this
      window.onresize = function temp() {
        that.height = document.documentElement.clientHeight - 180 + 'px;'
      }
    },
    methods: {
      //获取部门数据
		  getDeptDatas(node,resolve) {
		    const sort = 'id,desc'  //部门id降序排序
        //设置到查询参数
        const params = {sort: sort}

        if (typeof node !== 'object') {
          if (node) {
            params['name'] = node   //添加部门名称到查询参数
          }
        }else if (node.level !== 0) {
          params['pid'] = node.data.id
        }
        setTimeout(() => {
          getDepts(params).then(res => {
            if (resolve) {
              resolve(res.content)
            }else {
              this.deptDatas = res.content
            }
          })
        })
      },
      //切换部门
      handleNodeClick(data) {
		    console.log('切换部门')
      },
      checkboxT(row, rowIndex) {
        return row.id !== this.user.id
      },
      // 改变状态
      changeEnabled(data, val) {
        this.$confirm('此操作将 "' + this.dict.label.user_status[val] + '" ' + data.username + ', 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          crudUser.edit(data).then(res => {
            this.crud.notify(this.dict.label.user_status[val] + '成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          }).catch(() => {
            data.enabled = !data.enabled
          })
        }).catch(() => {
          data.enabled = !data.enabled
        })
      },
    }
	}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
  .header-container {
    padding-bottom: 10px;
  }
</style>

