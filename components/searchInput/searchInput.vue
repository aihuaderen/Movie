<template>
	<view class="searchItem" >
			<text class="iconfont icon-10" @click="dianji"></text>
			<input class="searchInput"  type="text" value=""  placeholder="神奇女侠1984" placeholder-class="placeholder"/>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				
			}
		},
		 
	}
</script>


<style lang="stylus">
	.searchItem
			display flex
			justify-content center
			flex-direction column
			position relative
			width 100%
			height 166rpx
			line-height 166rpx
			background: -webkit-linear-gradient(top,rgba(104, 130, 253, 1.0),rgba(104, 130, 253, 0.7), rgba(85, 170, 255, 0.05));
			.searchInput
					margin 0rpx 15rpx
					width 450rpx
					border-radius 50rpx
					padding 10rpx 10rpx
					border 1rpx solid #000000
					background-color white
					.placeholder
							font-size 26rpx
			.iconfont
					position absolute
					top 2
					right 274rpx
					font-size 50rpx
					color red
	
</style>
