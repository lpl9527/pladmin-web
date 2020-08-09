/*
    系统增删改查的封装*/

import { initData, download } from "../api/data";   //导入数据拉取请求

import { downloadFile, parseTime} from "../utils";

import checkPermission from "../utils/permission";    //检查用户是否拥有某些角色

export default {
  data() {
    return {
      //表格数据
      data: [],
      //排序规则，默认id降序，支持多字段排序，例如['id,desc', 'createTime,asc']
      sort: ['id,desc'],
      //页码，默认0，从0开始
      page: 0,
      //每页数据条数
      size: 10,
      //总数据条数
      total: 0,
      //请求数据的url
      url: '',
      //查询数据的参数
      params: {},
      //待查询的对象
      query: {},
      //等待时间
      time: 50,
      //是否为新增类型的表单
      isAdd: false,
      //导出的Loading属性
      downloadLoading: false,
      //表格Loading属性
      loading: true,
      //删除Loading属性
      delLoading: false,
      //删除所有Loading属性
      delAllLoading: false,
      //Form表单
      form: {},
      //重置表单
      resetForm: {},
      //标题
      title: ''
    }
  },
  methods: {
    /**
     * 解析时间
     */
    parseTime,
    /**
     * 下载文件
     */
    downloadFile,
    /**
     * 检查是否有角色权限
     */
    checkPermission,

    /**
     * 异步初始化表格数据
     * @returns {Promise<unknown>}
     */
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        //请求数据
        initData(this.url, this.getQueryParam()).then(data => {
          this.total = data.totalElements
          this.data = data.content
          //time毫秒后显示表格
          setTimeout(() => {
            this.loading = false
          }, this.time)
          //放行数据
          resolve(data)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    /**
     * 初始化表格前可以做的一些操作
     * @returns {boolean}
     */
    beforeInit() {
      return true
    },
    /**
     * 获取表格请求参数，返回一个对象
     */
    getQueryParam: function() {
      return {
        page: this.page,
        size: this.size,
        sort: this.sort,
        ...this.query,
        ...this.params
      }
    },
    /**
     * 改变页码
     * @param page
     */
    pageChange(page) {
      this.page = page -1
      //重新初始化表格
      this.init()
    },
    /**
     * 改变每页显示条数
     * @param size
     */
    sizeChange(size) {
      //跳转至第一页
      this.page = 0
      this.size = size
      //重新加载表格
      this.init()
    },
    /**
     * 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
     * @param size
     */
    dleChangePage(size) {
      if (size === undefined) {
        size = 1
      }
      if (this.data.length === size && this.page !== 0) {
        this.page = this.page - 1
      }
    },
    /**
     * 查询表格
     */
    toQuery() {
      this.page = 0
      this.init()
    },

    /**
     * 增删改查通用的页面提示封装
     */
    submitSuccessNotify() {
      this.$notify({
        title: '提交成功',
        type: 'success',
        duration: 2500
      })
    },
    addSuccessNotify() {
      this.$notify({
        title: '新增成功',
        type: 'success',
        duration: 2500
      })
    },
    editSuccessNotify() {
      this.$notify({
        title: '编辑成功',
        type: 'success',
        duration: 2500
      })
    },
    delSuccessNotify() {
      this.$notify({
        title: '删除成功',
        type: 'success',
        duration: 2500
      })
    },
    /**
     * 自定义通知
     * @param title
     * @param type
     */
    notify(title, type) {
      this.$notify({
        title: title,
        type: type,
        duration: 2500
      })
    },

    /**
     * 删除前可以做的一些操作
     * @returns {boolean}
     */
    beforeDelMethod() {
      return false
    },
    /**
     * 删除指定id的数据
     * @param id
     */
    delMethod(id) {
      if (!this.beforeDelMethod()) {
        return
      }
      this.delLoading = true
      this.crudMethod.del(id).then(() => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.dleChangePage()
        this.delSuccessNotify()
        this.afterDelMethod()
        this.init()
      }).catch(() => {
        this.delLoading = false
        this.$refs[id].doClose()
      })
    },
    /**
     * 删除后要做的一些操作
     */
    afterDelMethod() {},
    /**
     * 多选提示并删除
     */
    beforeDelAllMethod() {
      this.$confirm('你确定删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delAllMethod()
      })
    },
    /**
     * 多选删除
     */
    delAllMethod() {
      this.delAllLoading = true
      const data = this.$refs.table.selection
      const ids = []
      for (let i = 0; i < data.length; i++) {
        ids.push(data[i].id)
      }
      this.crudMethod.delAll(ids).then(() => {
        this.delAllLoading = false
        this.dleChangePage(ids.length)
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(() => {
        this.delAllLoading = false
      })
    },
    /**
     * 显示新增弹窗前可以调用该方法
     */
    beforeShowAddForm() {},
    /**
     * 显示新增弹窗
     */
    showAddFormDialog() {
      this.isAdd = true
      this.resetForm = JSON.parse(JSON.stringify(this.form))
      this.beforeShowAddForm()
      this.dialog = true
    },
    /**
     * 显示编辑弹窗前可以调用该方法
     */
    beforeShowEditForm(data) {},
    /**
     * 显示编辑弹窗
     */
    showEditFormDialog(data = '') {
      this.isAdd = false
      if (data) {
        this.resetForm = JSON.parse(JSON.stringify(this.form))
        this.form = JSON.parse(JSON.stringify(data))
      }
      this.beforeShowEditForm(data)
      this.dialog = true
    },
    /**
     * 新增方法
     */
    addMethod() {
      this.crudMethod.add(this.form).then(() => {
        this.addSuccessNotify()
        this.loading = false
        this.afterAddMethod()
        this.cancel()
        this.init()
      }).catch(() => {
        this.loading = false
        this.afterAddErrorMethod()
      })
    },
    /**
     * 新增后可以调用该方法
     */
    afterAddMethod() {},
    /**
     * 新增失败后调用该方法
     */
    afterAddErrorMethod() {},
    /**
     * 通用的编辑方法
     */
    editMethod() {
      this.crudMethod.edit(this.form).then(() => {
        this.editSuccessNotify()
        this.loading = false
        this.afterEditMethod()
        this.cancel()
        this.init()
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 编辑后可以调用该方法
     */
    afterEditMethod() {},
    /**
     * 提交前可以调用该方法
     */
    beforeSubmitMethod() {
      return true
    },
    /**
     * 提交
     */
    submitMethod() {
      if (!this.beforeSubmitMethod()) {
        return
      }
      if (this.$refs['form']) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.isAdd) {
              this.addMethod()
            } else this.editMethod()
          }
        })
      }
    },
    /**
     * 隐藏弹窗
     */
    cancel() {
      this.dialog = false
      if (this.$refs['form']) {
        this.$refs['form'].clearValidate()
        this.form = this.resetForm
      }
    },
    /**
     * 获取弹窗的标题
     */
    getFormTitle() {
      return this.isAdd ? `新增${this.title}` : `编辑${this.title}`
    },
    /**
     * 通用导出
     */
    downloadMethod() {
      this.beforeInit()
      this.downloadLoading = true
      download(this.url + '/download', this.params).then(result => {
        this.downloadFile(result, this.title + '数据', 'xlsx')
        this.downloadLoading = false
      }).catch(() => {
        this.downloadLoading = false
      })
    }

  }
}


