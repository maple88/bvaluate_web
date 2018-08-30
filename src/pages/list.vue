<template>
  <div class="page" id="list_page">
    <vheader/>
    <div class="maintainer">
      <div class="follow_content" id="article">
        <div class="fish_container list_container">
          <div class="clearfix">
            <div class="center">
              <div class="listBox">
                <div class="listBox_top">
                  <h4 class="list_title">全球项目榜单</h4>
                  <div class="tabBtn">
                    <button class="btnStyle active">周榜</button>
                    <button class="btnStyle">月榜</button>
                  </div>
                </div>
                <div class="listBox_content">
                  <div class="table-responsive">
                    <table class="table table-striped table-hover">
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>项目名称</th>
                        <th>团队真实性</th>
                        <th>团队社交活跃度</th>
                        <th>团队关联度</th>
                        <th>白书皮</th>
                        <th>行业热度</th>
                        <th>媒体关注度</th>
                        <th>宣传力度</th>
                        <th>负面影响</th>
                        <th>钱包监控</th>
                        <th>代码活跃度</th>
                        <th>总分</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr class="tr_default" v-for="(item,index) in list">
                        <td v-if="index === 0" class="tr_first"><span>{{index + 1 }}</span></td>
                        <td v-else-if="index === 1" class="tr_second"><span>{{index + 1 }}</span></td>
                        <td v-else-if="index === 2" class="tr_third"><span>{{index + 1 }}</span></td>
                        <td v-else><span>{{index + 1 }}</span></td>
                        <td :class="index === 0? 'tr_first':''">项目名称</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                        <td :class="index === 0? 'tr_first':''">100%</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="moreBox">
                    <button class="relaodMore">加载更多</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="adv_swiper" id="list_page_adv">
                <div class="swiper-container" id="right_swiper">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" :style="'background-image: url('+img3+')'"></div>
                    <div class="swiper-slide" :style="'background-image: url('+img3+')'"></div>
                    <div class="swiper-slide" :style="'background-image: url('+img3+')'"></div>
                  </div>
                  <!-- 如果需要分页器 -->
                  <div class="swiper-button-prev"></div><!--左箭头-->
                  <div class="swiper-button-next"></div><!--右箭头-->
                </div>
              </div>
              <div class="letf_list_up">
                <div class="listBox_top">
                  <h4 class="list_title">涨幅排行</h4>
                  <div class="tabBtn">
                    <h4>CNY</h4>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>货币名称</th>
                      <th>成交额（一天）</th>
                      <th>价格</th>
                      <th>涨幅</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="tr_default">
                      <td class="tr_first"><span>1</span></td>
                      <td>项目名称</td>
                      <td>￥120万</td>
                      <td>￥1.89</td>
                      <td>87.81%</td>
                    </tr>
                    <tr class="tr_default">
                      <td class="tr_second"><span>2</span></td>
                      <td>项目名称</td>
                      <td>￥120万</td>
                      <td>￥1.89</td>
                      <td>87.81%</td>
                    </tr>
                    <tr class="tr_default">
                      <td class="tr_third"><span>3</span></td>
                      <td>项目名称</td>
                      <td>￥120万</td>
                      <td>￥1.89</td>
                      <td>87.81%</td>
                    </tr>
                    <tr class="tr_default">
                      <td><span>4</span></td>
                      <td>项目名称</td>
                      <td>￥120万</td>
                      <td>￥1.89</td>
                      <td>87.81%</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="letf_list_down">
                <div class="listBox_top">
                  <h4 class="list_title">跌幅排行</h4>
                  <div class="tabBtn">
                    <h4>CNY</h4>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>货币名称</th>
                      <th>成交额（一天）</th>
                      <th>价格</th>
                      <th>跌幅</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="tr_default">
                      <td class="tr_first"><span>1</span></td>
                      <td>项目名称</td>
                      <td>￥120万</td>
                      <td>￥1.89</td>
                      <td>87.81%</td>
                    </tr>
                    <tr class="tr_default">
                      <td class="tr_second"><span>2</span></td>
                      <td>项目名称</td>
                      <td>￥120万</td>
                      <td>￥1.89</td>
                      <td>87.81%</td>
                    </tr>
                    <tr class="tr_default">
                      <td class="tr_third"><span>3</span></td>
                      <td>项目名称</td>
                      <td>￥120万</td>
                      <td>￥1.89</td>
                      <td>87.81%</td>
                    </tr>
                    <tr class="tr_default">
                      <td><span>4</span></td>
                      <td>项目名称</td>
                      <td>￥120万</td>
                      <td>￥1.89</td>
                      <td>87.81%</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="top">
          <div class="fish_container">
            <div class="flexbox clearfix">
              <ul>
                <li class="apelink_logo">
                  Bvaluate
                  <img src="../assets/follow/bottom_logo.png"/>
                </li>
                <li><a href="#">Stats & facts</a></li>
                <li><a href="#">Media</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Mobile app (Android)</a></li>
                <li><a href="#">Chrome Eidget</a></li>
                <li><a href="#">Firefox Widget</a></li>
                <li><a href="#">Benchy</a></li>
              </ul>
              <ul class="logo_box">
                <li>Bvaluate</li>
                <li>
                  <ul class="network clearfix">
                    <li>
                      <a href="#">
                        <div class="icon1"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon2"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon3"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon4"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon5"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon6"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon7"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon8"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon9"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon10"></div>
                      </a>
                    </li>

                  </ul>
                </li>
              </ul>
              <ul>
                <li>For ICOs</li>
                <li><a href="#">Publish new ICO</a></li>
                <li><a href="#">ICO Analyzre</a></li>
                <li><a href="#">Premium Listing</a></li>
                <li><a href="#">Widgets</a></li>
                <li><a href="#">For al</a></li>
              </ul>
              <ul>
                <li>For ALL</li>
                <li><a href="#">ICO Listing</a></li>
                <li><a href="#">People of Blockchsin</a></li>
                <li><a href="#">ICO Whitelist</a></li>
                <li><a href="#">Agencies</a></li>
                <li><a href="#">Exchanges</a></li>
                <li><a href="#">Experts</a></li>
                <li><a href="#">ROL calculator</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bottom">
          <p>备案号</p>
          <p>版权信息</p>
        </div>
      </div>
    </div>
    <!--<div class="popover fade bottom in" role="tooltip" id="popover91482">-->
    <!--<div class="arrow" style="left: 50%;"></div>-->
    <!--<div class="popover-content">-->
    <!--<ul>-->
    <!--<li class="wechat"><i class="fa fa-wechat"></i></li>-->
    <!--<li class="weibo"><i class="fa fa-weibo"></i></li>-->
    <!--<li class="qq"><i class="fa fa-qq"></i></li>-->
    <!--<li class="more">更多分享</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Swiper from 'swiper';

  let img1 = require('../assets/follow/banner01.png')
  let img2 = require('../assets/follow/adv01.png')
  let img3 = require('../assets/media.jpg')


  export default {
    data() {
      return {
        list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        banner1: img1,
        img2: img2,
        img3: img3,
      }
    },
    methods: {},
    mounted() {
      new Swiper('#right_swiper', {
        autoplay: {
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })
    },
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

