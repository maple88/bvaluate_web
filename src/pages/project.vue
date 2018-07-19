<template>
	<div class="page">
		<vheader/>
		<div class="maintainer">
			<!-- content here -->
			<div class="project-banner">
				<div class="container">
					<div class="left">4.8</div>
					<div class="right">
						<div class="top">
							<div class="imgbrand"><img src="../assets/project/imgbrand.jpg"></div>
							<div class="info">
								<div class="tit">
									StopTheFakes
									<div class="followbtn" v-if="isFollow">+ 关注</div>
									<div class="followbtn on" v-if="!isFollow">已关注</div>
								</div>
								<p class="smtit">Eligma是AI和blockchain基于认知商务</p>
							</div>
						</div>
						<p class="des">streamr（数据）是一个p2p网络的去中心。数据源可以连接到整个网络中的任何节点，然后数被发布，并且网络立即被发送到订户。通过分片模式实现横向扩展。Eligma，一个认知的商务平台，将现有的电子商务和二手市场连接成一点停止用户。利用人工智能和Eligma blockchain技术…</p>
					</div>
				</div>
			</div>
			<div class="container flexlayout">
				<div class="leftlayout">
					<div class="section1">
						<div class="sectiontabs">
              <a href="javascript:;" class="active">新闻</a>
              <a href="javascript:;">评级文章</a>
            </div>
						<div class="swiper-container section-swiper">
					    <div class="swiper-wrapper">
				        <div class="swiper-slide">
			        		<div class="media">
                    <div class="media-left media-middle">
                      <div class="newimg_box">
                        <img src="../assets/media.jpg"/>
                        <div class="date_box">
                          <span class="day">22</span>
                          <span class="years">2018-05</span>
                        </div>
                      </div>
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading">Whatever is worth doing is worth doing well Whatever is worth
                        doing is worth</h4>
                      <p class="media-words">Whatever is worth doing is worth doing well, Whatever isworth doing
                        is worth doingwel,Whatever isworth doing is worth doing wel,Whatever is worth doing is
                        worth doing well, Whatever isworth doingis worth doing wel,</p>
                      <div class="media-bottom">
                        <ul>
                          <li>
                            <div class="userimg"><img src="../assets/follow/user_head.png"></div>
                            刘方平
                          </li>
                          <li>5月17日 18:17</li>
                        </ul>
                        <div class="tips">新闻</div>
                      </div>
                    </div>
                  </div>
				        </div>
					    </div>
					    <div class="swiper-scrollbar"></div>
						</div>
					</div>
					<div class="section2">
						<div class="sectiontabs">
              <div class="headtit">团队</div>
            </div>
            <div class="swiper-container section-swiper" style="height: 690px;">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                	<div class="col4">
	                  <div class="item">
	                    <img src="../assets/user.png">
	                    <p class="name">Deian roljic</p>
	                    <p class="posi">创始人加首席执行者</p>
	                    <div class="i"><i class="fa fa-linkedin"></i></div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <img src="../assets/user.png">
	                    <p class="name">Deian roljic</p>
	                    <p class="posi">创始人加首席执行者</p>
	                    <div class="i on"><i class="fa fa-linkedin"></i></div>
	                  </div>
	                </div>
                </div>
              </div>
              <div class="swiper-scrollbar"></div>
            </div>
					</div>
					<div class="section3">
						<div class="sectiontabs">
              <div class="headtit">项目信息</div>
            </div>
            <div class="infohead">
            	<div class="left">
            		<img src="../assets/project/head.png">
            		<div class="info">
            			<p class="num">4.8</p>
            			<p>36位专家评级</p>
            		</div>
            	</div>
            	<div class="right">
            		<div class="numitem">
            			<p class="num">4.9</p>
            			<p>首发评分</p>
            		</div>
            		<div class="numitem">
            			<p class="num">4.5</p>
            			<p>团队评分</p>
            		</div>
            		<div class="numitem">
            			<p class="num">4.2</p>
            			<p>前景评分</p>
            		</div>
            		<div class="numitem">
            			<p class="num">3.9</p>
            			<p>产品评分</p>
            		</div>
            	</div>
            </div>
						<div class="swiper-container section-swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                	<div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x1.png"></div>
	                    <div class="right">
	                      <p class="tit">开始时间</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x2.png"></div>
	                    <div class="right">
	                      <p class="tit">结束时间</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x3.png"></div>
	                    <div class="right">
	                      <p class="tit">代币</p>
	                      <p class="time">OAK</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x4.png"></div>
	                    <div class="right">
	                      <p class="tit">价格</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x5.png"></div>
	                    <div class="right">
	                      <p class="tit">花红</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x6.png"></div>
	                    <div class="right">
	                      <p class="tit">奖励金</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x7.png"></div>
	                    <div class="right">
	                      <p class="tit">平台</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x8.png"></div>
	                    <div class="right">
	                      <p class="tit">接受投资的币种</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x9.png"></div>
	                    <div class="right">
	                      <p class="tit">启动最小值</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x10.png"></div>
	                    <div class="right">
	                      <p class="tit">启动最大值</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x11.png"></div>
	                    <div class="right">
	                      <p class="tit">所属国家</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x12.png"></div>
	                    <div class="right">
	                      <p class="tit">名单</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x13.png"></div>
	                    <div class="right">
	                      <p class="tit">限制区域</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x14.png"></div>
	                    <div class="right">
	                      <p class="tit">单笔交易最低额度</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x15.png"></div>
	                    <div class="right">
	                      <p class="tit">PREICO价格</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x15.png"></div>
	                    <div class="right">
	                      <p class="tit">ICO价格</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x16.png"></div>
	                    <div class="right">
	                      <p class="tit">PREICO开始日期</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x17.png"></div>
	                    <div class="right">
	                      <p class="tit">PREICO截止日期</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x16.png"></div>
	                    <div class="right">
	                      <p class="tit">ICO开始日期</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x17.png"></div>
	                    <div class="right">
	                      <p class="tit">ICO截止日期</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
	                <div class="col4">
	                  <div class="item">
	                    <div class="left"><img src="../assets/project/x18.png"></div>
	                    <div class="right">
	                      <p class="tit">白皮书原创度</p>
	                      <p class="time">2018-06-01</p>
	                    </div>
	                  </div>
	                </div>
                </div>
              </div>
              <div class="swiper-scrollbar"></div>
            </div>
					</div>
					<div class="section4">
						<div class="sectiontabs">
              <a href="javascript:;" class="active">推文</a>
              <a href="javascript:;">微博</a>
            </div>
						<div class="swiper-container section-swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="item">
                    <div class="left"><img src="../assets/home/nicon.png"></div>
                    <div class="right">
                      <p class="des">Hey Andrew, We will be announcing release detailsin the coming weeks, stay tuned on our official hannels! t.me/vividtoken Hey Andrew, We will be announcing Hey Andrew, We will be announcing release detailsin the coming weeks</p>
                      <div class="bottom">
                        <span class="name">博主</span>
                        <span class="time">2018-06-02    18:00</span>
                        <span class="tips">新闻</span>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left"><img src="../assets/home/nicon.png"></div>
                    <div class="right">
                      <p class="des">Hey Andrew, We will be announcing release detailsin the coming weeks, stay tuned on our official hannels! t.me/vividtoken Hey Andrew, We will be announcing Hey Andrew, We will be announcing release detailsin the coming weeks</p>
                      <div class="bottom">
                        <span class="name">博主</span>
                        <span class="time">2018-06-02    18:00</span>
                        <span class="tips">新闻</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-scrollbar"></div>
            </div>
					</div>
				</div>
				<div class="rightlayout">
					<div class="section5">
						<div class="rightlayouthead">FOLLOW US</div>
						<div class="swiper-container section-swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f1.png">
	                  	<p>Facebook</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f2.png">
	                  	<p>Twitter</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f3.png">
	                  	<p>telegram</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f4.png">
	                  	<p>bitcointalk</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f5.png">
	                  	<p>Discord</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f6.png">
	                  	<p>Github</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f7.png">
	                  	<p>Instagram</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f8.png">
	                  	<p>Medium</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f9.png">
	                  	<p>reddit</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f10.png">
	                  	<p>Blog</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f11.png">
	                  	<p>gitter</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f12.png">
	                  	<p>Google</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f13.png">
	                  	<p>heroku</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f14.png">
	                  	<p>linkedin</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f15.png">
	                  	<p>Naver</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f16.png">
	                  	<p>slack</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f17.png">
	                  	<p>stack</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f18.png">
	                  	<p>steemit</p>
	                  </div>
                 	</div>
                 	<div class="col4">
	                  <div class="item">
	                  	<img src="../assets/project/f19.png">
	                  	<p>youtube</p>
	                  </div>
                 	</div>
                </div>
              </div>
              <div class="swiper-scrollbar"></div>
            </div>
            <div class="swiper-container advert-swiper">
					    <div class="swiper-wrapper">
				        <div class="swiper-slide"><img src="../assets/project/advert.jpg"></div>
				        <div class="swiper-slide"><img src="../assets/project/advert.jpg"></div>
				        <div class="swiper-slide"><img src="../assets/project/advert.jpg"></div>
					    </div>
					    <div class="swiper-pagination"></div>
					    <div class="swiper-button-prev"><i class="fa fa-angle-left"></i></div>
					    <div class="swiper-button-next"><i class="fa fa-angle-right"></i></div>
            </div>
					</div>
					<div class="section6">
						<div class="rightlayouthead">项目推荐</div>
						<div class="item">
							<a href="#">
								<div class="ibanner"><img src="../assets/project/recommend-banner.jpg"></div>
								<div class="info">
									<div class="left"><img src="../assets/project/recommend.jpg"></div>
									<div class="right">
										<div class="head">
											<p class="tit">CASPER</p>
											<p class="smtit">DApps的新机会</p>
										</div>
										<p class="num">9.2 <i class="fa fa-angle-right"></i></p>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>

			<vfooter/>
		</div>

	</div>
</template>

<script>
	import Swiper from 'swiper'
  export default {
  	data () {
  		return {
  			isFollow: true
  		}
  	},
    mounted () {
      // let homeNewsSwiper = new Swiper('#home-news', {
      //   observer: true,
      //   observeParents: true,
      //   on: {
      //     slideChangeTransitionStart: function() {
      //       $(".home-newstabs .active").removeClass('active');
      //       $(".home-newstabs a").eq(this.activeIndex).addClass('active');
      //     }
      //   }
      // })
      $(".sectiontabs a").on('click', function(e) {
        e.preventDefault()
        $(this).parents(".sectiontabs").find("a").removeClass('active')
        $(this).addClass('active')
        // homeNewsSwiper.slideTo($(this).index())
      })
      new Swiper('.section-swiper', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true
      })
      new Swiper('.advert-swiper', {
        autoplay: {
	        disableOnInteraction: false
	      },
	      pagination: {
				  el: '.swiper-pagination',
				  clickable :true
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

