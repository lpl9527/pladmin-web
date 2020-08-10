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
            <div v-if="crud.props.searchToggle">
              <!--搜索框-->
              <el-input v-model="query.blurry" clearable size="small" placeholder="输入名称或者邮箱搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
              <!--日期时间选择器-->
              <date-range-picker v-model="query.createTime" class="date-item" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>

  import { getDepts,getDeptSuperior } from "../../../api/system/dept";  //部门相关api

  import DateRangePicker from '@/components/DateRangePicker'    //引入日期时间选择器

  import CRUD, {presenter, header, form, crud} from '../../../components/Crud/crud'  //增删改查相关
  import rrOperation from '@crud/RR.operation'
  import crudOperation from '@crud/CRUD.operation'
  import udOperation from '@crud/UD.operation'
  import pagination from '@crud/Pagination'

  import Treeselect from '@riophae/vue-treeselect'  //安装： npm install --save @riophae/vue-treeselect
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
      Treeselect,
      rrOperation,
      crudOperation,
      udOperation,
      pagination
    },
    //mixins: [presenter(), header(), form(defaultForm), crud()],   //混入增删改查组件
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
        defaultProps: {children: 'children', label: 'name', isLeaf: 'leaf'}
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
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
      }
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

