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
      </el-row>
    </div>
</template>

<script>

  import { getDepts,getDeptSuperior } from "../../../api/system/dept";  //部门相关api

  export default {
		name: "User",
    data() {
		  return {
		    deptName: '',
        deptDatas: [],
        defaultProps: {children: 'children', label: 'name', isLeaf: 'leaf'}
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
      }
    }
	}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
</style>

