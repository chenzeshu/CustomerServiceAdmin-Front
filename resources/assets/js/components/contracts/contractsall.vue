<template>
    <div class="v-contractsall">
        <!--添加按钮-->
        <div class="contract-plus" @click="confirmNew()">
            <Icon type="plus-circled" :size="16"></Icon>
        </div>
        <!--搜索-->
        <div class="contract-search">
            <input v-model="contractName" placeholder="合同名称" class="contract-name">
        </div>
        <!--列表-->
        <Table stripe border :columns="columns" :data="_contracts" :row-class-name="rowClassName"></Table>
        <!--分页-->
        <div style="margin: 10px; overflow: hidden">
            <div style="float: right;">
                <Page :current="currentPage" :total="total" :pageSize="pageSize"
                      @on-change="changePage" simple></Page>
            </div>
        </div>
        <!--新增客户-->
        <Modal  v-model="modalNew" width="400" title="新增合同"
                @on-ok="newContract">
            <Input v-model="singleNew.contract_id" :disabled="contract_id_checked" style="width: 300px">
            <Select v-model="contract_id_check" slot="prepend" style="width: 80px">
                <Option value="0">自动生成</Option>
                <Option value="1">手工填写</Option>
            </Select>
            </Input>
            <br>
            <Input v-model="singleNew.name" placeholder="合同名称" style="width: 300px">
            <span slot="prepend">合同名称</span>
            </Input>
            <br>
            <Input v-model="singleNew.sum" placeholder="合同金额" style="width: 300px">
            <span slot="prepend">合同金额</span>
            </Input>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">客户单位</span></Col>
                <Col span="12">
                    <addcompany :company_name="cus.name"></addcompany>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">项目经理</span></Col>
                <Col span="12">
                <addman :men="pm" :type="1"></addman>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">技术经理</span></Col>
                <Col span="12">
                <addman :men="tm" :type="2"></addman>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">合同类型</span></Col>
                <Col span="16">
                <Radio-group v-model="singleNew.contract_type">
                    <Radio label="0"><span>集成</span></Radio>
                    <Radio label="1"><span>服务</span></Radio>
                    <Radio label="2"><span>信道</span></Radio>
                    <Radio label="3"><span>综合</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">签订类型</span></Col>
                <Col span="16">
                <Radio-group v-model="singleNew.type">
                    <Radio label="0"><span>销售签</span></Radio>
                    <Radio label="1"><span>客服签</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">签订日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleNew.time1" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">验收日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleNew.time3" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">质保结　束日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleNew.time2" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="2"><span class="padding-left-8 padding-top-6">基本描述</span></Col>
                <Col span="18">
                <Input v-model="singleNew.desc" type="textarea" :rows="4" placeholder="请输入基本描述">
                </Input>
                </Col>
            </Row>
            <br>
            <Input v-model="singleNew.main_unit" placeholder="" style="width: 300px">
            <span slot="prepend">主要外协单位</span>
            </Input>
        </Modal>
        <!--编辑客户-->
        <Modal  v-model="modalEdit" width="400" title="编辑合同"
                @on-ok="edit" @on-cancel="cancelEdit">

            <Input v-model="singleEdit.contract_id" :disabled="contract_id_checked" style="width: 300px">
            <Select v-model="contract_id_check" slot="prepend" style="width: 80px">
                <Option value="0">自动生成</Option>
                <Option value="1">手工填写</Option>
            </Select>
            </Input>
            <br>
            <Input v-model="singleEdit.name" placeholder="合同名称" style="width: 300px">
            <span slot="prepend">合同名称</span>
            </Input>
            <br>
            <Input v-model="singleEdit.sum" placeholder="合同金额" style="width: 300px">
            <span slot="prepend">合同金额</span>
            </Input>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">客户单位</span></Col>
                <Col span="12">
                    <addcompany :customer_name="singleEdit.customer_name"></addcompany>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">项目经理</span></Col>
                <Col span="12">
                <addman :men="singleEdit.pm" :type="1"></addman>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">技术经理</span></Col>
                <Col span="12">
                <addman :men="singleEdit.tm" :type="2"></addman>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">合同类型</span></Col>
                <Col span="16">
                <Radio-group v-model="singleEdit.contract_type">
                    <Radio label="0"><span>集成</span></Radio>
                    <Radio label="1"><span>服务</span></Radio>
                    <Radio label="2"><span>信道</span></Radio>
                    <Radio label="3"><span>综合</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">签订类型</span></Col>
                <Col span="16">
                <Radio-group v-model="singleEdit.type">
                    <Radio label="0"><span>销售签</span></Radio>
                    <Radio label="1"><span>客服签</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">签订日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleEdit.time1" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">验收日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleEdit.time3" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">质保结　束日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleEdit.time2" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="2"><span class="padding-left-8 padding-top-6">基本描述</span></Col>
                <Col span="18">
                <Input v-model="singleEdit.desc" type="textarea" :rows="4" placeholder="请输入基本描述">
                </Input>
                </Col>
            </Row>
            <br>
            <Input v-model="singleEdit.main_unit" placeholder="" style="width: 300px">
            <span slot="prepend">主要外协单位</span>
            </Input>
        </Modal>
    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    .v-contractsall
        position relative
        .contract-row
            height 33.2px
        .contract-plus
            position: absolute;
            top: 13px;
            left: 6px;
            width: 20px;
            height: 30px;
            color: #39f;
            z-index: 10;
        .contract-search
            position: absolute;
            top: 1px;
            left: 120px;
            width: 20px;
            height: 30px;
            z-index: 10;
            .contract-name
                display: block;
                border none
                border-bottom: 1px dotted rgba(0,0,0,.2);
                background #f5f7f9
                height: 24px;
                width: 8vw
                margin: 8px 10px;
                line-height: 24px;
                text-indent: 16px;
                outline: 0;
                &::placeholder
                    font-weight 700
                    color #657180
