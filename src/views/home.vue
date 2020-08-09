<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <!--GitHub边角图标-->
      <github-corner class="github-corner" />

      <!--echart面板组-->
      <panel-group @handleSetLineChartData="handleSetLineChartData" />

      <!--线性图表-->
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData" />
      </el-row>

      <el-row :gutter="32">
        <!--雷达图表-->
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <radar-chart />
          </div>
        </el-col>

        <!--饼图-->
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart />
          </div>
        </el-col>

        <!--柱状图-->
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-col>

      </el-row>

      <!--世界云-->
      <!--<el-row>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <word-cloud />
          </div>
        </el-col>
      </el-row>-->

    </div>
  </div>
</template>

<script>

  import GithubCorner from '../components/GithubCorner'   //引入github边角图标
  import PanelGroup from "./dashboard/PanelGroup";    //引入echart面板组

  import LineChart from "./dashboard/LineChart";    //引入线性图表
  import RadarChart from "../components/Echarts/RadarChart";    //引入雷达图表
  import PieChart from "../components/Echarts/PieChart";  //引入饼图
  import BarChart from "../components/Echarts/BarChart";  //引入柱状图

  //import WordCloud from "../components/Echarts/WordCloud";

  //模拟一些echart图标数据
  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }

	export default {
		name: "Dashboard",
    components: {
      GithubCorner,
      PanelGroup,
      LineChart,
      RadarChart,
      PieChart,
      BarChart,
      //WordCloud
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      }
    }
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
