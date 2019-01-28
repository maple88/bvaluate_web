<template>
  <div class="page project" @click="shareButton = false">
    <v2header/>
    <div class="v2maintainer pd0">
      <!-- content here -->
      <div class="project-topmain">
        <div class="container v2container">
          <div class="projectTop">
            <div class="img-box"><img :src="project.logoSrc"></div>
            <div class="textRight">
              <div class="tit">
                <a :href="project.outerOfficial" target="_blank" class="atitle">{{project.project}}</a>
                <button class="whitepaper" @click="goArticle('/pdfShow', {project: project.project})">白皮书</button>
              </div>
              <p class="smtit">(BTT)</p>
              <div class="fol">
                <div class="followbtn on" v-if="!isFollow" @click="setFollow($event)">关注</div>
                <div class="followbtn" v-if="isFollow" @click="deleteFollow(project.collected, $event)">已关注</div>
                <div class="followbtn share_button" @click.stop="shareButton = !shareButton">
                  分享
                  <transition name="fade">
                    <div class="share_box" v-show="shareButton">
                      <div class="share_item" @click.stop="weChatQrCodeShow">
                        <img src="../assets/project/wechat.png" alt="">
                        <transition name="fade">
                          <div class="qrCode_box" ref="wechat_qrCode" v-show="wechatQrCode"></div>
                        </transition>
                      </div>
                      <div class="share_item" v-show="false" @click.stop="qqQrCodeShow">
                        <img src="../assets/project/QQ.png" alt="">
                        <transition name="fade">
                          <div class="qrCode_box" ref="qq_qrCode" v-show="qqQrCode"></div>
                        </transition>
                      </div>
                      <div class="share_item" v-show="false" @click.stop="weiboQrCodeShow">
                        <img src="../assets/project/weibo.png" alt="">
                        <transition name="fade">
                          <div class="qrCode_box" ref="weibo_qrCode" v-show="weiboQrCode"></div>
                        </transition>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
          <p class="describe">{{project.irAbstract}}</p>
          <!-- <div class="hangyeTips">
            <p class="title">行业标签</p>
            <ul>
              <li v-for="(item,index) in projectTabs" :key="index">
                {{item}}
              </li>
            </ul>
          </div> -->
          <ul class="projectBottom">
            <li v-show="project.outerFaceBook"><a target="_blank" :href="project.outerFaceBook"><img src="../assets/project/f1.png"></a></li>
            <li v-show="project.outerTwitter"><a target="_blank" :href="project.outerTwitter"><img src="../assets/project/f2.png"></a></li>
            <li v-show="project.outerTelegram"><a target="_blank" :href="project.outerTelegram "><img src="../assets/project/f3.png"></a></li>
            <li v-show="project.outerBitCoinTalk"><a target="_blank" :href="project.outerBitCoinTalk"><img src="../assets/project/f4.png"></a></li>
            <li v-show="project.outerDiscord"><a target="_blank" :href="project.outerDiscord"><img src="../assets/project/f5.png"></a></li>
            <li v-show="project.outerGitHub"><a target="_blank" :href="project.outerGitHub"><img src="../assets/project/f6.png"></a></li>
            <li v-show="project.outerInstagram"><a target="_blank" :href="project.outerInstagram"><img src="../assets/project/f7.png"></a></li>
            <li v-show="project.outerMedium"><a target="_blank" :href="project.outerMedium"><img src="../assets/project/f8.png"></a></li>
            <li v-show="project.outerReddit"><a target="_blank" :href="project.outerReddit"><img src="../assets/project/f9.png"></a></li>
            <li v-show="project.outerBlog"><a target="_blank" :href="project.outerBlog"><img src="../assets/project/f10.png"></a></li>
            <li v-show="project.outerGitter"><a target="_blank" :href="project.outerGitter"><img src="../assets/project/f11.png"></a></li>
            <li v-show="project.outerGoogle"><a target="_blank" :href="project.outerGoogle"><img src="../assets/project/f12.png"></a></li>
            <li v-show="false"><a target="_blank"><img src="../assets/project/f13.png"></a></li>
            <li v-show="project.outerLinkedIn"><a target="_blank" :href="project.outerLinkedIn"><img src="../assets/project/f14.png"></a></li>
            <li v-show="false"><a target="_blank"><img src="../assets/project/f15.png"></a></li>
            <li v-show="project.outerSlack"><a target="_blank" :href="project.outerSlack"><img src="../assets/project/f16.png"></a></li>
            <li v-show="project.outerStackExchange"><a target="_blank" :href="project.outerStackExchange"><img src="../assets/project/f17.png"></a></li>
            <li v-show="false"><a target="_blank"><img src="../assets/project/f18.png"></a></li>
            <li v-show="project.outerYoutube"><a target="_blank" :href="project.outerYoutube"><img src="../assets/project/f19.png"></a></li>
          </ul>
        </div>
      </div>
      <div class="project-main">
        <div class="container v2container">
          <div class="leftmain">
            <div class="tophead">
              <div class="item price up">
                <p class="pt">价格</p>
                <p class="pb"><span>{{hotInfo.price}}</span></p>
              </div>
              <div class="item">
                <p class="t">流通量</p>
                <p class="b">{{hotInfo.markValue | formatDataForMark}}</p>
              </div>
              <div class="item">
                <p class="t">流通市值</p>
                <p class="b">{{hotInfo.famc | formatDataForMark}}</p>
              </div>
              <div class="item">
                <p class="t">近24小时链上大单交易笔数</p>
                <p class="b" v-show="hotInfo.linkBig">{{hotInfo.linkBig | rounding}}</p>
              </div>
            </div>
            <div class="bluesection">
              <div class="echartsbox1" ref="bluebox">
                <div class="echarts_loading" v-if="radar_loading">
                  <img :src="loading"/>
                </div>
                <div ref="radar" class="githubLine" :style="{width: '100%', height: '600px', padding: '15px 0'}"></div>
              </div>
              <div class="details">
                <p class="total">总分：{{hotInfo.totalordercount}} <span>/ 5</span></p>
                <div class="item">
                  <p><img src="../assets/project/pb1.png"> 资金监管：{{hotInfo.fundsupervision}}</p>
                  <p class="des">{{hotInfoTips.fundana}}</p>
                </div>
                <div class="item">
                  <p><img src="../assets/project/pb2.png"> 基本面：{{hotInfo.fundamentalsanalysis}}</p>
                  <p class="des">{{hotInfoTips.baseana}}</p>
                </div>
                <div class="item">
                  <p><img src="../assets/project/pb3.png"> 团队：{{hotInfo.teamanalysis}}</p>
                  <p class="des">{{hotInfoTips.teamana}}</p>
                </div>
                <div class="item">
                  <p><img src="../assets/project/pb4.png"> 技术：{{hotInfo.technicalanalysis}}</p>
                  <p class="des">{{hotInfoTips.skillana}}</p>
                </div>
                <div class="item">
                  <p><img src="../assets/project/pb5.png"> 市场：{{hotInfo.marketanalysis}}</p>
                  <p class="des">{{hotInfoTips.markana}}</p>
                </div>
              </div>
            </div>
            <div class="echartsbox2">
              <div class="echarts_loading" v-if="scoreChart_loading">
                <img :src="loading"/>
              </div>
              <div ref="scoreChart" class="chartbox" :style="{width: '100%', height: '680px'}"></div>
              <div class="btn-list">
                <label for="citem2" ref="scoreButton2">
                  <input type="checkbox" id="citem2">
                  <div class="checkbox"></div>
                  资金监管
                </label>
                <label for="citem3" ref="scoreButton3">
                  <input type="checkbox" id="citem3">
                  <div class="checkbox"></div>
                  基本面
                </label>
                <label for="citem4" ref="scoreButton4">
                  <input type="checkbox" id="citem4">
                  <div class="checkbox"></div>
                  团队
                </label>
                <label for="citem5" ref="scoreButton5">
                  <input type="checkbox" id="citem5">
                  <div class="checkbox"></div>
                  技术
                </label>
                <label for="citem6" ref="scoreButton6">
                  <input type="checkbox" id="citem6">
                  <div class="checkbox"></div>
                  市场
                </label>
              </div>
            </div>
            <div class="project-projectMainTab" ref="bigBox">
              <div class="tabheader">
                <div class="item" :class="tabactive === index ? 'on' : ''" v-for="(item, index) in tablist" :key="index" 
                @click="tabindex(index)">{{item}}</div>
                <div class="item btn-group" :class="{on:tabactive>4}">
                  <div data-toggle="dropdown">资讯</div>
                  <ul class="dropdown-menu">
                    <li :class="tabactive === index + tablist.length ? 'on':''" v-for="(item, index) in tabinlist" :key="index" 
                    @click="tabindex(index+tablist.length)">{{item}}</li>
                  </ul>
                </div>
              </div>
              <!-- 行情 -->
              <div class="tabcontent" v-show="tabactive === 0">
                <div class="echartsbox3">
                    <div class="echarts_loading" v-if="marketChart_loading">
                      <img :src="loading"/>
                    </div>
                    <div ref="marketChart" class="chartbox" :style="{width: '100%', height: '680px'}"></div>
                    <div class="btn-list">
                      <label for="item1" ref="marketLineButton1">
                        <input type="checkbox" id="item1">
                        <div class="checkbox"></div>
                        流通笔数
                      </label>
                      <label for="item2" ref="marketLineButton2">
                        <input type="checkbox" id="item2">
                        <div class="checkbox"></div>
                        流通总额
                      </label>
                      <label for="item3" ref="marketLineButton3">
                        <input type="checkbox" id="item3">
                        <div class="checkbox"></div>
                        流通参与用户量
                      </label>
                    </div>
                </div>
                <div class="hangqing-total">
                  <div class="item">
                    <div class="left">
                      <p class="i1">昨日流通笔数</p>
                      <p class="i2">{{marketInfo.count || '--'}}</p>
                    </div>
                    <div class="right">
                      <img src="../assets/project/up.png" v-if="marketInfo.countPer>0 ? true : false">
                      <img src="../assets/project/ddown.png" v-if="marketInfo.countPer<0 ? true : false">
                      <span class="up" v-if="marketInfo.countPer !== '0'" :style="marketInfo.countPer>0 ? '' : 'color:#eb2c38'">{{marketInfo.countPer? Math.abs(marketInfo.countPer): marketInfo.countPer }}%</span>
                      <span class="up" v-else>--</span>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">
                      <p class="i1">昨日流通总额</p>
                      <p class="i2">{{marketInfo.allcount || '--'}}</p>
                    </div>
                    <div class="right">
                      <img src="../assets/project/up.png" v-if="marketInfo.allcountPer>0 ? true : false">
                      <img src="../assets/project/ddown.png" v-if="marketInfo.allcountPer<0 ? true : false">
                      <span class="up" v-if="marketInfo.allcountPer !== '0'" :style="marketInfo.allcountPer>0 ? '' : 'color:#eb2c38'">{{marketInfo.allcountPer? Math.abs(marketInfo.allcountPer): marketInfo.allcountPer }}%</span>
                      <span class="up" v-else>--</span>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">
                      <p class="i1">昨日流通参与用户量</p>
                      <p class="i2">{{marketInfo.countUser || '--'}}</p>
                    </div>
                    <div class="right">
                      <img src="../assets/project/up.png" v-if="marketInfo.countUserPer>0 ? true : false">
                      <img src="../assets/project/ddown.png" v-if="marketInfo.countUserPer<0 ? true : false">
                      <span class="up" v-if="marketInfo.countUserPer !== '0'" :style="marketInfo.countUserPer>0 ? '' : 'color:#eb2c38'">{{marketInfo.countUserPer? Math.abs(marketInfo.countUserPer): marketInfo.countUserPer }}%</span>
                      <span class="up" v-else>--</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 项目信息 -->
              <div class="tabcontent project-tab-projectInfo" v-show="tabactive === 1">
                <div class="infobox">
                  <div class="col4" v-if="project.preICOStartDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx1.png"></div>
                      <div class="right">
                        <p class="tit">开始时间</p>
                        <p class="time">{{project.preICOStartDate}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.preICOEndDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx2.png"></div>
                      <div class="right">
                        <p class="tit">结束时间</p>
                        <p class="time">{{project.preICOEndDate }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.token">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx3.png"></div>
                      <div class="right">
                        <p class="tit">代币</p>
                        <p class="time">{{project.token }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.price">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx4.png"></div>
                      <div class="right">
                        <p class="tit">价格</p>
                        <p class="time price">{{project.price }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.bonus">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx5.png"></div>
                      <div class="right">
                        <p class="tit">花红</p>
                        <p class="time">{{project.bonus }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.bounty">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx6.png"></div>
                      <div class="right">
                        <p class="tit">奖励金</p>
                        <p class="time">{{project.bounty }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.platform">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx7.png"></div>
                      <div class="right">
                        <p class="tit">平台</p>
                        <p class="time">{{project.platform }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.accepting">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx8.png"></div>
                      <div class="right">
                        <p class="tit">接受投资的币种</p>
                        <p class="time">{{project.accepting }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.softCap">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx9.png"></div>
                      <div class="right">
                        <p class="tit">启动最小值</p>
                        <p class="time">{{project.softCap }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.hardCap">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx10.png"></div>
                      <div class="right">
                        <p class="tit">启动最大值</p>
                        <p class="time">{{project.hardCap }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.country">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx11.png"></div>
                      <div class="right">
                        <p class="tit">所属国家</p>
                        <p class="time">{{project.country }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.whiteListKYC">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx12.png"></div>
                      <div class="right">
                        <p class="tit">名单</p>
                        <p class="time">{{project.whiteListKYC }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.restrictAreas">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx13.png"></div>
                      <div class="right">
                        <p class="tit">限制区域</p>
                        <p class="time">{{project.restrictAreas }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.minimumInvestment">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx14.png"></div>
                      <div class="right">
                        <p class="tit">单笔交易最低额度</p>
                        <p class="time">{{project.minimumInvestment }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.pricePreICO">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx15.png"></div>
                      <div class="right">
                        <p class="tit">PREICO价格</p>
                        <p class="time price">{{project.pricePreICO }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.priceICO">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx16.png"></div>
                      <div class="right">
                        <p class="tit">ICO价格</p>
                        <p class="time price">{{project.priceICO }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.preICOStartDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx17.png"></div>
                      <div class="right">
                        <p class="tit">PREICO开始日期</p>
                        <p class="time">{{project.preICOStartDate }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.preICOEndDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx18.png"></div>
                      <div class="right">
                        <p class="tit">PREICO截止日期</p>
                        <p class="time">{{project.preICOEndDate }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.icoStartDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx19.png"></div>
                      <div class="right">
                        <p class="tit">ICO开始日期</p>
                        <p class="time">{{project.icoStartDate }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.icoEndDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx20.png"></div>
                      <div class="right">
                        <p class="tit">ICO截止日期</p>
                        <p class="time">{{project.icoEndDate }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.baishupi">
                    <div class="item">
                      <div class="left"><img src="../assets/project/nx21.png"></div>
                      <div class="right">
                        <p class="tit">白皮书原创度</p>
                        <p class="time">{{project.baishupi}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 团队信息 -->
              <div class="tabcontent" v-show="tabactive === 2">
                <div class="section2">
                  <div class="swiper-container section-swiper orther_swiper">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <div class="col4" v-for="(partner, index) in project.partner" :key="index">
                          <div class="item">
                            <img :src="partner.image">
                            <p class="name">{{partner.h3}}</p>
                            <p class="posi">{{partner.h4}}</p>
                            <div class="i" :class="partner.linkin?'on':''">
                              <a :href="partner.linkin" target="_blank" :data="partner.h3" :name="'project_i_a_'+index" :id="'project_i_a_'+index">
                                <i class="fa fa-linkedin"></i>
                              </a>
                            </div>
                            <!--<div class="i"><a :href="partner.u"><i class="fa fa-linkedin"></i></a></div>-->
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--<div class="swiper-scrollbar"></div>-->
                  </div>
                </div>
              </div>
              <!-- Github -->
              <div class="tabcontent" v-show="tabactive === 3">
                <div class="echartsbox4">
                  <div class="echarts_loading" v-if="githubLine_loading">
                    <img :src="loading"/>
                  </div>
                  <div class="control_button github_box">
                      <div class="control_item">
                        <button ref="githubLineButton1" :class="githubButton === 0 ?'check':''" @click="changeGithubButton(0)">更新量</button>
                      </div>
                      <div class="control_item">
                        <button ref="githubLineButton2" :class="githubButton === 1 ?'check':''" @click="changeGithubButton(1)"> 浏览量</button>
                      </div>
                      <div class="control_item">
                        <button ref="githubLineButton3"  :class="githubButton === 2 ?'check':''" @click="changeGithubButton(2)"> 收藏量</button>
                      </div>
                    </div>

                  <div ref="githubLine" class="chartbox" :style="{width: '100%', height: '600px'}"></div>
                </div>
              </div>
              <!-- 社交媒体 -->
              <div class="tabcontent" v-show="tabactive === 4">
                <div class="echartsbox5">
                  <div class="market_box">
                    <div class="line_title">
                      <h4>
                        媒体宣传度
                      </h4>
                    </div>
                    <div style="position: relative">
                      <div class="echarts_loading" v-if="mediaDisseminateLine_loading">
                        <img :src="loading"/>
                      </div>
                      <div class="chart_box" ref="mediaDisseminateLine" style="height: 300px;width: 100%"></div>
                    </div>
                    <div class="line_title">
                      <h4>
                        媒体关注度
                      </h4>
                    </div>
                    <div style="position: relative">
                      <div class="echarts_loading" v-if="mediaFollowLine_loading">
                        <img :src="loading"/>
                      </div>
                      <div class="chart_box" ref="mediaFollowLine" style="height: 300px;width: 100%"></div>
                    </div>
                    <div v-show="false" class="line_title">
                      <h4>
                        社交热度
                      </h4>
                    </div>
                    <div v-show="false" class="control_button github_box">
                      <div class="control_item">
                        <button ref="socialHeatLineButton1">Twitter粉丝数</button>
                      </div>
                      <!--<div class="control_item">-->
                      <!--<button ref="socialHeatLineButton2"> Twitter评论数</button>-->
                      <!--</div>-->
                    </div>
                    <div v-show="false" class="chart_box" ref="socialHeatLine" style="height: 300px;width: 100%"></div>
                  </div>
                </div>
              </div>
              <!-- 新闻 -->
              <div class="tabcontent project-tab-NewsList" v-show="tabactive === 5">
                <div class="list">
                  <div class="media" v-for="(item, index) in NewsList" :key="index">
                    <div class="media-left media-middle">
                      <div class="newimg_box">
                        <img v-if="item.titlePicture" :src="item.titlePicture"/>
                        <div class="date_box">
                          <span class="day">{{item.urlTime | showDay}}</span>
                          <span class="years">{{item.urlTime | showYear}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="media-body">
                      <h4 :name="'project_media-heading_h4_'+index" :id="'project_media-heading_h4_'+index"
                      class="media-heading" :title="item.title" :data="item.title"
                      @click="goArticle('/article',{sid:item.sid}, $event),
                      trackArticle('项目页', item.title, project.project, project.sid, atvNewOrGrade==1?'新闻':'评级文章', item.sid)">
                        {{item.title}}
                      </h4>
                      <p class="media-words">
                        {{item.content}}
                      </p>
                      <div class="media-bottom">
                        <ul>
                          <li>
                            <div class="userimg" v-if="!(item.siteName !== 'NULL' && item.siteName !== null && item.siteName !== '')">
                              <img src="../assets/follow/user_head.png">
                            </div>
                            {{(item.siteName !== 'NULL' && item.siteName !== null && item.siteName !== '')?item.siteName:item.author}}
                          </li>
                          <li>{{item.urlTime}}</li>
                        </ul>
                        <div class="tips" :name="'project_tips_projectCategory_'+index" :id="'project_tips_projectCategory_'+index"
                        v-if="item.projectCategory !==null && item.projectCategory !== '' && item.projectCategory !==undefined && item.projectCategory !=='NULL'"
                        @click="goProjectByName(item.projectCategory, $event)"
                        :data="item.projectCategory">
                          {{item.projectCategory | labelFormat}}
                        </div>
                        <div class="tips" :name="'project_tips_industryCategory_'+index" :id="'project_tips_industryCategory_'+index"
                        v-else-if="item.industryCategory !==null && item.industryCategory !== '' && item.industryCategory !==undefined && item.industryCategory !=='NULL'"
                        @click="goIndustryByIndustry(item.industryCategory, $event)"
                        :data="item.industryCategory">
                          {{item.industryCategory | labelFormat}}
                        </div>
                        <div class="tips" :name="'project_tips_countryCategory_'+index" :id="'project_tips_countryCategory_'+index"
                        v-else="item.countryCategory !==null && item.countryCategory !== '' && item.countryCategory !==undefined && item.countryCategory !=='NULL'"
                        @click="goIndustryByCountry(item.countryCategory, $event)"
                        :data="item.countryCategory">
                          {{item.countryCategory | labelFormat}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="loading_box" v-if="ListLoading">
                    <img :src="loading"/>
                  </div>
                  <div class="loading_box loadmore" v-if="!ListLoading">
                    <div class="btn btn-primary" v-if="ListHasData" @click="initNews(project.project, '290001')">加载更多</div>
                    <span v-if="!ListHasData">没有数据了</span>
                  </div>
                </div>
              </div>
              <!-- 推文 -->
              <div class="tabcontent project-tab-TwitterOrWeibo" v-show="tabactive === 6">
                <div class="list">
                  <div class="item" v-for="(item, index) in TwitterList" :key="index">
                    <div class="left TorW">
                      <img :src="showIcon"/>
                      <span class="day">{{item.urlDate }}</span>
                    </div>
                    <div class="right">
                      <p class="des" :data="item.content" :name="'project_des_content_'+index" :id="'project_des_content_'+index" 
                      @click="goArticle('/article',{sid:item.sid}, $event), 
                      trackArticle('项目页', item.title, project.project, project.sid, atvTwitterOrWeibo==1?'推文':'微博', item.sid)">{{item.content}}</p>
                      <div class="bottom">
                        <span class="name">{{item.author}}</span>
                        <span class="time">{{item.urlTime}}</span>
                        <span class="tips" :name="'project_tips_projectCategory2_'+index" :id="'project_tips_projectCategory2_'+index" 
                        v-if="item.projectCategory !==null && item.projectCategory !== '' && item.projectCategory !==undefined && item.projectCategory !=='NULL'"
                        @click="goProjectByName(item.projectCategory, $event)"
                        :data="item.projectCategory">
                          {{item.projectCategory | labelFormat}}
                        </span>
                        <span class="tips" :name="'project_tips_industryCategory2_'+index" :id="'project_tips_industryCategory2_'+index" 
                        v-else-if="item.industryCategory !==null && item.industryCategory !== '' && item.industryCategory !==undefined && item.industryCategory !=='NULL'"
                        @click="goIndustryByIndustry(item.industryCategory, $event)"
                        :data="item.industryCategory">
                          {{item.industryCategory | labelFormat}}
                        </span>
                        <span class="tips" :name="'project_tips_countryCategory2_'+index" :id="'project_tips_countryCategory2_'+index" 
                        v-else="item.countryCategory !==null && item.countryCategory !== '' && item.countryCategory !==undefined && item.countryCategory !=='NULL'"
                        @click="goIndustryByCountry(item.countryCategory, $event)"
                        :data="item.countryCategory">
                          {{item.countryCategory | labelFormat}}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="loading_box" v-if="ListLoading">
                    <img :src="loading"/>
                  </div>
                  <div class="loading_box loadmore" v-if="!ListLoading">
                    <div class="btn btn-primary" v-if="ListHasData" @click="initTwitter(project.project, '290002')">加载更多</div>
                    <span v-if="!ListHasData">没有数据了</span>
                  </div>
                </div>
              </div>
              <!-- 微博 -->
              <div class="tabcontent project-tab-TwitterOrWeibo" v-show="tabactive === 7">
                <div class="list">
                  <div class="item" v-for="(item, index) in WeiboList" :key="index">
                    <div class="left TorW">
                      <img :src="showIcon"/>
                      <span class="day">{{item.urlDate }}</span>
                    </div>
                    <div class="right">
                      <p class="des" :data="item.content" :name="'project_des_content_'+index" :id="'project_des_content_'+index" 
                      @click="goArticle('/article',{sid:item.sid}, $event), 
                      trackArticle('项目页', item.title, project.project, project.sid, atvTwitterOrWeibo==1?'推文':'微博', item.sid)">{{item.content}}</p>
                      <div class="bottom">
                        <span class="name">{{item.author}}</span>
                        <span class="time">{{item.urlTime}}</span>
                        <span class="tips" :name="'project_tips_projectCategory2_'+index" :id="'project_tips_projectCategory2_'+index" 
                        v-if="item.projectCategory !==null && item.projectCategory !== '' && item.projectCategory !==undefined && item.projectCategory !=='NULL'"
                        @click="goProjectByName(item.projectCategory, $event)"
                        :data="item.projectCategory">
                          {{item.projectCategory | labelFormat}}
                        </span>
                        <span class="tips" :name="'project_tips_industryCategory2_'+index" :id="'project_tips_industryCategory2_'+index" 
                        v-else-if="item.industryCategory !==null && item.industryCategory !== '' && item.industryCategory !==undefined && item.industryCategory !=='NULL'"
                        @click="goIndustryByIndustry(item.industryCategory, $event)"
                        :data="item.industryCategory">
                          {{item.industryCategory | labelFormat}}
                        </span>
                        <span class="tips" :name="'project_tips_countryCategory2_'+index" :id="'project_tips_countryCategory2_'+index" 
                        v-else="item.countryCategory !==null && item.countryCategory !== '' && item.countryCategory !==undefined && item.countryCategory !=='NULL'"
                        @click="goIndustryByCountry(item.countryCategory, $event)"
                        :data="item.countryCategory">
                          {{item.countryCategory | labelFormat}}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="loading_box" v-if="ListLoading">
                    <img :src="loading"/>
                  </div>
                  <div class="loading_box loadmore" v-if="!ListLoading">
                    <div class="btn btn-primary" v-if="ListHasData" @click="initWeibo(project.project, '290004')">加载更多</div>
                    <span v-if="!ListHasData">没有数据了</span>
                  </div>
                </div>
              </div>
              <!-- 微信 -->
              <div class="tabcontent project-tab-NewsList" v-show="tabactive === 8">
                <div class="list">
                  <div class="media" v-for="(item, index) in weixinList" :key="index">
                    <div class="media-left media-middle">
                      <div class="newimg_box">
                        <img v-if="item.titlePicture" :src="item.titlePicture"/>
                        <div class="date_box">
                          <span class="day">{{item.urlTime | showDay}}</span>
                          <span class="years">{{item.urlTime | showYear}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="media-body">
                      <h4 :name="'project_media-heading_h4_'+index" :id="'project_media-heading_h4_'+index"
                      class="media-heading" :title="item.title" :data="item.title"
                      @click="goArticle('/article',{sid:item.sid}, $event),
                      trackArticle('项目页', item.title, project.project, project.sid, atvNewOrGrade==1?'新闻':'评级文章', item.sid)">
                        {{item.title}}
                      </h4>
                      <p class="media-words">
                        {{item.content}}
                      </p>
                      <div class="media-bottom">
                        <ul>
                          <li>
                            <div class="userimg" v-if="!(item.siteName !== 'NULL' && item.siteName !== null && item.siteName !== '')">
                              <img src="../assets/follow/user_head.png">
                            </div>
                            {{(item.siteName !== 'NULL' && item.siteName !== null && item.siteName !== '')?item.siteName:item.author}}
                          </li>
                          <li>{{item.urlTime}}</li>
                        </ul>
                        <div class="tips" :name="'project_tips_projectCategory_'+index" :id="'project_tips_projectCategory_'+index"
                        v-if="item.projectCategory !==null && item.projectCategory !== '' && item.projectCategory !==undefined && item.projectCategory !=='NULL'"
                        @click="goProjectByName(item.projectCategory, $event)"
                        :data="item.projectCategory">
                          {{item.projectCategory | labelFormat}}
                        </div>
                        <div class="tips" :name="'project_tips_industryCategory_'+index" :id="'project_tips_industryCategory_'+index"
                        v-else-if="item.industryCategory !==null && item.industryCategory !== '' && item.industryCategory !==undefined && item.industryCategory !=='NULL'"
                        @click="goIndustryByIndustry(item.industryCategory, $event)"
                        :data="item.industryCategory">
                          {{item.industryCategory | labelFormat}}
                        </div>
                        <div class="tips" :name="'project_tips_countryCategory_'+index" :id="'project_tips_countryCategory_'+index"
                        v-else="item.countryCategory !==null && item.countryCategory !== '' && item.countryCategory !==undefined && item.countryCategory !=='NULL'"
                        @click="goIndustryByCountry(item.countryCategory, $event)"
                        :data="item.countryCategory">
                          {{item.countryCategory | labelFormat}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="loading_box" v-if="ListLoading">
                    <img :src="loading"/>
                  </div>
                  <div class="loading_box loadmore" v-if="!ListLoading">
                    <div class="btn btn-primary" v-if="ListHasData" @click="initWeixin(project.project, '290001')">加载更多</div>
                    <span v-if="!ListHasData">没有数据了</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rightmain">
            <div class="swiper-container advert-swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../assets/bangdan1.jpg"></div>
                <div class="swiper-slide"><img src="../assets/bangdan2.jpg"></div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-prev"><i class="fa fa-angle-left"></i></div>
              <div class="swiper-button-next"><i class="fa fa-angle-right"></i></div>
            </div>
            <div class="recommendproject">
              <div class="recommendhead">推荐项目</div>
              <div class="recommend-item" v-for="(project, index) in recommendProjects" :key="index">
                <router-link :to="'/project?sid='+project.sid" target="_blank" :data="project.project">
                  <div class="left"><img :src="project.logoSrc"></div>
                  <div class="center">
                    <p class="r1">{{project.project}}</p>
                    <p class="r2">{{project.token | formatRecommendProjects}}</p>
                    <p class="r3">{{project.introduction}}</p>
                  </div>
                  <div class="right">{{project.totalScore | showTatolCore}}</div>
                </router-link>
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
  // import sensors from '../../static/sa-init.js'
  import Swiper from 'swiper'
  import QRCode from 'qrcodejs2'
  import echarts from 'echarts'

  let loading = require('../assets/login/loading.gif');
  let nicon = require('../assets/home/tuite.png');
  let weibo = require('../assets/home/weibo.png');
  let banner = require('../assets/project/probanner.jpg');

  export default {
    data () {
      return {
        tablist: ['行情','项目信息','团队信息','Github','社交媒体'],
        tabinlist: ['新闻','推文','微博','微信'],
        tabactive: 0,
        loading: loading,
        ListLoading: true,
        nicon: nicon,
        weibo: weibo,
        showIcon: nicon,
        project: [],
        isFollow: false,
        NewsList: [],
        TwitterList: [],
        WeiboList: [],
        recommendProjects: [],
        xinwenpage: 0,
        tuiwenpage: 0,
        weibopage: 0,
        weixinpage: 0,
        ListHasData: true,
        shareButton: false,
        weiboQrCode: false,
        qqQrCode: false,
        wechatQrCode: false,
        githubButton:0,
        githubData:[],
        hotInfo: '',
        hotInfoTips: '',
        marketInfo: '',
        weixinList: [],
        projectTabs: [],
        scoreChart_loading: true,
        radar_loading: true,
        marketChart_loading: true,
        githubLine_loading: true,
        mediaDisseminateLine_loading: true,
        mediaFollowLine_loading: true
      }
    },
    mounted () {
      new Swiper('.advert-swiper', {
        autoplay: {
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true,
        observeParents: true,
      });


      this.initProject();
      
    },
    methods: {
      tabindex (index) {
        this.tabactive = index;
      },
      // 获取项目数据
      initProject() {
        let path = this.$route.path;
        if (path === '/project') {
          let that = this;
          let sid = this.$route.query.sid;
          let project = this.$route.query.project;
          let hrefUrl = window.location.href;
          let qrcode1 = new QRCode(this.$refs.wechat_qrCode, {
            width: 125,
            height: 125, // 高度
            text: hrefUrl
          });
          let qrcode2 = new QRCode(this.$refs.qq_qrCode, {
            width: 125,
            height: 125, // 高度
            text: hrefUrl
          });
          let qrcode3 = new QRCode(this.$refs.weibo_qrCode, {
            width: 125,
            height: 125, // 高度
            text: hrefUrl
          });
          if (sid != null && sid !== '' && sid !== undefined) {
            let uid = localStorage.getItem('apelink_user_uid')
            let url = '/api/ICO/id/' + sid;
            let headers = {'uid': uid};
            that.$axios({
              method: 'get',
              url: url,
              headers: headers
            }).then(function (res) {
              that.project = res.data;
              let partner = that.project.partner;
              that.initProjectMarket(res.data.project,res=>{
                that.marketChart_loading = false;
                that.initMarketChart(res)
              });
              that.getHotInfo(res.data.project);
              that.getScoreChart(res.data.project);
              // that.getTabs(res.data.project)
              that.getDetails(res.data.project);
              if (partner) {
                partner = JSON.parse(partner);
              }
              that.project.partner = partner;
              that.$nextTick(() => {  // 下一个UI帧再初始化swiper
                new Swiper('#partnerSwiper', {
                  direction: 'vertical',
                  slidesPerView: 'auto',
                  freeMode: true,
                  scrollbar: {
                    el: '.swiper-scrollbar',
                  },
                  mousewheel: true,
                  observer: true,
                  observeParents: true
                });
              });
              if (that.project.collected) {
                that.isFollow = true
              } else {
                that.isFollow = false
              }
              let categoryNameList = that.project.industryCategory;
              if (categoryNameList != null && categoryNameList !== '' && categoryNameList !== undefined) {
                let arr = categoryNameList.split(';');
                let categoryName = arr[0];
                that.initRecommendProjects(categoryName);
              }
            });
          } else if (project != null && project !== '' && project !== undefined) {
            let uid = localStorage.getItem('apelink_user_uid')
            let url = '/api/ICO/name/' + project;
            let headers = {'uid': uid};
            that.$axios({
              method: 'get',
              url: url,
              headers: headers
            }).then(function (res) {
              that.project = res.data;
              that.initProjectMarket(res.data.project,res=>{
                that.marketChart_loading = false;
                that.initMarketChart(res)
              });
              let partner = that.project.partner;
              if (partner) {
                partner = JSON.parse(partner);
              }
              that.project.partner = partner;
              that.getHotInfo(res.data.project);
              that.getScoreChart(res.data.project);
              // that.getTabs(res.data.project)
              that.getDetails(res.data.project);
              that.$nextTick(() => {  // 下一个UI帧再初始化swiper
                new Swiper('#partnerSwiper', {
                  direction: 'vertical',
                  slidesPerView: 'auto',
                  freeMode: true,
                  scrollbar: {
                    el: '.swiper-scrollbar',
                  },
                  mousewheel: true,
                  observer: true,
                  observeParents: true
                });
              });
              if (that.project.collected) {
                that.isFollow = true
              } else {
                that.isFollow = false
              }
              let categoryNameList = that.project.industryCategory;
              if (categoryNameList != null && categoryNameList !== '' && categoryNameList !== undefined) {
                let arr = categoryNameList.split(';');
                let categoryName = arr[0];
                that.initRecommendProjects(categoryName);
              }
            });
          } else {
            // that.$router.push('/index')
          }
        }
      },
      // 新闻
      initNews(projectName, categoryId) {
        let that = this;
        that.ListLoading = true;
        that.$axios.get('/api/traditional/news?searchBy=' + projectName + '&categoryId=' + categoryId + '&pageNo=' + that.xinwenpage).then(function (res) {
          that.xinwenpage++;
          that.NewsList = that.NewsList.concat(res.data.content);
          if (res.data.content.length === 0) {
            that.ListHasData = false;
            that.xinwenpage = false;
          }
          that.ListLoading = false;
        })
      },
      // 推文
      initTwitter(projectName, categoryId) {
        let that = this;
        that.ListLoading = true;
        that.$axios.get('/api/traditional/news?searchBy=' + projectName + '&categoryId=' + categoryId + '&pageNo=' + that.tuiwenpage).then(function (res) {
          that.tuiwenpage++;
          that.TwitterList = that.TwitterList.concat(res.data.content);
          if (res.data.content.length === 0) {
            that.ListHasData = false;
            that.tuiwenpage = false;
          }
          that.ListLoading = false;
        })
      },
      // 微博
      initWeibo(projectName, categoryId) {
        let that = this;
        this.ListLoading = true;
        that.$axios.get('/api/traditional/news?searchBy=' + projectName + '&categoryId=' + categoryId + '&pageNo=' + that.weibopage).then(function (res) {
          that.weibopage++;
          that.WeiboList = that.WeiboList.concat(res.data.content);
          if (res.data.content.length === 0) {
            that.ListHasData = false;
            that.weibopage = false;
          }
          that.ListLoading = false;
        })
      },
      // 微信
      initWeixin(projectName, categoryId) {
        let that = this;
        this.ListLoading = true;
        that.$axios.get('/api/traditional/news?searchBy=' + projectName + '&categoryId=' + categoryId + '&pageNo=' + that.weixinpage).then(function (res) {
          that.weixinpage++;
          that.weixinList = that.weixinList.concat(res.data.content);
          if (res.data.content.length === 0) {
            that.ListHasData = false;
            that.weixinpage = false;
          }
          that.ListLoading = false;
        })
      },
      // 推荐项目
      initRecommendProjects(categoryName) {
        let that = this;
        that.$axios.get('/api/ICO/relatedICO?categoryName=' + categoryName).then(function (res) {
          that.recommendProjects = res.data
        })
      },
      goArticle(url, query, event) {
        let routeData = this.$router.resolve({path: url, query: query});
        window.open(routeData.href, '_blank');

        // sensors.quick('trackHeatMap', event.currentTarget);
      },
      setFollow(event) {
        // sensors.quick('trackHeatMap', event.currentTarget);
        let that = this
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          let url = '/api/individual/add?type=ICO&sid=' + that.project.sid;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: url,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              that.initProject();
            }
          })
        } else {
          alert('请先登录');
        }
      },
      deleteFollow(cid, $event) {
        // sensors.quick('trackHeatMap', event.currentTarget);
        let that = this
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          let url = '/api/individual/delete?cid=' + cid;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'DELETE',
            url: url,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              that.isFollow = false
            }

          })
        } else {
          alert('请先登录。')
        }
      },
      weiboQrCodeShow() {
        if (this.weiboQrCode) {
          this.weiboQrCode = false;
        } else {
          this.weiboQrCode = true;
          this.qqQrCode = false;
          this.wechatQrCode = false;
        }
      },
      qqQrCodeShow() {
        if (this.qqQrCode) {
          this.qqQrCode = false;
        } else {
          this.weiboQrCode = false;
          this.qqQrCode = true;
          this.wechatQrCode = false;
        }
      },
      weChatQrCodeShow() {
        if (this.wechatQrCode) {
          this.wechatQrCode = false;
        } else {
          this.weiboQrCode = false;
          this.qqQrCode = false;
          this.wechatQrCode = true;
        }
      },
      getHotInfo(icoName) {
        let uid = localStorage.getItem('apelink_user_uid')
        let url = '/api/tradition/HotESICOScore/' + icoName;
        let headers = {'uid': uid};
        this.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then((res) => {
          this.radar_loading = false;
          this.hotInfo = res.data;
          let res1 = res.data;
          let dataArr = [];
          let arr1 = [res1.fundsupervision, res1.fundamentalsanalysis, res1.teamanalysis, res1.technicalanalysis, res1.marketanalysis];
          let arr2 = [res1.fundsupervisionYesd, res1.fundamentalsanalysisYesd, res1.teamanalysisYesd, res1.technicalanalysisYesd, res1.marketanalysisYesd];
          let max = Math.max.apply(null, arr1);
          let temp = Math.max.apply(null, arr2);
          if (temp > max) {
            max = temp
          }
          dataArr.push(arr1);
          dataArr.push(arr2);
          this.initRadar({
            max: max,
            data: dataArr
          });
        })    
      },
      getDetails(icoName) {
        let uid = localStorage.getItem('apelink_user_uid');
        let headers = {'uid': uid};
        let url = '/api/tradition/detailsNew/' + icoName;
        this.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then((res) => {
          this.projectTabs = res.data.catalog1Avg.replace(/"/g, "").split(';');
          this.hotInfoTips = JSON.parse(res.data.anaString);
        }) 
      },
      getTabs(icoName) {
        this.$axios.get(`/api/tradition/catalog1Avg/${icoName}`).then(res => {
          this.projectTabs = res.data.split(';');
        })
      },
      getScoreChart(icoName) {
        this.$axios.get(`/api/tradition/HotESICOHisScore/${icoName}`).then(res => {
          this.scoreChart_loading = false;
          this.initScoreChart(res.data)
        })
      },
      initProjectMarket(icoName,success) {
        this.$axios.get(`/api/tradition/mark/${icoName}`).then(res => {
          this.marketInfo = res.data[0];
          success(res.data);
        })
      },
      initGithubChart(icoName) {
        this.$axios.get(`/api/tradition/githubScore/${icoName}`).then(res => {
          console.log(res)
          res.data.reverse();
          this.githubData = res.data;
          this.githubLine_loading = false;
          this.initGithubLine(res.data)
        })
      },
      initMediaChart(icoName) {
        this.$axios.get(`/api/tradition/medio/${icoName}`).then(res => {
          this.mediaDisseminateLine_loading = false;
          this.mediaFollowLine_loading = false;
          this.initThreeLine(res.data)
        })
      },
      initScoreChart(data) {
        function filter_array(array) {  
          return array.filter(item=>item); 
        }
        data.reverse();
        let xList = data.map(item => item.times.split(" ")[0]);
        let price = data.map(item => item.price);
        let totalScoreList = data.map(item => item.totalordercount);
        let fundSuperList = data.map(item => item.fundsupervision);
        let fundaMentList = data.map(item => item.fundamentalsanalysis );
        let teamList = data.map(item => item.teamanalysis);
        let techList = data.map(item => item.technicalanalysis);
        let marketList = data.map(item => item.marketanalysis );

        let scoreLine = echarts.init(this.$refs.scoreChart);
        let scoreLineOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            selected: {'价格': true, '评分': true, '资金监管': false, '基本面': false, '团队': false, '技术': false, '市场': false},
            data: ['价格', '评分', '资金监管', '基本面', '团队', '技术', '市场'],
            selectedMode:false
          },
          grid: {
            left: '0',
            right: '0',
            bottom: '40',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: xList,
              axisPointer: {
                triggerTooltip: false
              },
              splitLine: {
                show: false,
                lineStyle: {
                  type: 'dashed'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '评分',
              position: 'right',
              // min: Math.min.apply(null,filter_array(totalScoreList)),
              max: 5, //Math.max.apply(null,filter_array(totalScoreList)),
              minInterval: 1.25
            },
            {
              type: 'value',
              name: '价格',
              position: 'left',
              // min: Math.min.apply(null,filter_array(price)),
              max: (Math.max.apply(null,filter_array(price)) * 1.5).toFixed(3),
              minInterval: (Math.max.apply(null,filter_array(price)) * 1.5).toFixed(3) / 4
            },
            {
              type: 'value',
              name: '资金监管',
              position: 'right',
              // min: Math.min.apply(null,filter_array(fundSuperList)),
              max: 5, //Math.max.apply(null,filter_array(fundSuperList)),
              show: false,
              axisLabel : {
                show: false
              }
            },
            {
              type: 'value',
              name: '基本面',
              position: 'right',
              // min: Math.min.apply(null,filter_array(fundaMentList)),
              max: 5, //Math.max.apply(null,filter_array(fundaMentList)),
              show: false,
              axisLabel : {
                show: false
              }
            },
            {
              type: 'value',
              name: '团队',
              position: 'right',
              // min: Math.min.apply(null,filter_array(teamList)),
              max: 5, //Math.max.apply(null,filter_array(teamList)),
              show: false,
              axisLabel : {
                show: false
              }
            },
            {
              type: 'value',
              name: '技术',
              position: 'right',
              // min: Math.min.apply(null,filter_array(techList)),
              max: 5, //Math.max.apply(null,filter_array(techList)),
              show: false,
              axisLabel : {
                show: false
              }
            },
            {
              type: 'value',
              name: '市场',
              position: 'right',
              // min: Math.min.apply(null,filter_array(marketList)),
              max: 5, //Math.max.apply(null,filter_array(marketList)),
              show: false,
              axisLabel : {
                show: false
              }
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',
              startValue: this.getStartValue(data[data.length-1].times, data[0].times)
            },
          ],
          series: [
            {
              name: '评分',
              type: 'line',
              // stack: '总量',
              yAxisIndex: 0,
              color: '#3555da',
              label: {
                normal: {
                  show: true,
                  // position: 'top'
                }
              },
              // areaStyle: {normal: {}},
              data: totalScoreList,
              showSymbol: false
            },
            {
              name: '价格',
              type: 'line',
              // stack: '总量',
              yAxisIndex: 1,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              // areaStyle: {normal: {}},
              data: price,
              color: '#b0b0b0',
              showSymbol: false
            },
            {
              name: '资金监管',
              type: 'line',
              // stack: '总量',
              yAxisIndex: 2,
              data: fundSuperList,
              color: '#fdd208',
              showSymbol: false
            },
            {
              name: '基本面',
              type: 'line',
              // stack: '总量',
              yAxisIndex: 3,
              data: fundaMentList,
              color: '#5ad8ae',
              showSymbol: false
            },
            {
              name: '团队',
              type: 'line',
              // stack: '总量',
              yAxisIndex: 4,
              data: teamList,
              color: '#f185f8',
              showSymbol: false
            },
            {
              name: '技术',
              type: 'line',
              // stack: '总量',
              yAxisIndex: 5,
              data: techList,
              color: '#82d5fe',
              showSymbol: false
            },
            {
              name: '市场',
              type: 'line',
              // stack: '总量',
              yAxisIndex: 6,
              data: marketList,
              color: '#9cb2fa',
              showSymbol: false
            },
          ]
        };
        scoreLine.setOption(scoreLineOption);
        window.addEventListener('resize', e =>{
          scoreLine.resize();
        })

        this.$refs.scoreButton2.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            scoreLineOption.legend.selected['资金监管'] = false;
            $this.classList.remove('check');
          } else {
            scoreLineOption.legend.selected['资金监管'] = true;
            $this.classList.add('check');
          }
          scoreLine.setOption(scoreLineOption);
        });
        this.$refs.scoreButton3.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            scoreLineOption.legend.selected['基本面'] = false;
            $this.classList.remove('check');
          } else {
            scoreLineOption.legend.selected['基本面'] = true;
            $this.classList.add('check');
          }
          scoreLine.setOption(scoreLineOption);
        });
        this.$refs.scoreButton4.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            scoreLineOption.legend.selected['团队'] = false;
            $this.classList.remove('check');
          } else {
            scoreLineOption.legend.selected['团队'] = true;
            $this.classList.add('check');
          }
          scoreLine.setOption(scoreLineOption);
        });
        this.$refs.scoreButton5.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            scoreLineOption.legend.selected['技术'] = false;
            $this.classList.remove('check');
          } else {
            scoreLineOption.legend.selected['技术'] = true;
            $this.classList.add('check');
          }
          scoreLine.setOption(scoreLineOption);
        });
        this.$refs.scoreButton6.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            scoreLineOption.legend.selected['市场'] = false;
            $this.classList.remove('check');
          } else {
            scoreLineOption.legend.selected['市场'] = true;
            $this.classList.add('check');
          }
          scoreLine.setOption(scoreLineOption);
        });
        this.scoreLine = scoreLine;
      },
      getStartValue(date1, date2) {
        let oDate1 = new Date(date1);
        oDate1.setMonth(oDate1.getMonth() - 1);
        let oDate2 = new Date(date2);
        if(oDate1.getTime() > oDate2.getTime()){
          return (oDate1.getFullYear()+'-'+(oDate1.getMonth()+1)+'-'+oDate1.getDate());
        } else {
          return date2;
        }
      },
      initMarketChart(data) {
        function filter_array(array) {  
          return array.filter(item=>item); 
        } 
        data.reverse();
        let xList = data.map(item => item.times.split(" ")[0]);
        let totalScoreList = data.map(item => item.totalScore);
        let countUserList = data.map(item => item.countUser);
        let allCountList = data.map(item => item.allcount);
        let countList = data.map(item => item.count);
        let marketLine = echarts.init(this.$refs.marketChart);
        let marketLineOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            selected: {'价格': true, '流通笔数': false, '流通总额': false, '流通参与用户量': false},
            data: ['价格', '流通笔数', '流通总额', '流通参与用户量'],
            selectedMode:false
          },
          grid: {
            left: '0',
            right: '3%',
            bottom: '40',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: xList,
              axisPointer: {
                triggerTooltip: false
              },
              splitLine: {
                show: false,
                lineStyle: {
                  type: 'dashed'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '价格',
              min: Math.min.apply(null,filter_array(totalScoreList)),
              max: Math.max.apply(null,filter_array(totalScoreList)),
            },
            {
              type: 'value',
              name: '流通笔数',
              position: 'right',
              show: false,
              min: Math.min.apply(null,filter_array(countList)),
              max: Math.max.apply(null,filter_array(countList)),
              axisLabel : {
                show: false
              }
            },
            {
              type: 'value',
              name: '流通总额',
              position: 'right',
              show: false,
              min: Math.min.apply(null,filter_array(allCountList)),
              max: Math.max.apply(null,filter_array(allCountList)),
              axisLabel : {
                show: false
              }
            },
            {
              type: 'value',
              name: '流通参与用户量',
              show: false,
              position: 'right',
              min: Math.min.apply(null,filter_array(countUserList)),
              max: Math.max.apply(null,filter_array(countUserList)),
              axisLabel : {
                show: false
              }
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',
              startValue: this.getStartValue(data[data.length-1].times, data[0].times)
            },
          ],
          series: [
            {
              name: '价格',
              type: 'line',
              yAxisIndex: 0,
              // stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {normal: {}},
              data: totalScoreList,
              color: '#b0b0b0',
              showSymbol: false
            },
            {
              name: '流通笔数',
              yAxisIndex: 1,
              type: 'line',
              // stack: '总量',
              data: countList,
              color: '#f1982f',
              showSymbol: false
            },
            {
              name: '流通总额',
              type: 'line',
              // stack: '总量',
              yAxisIndex: 2,
              data: allCountList,
              color: '#fd5908',
              showSymbol: false
            },
            {
              name: '流通参与用户量',
              type: 'line',
              yAxisIndex: 3,
              // stack: '总量',
              data: countUserList,
              color: '#49cb55',
              showSymbol: false
            },
          ]
        };
        marketLine.setOption(marketLineOption);
        window.addEventListener('resize', e =>{
          marketLine.resize();
        })

        this.$refs.marketLineButton1.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            marketLineOption.legend.selected['流通笔数'] = false;
            $this.classList.remove('check');
          } else {
            marketLineOption.legend.selected['流通笔数'] = true;
            $this.classList.add('check');
          }
          marketLine.setOption(marketLineOption);
        });
        this.$refs.marketLineButton2.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            marketLineOption.legend.selected['流通总额'] = false;
            $this.classList.remove('check');
          } else {
            marketLineOption.legend.selected['流通总额'] = true;
            $this.classList.add('check');
          }
          marketLine.setOption(marketLineOption);
        });
        this.$refs.marketLineButton3.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            marketLineOption.legend.selected['流通参与用户量'] = false;
            $this.classList.remove('check');
          } else {
            marketLineOption.legend.selected['流通参与用户量'] = true;
            $this.classList.add('check');
          }
          marketLine.setOption(marketLineOption);
        });
        this.marketLine = marketLine;
      },
      initRadar(param) {
        let myChart = echarts.init(this.$refs.radar);
        let option = {
          tooltip: {},
          legend: {
            data: [
              {
                name: '今日',
                textStyle: {
                  color: '#F82F4C',
                }
              },
              {
                name: '昨日',
                textStyle: {
                  color: '#0ACEF0'
                }
              }
            ],
            right: 10,
            // selectedMode: false,
          },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#fff',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            splitArea: {
              areaStyle: {
                color: ['#29316E',
                  '#39417C'],
                shadowColor: '#39417C',
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: '#445BCA'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#444B83'
              }
            },
            indicator: [
              {name: '资金监管', max: 0.5, color: '#0ACEF0'},
              {name: '基本面', max: 1.5, color: '#0ACEF0'},
              {name: '团队', max: 1.75, color: '#0ACEF0'},
              {name: '技术', max: 0.5, color: '#0ACEF0'},
              {name: '市场', max: 0.75, color: '#0ACEF0'},
            ]
          },
          series: [{
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: param.data[1],
                name: '昨日',
                itemStyle: {
                  color: '#0ACEF0'
                }
              },
              {
                value: param.data[0],
                name: '今日',
                itemStyle: {
                  color: '#F82F4C'
                }
              }
            ]
          }]
        };
        myChart.setOption(option);
        window.addEventListener('resize', e =>{
          let width = this.$refs.bluebox.offsetWidth;
          myChart.resize({'width': `${width}px`});
        })
      },
      initGithubLine(data) {
        let xList = data.map(item => item.times.split(" ")[0]);
        let commitList = data.map(item => item.commit);
        let watchList = data.map(item => item.watch);
        let starList = data.map(item => item.star);
        let commitAvgList = data.map(item => (item.commitAvg) ? item.commitAvg.toFixed(2): item.commitAvg);
        let watchAvgList = data.map(item => (item.watchAvg) ? item.watchAvg.toFixed(2): item.watchAvg);
        let starAvgList = data.map(item => (item.starAvg) ? item.starAvg.toFixed(2): item.starAvg);
        let commit = false;
        let watch = false;
        let star = false;
        let avgList = commitAvgList;
        if(this.githubButton === 0){
          commit = true;
          avgList = commitAvgList;
        }else if(this.githubButton === 1){
          watch = true;
          avgList = watchAvgList;
        }else{
          star = true;
          avgList = starAvgList;
        }

        let githubLine = echarts.init(this.$refs.githubLine);
        let githubLineOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            selected: {'近30天平均值':true,'更新量': commit, '浏览量': watch, '收藏量': star}, //'近30天平均值': true, 
            data: ['近30天平均值','更新量', '浏览量', '收藏量'], //'近30天平均值', 
            selectedMode:false,
            x: 'right'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '8%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: xList
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',
              startValue: this.getStartValue(data[data.length-1].times, data[0].times)
            },
          ],
          series: [
            {
              name: '近30天平均值',
              type: 'line',
              smooth:false,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              itemStyle:{
                normal:{
                    lineStyle:{
                        width:2,
                        type:'dotted'  //'dotted'虚线 'solid'实线
                    }
                }
              },
              data: avgList,
              color: '#4cc96b',
              showSymbol: false
            },
            {
              name: '收藏量',
              type: 'line',
              // stack: '总量',
              data: starList,
              color: '#f4ab44',
              showSymbol: false

            },
            {
              name: '浏览量',
              type: 'line',
              // stack: '总量',
              data: watchList,
              color: '#8547f7',
              showSymbol: false
            },
            {
              name: '更新量',
              type: 'line',
              // stack: '总量',
              data: commitList,
              color: '#47a1ff',
              showSymbol: false
            },
          ]
        };
        githubLine.setOption(githubLineOption);
        // this.$refs.githubLineButton1.addEventListener('click', e => {
        //   let $this = e.target;
        //   let mykey = false;
        //   let className = $this.classList.toString();
        //   if (className.indexOf('check') !== -1) {
        //     githubLineOption.legend.selected['更新量'] = false;
        //     $this.classList.remove('check');
        //   } else {
        //     githubLineOption.legend.selected['更新量'] = true;
        //     $this.classList.add('check');
        //   }
        //   githubLine.setOption(githubLineOption);
        // });
        // this.$refs.githubLineButton2.addEventListener('click', e => {
        //   let $this = e.target;
        //   let mykey = false;
        //   let className = $this.classList.toString();
        //   if (className.indexOf('check') !== -1) {
        //     githubLineOption.legend.selected['浏览量'] = false;
        //     $this.classList.remove('check');
        //   } else {
        //     githubLineOption.legend.selected['浏览量'] = true;
        //     $this.classList.add('check');
        //   }
        //   githubLine.setOption(githubLineOption);
        // });
        // this.$refs.githubLineButton3.addEventListener('click', e => {
        //   let $this = e.target;
        //   let mykey = false;
        //   let className = $this.classList.toString();
        //   if (className.indexOf('check') !== -1) {
        //     githubLineOption.legend.selected['收藏量'] = false;
        //     $this.classList.remove('check');
        //   } else {
        //     githubLineOption.legend.selected['收藏量'] = true;
        //     $this.classList.add('check');
        //   }
        //   githubLine.setOption(githubLineOption);
        // });
        this.githubLine = githubLine;
        window.addEventListener('resize', e =>{
          let width = this.$refs.bigBox.offsetWidth;
          githubLine.resize({'width': `${width}px`});
        })
      },
      changeGithubButton(type){
        this.githubButton = type;
        this.initGithubLine(this.githubData)
      },
      //媒体宣传度
      initMediaDisseminateLine(param) {
        let mediaDisseminateLine = echarts.init(this.$refs.mediaDisseminateLine);
        let mediaDisseminateLineOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['报道量'], //'近30天平均值', 
            selectedMode:false,
            x: 'right'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '40',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: param.xList
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty'
            },
          ],
          series: [
            // {
            //   name: '近30天平均值',
            //   type: 'line',
            //   stack: '总量',
            //   label: {
            //     normal: {
            //       show: true,
            //       position: 'top'
            //     }
            //   },
            //   data: param.twitterAvgList
            // },
            {
              name: '报道量',
              type: 'line',
              // stack: '总量',
              data: param.allnumList,
              color: '#f4ab44'
            },
          ]
        };
        mediaDisseminateLine.setOption(mediaDisseminateLineOption);
        this.mediaDisseminateLine = mediaDisseminateLine;
        window.addEventListener('resize', e =>{
          let width = this.$refs.bigBox.offsetWidth;
          mediaDisseminateLine.resize({'width': `${width}px`});
        })
      },
      //媒体关注度
      initMediaFollowLine(param) {
        let mediaFollowLine = echarts.init(this.$refs.mediaFollowLine);
        let mediaFollowLineOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['网站数'], //'近30天平均值', 
            selectedMode:false,
            x: 'right'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '40',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: param.xList
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty'
            },
          ],
          series: [
            // {
            //   name: '近30天平均值',
            //   type: 'line',
            //   stack: '总量',
            //   label: {
            //     normal: {
            //       show: true,
            //       position: 'top'
            //     }
            //   },
            //   data: param.twitterAvgList
            // },
            {
              name: '网站数',
              type: 'line',
              // stack: '总量',
              data: param.sitenameList,
              color: '#6363e5'
            },
          ]
        };
        mediaFollowLine.setOption(mediaFollowLineOption);
        this.mediaFollowLine = mediaFollowLine;
         window.addEventListener('resize', e =>{
          let width = this.$refs.bigBox.offsetWidth;
          mediaFollowLine.resize({'width': `${width}px`});
        })
      },
      //社交热度图
      // initSocialHeatLine(param) {
      //   let socialHeatLine = echarts.init(this.$refs.socialHeatLine);
      //   let socialHeatLineOption = {
      //     tooltip: {
      //       trigger: 'axis',
      //       axisPointer: {
      //         type: 'cross',
      //         label: {
      //           backgroundColor: '#6a7985'
      //         }
      //       }
      //     },
      //     legend: {
      //       selected: {'近30天平均值': true, '粉丝数': false, '评论数': false},
      //       data: ['近30天平均值', '粉丝数', '评论数'],
      //       selectedMode:false,
      //       x: 'right'
      //     },
      //     grid: {
      //       left: '3%',
      //       right: '4%',
      //       bottom: '40',
      //       containLabel: true
      //     },
      //     xAxis: [
      //       {
      //         type: 'category',
      //         boundaryGap: false,
      //         data: param.xList
      //       }
      //     ],
      //     yAxis: [
      //       {
      //         type: 'value'
      //       }
      //     ],
      //     dataZoom: [
      //       {
      //         type: 'slider',
      //         xAxisIndex: 0,
      //         filterMode: 'empty',
      //       },
      //     ],
      //     series: [
      //       {
      //         name: '近30天平均值',
      //         type: 'line',
      //         stack: '总量',
      //         label: {
      //           normal: {
      //             show: true,
      //             position: 'top'
      //           }
      //         },
      //         data: param.twitterAvgList
      //       },
      //       {
      //         name: '粉丝数',
      //         type: 'line',
      //         stack: '总量',
      //         data: param.twitterList,
      //       },
      //       // {
      //       //   name: '评论数',
      //       //   type: 'line',
      //       //   stack: '总量',
      //       //   data: [254, 354, 854, 684],
      //       // },
      //     ]
      //   };
      //   socialHeatLine.setOption(socialHeatLineOption);
      //   this.$refs.socialHeatLineButton1.addEventListener('click', e => {
      //     let $this = e.target;
      //     let mykey = false;
      //     let className = $this.classList.toString();
      //     if (className.indexOf('check') !== -1) {
      //       socialHeatLineOption.legend.selected['粉丝数'] = false;
      //       $this.classList.remove('check');
      //     } else {
      //       socialHeatLineOption.legend.selected['粉丝数'] = true;
      //       $this.classList.add('check');
      //     }
      //     socialHeatLine.setOption(socialHeatLineOption);
      //     this.socialHeatLine = socialHeatLine;
      //   });
      //   // this.$refs.socialHeatLineButton2.addEventListener('click', e => {
      //   //   let $this = e.target;
      //   //   let mykey = false;
      //   //   let className = $this.classList.toString();
      //   //   if (className.indexOf('check') !== -1) {
      //   //     socialHeatLineOption.legend.selected['评论数'] = false;
      //   //     $this.classList.remove('check');
      //   //   } else {
      //   //     socialHeatLineOption.legend.selected['评论数'] = true;
      //   //     $this.classList.add('check');
      //   //   }
      //   //   socialHeatLine.setOption(socialHeatLineOption);
      //   // });
      //   this.socialHeatLine = socialHeatLine;
      //   window.addEventListener('resize', e =>{
      //     let width = this.$refs.bigBox.offsetWidth;
      //     socialHeatLine.resize({'width': `${width}px`});
      //   })
      // },
      initThreeLine(data) {
        data.reverse();
        let xList = data.map(item => item.times.split(" ")[0]);
        let allnumList = data.map(item => item.allnum);
        let sitenameList = data.map(item => item.sitename);
        let twitterList = data.map(item => item.twitter);
        let twitterAvgList = data.map(item => item.twitterAvg);
        // console.log(xList);

        this.initMediaDisseminateLine({xList: xList, allnumList: allnumList, twitterAvgList: twitterAvgList});
        this.initMediaFollowLine({xList: xList, sitenameList: sitenameList, twitterAvgList: twitterAvgList});
        // this.initSocialHeatLine({xList: xList, twitterList: twitterList, twitterAvgList: twitterAvgList});
      },
      goProjectByName(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/project', query: {project: obj}});
        // sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
    },
    watch: {
      '$route': 'initProject',
      tabactive: function (val) {
        // 新闻
        switch(val){
          case 0:
            // 行情
            break;
          case 1:
            // 项目信息
            break;
          case 2:
            // 团队信息
            break;
          case 3:
            // Github
            if(this.githubLine) {
              let width = this.$refs.bigBox.offsetWidth;
              this.githubLine.resize({'width': `${width}px`});
            } else {
              this.initGithubChart(this.project.project);
            }
            break;
          case 4:
            // 社交媒体
            if(this.socialHeatLine && this.mediaFollowLine &&this.mediaDisseminateLine) {
              let width = this.$refs.bigBox.offsetWidth;
              this.socialHeatLine.resize({'width': `${width}px`});
              this.mediaFollowLine.resize({'width': `${width}px`});
              this.mediaDisseminateLine.resize({'width': `${width}px`});
            } else {
            this.initMediaChart(this.project.project);
            }
            
            break;
          case 5:
            // 新闻
            if (this.xinwenpage !== false) {
              this.ListHasData = true;
              this.initNews(this.project.project, '290001');
            }else{
              this.ListHasData = false;
            }
            break;
          case 6:
            // 推文
            this.showIcon = nicon;
            if (this.tuiwenpage !== false) {
              this.ListHasData = true;
              this.initTwitter(this.project.project, '290002');
            }else{
              this.ListHasData = false;
            }
            break;
          case 7:
            // 微博
            this.showIcon = weibo;
            if (this.weibopage !== false) {
              this.ListHasData = true;
              this.initWeibo(this.project.project, '290004');
            }else{
              this.ListHasData = false;
            }
            break;
          case 8:
            // 微信
            if (this.weixinpage !== false) {
              this.ListHasData = true;
              this.initWeixin(this.project.project, '290000');
            }else{
              this.ListHasData = false;
            }
            break;
          default:
        }
      },
    },
    filters: {
      formatRecommendProjects (val) {
        if (val !== null || val !== '') {
          return  '( '+ val +' )';
        }else{
          return '--';
        }
      },
      showTatolCore(obj) {
        let num = parseFloat(obj).toFixed(2) + '';
        // console.log(num);
        if (num === '0.00') {
          num = 0
        }
        return num;
      },
      showDay(obj) {
        let time = obj.replace(/-/g,'/')
        let myDate = new Date(time);
        let day = myDate.getDate()
        if (day < 9) {
          day = '0' + (day + 1)
        }
        return day
      },
      showYear(obj) {
        let time = obj.replace(/-/g,'/')
        let myDate = new Date(time);
        let month = myDate.getMonth()
        if (month < 9) {
          month = '0' + (month + 1)
        } else {
          month = month + 1
        }
        return myDate.getFullYear() + '-' + month
      },
      labelFormat(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            return arr[0];
          } else {
            return obj;
          }
        }
        return obj;
      },
      showLable(label1, label2, lable3) {
        if (label1 != null && label1 !== undefined && label1 !== '' && label1 != 'NULL') {
          let arr = label1.split(';')
          return arr[0]
        } else {
          if (label2 != null && label2 !== undefined && label2 !== '' && label2 != 'NULL') {
            let arr = label1.split(';')
            return arr[0]
          } else {
            if (lable3 != null && lable3 !== undefined && lable3 !== '' && lable3 != 'NULL') {
              let arr = label1.split(';')
              return arr[0]
            } else {
              return '标签'
            }
          }
        }
      },
      rounding(val) {
        return parseInt(val);
      },
      formatDataForMark(val) {
        if (val) {
          if (val > 100000000) {
            let num = val / 100000000;
            return `${num.toFixed(2)} 亿`
          } else {
            if (val > 10000) {
              let num = val / 10000;
              return `${num.toFixed(2)} 万`
            } else {
              return val;
            }
          }
        } else {
          return '--'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

