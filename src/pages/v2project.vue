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
                <!--<button class="whitepaper" @click="goArticle('/pdfShow', {project: project.project})">{{$t('White paper')}}</button>-->
              </div>
              <p class="smtit" v-show="project.token">({{project.token}})</p>
              <div class="fol">
                <div class="followbtn on" v-if="!isFollow" @click="setFollow($event)">{{$t('Focus on')}}</div>
                <div class="followbtn" v-if="isFollow" @click="deleteFollow(project.collected, $event)">{{$t('Followed')}}</div>
                <div class="followbtn share_button" @click.stop="shareButton = !shareButton">
                  {{$t('Share')}}
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
                <div class="followbtn " style="margin-left: 15px;background-color: #3555da;color: white" @click="goArticle('/pdfShow', {project: project.project})">{{$t('White paper')}}</div>
              </div>
            </div>
          </div>
          <p class="describe">{{project.introduction}}</p>
          <!-- <div class="hangyeTips">
            <p class="title">行业标签</p>
            <ul>
              <li v-for="(item,index) in projectTabs" :key="index">
                {{item}}
              </li>
            </ul>
          </div> -->
          <ul class="projectBottom">
            <li v-show="project.outerFaceBook"><a target="_blank" :href="project.outerFaceBook"><img
              src="../assets/project/f1.png"></a></li>
            <li v-show="project.outerTwitter"><a target="_blank" :href="project.outerTwitter"><img
              src="../assets/project/f2.png"></a></li>
            <li v-show="project.outerTelegram"><a target="_blank" :href="project.outerTelegram "><img
              src="../assets/project/f3.png"></a></li>
            <li v-show="project.outerBitCoinTalk"><a target="_blank" :href="project.outerBitCoinTalk"><img
              src="../assets/project/f4.png"></a></li>
            <li v-show="project.outerDiscord"><a target="_blank" :href="project.outerDiscord"><img
              src="../assets/project/f5.png"></a></li>
            <li v-show="project.outerGitHub"><a target="_blank" :href="project.outerGitHub"><img
              src="../assets/project/f6.png"></a></li>
            <li v-show="project.outerInstagram"><a target="_blank" :href="project.outerInstagram"><img
              src="../assets/project/f7.png"></a></li>
            <li v-show="project.outerMedium"><a target="_blank" :href="project.outerMedium"><img
              src="../assets/project/f8.png"></a></li>
            <li v-show="project.outerReddit"><a target="_blank" :href="project.outerReddit"><img
              src="../assets/project/f9.png"></a></li>
            <li v-show="project.outerBlog"><a target="_blank" :href="project.outerBlog"><img
              src="../assets/project/f10.png"></a></li>
            <li v-show="project.outerGitter"><a target="_blank" :href="project.outerGitter"><img
              src="../assets/project/f11.png"></a></li>
            <li v-show="project.outerGoogle"><a target="_blank" :href="project.outerGoogle"><img
              src="../assets/project/f12.png"></a></li>
            <li v-show="false"><a target="_blank"><img src="../assets/project/f13.png"></a></li>
            <li v-show="project.outerLinkedIn"><a target="_blank" :href="project.outerLinkedIn"><img
              src="../assets/project/f14.png"></a></li>
            <li v-show="false"><a target="_blank"><img src="../assets/project/f15.png"></a></li>
            <li v-show="project.outerSlack"><a target="_blank" :href="project.outerSlack"><img
              src="../assets/project/f16.png"></a></li>
            <li v-show="project.outerStackExchange"><a target="_blank" :href="project.outerStackExchange"><img
              src="../assets/project/f17.png"></a></li>
            <li v-show="false"><a target="_blank"><img src="../assets/project/f18.png"></a></li>
            <li v-show="project.outerYoutube"><a target="_blank" :href="project.outerYoutube"><img
              src="../assets/project/f19.png"></a></li>
          </ul>
        </div>
      </div>
      <div class="project-main">
        <div class="container v2container">
          <div class="middlemain">
            <div class="mainrow">
              <div class="maincol">
                <div class="item score-item">
                  <div class="head">{{$t('Score')}}</div>
                  <div class="score-main">
                    <div class="scorel">
                      <div class="scorel-info">
                        <h4>{{project.totalScore || '0'}}<span>/5</span></h4>
                      </div>
                      <v-circle :completeness="parseFloat(project.totalScore || 0)"
                                :progress-option="{innerColor:'#26baff',strokeWidth:5,max:5,radius:60,toInnerColor:'#29e4e5'}">
                      </v-circle>
                    </div>
                    <div class="scorer">
                      <p>
                        <span>{{$t('Ranking of overall list')}}：<i>{{completeness.rank}}</i></span>
                        <span>
                          {{completeness.rankAm | formatRank}}
                          <img src="../assets/up.png" v-if="completeness.rankAm > 0">
                          <img src="../assets/down.png" v-if="completeness.rankAm < 0">
                        </span>
                      </p>
                      <p v-if="completeness.stoRank !== 0">
                        <span>{{$t('Ranking of STO list')}}：<i>{{completeness.stoRank}}</i></span>
                        <span>
                          {{completeness.stoRankAm | formatRank}}
                          <img src="../assets/up.png" v-if="completeness.stoRankAm > 0">
                          <img src="../assets/down.png" v-if="completeness.stoRankAm < 0">
                        </span>
                      </p>
                      <!-- <p><span>创投板排名：<i>10</i></span><span>20<img src="../assets/down.png"></span></p> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="maincol">
                <div class="item industry-item">
                  <div class="head">{{$t('Industry')}}</div>
                  <div class="industry-tab">
                    <div :class="indestyIndex === index ? 'on' : ''" @click="changeIndesty(item.mark, index)" v-for="(item, index) in completeness.trade">{{item.explain}}</div>
                  </div>
                  <div class="industry-main">
                    <div class="polygon_box">
                      <div class="polygon_img">
                        <img src="../assets/project/polygon.png" alt="polygon">
                        <div class="polygon_info" :style="`bottom: ${completenessHandle(indestyMark)}%;`">
                          <div class="data_info">
                            <p>{{$t('Average score')}}</p>
                            <h4>{{indestyMark}}/<span>5</span></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="maincol">
                <div class="item media-item">
                  <div class="head">{{$t('Media volume')}}</div>
                  <div class="media-main">
                    <div class="medial">
                      <div class="circle_box">
                        <div class="scorel-info">
                          <h4>{{completeness.media&&completeness.media!=='0'&&completeness.media!==0?parseFloat(completeness.media).toFixed(2):'0'}}</h4>
                          <p>{{$t('Index of the volume')}}</p>
                        </div>
                        <img class="circle_img" src="../assets/project/circle.png" alt="circle">
                        <v-circle :completeness="parseFloat(completeness.media) || 0"
                                  :progress-option="{innerColor:'#00c7dc',strokeWidth:35,max:5,radius:45,outerColor:'#e5f9fb',strokeLinecap:'butt'}">
                        </v-circle>
                      </div>
                    </div>
                    <div class="mediar">
                      <div class="computerbox">
                        <p class="wordtop">{{completeness.report || '0'}}{{$t('Pieces')}}</p>
                        <p class="wordbot">{{$t('Nearly a week')}}</p>
                      </div>
                      <p class="des">{{$t('Media coverage')}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="leftmain">
            <div class="tophead">
              <div class="item">
                <p class="t">{{$t('Price')}}</p>
                <p class="b">{{hotInfo.price}}</p>
              </div>
              <div class="item">
                <p class="t">{{$t('Market value')}}</p>
                <p class="b">{{hotInfo.markValue | formatDataForMark($t('Billion'),$i18n.locale)}}</p>
              </div>
              <div class="item">
                <p class="t">{{$t('Current market value')}}</p>
                <p class="b">{{hotInfo.famc | formatDataForMark($t('Billion'),$i18n.locale) }}</p>
              </div>
              <div class="item">
                <p class="t">{{$t('Number of large transactions')}}</p>
                <p class="b" v-show="hotInfo.linkBig">{{hotInfo.linkBig | rounding}}</p>
              </div>
            </div>
            <div class="bluesection">
              <div class="echartsbox1" ref="bluebox">
                <div class="echarts_loading" v-if="radar_loading">
                  <img :src="loading"/>
                </div>
                <div ref="radar" class="githubLine" :style="{width: '100%', height: '478px', padding: '15px 0'}"></div>
              </div>
              <div class="details">
                <p class="total">{{$t('Total score')}}：{{hotInfo.totalordercount}} <span>/ 5</span></p>
                <div class="item">
                  <div class="tit">
                    <img src="../assets/project/pb1.png">
                    <div class="word" v-if="$i18n.locale === 'cn'"><span>资</span><span>金</span><span>监</span><span>管</span></div>
                    <div class="word" v-else>{{$t('Fund supervision')}}</div>
                    ： {{hotInfo.fundsupervision}}
                  </div>
                  <p class="des">{{hotInfoTips.fundana}}</p>
                </div>
                <div class="item">
                  <div class="tit">
                    <img src="../assets/project/pb2.png">
                    <div class="word" v-if="$i18n.locale === 'cn'"><span>基</span><span>本</span><span>面</span></div>
                    <div class="word" v-else>{{$t('Fundamentals')}}</div>
                    ： {{hotInfo.fundamentalsanalysis}}
                  </div>
                  <p class="des">{{hotInfoTips.baseana}}</p>
                </div>
                <div class="item">
                  <div class="tit">
                    <img src="../assets/project/pb3.png">
                    <div class="word" v-if="$i18n.locale === 'cn'"><span>团</span><span>队</span></div>
                    <div class="word" v-else>{{$t('Team')}}</div>
                    ： {{hotInfo.teamanalysis}}
                  </div>
                  <p class="des">{{hotInfoTips.teamana}}</p>
                </div>
                <div class="item">
                  <div class="tit">
                    <img src="../assets/project/pb4.png">
                    <div class="word" v-if="$i18n.locale === 'cn'"><span>技</span><span>术</span></div>
                    <div class="word" v-else>{{$t('Technology')}}</div>
                    ： {{hotInfo.technicalanalysis}}
                  </div>
                  <p class="des">{{hotInfoTips.skillana}}</p>
                </div>
                <div class="item">
                  <div class="tit">
                    <img src="../assets/project/pb5.png">
                    <div class="word" v-if="$i18n.locale === 'cn'"><span>市</span><span>场</span></div>
                    <div class="word" v-else>{{$t('Market')}}</div>
                    ： {{hotInfo.marketanalysis}}
                  </div>
                  <p class="des">{{hotInfoTips.markana}}</p>
                </div>
              </div>
            </div>
            <div class="echartsbox2">
              <div class="echarts_loading" v-if="scoreChart_loading">
                <img :src="loading"/>
              </div>
              <div ref="scoreChart" class="chartbox" :style="{width: '100%', height: '417px'}"></div>
              <div class="btn-list">
                <label for="citem2" ref="scoreButton2">
                  <input type="checkbox" id="citem2">
                  <div class="checkbox"></div>
                  {{$t('Fund supervision')}}
                </label>
                <label for="citem3" ref="scoreButton3">
                  <input type="checkbox" id="citem3">
                  <div class="checkbox"></div>
                  {{$t('Fundamentals')}}
                </label>
                <label for="citem4" ref="scoreButton4">
                  <input type="checkbox" id="citem4">
                  <div class="checkbox"></div>
                  {{$t('Team')}}
                </label>
                <label for="citem5" ref="scoreButton5">
                  <input type="checkbox" id="citem5">
                  <div class="checkbox"></div>
                  {{$t('Technology')}}
                </label>
                <label for="citem6" ref="scoreButton6">
                  <input type="checkbox" id="citem6">
                  <div class="checkbox"></div>
                  {{$t('Market')}}
                </label>
              </div>
            </div>
            <div class="project-projectMainTab" ref="bigBox">
              <div class="tabheader">
                <div class="item" :class="tabactive === index ? 'on' : ''" v-for="(item, index) in tablist" :key="index"
                     @click="tabindex(index)">{{item}}
                </div>
                <div class="item" :class="{on:tabactive>4}" @click="tabindex(5)">{{$t('Information')}}</div>
              </div>
              <!-- 行情 -->
              <div class="tabcontent" v-show="tabactive === 0">
                <div class="echartsbox3">
                  <div class="echarts_loading" v-if="marketChart_loading">
                    <img :src="loading"/>
                  </div>
                  <div ref="marketChart" class="chartbox" :style="{width: '100%', height: '500px'}"></div>
                  <div class="btn-list">
                    <label for="item1" ref="marketLineButton1">
                      <input type="checkbox" id="item1">
                      <div class="checkbox"></div>
                      {{$t('Number of circulation')}}
                    </label>
                    <label for="item2" ref="marketLineButton2">
                      <input type="checkbox" id="item2">
                      <div class="checkbox"></div>
                      {{$t('Total amount of circulation')}}
                    </label>
                    <label for="item3" ref="marketLineButton3">
                      <input type="checkbox" id="item3">
                      <div class="checkbox"></div>
                      {{$t('Number of users participating in circulation')}}
                    </label>
                  </div>
                </div>
                <div class="hangqing-total">
                  <div class="item">
                    <div class="left">
                      <p class="i1">{{$t('Number of circulation yesterday')}}</p>
                      <p class="i2">{{marketInfo.count || '--'}}</p>
                    </div>
                    <div class="right">
                      <span class="up" v-if="marketInfo.countPer !== '0'"
                            :style="marketInfo.countPer>0 ? '' : 'color:#eb2c38'">{{marketInfo.countPer? Math.abs(marketInfo.countPer): marketInfo.countPer }}%</span>
                      <span class="up" v-else>--</span>
                      <img src="../assets/project/up.png" v-if="marketInfo.countPer>0 ? true : false">
                      <img src="../assets/project/ddown.png" v-if="marketInfo.countPer<0 ? true : false">
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">
                      <p class="i1">{{$t('Total amount of circulation yesterday')}}</p>
                      <p class="i2">{{marketInfo.allcount || '--'}}</p>
                    </div>
                    <div class="right">
                      <span class="up" v-if="marketInfo.allcountPer !== '0'"
                            :style="marketInfo.allcountPer>0 ? '' : 'color:#eb2c38'">{{marketInfo.allcountPer? Math.abs(marketInfo.allcountPer): marketInfo.allcountPer }}%</span>
                      <span class="up" v-else>--</span>
                      <img src="../assets/project/up.png" v-if="marketInfo.allcountPer>0 ? true : false">
                      <img src="../assets/project/ddown.png" v-if="marketInfo.allcountPer<0 ? true : false">
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">
                      <p class="i1">{{$t('Number of users participating in circulation yesterday')}}</p>
                      <p class="i2">{{marketInfo.countUser || '--'}}</p>
                    </div>
                    <div class="right">
                      <span class="up" v-if="marketInfo.countUserPer !== '0'"
                            :style="marketInfo.countUserPer>0 ? '' : 'color:#eb2c38'">{{marketInfo.countUserPer? Math.abs(marketInfo.countUserPer): marketInfo.countUserPer }}%</span>
                      <span class="up" v-else>--</span>
                      <img src="../assets/project/up.png" v-if="marketInfo.countUserPer>0 ? true : false">
                      <img src="../assets/project/ddown.png" v-if="marketInfo.countUserPer<0 ? true : false">
                    </div>
                  </div>
                </div>
              </div>
              <!-- 简介 -->
              <div class="tabcontent project-tab-projectInfo" v-show="tabactive === 1">
                <p class="des" v-if="project.irAbstract">{{project.irAbstract}}</p>
                <div class="flexbox">
                  <div class="box-row">
                    <div class="box-col" v-if="project.startDate">
                      <div class="iteml">{{$t('Start time')}}</div>
                      <div class="itemr">{{project.startDate}}</div>
                    </div>
                    <div class="box-col" v-if="project.outerOfficial">
                      <div class="iteml">{{$t('Official website address')}}</div>
                      <div class="itemr"><a target="_blank" :href="project.outerOfficial">{{project.outerOfficial}}</a></div>
                    </div>
                    <!-- </div>
                    <div class="box-row"> -->
                    <div class="box-col" v-if="project.priceICO">
                      <div class="iteml">{{$t('Offering price')}}</div>
                      <div class="itemr">{{project.priceICO}}</div>
                    </div>
                    <div class="box-col" v-if="project.country">
                      <div class="iteml">{{$t('Country of affiliation')}}</div>
                      <div class="itemr">{{project.country}}</div>
                    </div>
                    <!-- </div>
                    <div class="box-row"> -->
                    <div class="box-col" v-if="project.totalSupply">
                      <div class="iteml">{{$t('Total circulation')}}</div>
                      <div class="itemr">{{project.totalSupply}}</div>
                    </div>
                    <div class="box-col">
                      <div class="iteml">{{$t('White paper')}}</div>
                      <div class="itemr">
                        <div class="bps-btn" @click="goArticle('/pdfShow', {project: project.project})">{{$t('Read White paper on-line')}}</div>
                      </div>
                    </div>
                    <!-- </div>
                    <div class="box-row"> -->
                    <div class="box-col" v-if="project.tokenPlatform">
                      <div class="iteml">{{$t('Token platform')}}</div>
                      <div class="itemr">{{project.tokenPlatform}}</div>
                    </div>
                  </div>

                </div>
              </div>
              <!-- 团队 -->
              <div class="tabcontent project-tab-team" v-show="tabactive === 2">
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
                              <a :href="partner.linkin" target="_blank" :data="partner.h3" :name="'project_i_a_'+index"
                                 :id="'project_i_a_'+index">
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
              <!-- 技术 -->
              <div class="tabcontent project-tab-tech" v-show="tabactive === 3">
                <div class="echartsbox4">
                  <div class="echarts_loading" v-if="githubLine_loading">
                    <img :src="loading"/>
                  </div>
                  <div class="control_button github_box">
                    <div class="control_item">
                      <button ref="githubLineButton1" :class="githubButton === 0 ?'check':''"
                              @click="changeGithubButton(0)">{{$t('Quantity of update')}}
                      </button>
                    </div>
                    <div class="control_item">
                      <button ref="githubLineButton2" :class="githubButton === 1 ?'check':''"
                              @click="changeGithubButton(1)"> {{$t('Page views')}}
                      </button>
                    </div>
                    <div class="control_item">
                      <button ref="githubLineButton3" :class="githubButton === 2 ?'check':''"
                              @click="changeGithubButton(2)"> {{$t('Quantity of collected projects')}}
                      </button>
                    </div>
                  </div>

                  <div ref="githubLine" class="chartbox" :style="{width: '100%', height: '320px'}"></div>
                </div>
              </div>
              <!-- 市场 -->
              <div class="tabcontent project-tab-mark" v-show="tabactive === 4">
                <div class="echartsbox5">
                  <div class="market_box">
                    <div class="line_title">
                      <h4>
                        {{$t('Media campaign')}}
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
                        {{$t('Media attention')}}
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
              <!-- 资讯 -->
              <div class="tabcontent project-tab-news" v-show="tabactive >= 5">
                <div class="follow_list serach_follow_list">
                  <div class="label_box">
                    <a name="search_label_box_xinwen" id="search_label_box_xinwen" data="新闻" href="javascript:void(0);"
                       :class="search.type === 'NEWS'?'active':''" @click="changeType('NEWS')">{{$t('News')}}</a>
                    <a name="search_label_box_Twitter" id="search_label_box_Twitter" data="Twitter"
                       href="javascript:void(0);" :class="search.type === 'TWITTER'?'active':''"
                       @click="changeType('TWITTER')">{{$t('Twitter')}}</a>
                    <a name="search_label_box_weibo" id="search_label_box_weibo" data="微博" href="javascript:void(0);"
                       :class="search.type === 'WEIBO'?'active':''"
                       @click="changeType('WEIBO')">{{$t('Microblog')}}</a>
                    <a name="search_label_box_weixin" id="search_label_box_weixin" data="微信" href="javascript:void(0);"
                       :class="search.type === 'WEIXIN'?'active':''"
                       @click="changeType('WEIXIN')">{{$t('WeChat')}}</a>
                  </div>
                  <ul>
                    <li>
                      <div class="list-item">
                        <div class="medialist">
                          <div class="media" v-for="(news, index) in newsList" :key="index">
                            <div class="media-left media-middle"
                                 v-if="news.dataType === 'NEWS'||news.dataType === 'WEIXIN'">
                              <div class="newimg_box" :data="news.title"
                                   :name="'search_newimg_box_title_'+index" :id="'search_newimg_box_title_'+index"
                                   @click="goArticle('/article',{sid:news.sid}, $event)">
                                <img :src="news.titlePicture===''||news.titlePicture===null?newsimg:news.titlePicture"/>
                                <span class="time" v-if="!news.titlePicture">{{news.urlDate | formatTime}}</span>
                              </div>
                            </div>
                            <div class="media-left media-middle"
                                 v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'">
                              <div class="newimg_box" :data="news.title"
                                   :name="'search_newimg_boxTorW_title_'+index"
                                   :id="'search_newimg_boxTorW_title_'+index"
                                   @click="goArticle('/article',{sid:news.sid}, $event)">
                                <img :src="news.dataType === 'WEIBO'?weibo:tuiwen"/>
                                <span class="time">{{news.urlDate | formatTime}}</span>
                              </div>
                            </div>
                            <div class="media-body">
                              <h4 class="media-heading"
                                  v-if="!(news.dataType === 'WEIBO' || news.dataType === 'TWITTER')">
                              <span class="tips"
                                    :name="'search_tips_projectCategory_'+index"
                                    :id="'search_tips_projectCategory_'+index"
                                    v-if="news.projectCategory !==null && news.projectCategory !== '' && news.projectCategory !==undefined && news.projectCategory !=='NULL' || news.dataType !== 'WEIBO' || news.dataType !== 'TWITTER'"
                                    @click="goProjectByName(news.projectCategory, $event), trackProject('搜索页文章的项目标签', news.projectCategory, '搜索页文章的项目标签没有项目ID', '搜索页文章的项目标签没有排行榜位置', '搜索页文章的项目标签没有项目总分')"
                                    :data="news.projectCategory"
                              >
                                {{news.projectCategory | labelFormat}}
                              </span>
                                <span class="tit" :data="news.title" :title="news.title"
                                      :name="'search_media-heading_title_'+index"
                                      :id="'search_media-heading_title_'+index"
                                      @click="goArticle('/article',{sid:news.sid}, $event)"
                                      v-html="news.title"></span>
                              </h4>
                              <p class="media-words TorW"
                                 v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'">
                              <span class="tips"
                                    :name="'search_tips_projectCategory_'+index"
                                    :id="'search_tips_projectCategory_'+index"
                                    v-if="news.projectCategory !==null && news.projectCategory !== '' && news.projectCategory !==undefined && news.projectCategory !=='NULL'"
                                    @click="goProjectByName(news.projectCategory, $event), trackProject('搜索页文章的项目标签', news.projectCategory, '搜索页文章的项目标签没有项目ID', '搜索页文章的项目标签没有排行榜位置', '搜索页文章的项目标签没有项目总分')"
                                    :data="news.projectCategory"
                              >
                                {{news.projectCategory | labelFormat}}
                              </span>
                                <span :data="news.content" v-html="news.content"
                                      :name="'search_media-wordsTorW_content_'+index"
                                      :id="'search_media-wordsTorW_content_'+index"
                                      @click="goArticle('/article',{sid:news.sid}, $event)"></span>
                              </p>
                              <p class="media-words" v-else v-html="news.content">
                              </p>
                              <div class="media-bottom">
                                <ul>
                                  <li
                                    v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'" 
                                    :name="'search_media-bottom_author_'+index"
                                    :id="'search_media-bottom_author_'+index"
                                    :data="news.author">
                                    {{news.author}}
                                  </li>
                                  <li v-else :name="'search_media-bottom_siteName_'+index"
                                      :id="'search_media-bottom_siteName_'+index" :data="news.siteName">
                                    {{news.siteName}}
                                  </li>
                                  <li>{{news.urlTime}}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div class="loading_more">
                      <p class="loading_more_tip" v-if="showloading===-1">{{loadingTip}}~</p>
                      <button :disabled="showloading" data="加载更多" value="加载更多" name="loading_more" id="loading_more"
                              @click.stop="loadMoreNews" v-if="!(showloading===-1)">
                        <img v-if="showloading" :src="loading"/>
                        <span v-if="!showloading">{{$t('Load more')}}</span>
                      </button>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="rightmain">
            <div class="swiper-container advert-swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <a target="_blank" href="https://mp.weixin.qq.com/s/k8mMDvOQYiwxzgS9WsSbaA"><img src="../assets/bangdan1.jpg"></a>
                </div>
                <div class="swiper-slide">
                  <a target="_blank" href="https://mp.weixin.qq.com/s/KjKyZQlQbOaoKZtW824MeQ"><img src="../assets/bangdan2.jpg"></a>
                </div>
                <div class="swiper-slide">
                  <a target="_blank" href="http://www.bvaluate.yibencaijing.com/?from=singlemessage&isappinstalled=0"><img src="../assets/bangdan3.jpg"></a>
                </div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-prev"><i class="fa fa-angle-left"></i></div>
              <div class="swiper-button-next"><i class="fa fa-angle-right"></i></div>
            </div>
            <div class="recommendproject">
              <div class="recommendhead">{{$t('Recommended project')}}</div>
              <div class="recommend-item" v-for="(project, index) in recommendProjects" :key="index">
                <router-link :to="'/project?sid='+project.sid" target="_blank" :data="project.project">
                  <div class="shade-box"></div>
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
  import CommonLoopProgress from '../components/commonLoopProgress'
  import polygonProgress from '../components/polygonProgress'

  let loading = require('../assets/login/loading.gif');
  let nicon = require('../assets/home/tuite.png');
  let newsimg = require('../assets/search/news.png');
  let tuiwen = require('../assets/search/twitter.png');
  let weibo = require('../assets/search/weibo.png');
  let banner = require('../assets/project/probanner.jpg');

  export default {
    components: {
      'v-circle': CommonLoopProgress,
      'v-polygon': polygonProgress,
    },
    data() {
      return {
        tablist: [this.$t('Market quotation'), this.$t('Brief'), this.$t('Team'), this.$t('Technology'), this.$t('Market')],
        tabinlist: ['新闻', '推文', '微博', '微信'],
        tabactive: 0,
        loading: loading,
        ListLoading: true,
        nicon: nicon,
        weibo: weibo,
        showIcon: nicon,
        project: [],
        isFollow: false,
        newsList: [],
        newsPage: 0,
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
        githubButton: 0,
        githubData: [],
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
        mediaFollowLine_loading: true,
        newsimg: newsimg,
        tuiwen: tuiwen,
        weibo: weibo,
        search: {
          type: 'NEWS'
        },
        projectList: [],
        showloading: true,
        typeNumber: '290001',
        completeness: [],
        indestyIndex: 0,
        indestyMark: 0,
        steps: {
          content1: `
            <p class="mgb15"><strong>项目信息总览</strong></p>
            <p class="sm">1、项目评分、声量指数、行业</p>
            <p class="mgb15 sm">2、项目行情、简介、团队、技术、市场、资讯</p>
          `
        }
      }
    },
    activated () {
      let that = this;
      if (that.$route.query.multipage) {
        let booleanShowSignin = true;
        that.$intro().setOptions({
          prevLabel: '上一步',
          nextLabel: '下一步', 
          doneLabel: '完成',
          skipLabel: '跳过',
          showStepNumbers: false,
          showBullets: false,
          hidePrev: true,
          hideNext: true,
          disableInteraction: true,
          steps:[
            {intro: that.steps.content1}
          ]
         }).start().onexit(function() {
          localStorage.setItem('isTour', true);
          document.body.style.overflow = 'inherit';
          if (that.$route.query.multipage) {
            that.$router.push({
              path: that.$route.path,
              query: {
                sid: '839b623c-6f49-467a-b2db-65c0ad5a50a2'
              }
            })
          }
          // 没有签到的话再弹出签到框或者邀请框
          let clearTime = setTimeout(() => {
            let token = localStorage.getItem('apelink_user_token');
            let signedIn = localStorage.getItem('apelink_user_signedIn');
            let isCloseSignTip = sessionStorage.getItem('apelink_user_close_sign_tip');
            let isCloseRegisterTip = sessionStorage.getItem('apelink_user_close_register_tip');
            if (!token) {
              if (booleanShowSignin) {
                if (that.$route.path !== '/login' && that.$route.path !== '/download') {
                  if (!isCloseRegisterTip) {
                    that.$store.state.registerTip = true;
                  }
                }
              }
            }else{
              if (booleanShowSignin) {
                if (!signedIn) {
                  if (that.$route.path !== '/download') {
                    if (!isCloseSignTip) {
                      that.$store.state.signInTips = true;
                    }
                  }
                }
              }
            }
            clearTimeout(clearTime);
          }, 800);
        });
      }
    },
    mounted() {
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
      // setTimeout(() => {
      //   this.completeness = 2.3
      // }, 2000);

      this.initProject();

    },
    methods: {
      NextStepCallback (currentStep) {
        let isTour = JSON.parse(localStorage.getItem('isTour'));
        if(isTour) {
          isTour.project = true;
          localStorage.setItem('isTour', JSON.stringify(isTour));
        } else {
          isTour = {};
          isTour.project = true;
          localStorage.setItem('isTour', JSON.stringify(isTour));
        }
      },
      changeIndesty(value, index) {
        // console.log(value)
        this.indestyMark = parseFloat(value);
        this.indestyIndex = index;
      },
      completenessHandle(completeness) {
        let val = parseFloat(completeness / 5).toFixed(2);
        return val * 100
      },
      changeType(type) {
        this.search.type = type;
        // console.log(type);
        this.newsPage = 0;
        this.newsList = [];
        if (type === 'NEWS') {
          this.typeNumber = '290001'
        } else if (type === 'TWITTER') {
          this.typeNumber = '290002'
        } else if (type === 'WEIBO') {
          this.typeNumber = '290004'
        } else if (type === 'WEIXIN') {
          this.typeNumber = '290003'
        }
        this.initNewsList(this.project.project, this.typeNumber);
      },
      tabindex(index) {
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
              that.initProjectMarket(res.data.project, res => {
                that.marketChart_loading = false;
                that.initMarketChart(res)
              });
              that.getMiddle(res.data.project);
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
              that.initProjectMarket(res.data.project, res => {
                that.marketChart_loading = false;
                that.initMarketChart(res)
              });
              let partner = that.project.partner;
              if (partner) {
                partner = JSON.parse(partner);
              }
              that.project.partner = partner;
              that.getMiddle(res.data.project);
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
      getMiddle (project) {
        this.$axios.get('/api/tradition/minute/'+ project)
        .then(res => {
          this.completeness = res.data;
          this.indestyMark = res.data.trade[0].mark;
        })
      },
      //获取新闻
      initNewsList(projectName, categoryId) {
        let that = this;
        that.showloading = true;
        that.$axios.get('/api/traditional/news?searchBy=' + projectName + '&categoryId=' + categoryId + '&pageNo=' + that.newsPage).then(function (res) {
          that.newsPage++;
          that.newsList = that.newsList.concat(res.data.content);
          if (res.data.content.length === 0) {
            that.showloading = -1;
            that.loadingTip = that.$t('No search results');
          } else {
            that.showloading = false;
          }
        })
      },
      //获取更多新闻
      loadMoreNews() {
        this.initNewsList(this.project.project, this.typeNumber)
      },

      // 新闻
      initNews(projectName, categoryId) {
        let that = this;
        that.ListLoading = true;
        that.$axios.get('/api/traditional/news?searchBy=' + projectName + '&categoryId=' + categoryId + '&pageNo=' + that.xinwenpage).then(function (res) {
          that.xinwenpage++;
          that.newsList = that.newsList.concat(res.data.content);
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
      },
      setFollow(event) {
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
      initProjectMarket(icoName, success) {
        this.$axios.get(`/api/tradition/mark/${icoName}`).then(res => {
          this.marketInfo = res.data[0];
          success(res.data);
        })
      },
      initGithubChart(icoName) {
        this.$axios.get(`/api/tradition/githubScore/${icoName}`).then(res => {
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
          return array.filter(item => item);
        }

        data.reverse();
        let xList = data.map(item => item.times.split(" ")[0]);
        let price = data.map(item => item.price);
        let totalScoreList = data.map(item => item.totalordercount);
        let fundSuperList = data.map(item => item.fundsupervision);
        let fundaMentList = data.map(item => item.fundamentalsanalysis);
        let teamList = data.map(item => item.teamanalysis);
        let techList = data.map(item => item.technicalanalysis);
        let marketList = data.map(item => item.marketanalysis);
        let str = `{
                      "${this.$t('Price')}": true, 
                      "${this.$t('Score')}": true, 
                      "${this.$t('Fund supervision')}": false, 
                      "${this.$t('Fundamentals')}": false, 
                      "${this.$t('Team')}": false, 
                      "${this.$t('Technology')}": false, 
                      "${this.$t('Market')}": false
                    }`;
        let select1 = JSON.parse(str);
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
            selected: select1,
            data: [this.$t('Price'), this.$t('Score'), this.$t('Fund supervision'), this.$t('Fundamentals'), this.$t('Team'), this.$t('Technology'), this.$t('Market')],
            selectedMode: false
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
              name: this.$t('Score'),
              position: 'right',
              // min: Math.min.apply(null,filter_array(totalScoreList)),
              max: 5, //Math.max.apply(null,filter_array(totalScoreList)),
              minInterval: 1.25
            },
            {
              type: 'value',
              name: this.$t('Price'),
              position: 'left',
              // min: Math.min.apply(null,filter_array(price)),
              max: (Math.max.apply(null, filter_array(price)) * 1.5).toFixed(3),
              minInterval: (Math.max.apply(null, filter_array(price)) * 1.5).toFixed(3) / 4
            },
            {
              type: 'value',
              name: this.$t('Fund supervision'),
              position: 'right',
              // min: Math.min.apply(null,filter_array(fundSuperList)),
              max: 5, //Math.max.apply(null,filter_array(fundSuperList)),
              show: false,
              axisLabel: {
                show: false
              }
            },
            {
              type: 'value',
              name: this.$t('Fundamentals'),
              position: 'right',
              // min: Math.min.apply(null,filter_array(fundaMentList)),
              max: 5, //Math.max.apply(null,filter_array(fundaMentList)),
              show: false,
              axisLabel: {
                show: false
              }
            },
            {
              type: 'value',
              name: this.$t('Team'),
              position: 'right',
              // min: Math.min.apply(null,filter_array(teamList)),
              max: 5, //Math.max.apply(null,filter_array(teamList)),
              show: false,
              axisLabel: {
                show: false
              }
            },
            {
              type: 'value',
              name: this.$t('Technology'),
              position: 'right',
              // min: Math.min.apply(null,filter_array(techList)),
              max: 5, //Math.max.apply(null,filter_array(techList)),
              show: false,
              axisLabel: {
                show: false
              }
            },
            {
              type: 'value',
              name: this.$t('Market'),
              position: 'right',
              // min: Math.min.apply(null,filter_array(marketList)),
              max: 5, //Math.max.apply(null,filter_array(marketList)),
              show: false,
              axisLabel: {
                show: false
              }
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',
              startValue: this.getStartValue(data[data.length - 1].times, data[0].times)
            },
          ],
          series: [
            {
              // smooth:true,
              name: this.$t('Score'),
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
              smooth:true,
              name: this.$t('Price'),
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
              // smooth:true,
              name: this.$t('Fund supervision'),
              type: 'line',
              // stack: '总量',
              yAxisIndex: 2,
              data: fundSuperList,
              color: '#fdd208',
              showSymbol: false
            },
            {
              // smooth:true,
              name: this.$t('Fundamentals'),
              type: 'line',
              // stack: '总量',
              yAxisIndex: 3,
              data: fundaMentList,
              color: '#5ad8ae',
              showSymbol: false
            },
            {
              // smooth:true,
              name: this.$t('Team'),
              type: 'line',
              // stack: '总量',
              yAxisIndex: 4,
              data: teamList,
              color: '#f185f8',
              showSymbol: false
            },
            {
              // smooth:true,
              name: this.$t('Technology'),
              type: 'line',
              // stack: '总量',
              yAxisIndex: 5,
              data: techList,
              color: '#82d5fe',
              showSymbol: false
            },
            {
              // smooth:true,
              name: this.$t('Market'),
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
        window.addEventListener('resize', e => {
          scoreLine.resize();
        })

        this.$refs.scoreButton2.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            scoreLineOption.legend.selected[this.$t('Fund supervision')] = false;
            $this.classList.remove('check');
          } else {
            scoreLineOption.legend.selected[this.$t('Fund supervision')] = true;
            $this.classList.add('check');
          }
          scoreLine.setOption(scoreLineOption);
        });
        this.$refs.scoreButton3.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            scoreLineOption.legend.selected[this.$t('Fundamentals')] = false;
            $this.classList.remove('check');
          } else {
            scoreLineOption.legend.selected[this.$t('Fundamentals')] = true;
            $this.classList.add('check');
          }
          scoreLine.setOption(scoreLineOption);
        });
        this.$refs.scoreButton4.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            scoreLineOption.legend.selected[this.$t('Team')] = false;
            $this.classList.remove('check');
          } else {
            scoreLineOption.legend.selected[this.$t('Team')] = true;
            $this.classList.add('check');
          }
          scoreLine.setOption(scoreLineOption);
        });
        this.$refs.scoreButton5.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            scoreLineOption.legend.selected[this.$t('Technology')] = false;
            $this.classList.remove('check');
          } else {
            scoreLineOption.legend.selected[this.$t('Technology')] = true;
            $this.classList.add('check');
          }
          scoreLine.setOption(scoreLineOption);
        });
        this.$refs.scoreButton6.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            scoreLineOption.legend.selected[this.$t('Market')] = false;
            $this.classList.remove('check');
          } else {
            scoreLineOption.legend.selected[this.$t('Market')] = true;
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
        if (oDate1.getTime() > oDate2.getTime()) {
          return (oDate1.getFullYear() + '-' + (((oDate1.getMonth() + 1) > 10) ? (oDate1.getMonth() + 1) : ('0' + (oDate1.getMonth() + 1))) + '-' + ((oDate1.getDate() > 10) ? oDate1.getDate() : '0' + ('0' + oDate1.getDate())));
        } else {
          return date2;
        }
      },
      initMarketChart(data) {
        function filter_array(array) {
          return array.filter(item => item);
        }

        data.reverse();
        let xList = data.map(item => item.times.split(" ")[0]);
        let totalScoreList = data.map(item => item.totalScore);
        let countUserList = data.map(item => item.countUser);
        let allCountList = data.map(item => item.allcount);
        let countList = data.map(item => item.count);
        let marketLine = echarts.init(this.$refs.marketChart);
        let str2 = `{
                    "${this.$t('Price')}": true, 
                    "${this.$t('Number of circulation')}": false, 
                    "${this.$t('Total amount of circulation')}": false, 
                    "${this.$t('Number of users participating in circulation')}": false
                  }`;
        let select2 = JSON.parse(str2);
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
            selected: select2,
            data: [this.$t('Price'), this.$t('Number of circulation'), this.$t('Total amount of circulation'), this.$t('Number of users participating in circulation')],
            selectedMode: false
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
              name: this.$t('Price'),
              min: Math.min.apply(null, filter_array(totalScoreList)),
              max: Math.max.apply(null, filter_array(totalScoreList)),
            },
            {
              type: 'value',
              name: this.$t('Number of circulation'),
              position: 'right',
              show: false,
              min: Math.min.apply(null, filter_array(countList)),
              max: Math.max.apply(null, filter_array(countList)),
              axisLabel: {
                show: false
              }
            },
            {
              type: 'value',
              name: this.$t('Total amount of circulation'),
              position: 'right',
              show: false,
              min: Math.min.apply(null, filter_array(allCountList)),
              max: Math.max.apply(null, filter_array(allCountList)),
              axisLabel: {
                show: false
              }
            },
            {
              type: 'value',
              name: this.$t('Number of users participating in circulation'),
              show: false,
              position: 'right',
              min: Math.min.apply(null, filter_array(countUserList)),
              max: Math.max.apply(null, filter_array(countUserList)),
              axisLabel: {
                show: false
              }
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',
              startValue: this.getStartValue(data[data.length - 1].times, data[0].times)
            },
          ],
          series: [
            {
              smooth:true,
              name: this.$t('Price'),
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
              name: this.$t('Number of circulation'),
              yAxisIndex: 1,
              type: 'line',
              // stack: '总量',
              data: countList,
              color: '#f1982f',
              showSymbol: false
            },
            {
              name: this.$t('Total amount of circulation'),
              type: 'line',
              // stack: '总量',
              yAxisIndex: 2,
              data: allCountList,
              color: '#fd5908',
              showSymbol: false
            },
            {
              name: this.$t('Number of users participating in circulation'),
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
        window.addEventListener('resize', e => {
          marketLine.resize();
        })

        this.$refs.marketLineButton1.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            marketLineOption.legend.selected[this.$t('Number of circulation')] = false;
            $this.classList.remove('check');
          } else {
            marketLineOption.legend.selected[this.$t('Number of circulation')] = true;
            $this.classList.add('check');
          }
          marketLine.setOption(marketLineOption);
        });
        this.$refs.marketLineButton2.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            marketLineOption.legend.selected[this.$t('Total amount of circulation')] = false;
            $this.classList.remove('check');
          } else {
            marketLineOption.legend.selected[this.$t('Total amount of circulation')] = true;
            $this.classList.add('check');
          }
          marketLine.setOption(marketLineOption);
        });
        this.$refs.marketLineButton3.addEventListener('click', e => {
          let $this = e.target;
          let mykey = false;
          let className = $this.classList.toString();
          if (className.indexOf('check') !== -1) {
            marketLineOption.legend.selected[this.$t('Number of users participating in circulation')] = false;
            $this.classList.remove('check');
          } else {
            marketLineOption.legend.selected[this.$t('Number of users participating in circulation')] = true;
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
                name: this.$t('Today'),
                textStyle: {
                  color: '#F82F4C',
                }
              },
              {
                name: this.$t('Last day'),
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
              {name: this.$t('Fund supervision'), max: 0.5, color: '#0ACEF0'},
              {name: this.$t('Fundamentals'), max: 1.5, color: '#0ACEF0'},
              {name: this.$t('Team'), max: 1.75, color: '#0ACEF0'},
              {name: this.$t('Technology'), max: 0.5, color: '#0ACEF0'},
              {name: this.$t('Market'), max: 0.75, color: '#0ACEF0'},
            ]
          },
          series: [{
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                // smooth:true,
                value: param.data[1],
                name: this.$t('Last day'),
                itemStyle: {
                  color: '#0ACEF0'
                }
              },
              {
                // smooth:true,
                value: param.data[0],
                name: this.$t('Today'),
                itemStyle: {
                  color: '#F82F4C'
                }
              }
            ]
          }]
        };
        myChart.setOption(option);
        window.addEventListener('resize', e => {
          let width = this.$refs.bluebox.offsetWidth;
          myChart.resize({'width': `${width}px`});
        })
      },
      initGithubLine(data) {
        let xList = data.map(item => item.times.split(" ")[0]);
        let commitList = data.map(item => item.commit);
        let watchList = data.map(item => item.watch);
        let starList = data.map(item => item.star);
        let commitAvgList = data.map(item => (item.commitAvg) ? item.commitAvg.toFixed(2) : item.commitAvg);
        let watchAvgList = data.map(item => (item.watchAvg) ? item.watchAvg.toFixed(2) : item.watchAvg);
        let starAvgList = data.map(item => (item.starAvg) ? item.starAvg.toFixed(2) : item.starAvg);
        let commit = false;
        let watch = false;
        let star = false;
        let avgList = commitAvgList;
        if (this.githubButton === 0) {
          commit = true;
          avgList = commitAvgList;
        } else if (this.githubButton === 1) {
          watch = true;
          avgList = watchAvgList;
        } else {
          star = true;
          avgList = starAvgList;
        }

        let githubLine = echarts.init(this.$refs.githubLine);
        let str3 = `{
                    "${this.$t('Average of nearly 30 days')}": true, 
                    "${this.$t('Quantity of update')}": ${commit}, 
                    "${this.$t('Page views')}": ${watch}, 
                    "${this.$t('Quantity of collected projects')}": ${star}
                  }`;
        let select3 = JSON.parse(str3);
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
            selected: select3,
            // selected: {'近30天平均值': true, '更新量': commit, '浏览量': watch, '收藏量': star},
            data: [this.$t('Average of nearly 30 days'), this.$t('Quantity of update'), this.$t('Page views'), this.$t('Quantity of collected projects')], //'近30天平均值',
            selectedMode: false,
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
              startValue: this.getStartValue(data[data.length - 1].times, data[0].times)
            },
          ],
          series: [
            {
              // smooth:true,
              name: this.$t('Average of nearly 30 days'),
              type: 'line',
              smooth: false,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 2,
                    type: 'dotted'
                  }
                }
              },
              data: avgList,
              color: '#4cc96b',
              showSymbol: false
            },
            {
              // smooth:true,
              name: this.$t('Quantity of collected projects'),
              type: 'line',
              // stack: '总量',
              data: starList,
              color: '#f4ab44',
              showSymbol: false

            },
            {
              // smooth:true,
              name: this.$t('Page views'),
              type: 'line',
              // stack: '总量',
              data: watchList,
              color: '#8547f7',
              showSymbol: false
            },
            {
              // smooth:true,
              name: this.$t('Quantity of update'),
              type: 'line',
              // stack: '总量',
              data: commitList,
              color: '#47a1ff',
              showSymbol: false
            },
          ]
        };
        githubLine.setOption(githubLineOption);
        this.githubLine = githubLine;
        window.addEventListener('resize', e => {
          let width = this.$refs.bigBox.offsetWidth;
          githubLine.resize({'width': `${width}px`});
        })
      },
      changeGithubButton(type) {
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
            data: [this.$t('Channel flow')], //'近30天平均值',
            selectedMode: false,
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
              // smooth:true,
              name: this.$t('Channel flow'),
              type: 'line',
              // stack: '总量',
              data: param.allnumList,
              color: '#f4ab44'
            },
          ]
        };
        mediaDisseminateLine.setOption(mediaDisseminateLineOption);
        this.mediaDisseminateLine = mediaDisseminateLine;
        window.addEventListener('resize', e => {
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
            data: [this.$t('Number of websites')], //'近30天平均值',
            selectedMode: false,
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
              // smooth:true,
              name: this.$t('Number of websites'),
              type: 'line',
              // stack: '总量',
              data: param.sitenameList,
              color: '#6363e5'
            },
          ]
        };
        mediaFollowLine.setOption(mediaFollowLineOption);
        this.mediaFollowLine = mediaFollowLine;
        window.addEventListener('resize', e => {
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
        switch (val) {
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
            if (this.githubLine) {
              let width = this.$refs.bigBox.offsetWidth;
              this.githubLine.resize({'width': `${width}px`});
            } else {
              this.initGithubChart(this.project.project);
            }
            break;
          case 4:
            // 社交媒体
            if (this.socialHeatLine && this.mediaFollowLine && this.mediaDisseminateLine) {
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
            // this.initNews(this.project.project, '290001');
            this.initNewsList(this.project.project, '290001');
            break;
          default:
        }
      },
    },
    filters: {
      formatRank (val) {
        if (val === 0) {
          return '--';
        }else{
          return val;
        }
      },
      formatRecommendProjects(val) {
        if (val !== null || val !== '') {
          return '( ' + val + ' )';
        } else {
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
        let time = obj.replace(/-/g, '/')
        let myDate = new Date(time);
        let day = myDate.getDate()
        if (day < 9) {
          day = '0' + (day + 1)
        }
        return day
      },
      showYear(obj) {
        let time = obj.replace(/-/g, '/')
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
      formatTime(val) {
        return val.replace(/\//g, "-");
      },
      rounding(val) {
        return parseInt(val);
      },
      formatDataForMark(val,type,lang) {
        if (val) {
          if (val > 100000000) {
            let num = val / 100000000;
            return `${num.toFixed(2)} ${type}`
          } else {
            if (val > 10000) {
              // let num = val / 10000;
              let num = null;
              if(lang === 'en'){
                num = val / 1000;
                return `${num.toFixed(2)} thousand`
              }else{
                num = val / 10000;
                return `${num.toFixed(2)} 万`
              }
              
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
  .recommend-item:hover .shade-box{
    display: block;
  }
  .shade-box{
    display: none;
    width: 100% !important;
    height: 100% !important;
    background-color: rgba(200, 201, 177, 0.1);
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>

