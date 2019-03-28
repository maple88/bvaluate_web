<template>
	<div class="modal fade collection-modal" id="v2BindPhone" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
			<button type="button" class="close"  data="关闭模态框" @click="closeThis"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title">{{$t('Bind phone number')}}</h4>
			</div>
			<div class="modal-body phoneModal-body">
			<form class="form-horizontal">
				<div class="form-group">
				<label class="control-label">{{$t('Phone number')}}</label>
				<div class="layui-form">
					<div class="layui-news-style layui-unselect layui-form-select">
					<div class="layui-select-title" @click="openSelect($event)">
						<input :class="inputclass.in9" type="text" placeholder="请选择" v-model="bindPhoneNumber.selectPrefix" readonly="" class="layui-input layui-unselect">
						<i class="layui-edge"></i>
					</div>
					<dl class="layui-anim layui-anim-upbit">
						<dd :class="bindPhoneNumber.selectPrefix === item.code ?'layui-this':''" v-for="(item, index) in countryCode" :key="index" @click="bindPhoneNumber.selectPrefix = item.code">
						<span>{{item.country}}</span><span>{{item.code}}</span>
						</dd>
					</dl>
					</div>
				</div>
				<input type="tel" class="prefix-input" data="输入手机号码" :class="inputclass.in9" name="no_content" id="input_phone" v-model="bindPhoneNumber.phoneNumber"
				@focus="errorMsg.bindPhoneNumber.phoneNumber = '';inputclass.in9='borderbeblue'"
				@blur="checkPhoneNumber()">
				<div class="rightTips">{{errorMsg.bindPhoneNumber.phoneNumber}}</div>
				</div>
				<div class="form-group">
				<label class="control-label">{{$t('Verification code')}}</label>
				<div class="coderow">
					<input type="text" data="输入验证码" :class="inputclass.in8" @focus="inputclass.in8='borderbeblue'" @blur="inputclass.in8=''" name="no_content" id="input_code_btn" v-model="bindPhoneNumber.code">
					<button type="button" class="btn code-btn" data="获取验证码" :disabled="bindPhoneNumberSendBtn" @click.stop="sendBindPhoneNumberCode">{{bindPhoneNumberSendBtnText}}</button>
				</div>
				<p class="help-block" v-if="moblieError_show">60s后重新获取</p>
				<div class="rightTips">{{errorMsg.bindPhoneNumber.code}}</div>
				</div>
				<div class="form-group">
				<p class="model-tips"><span>*</span>{{$t('If the mobile number is registered, the system will merge the current account with the account is attention, collection and other content. The first time associated mobile phone number rewards 200 candy.')}}</p>
				</div>
			</form>
			</div>
			<div class="modal-footer text-center">
			<button type="button" class="btn btn-default cancel" data="取消修改手机号码" data-dismiss="modal">{{$t('Cancel')}}</button>
			<button type="button" class="btn btn-primary ok" data="确认修改手机号码" data-dismiss="modal" @click="bindPhone">{{$t('Confirm')}}</button>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import code from '../assets/json/prefix.json'
