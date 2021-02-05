
<script>
	export default {
		onLaunch: function() {
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
