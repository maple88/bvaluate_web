<template>
	<div class="page apiview-page">
		<v2header/>
		<div class="v2maintainer">
			<!-- content here -->
			<div class="container v2container">
				<div class="apiview-box">
					<div class="content-box">
						<h6 class="title">API</h6>
						<span class="title-desc">Bvaluate   API接口说明 v1.0.0</span>
						<div class="contact">
							<a href="">接口合作请联系：</a>
						</div>
						<div class="section-box">
							<span class="section-title">1、项目信息接口</span>
							<span class="section-desc">接口说明：该接口提供对项目信息的查询</span>
							<div class="explain-box">
								<div class="table-box">
									<span class="table-title">参数列表</span>
									<table>
										<thead>
											<tr>
												<th>参数</th>
												<th>说明</th>
												<th>字段类型及实例</th>
												<th>必填</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>project</td>
												<td>项目名称</td>
												<td>String</td>
												<td>True</td>
											</tr>
											<tr>
												<td>token</td>
												<td>项目token</td>
												<td>String</td>
												<td>True</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="table-box">
									<span class="table-title">返回值</span>
									<table>
										<thead>
											<tr>
												<th>参数</th>
												<th>字段类型及实例</th>
												<th>说明</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>IR_MINIMUM_INVESTMENT</td>
												<td>phrase</td>
												<td>项目名称</td>
											</tr>
											<tr>
												<td>token</td>
												<td>phrase</td>
												<td>String</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="table-box">
									<span class="table-title">返回值</span>
									<table>
										<thead>
											<tr>
												<th>参数</th>
												<th>字段类型及实例</th>
												<th>说明</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>IR_MINIMUM_INVESTMENT</td>
												<td>phrase</td>
												<td>项目名称</td>
											</tr>
											<tr>
												<td>token</td>
												<td>phrase</td>
												<td>String</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div class="example-box">
								<span class="example-title">返回示例</span>
								<div class="example-content-box">
<pre>
[
  {
    "2018-10-31": "2018-10-31日较XXX项目较前一日总分上升(下降)百分比。\n同行业总分最高的项目为xx项目，xx项目，xx项目。\n行业分值上升2%、非负面分值上升0.5%、市场情绪未发生变化、钱包监控分值下降4%、github更新量分值下降6%、团队社交活跃度分值下降1%。\n公链产生交易xx笔，大单交易xx笔，大单占比xx%。大单前三笔交易量分别为xxxxxxx、xxxxxx、xxxxxxx。交易量及大单交易量较前一日分别上升x%、上升x%。\n在所有分析维度中团队真实性分值较前一日未发生变化、项目团队与明星项目关联度分值未发生变化、团队完整性分值未发生变化、白皮书分值未发生变化。"
  },
  {
    "2018-10-30": "2018-10-30日较XXX项目较前一日总分上升(下降)百分比。\n同行业总分最高的项目为xx项目，xx项目，xx项目。\n行业分值上升2%、非负面分值上升0.5%、市场情绪未发生变化、钱包监控分值下降4%、github更新量分值下降6%、团队社交活跃度分值下降1%。\n公链产生交易xx笔，大单交易xx笔，大单占比xx%。大单前三笔交易量分别为xxxxxxx、xxxxxx、xxxxxxx。交易量及大单交易量较前一日分别上升x%、上升x%。\n在所有分析维度中团队真实性分值较前一日未发生变化、项目团队与明星项目关联度分值未发生变化、团队完整性分值未发生变化、白皮书分值未发生变化。"
  },
  {
    "2018-10-29": "2018-10-29日较XXX项目较前一日总分上升(下降)百分比。\n同行业总分最高的项目为xx项目，xx项目，xx项目。\n行业分值上升2%、非负面分值上升0.5%、市场情绪未发生变化、钱包监控分值下降4%、github更新量分值下降6%、团队社交活跃度分值下降1%。\n公链产生交易xx笔，大单交易xx笔，大单占比xx%。大单前三笔交易量分别为xxxxxxx、xxxxxx、xxxxxxx。交易量及大单交易量较前一日分别上升x%、上升x%。\n在所有分析维度中团队真实性分值较前一日未发生变化、项目团队与明星项目关联度分值未发生变化、团队完整性分值未发生变化、白皮书分值未发生变化。"
  }
]
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<v2footer/>
		</div>

	</div>
</template>

<script>
	let loading = require('../assets/login/loading.gif');

	export default {
		data () {
			return {
				
			}
		},
		mounted () {
			
		},
		methods: {
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