export default {
	name: 'v2BindPhone',
	props: {
		closeBindPhone: {
			type: Function
		}
	},
	data(){
		return{
			inputclass:{
				in1:'',
				in2:'',
				in3:'',
				in4:'',
				in5:'',
				in6:'',
				in7:'',
				in8:'',
				in9:'',
			},
			moblieError_show: false,
			bindPhoneNumber: {
				phoneNumber: '',
				code: '',
				selectPrefix: '+86'
			},
			errorMsg: {
				bindPhoneNumber: {
					phoneNumber: '',
					code: '',
				}
			},
			bindPhoneNumber_time: 60,
			bindPhoneNumberSendBtnText: this.$t('Send Message'),
			bindPhoneNumberSendBtn: true,
			bindPhoneNumberShowloading: false,
			countryCode: code,
		}
	},
	methods: {
		closeThis: function(){
			this.$emit('closeBindPhone',false);
		},
		bindPhone () {
			let that = this;
			let selectPrefix = this.bindPhoneNumber.selectPrefix;
			selectPrefix = selectPrefix.replace(/\+/g, '');
			let phoneNumber = that.bindPhoneNumber.phoneNumber;
			let code = that.bindPhoneNumber.code;
			let uid = localStorage.getItem('apelink_user_uid');
			let token = localStorage.getItem('apelink_user_token');
			let url = '/api/user/bindPhone?codeType=1002&phoneNumber='+selectPrefix+'-'+phoneNumber+'&code='+code;
			let headers = {'uid': uid, 'Authorization': token};
			that.$axios({
			method: 'post',
			url: url,
			headers: headers
			})
			.then(function(res){
			localStorage.setItem('apelink_user_phoneNumber', phoneNumber);
			that.user.phoneNumber = phoneNumber;
			})
		},
		sendBindPhoneNumberCode () {
			this.bindPhoneNumberSendBtn = true;
			let phone = this.bindPhoneNumber.phoneNumber
			this.bindPhoneNumberSendBtnText = '';
			this.bindPhoneNumberShowloading = true;
			if (/^[0-9]*$/.test(phone)) {
			let that = this;
			let selectPrefix = this.bindPhoneNumber.selectPrefix;
			selectPrefix = selectPrefix.replace(/\+/g, '');
			let lang = 'en';
			if(selectPrefix === '86'){
				lang = 'cn'
			}
			let url = '/api/login/code?phoneNumber='+selectPrefix+'-'+phone+'&codeType=1002&language=' + lang;
			that.$axios.post(url).then(function (res) {
				that.bindPhoneNumberShowloading = false;
				if (res.status == 200) {
				if (res.data) {
					let auth_timetimer = setInterval(() => {
					that.bindPhoneNumber_time--
					that.bindPhoneNumberSendBtnText = '重新发送(' + that.bindPhoneNumber_time + 's)'
					if (that.bindPhoneNumber_time <= 0) {
						that.bindPhoneNumber_time = 60
						that.bindPhoneNumberSendBtnText = '获取验证码'
						that.bindPhoneNumberSendBtn = false
						clearInterval(auth_timetimer)
					}
					}, 1000)
					that.bindPhoneNumber_time--
					that.bindPhoneNumberSendBtnText = '重新发送(' + that.bindPhoneNumber_time + 's)'
				}
				}
			}).catch(function (res) {
				that.bindPhoneNumberSendBtn = false;
				that.bindPhoneNumberShowloading = false;
				that.bindPhoneNumberSendBtnText = '获取验证码'
			})
			} else {
			this.errorMsg.bindPhoneNumber.phoneNumber = '请输入正确格式的手机号'
			this.bindPhoneNumberSendBtnText = '获取验证码'
			this.bindPhoneNumberShowloading = false;
			this.bindPhoneNumberSendBtn = false;
			}
		},
		openSelect (e) {
			if(e.target.parentNode.parentNode.classList.contains('layui-form-selected')){
			e.target.parentNode.parentNode.classList.remove('layui-form-selected');
			}else {
			e.target.parentNode.parentNode.classList.add('layui-form-selected');
			}
		},
		checkPhoneNumber() {
			this.inputclass.in9='';
			if (this.bindPhoneNumber.phoneNumber != null && this.bindPhoneNumber.phoneNumber !== '' && this.bindPhoneNumber.phoneNumber !== undefined) {
			let phone = this.bindPhoneNumber.phoneNumber;
			if (/^[0-9]*$/.test(phone)) {
				this.bindPhoneNumberSendBtn = false;
			} else {
				this.errorMsg.bindPhoneNumber.phoneNumber = '请输入正确格式的手机号码'
			}
			}
		},
	},
	mounted(){
		$('#v2BindPhone').modal();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .borderbeblue{
    border: 1px solid #3555da;
  }
</style>

