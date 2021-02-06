
<script>
	export default {
		onLaunch: function() {
			//弹幕存储
			if(!uni.getStorageSync('danmuList') || uni.getStorageSync('danmuList').length === 0) {
				uni.setStorageSync('danmuList', [{
					text: '一大波弹幕即将来袭',
					color: '#ff0000',
					time: 1
				},
				{
					text: '发条弹幕见证当下',
					color: '#00ff00',
					time: 2
				},
				{
					text: 'Oh,MyGod!这也太厉害了吧',
					color: '#0000ff',
					time: 3
				},
				{
					text: '爱了,爱了',
					color: '#fff',
					time: 3
				}])
			}
			//时间格式化
			Date.prototype.Format = function (fmt) {
				var o = {
					"M+": this.getMonth() + 1, //月份 
					"d+": this.getDate(), //日 
					"H+": this.getHours(), //小时 
					"m+": this.getMinutes(), //分 
					"s+": this.getSeconds(), //秒 
					"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
					"S": this.getMilliseconds() //毫秒 
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			}
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
			@import url("./static/iconfont/iconfont.css");
	page {
		background-color: #ffffff;
		min-height: 100vh!important;
		background: -webkit-linear-gradient(top,rgba(104, 130, 253, 1.0),rgba(104, 130, 253, 0.7), rgba(85, 170, 255, 0.05));
		height : 100%;
		}
</style>
