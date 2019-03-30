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
							<span>接口合作请联系：</span><span>service.us@bvaluate.com</span>
						</div>
						<div class="section-box">
							<div class="apitem">
								<span class="section-title">1、项目信息接口</span>
								<span class="section-desc">接口说明：该接口提供对项目信息的查询</span>
								<div class="explain-box">
									<span class="table-title">参数列表</span>
									<div class="table-row">
										<div class="col8 table-box">
											<table class="layout-fixed">
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
									</div>
								</div>
								<div class="explain-box">
									<span class="table-title">返回值</span>
									<div class="table-row">
										<div class="col5 table-box">
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
														<td>IR_PROJECT</td>
														<td>phrase</td>
														<td>项目名称</td>
													</tr>
													<tr>
														<td>IR_INTRODUCTION</td>
														<td>phrase</td>
														<td>介绍</td>
													</tr>
													<tr>
														<td>IR_CATALOG1</td>
														<td>char</td>
														<td>行业分类</td>
													</tr>
													<tr>
														<td>IR_CATALOG2</td>
														<td>char</td>
														<td>项目分类</td>
													</tr>
													<tr>
														<td>IR_STARTDATE</td>
														<td>char</td>
														<td>开始日期</td>
													</tr>
													<tr>
														<td>IR_ENDDATE</td>
														<td>char</td>
														<td>结束日期</td>
													</tr>
													<tr>
														<td>IR_TOKEN</td>
														<td>char</td>
														<td>代币</td>
													</tr>
													<tr>
														<td>IR_PRICE</td>
														<td>char</td>
														<td>价格</td>
													</tr>
													<tr>
														<td>IR_BONUS</td>
														<td>char</td>
														<td>花红</td>
													</tr>
													<tr>
														<td>IR_BOUNTY</td>
														<td>char</td>
														<td>奖励金</td>
													</tr>
													<tr>
														<td>IR_PLATFORM</td>
														<td>char</td>
														<td>平台</td>
													</tr>
													<tr>
														<td>IR_ACCEPTING</td>
														<td>char</td>
														<td>接受投资的币种</td>
													</tr>
													<tr>
														<td>IR_SOFTCAP</td>
														<td>char</td>
														<td>启动最小值</td>
													</tr>
													<tr>
														<td>IR_HARDCAP</td>
														<td>char</td>
														<td>启动最大值</td>
													</tr>
													<tr>
														<td>IR_COUNTRY</td>
														<td>char</td>
														<td>所属国家</td>
													</tr>
													<tr>
														<td>IR_WHITELISTKYC</td>
														<td>char</td>
														<td>名单</td>
													</tr>
													<tr>
														<td>IR_RESTRICT_AREAS</td>
														<td>char</td>
														<td>限制区域</td>
													</tr>
													<tr>
														<td>IR_MINIMUM_INVESTMENT</td>
														<td>char</td>
														<td>单笔交易最低额度</td>
													</tr>
													<tr>
														<td>IR_PRICE_PREICO</td>
														<td>char</td>
														<td>PREICO价格</td>
													</tr>
													<tr>
														<td>IR_PRICE_ICO</td>
														<td>char</td>
														<td>ICO价格</td>
													</tr>
													<tr>
														<td>IR_PREICO_STARTDATE</td>
														<td>char</td>
														<td>PREICO开始日期</td>
													</tr>
													<tr>
														<td>IR_PREICO_ENDDATE</td>
														<td>char</td>
														<td>PREICO截止日期</td>
													</tr>
													<tr>
														<td>IR_ICO_STARTDATE</td>
														<td>char</td>
														<td>ICO开始日期</td>
													</tr>
													<tr>
														<td>IR_ICO_ENDDATE</td>
														<td>char</td>
														<td>ICO截止日期</td>
													</tr>
													<tr>
														<td>IR_ABOUT</td>
														<td>phrase</td>
														<td>项目介绍</td>
													</tr>
													<tr>
														<td>IR_OUTER_OFFICIAL</td>
														<td>char</td>
														<td>官网链接</td>
													</tr>
													<tr>
														<td>CIRCULATINGSUPPLY</td>
														<td>char</td>
														<td>流通量</td>
													</tr>
													<tr>
														<td>TOTALSUPPLY</td>
														<td>char</td>
														<td>发行总量</td>
													</tr>
													<tr>
														<td>NAMECN</td>
														<td>char</td>
														<td>中文名</td>
													</tr>
													<tr>
														<td>IR_TOKEN</td>
														<td>char</td>
														<td>token</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="col5 table-box">
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
														<td>EXCHANGESNUM</td>
														<td>char</td>
														<td>上架交易所数量</td>
													</tr>
													<tr>
														<td>ISSUANCEDATE</td>
														<td>char</td>
														<td>发行时间</td>
													</tr>
													<tr>
														<td>WPURL</td>
														<td>char</td>
														<td>白皮书</td>
													</tr>
													<tr>
														<td>TOKENORNOT</td>
														<td>char</td>
														<td>是否代币</td>
													</tr>
													<tr>
														<td>TOKENPLATFORM</td>
														<td>char</td>
														<td>代币平台</td>
													</tr>
													<tr>
														<td>EXCHANGES</td>
														<td>document</td>
														<td>交易所</td>
													</tr>
													<tr>
														<td>IR_LOGO2</td>
														<td>char</td>
														<td>项目LOGO</td>
													</tr>
													<tr>
														<td>IR_PARTNER2</td>
														<td>document</td>
														<td>项目成员</td>
													</tr>
													<tr>
														<td>IR_TWITTER_PROJECT</td>
														<td>char</td>
														<td>官推名称</td>
													</tr>
													<tr>
														<td>IR_OUTER_TWITTER</td>
														<td>char</td>
														<td>twitter分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_FACEBOOK</td>
														<td>char</td>
														<td>facebokk分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_GITHUB</td>
														<td>char</td>
														<td>github分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_MEDIUM</td>
														<td>char</td>
														<td>medium分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_REDDIT</td>
														<td>char</td>
														<td>reddit分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_DISCORD</td>
														<td>char</td>
														<td>idscord分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_TELEGRAM</td>
														<td>char</td>
														<td>telegram分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_BITCOINTALK</td>
														<td>char</td>
														<td>bitcointalk分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_INSTAGRAM</td>
														<td>char</td>
														<td>instagram分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_QUORA</td>
														<td>char</td>
														<td>quora分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_YOUTUBE</td>
														<td>char</td>
														<td>youtube分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_GITTER</td>
														<td>char</td>
														<td>gitter分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_SLACK</td>
														<td>char</td>
														<td>slack分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_BLOG</td>
														<td>char</td>
														<td>blog分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_HEROKUAPP</td>
														<td>char</td>
														<td>herokuapp分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_GOOGLE</td>
														<td>char</td>
														<td>google分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_STACKEXCHANGE</td>
														<td>char</td>
														<td>stackexchange分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_STEEMIT</td>
														<td>char</td>
														<td>steemit分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_NAVER</td>
														<td>char</td>
														<td>naver分享链接</td>
													</tr>
													<tr>
														<td>IR_OUTER_LINKEDIN</td>
														<td>char</td>
														<td>linkedin分享链接</td>
													</tr>
													<tr>
														<td>IR_LINK_BVALUATE</td>
														<td>char</td>
														<td>必评网项目的地址</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="apitem">
								<span class="section-title">2、项目评分接口</span>
								<span class="section-desc">接口说明：该接口提供对项目评分信息的查询</span>
								<div class="explain-box">
									<span class="table-title">参数列表</span>
									<div class="table-row">
										<div class="col8 table-box">
											<table class="layout-fixed">
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
									</div>
								</div>
								<div class="explain-box">
									<span class="table-title">返回值</span>
									<div class="table-row">
										<div class="col7 table-box">
											<table class="layout-fixed">
												<thead>
													<tr>
														<th>参数</th>
														<th>字段类型及实例</th>
														<th>说明</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>IR_RANKING_TOTALSCORE</td>
														<td>number</td>
														<td>总评分</td>
													</tr>
													<tr>
														<td>IR_TEAM_ANALYSIS</td>
														<td>number</td>
														<td>团队评分</td>
													</tr>
													<tr>
														<td>IR_FUNDAMENTALS_ANALYSIS</td>
														<td>number</td>
														<td>基本面评分</td>
													</tr>
													<tr>
														<td>IR_MARKET_ANALYSIS</td>
														<td>number</td>
														<td>市场评分</td>
													</tr>
													<tr>
														<td>IR_FUNDSUPERVISION</td>
														<td>number</td>
														<td>资金监管评分</td>
													</tr>
													<tr>
														<td>IR_TECHNICALANALYSIS</td>
														<td>number</td>
														<td>技术评分</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="apitem">
								<span class="section-title">3、某行业项目接口</span>
								<span class="section-desc">接口说明：该接口提供对某行业项目列表的查询</span>
								<div class="explain-box">
									<span class="table-title">参数列表</span>
									<div class="table-row">
										<div class="col8 table-box">
											<table class="layout-fixed">
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
														<td>IR_CATALOG1</td>
														<td>项目行业分类</td>
														<td>char</td>
														<td>True</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="explain-box">
									<span class="table-title">返回值</span>
									<div class="table-row">
										<div class="col7 table-box">
											<table class="layout-fixed">
												<thead>
													<tr>
														<th>参数</th>
														<th>字段类型及实例</th>
														<th>说明</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>IR_PROJECT</td>
														<td>phrase</td>
														<td>项目名称</td>
													</tr>
													<tr>
														<td>IR_TOKEN</td>
														<td>char</td>
														<td>项目token</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="apitem">
								<span class="section-title">4、某国家项目接口</span>
								<span class="section-desc">接口说明：该接口提供对某国家项目列表的查询</span>
								<div class="explain-box">
									<span class="table-title">参数列表</span>
									<div class="table-row">
										<div class="col8 table-box">
											<table class="layout-fixed">
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
														<td>IR_COUNTRY</td>
														<td>项目国家分类</td>
														<td>char</td>
														<td>True</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="explain-box">
									<span class="table-title">返回值</span>
									<div class="table-row">
										<div class="col7 table-box">
											<table class="layout-fixed">
												<thead>
													<tr>
														<th>参数</th>
														<th>字段类型及实例</th>
														<th>说明</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>IR_PROJECT</td>
														<td>phrase</td>
														<td>项目名称</td>
													</tr>
													<tr>
														<td>IR_TOKEN</td>
														<td>char</td>
														<td>项目token</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="apitem">
								<span class="section-title">5、新闻数据接口</span>
								<span class="section-desc">接口说明：该接口提供对新闻数据的查询</span>
								<div class="explain-box">
									<span class="table-title">参数列表</span>
									<div class="table-row">
										<div class="col8 table-box">
											<table class="layout-fixed">
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
														<td>industry</td>
														<td>行业</td>
														<td>String</td>
														<td>FALSE</td>
													</tr>
													<tr>
														<td>project</td>
														<td>项目名称</td>
														<td>String</td>
														<td>FALSE</td>
													</tr>
													<tr>
														<td>country</td>
														<td>国家名称</td>
														<td>String</td>
														<td>FALSE</td>
													</tr>
													<tr>
														<td>startTime</td>
														<td>检索开始时间</td>
														<td>String（unix 时间戳）</td>
														<td>FALSE</td>
													</tr>
													<tr>
														<td>endTime</td>
														<td>检索结束时间</td>
														<td>String（unix 时间戳）</td>
														<td>FALSE</td>
													</tr>
													<tr>
														<td>pageNum</td>
														<td>页码</td>
														<td>Int 默认 0</td>
														<td>FALSE</td>
													</tr>
													<tr>
														<td>pageSize</td>
														<td>条数</td>
														<td>Int 默认 10</td>
														<td>FALSE</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="explain-box">
									<span class="table-title">返回值</span>
									<div class="table-row">
										<div class="col5 table-box">
											<table class="layout-fixed">
												<thead>
													<tr>
														<th>参数</th>
														<th>字段类型及实例</th>
														<th>说明</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>IR_SID</td>
														<td>char</td>
														<td>文章id</td>
													</tr>
													<tr>
														<td>IR_URLNAME</td>
														<td>char</td>
														<td>原地址</td>
													</tr>
													<tr>
														<td>IR_SITENAME</td>
														<td>char</td>
														<td>网站名称</td>
													</tr>
													<tr>
														<td>IR_CHANNEL</td>
														<td>char</td>
														<td>栏目</td>
													</tr>
													<tr>
														<td>IR_GROUPNAME</td>
														<td>char</td>
														<td>组别</td>
													</tr>
													<tr>
														<td>IR_URLTITLE</td>
														<td>phrase</td>
														<td>文章标题</td>
													</tr>
													<tr>
														<td>IR_URLDATE</td>
														<td>char</td>
														<td>发布日期</td>
													</tr>
													<tr>
														<td>IR_URLTIME</td>
														<td>char</td>
														<td>发布时间</td>
													</tr>
													<tr>
														<td>IR_LOADTIME</td>
														<td>char</td>
														<td>入库时间</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="col5 table-box">
											<table class="layout-fixed">
												<thead>
													<tr>
														<th>参数</th>
														<th>字段类型及实例</th>
														<th>说明</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>IR_AUTHORS</td>
														<td>char</td>
														<td>作者</td>
													</tr>
													<tr>
														<td>IR_CATALOG3</td>
														<td>char</td>
														<td>国家分类</td>
													</tr>
													<tr>
														<td>IR_CATALOG1</td>
														<td>char</td>
														<td>行业分类</td>
													</tr>
													<tr>
														<td>IR_CATALOG2</td>
														<td>char</td>
														<td>项目分类</td>
													</tr>
													<tr>
														<td>IR_CONTENT</td>
														<td>document</td>
														<td>内容</td>
													</tr>
													<tr>
														<td>IR_MAPPING</td>
														<td>char</td>
														<td>标题配图(原址)</td>
													</tr>
													<tr>
														<td>IR_MAPPING2</td>
														<td>char</td>
														<td>图片转储地址</td>
													</tr>
													<tr>
														<td>IR_CATALOG5</td>
														<td>char</td>
														<td>正负面</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="apitem">
								<span class="section-title">6、项目简报接口</span>
								<span class="section-desc">接口说明：该接口提供某项目的简报</span>
								<div class="explain-box">
									<span class="table-title">参数列表</span>
									<div class="table-row">
										<div class="col8 table-box">
											<table class="layout-fixed">
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
														<td>startTime</td>
														<td>检索开始时间</td>
														<td>String（例如2018-01-01）</td>
														<td>True</td>
													</tr>
													<tr>
														<td>endTime</td>
														<td>检索结束时间</td>
														<td>String（例如2018-01-01）</td>
														<td>True</td>
													</tr>
												</tbody>
											</table>
										</div>
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