</style>

<script type="text/ecmascript">
    import {unixToDate, compareDate} from '../../common/utils/date'
    import addman from '../utils/addman.vue'
    import addcompany from '../utils/addcompany.vue'
    import {mapGetters } from 'vuex'
    var cc = console.log;
    export default {
        data(){
            return {
                currentPage:1,
                pageSize:10,
                customerId : null,  //父id : 客户id
                contractsSource : [],  //源头数据
                contracts : [],  //第二层缓冲层
                columns:[
                    {
                        title: '合同编号',
                        key: 'contract_id',
                        fixed: 'left',
                        width: 120,
                    },
                    {
                        title: '　',
                        key: 'name',
                        fixed: 'left',
                        width: 200,
                        render(row,column,index){
                            return `<a href="javascript:return false">${row.name}</a>`
                        }
                    },
                    {
                        title: '客户单位',
                        key: 'customer_name',
                        width: 150,
                        render(row,column,index){
                            return `<a href="javascript:return false" @click="jump(${row.customer_id})">${row.customer_name}</a>`
                        }
                    },
                    {
                        title: '合同类型',
                        key: 'contract_type',
                        width: 150,
                        render(row, columns, index){
                            switch (row.contract_type){
                                case 0:
                                    return "集成"
                                    break
                                case 1:
                                    return "服务"
                                    break
                                case 2:
                                    return "信道"
                                    break
                                case 3:
                                    return "综合"
                                    break
                                default:
                                    return
                                    break
                            }
                        },
                        filters: [
                            {
                                label: '集成',
                                value: 0
                            },
                            {
                                label: '服务',
                                value: 1
                            },
                            {
                                label: '信道',
                                value: 2
                            },
                            {
                                label: '综合',
                                value: 3
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            switch (value){
                                case 0:
                                    return row.contract_type == 0
                                    break
                                case 1:
                                    return row.contract_type == 1
                                    break
                                case 2:
                                    return row.contract_type == 2
                                    break
                                case 3:
                                    return row.contract_type == 3
                                    break
                                default:
                                    return;
                            }
                        },
                    },
                    {
                        title: '签订类型',
                        key: 'type',
                        width: 150,
                        render(row, columns, index){
                            switch (row.type){
                                case 0:
                                    return "销售"
                                    break
                                case 1:
                                    return "客服"
                                    break
                                default:
                                    return
                                    break
                            }
                        },
                        filters: [
                            {
                                label: '销售',
                                value: 0
                            },
                            {
                                label: '客服',
                                value: 1
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            switch (value){
                                case 0:
                                    return row.type == 0
                                    break
                                case 1:
                                    return row.type == 1
                                    break
                                default:
                                    return
                            }
                        },
                    },
                    {
                        title: '项目经理',
                        key: 'pm',
                        width: 150,
                        render (row, column, index) {
                            if(row.pm.length){
                                return row.pm[0].name
                            }else{
                                return '未选择'
                            }
                        }
                    },
                    {
                        title: '技术经理',
                        key: 'tm',
                        width: 150,
                        render (row, column, index) {
                            if(row.tm.length){
                                return row.tm[0].name
                            }else{
                                return '未选择'
                            }
                        }
                    },
                    {
                        title: '主要外协单位',
                        key: 'main_unit',
                        width: 150,
                    },
                    {
                        title: '签订日期',
                        key: 'time1',
                        width: 150,
                        render (row, column, index) {
                            return unixToDate(row.time1, 'yyyy-MM-dd')
                        }
                    },
                    {
                        title: '验收日期',
                        key: 'time3',
                        align:'center',
                        width: 150,
                        render (row, column, index) {
                            if(row.time3>0){
                                return `<i-button type="success" size="small" >${unixToDate(row.time3, 'yyyy-MM-dd')}</i-button>`
                            }else{
                                return `<i-button type="warning" size="small">待验收</i-button>`
                            }
                        },
                        filters: [
                            {
                                label: '未验收',
                                value: 0
                            },
                            {
                                label: '已验收',
                                value: 1
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            switch (value){
                                case 0:
                                    return row.time3 == 0 || row.time3 <0
                                    break
                                case 1:
                                    return row.time3 > 0
                                    break
                                default:
                                    return;
                            }
                        },
                    },
                    {
                        title: '质保截止日期',
                        key: 'time2',
                        align:'center',
                        width: 150,
                        render (row, column, index) {
                            switch (compareDate(row.time2)) {
                                case 1:
                                    return `<i-button type="success" size="small">未过期</i-button>`
                                case 2:
                                    return `<i-button type="warning" size="small">仅剩一月</i-button>`
                                case 3:
                                    return `<i-button type="error" size="small">已过期</i-button>`
                                default:
                                    return;
                            }
                        },
                        filters: [
                            {
                                label: '未过期',
                                value: 0
                            },
                            {
                                label: '仅剩一月',
                                value: 1
                            },
                            {
                                label: '已过期',
                                value: 2
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            let compare =  row.time2 - Date.parse(new Date())/1000
                            switch (value){
                                case 0:
                                    return compare > 2073600
                                    break
                                case 1:
                                    return compare >= 0 && compare < 2073600
                                    break
                                case 2:
                                    return compare < 0
                                    break
                                default:
                                    return;
                            }
                        },
                    },
                    {
                        title: '合同金额（元）',
                        key: 'sum',
                        width : 150
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        align:"center",
                        width: 200,
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="info(${index})">基本描述</i-button>
                                    <i-button type="primary" size="small" @click="confirmEdit(${index})">编辑</i-button>
                                    <i-button type="error" size="small" @click="confirmRemove(${index})">删除</i-button>`;
                        }
                    }
                ],
                modalNew : false,
                modalEdit : false,
                contract_id_check : "0",
                singleNew:{
                    type: 0,
                    contract_type:0,
                    tm : [],
                    pm : []
                },
                singleEdit:{},
                index:null,
                contractName:null,
            }
        },
        watch:{
            pm : function(newValue, oldValue){
                this.singleNew.pm = newValue
                this.singleEdit.pm = newValue
            },
            tm : function(newValue, oldValue){
                this.singleNew.tm = newValue
                this.singleEdit.tm = newValue
            },
            cus : function(newValue, oldValue){
                this.singleNew.cus = newValue
                this.singleEdit.cus = newValue
            },
            contractName : function () {
                this.searchName()
            }
        },
        computed:{
            ...mapGetters({
                tm : 'tm',
                pm : 'pm',
                cus : 'cus'
            }),
            _contracts(){
                let end = this.currentPage * this.pageSize
                let start = end - this.pageSize
                return this.contracts.slice(start,end)
            },
            total(){
                return this.contracts.length
            },
            contract_id_checked(){
                switch (this.contract_id_check){
                    case "0": //自动生成
                        return true
                        break
                    case "1": //手工填写
                        return false
                        break
                    default:
                        return
                }
            }
        },
        methods:{
            jump(id){
                this.$router.push({name:'cuscontract', params:{id:id}})
            },
            highLight(){
                var oRow = document.getElementsByClassName('ivu-table-row')
                oRow[this.index].style.cssText = "animation:highlight 5s ease-in"
            },
            info(index){
                this.$Modal.info({
                    title: '基本描述',
                    content: `${this._contracts[index].desc}`
                })
            },
            confirmNew(){
                this.modalNew = ! this.modalNew
            },
            confirmEdit (index){
                //唯一要注意的，是index是当前页的index，也就是_customers的index，而不是customers的。
                this.modalEdit = !this.modalEdit
                let n = Object.assign({}, this._contracts[index])
                n.time1 = n.time1 ? unixToDate(n.time1, 'yyyy-MM-dd') : null
                n.time2 = n.time2 ? unixToDate(n.time2, 'yyyy-MM-dd') : null
                n.time3 = n.time3 ? unixToDate(n.time3, 'yyyy-MM-dd') : null
                this.singleEdit = n
                this.index = index
            },
            cancelEdit(){
                this.singleEdit = {}
            },
            confirmRemove(index){
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p>确定删除该合同？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.remove(index)
                    }
                });
            },
            newContract(){
                var n = this.singleNew
                n.parentId = n.cus.payload.id
//                n.parentId = n.cus.id
                //判断是否自动生成编号
                switch (this.contract_id_check){
                    case "0": //自动生成
                        n.contract_id = null
                        break
                    case "1":  //手工填写
                        break;
                    default:
                        break
                }

                axios.post('/contracts', n).then(res=>{
                    n.contract_id = n.contract_id? n.contract_id : "自动生成的编号请刷新页面查看"
                    n.contract_type = parseInt(n.contract_type)
                    n.customer_name = n.cus.payload.name
                    n.type = parseInt(n.type)
                    n.time1 = Date.parse(new Date(n.time1))/1000
                    n.time2 = Date.parse(new Date(n.time2))/1000
                    n.time3 = Date.parse(new Date(n.time3))/1000
                    this.contracts.unshift(n)
                    this.singleNew = {}
                    this.$Message.success('编辑成功');
                    //高亮
                    this.$nextTick(()=>{
                        this.index = 0
                        this.highLight()
                    })
                },err=>{
                    this.$Message.error('编辑失败');
                })
            },
            edit(){
                let n = this.singleEdit

                n.customer_id = n.cus.payload.id ? n.cus.payload.id : n.customer_id
                n.customer_name = n.cus.payload.name ? n.cus.payload.name : n.customer_name

                let contract_id = this.singleEdit.contract_id
                //判断是否修改合同编号
                switch (this.contract_id_check){
                    case "0": //自动生成
                        n.contract_id = null
                        break
                    case "1":  //手工填写
                        break;
                    default:
                        break
                }
                axios.patch('/contracts/'+n.id, n).then(res=>{
                    this.$Message.success('修改成功');
                    let _index = this.contracts.indexOf(this._contracts[this.index])
                    n.contract_id = contract_id
                    n.time1 = Date.parse(new Date(n.time1))/1000
                    n.time2 = Date.parse(new Date(n.time2))/1000
                    n.time3 = Date.parse(new Date(n.time3))/1000
                    Vue.set(this.contracts,_index , n)
                }, err=>{
                    this.$Message.error('修改失败');
                })
            },
            remove(index){
                axios.delete('/contracts/'+this._contracts[index].id).then(res=>{
                    this.$Message.success('删除成功');
                    var _index = this.contracts.indexOf(this._contracts[index])
                    this.contracts.splice(_index, 1);
                }, err=>{
                    this.$Message.error('删除失败');
                    err.status
                })
            },
            changePage(val){
                this.currentPage = val;
            },
            searchName: _.debounce(function () {
                if (!this.contractName){
                    this.contracts = this.contractsSource
                    return
                }
                axios.get('/contracts/search/'+this.contractName).then(res=>{
                    this.contracts = res.data
                })
            }, 500),
            rowClassName(){
                return "contract-row"
            }
        },
        mounted(){
            this.customerId = this.$route.params.id
            axios.get('contracts').then(res=>{
                this.contractsSource = res.data
                this.contracts = this.contractsSource
            }, err=>{

            })
        },
        components:{
            addman, addcompany
        }
    }
</script>
