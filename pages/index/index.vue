<template>
	<view>
			<view @click="toDetail">详情</view>
			<view @click="toSearch">搜索</view>
			<view @click="toPersonal">个人中心</view>
			<view @click="toSearchInfo">搜索详情</view>
			<view @click="toCategory">分类</view>
			<view @click="toPlay">播放</view>
			<view @click="toLike">收藏</view>
			<view @click="toHome">首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			toDetail(){
				wx.navigateTo({
					url: '/pages/detail/detail'
				})
			},
			toSearch(){
				wx.navigateTo({
					url: '/pages/search/search'
				})
			},
			toPersonal(){
				wx.navigateTo({
					url: '/pages/personal/personal'
				})
			},
			toSearchInfo(){
				wx.navigateTo({
					url: '/pages/searchInfo/searchInfo'
				})
			},
			toCategory(){
				wx.navigateTo({
					url: '/pages/category/category'
				})
			},
			toPlay(){
				wx.navigateTo({
					url: '/pages/Play/Play'
				})
			},
			toLike(){
				wx.navigateTo({
					url: '/pages/Like/Like'
				})
			},
			toHome(){
				wx.navigateTo({
					url: '/pages/Home/Home'
				})
			},
		}
	}
</script>

<style>
	

</style>
