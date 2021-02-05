<template>
    <view class="share">
        <view :class="{'share-box': popupState}" @click="handleHiddenShare">
        </view>
        <view class="share-item" :class="{'share-show': popupState}">
            <view class="content">
					<view :class="{active: item.pname === currentPlayName}" v-for="(item,index) in videoData" :key="index" @tap="changePlayInfo(item)">{{item.pname}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: ['popupState', 'videoData' , 'currentPlayName', 'currentPlayUrl'],
        methods: {
            // 隐藏分享
            handleHiddenShare () {
                this.$emit("changePopupState")
            },
			changePlayInfo(item){
				this.$emit('changePlayInfo',item)
				this.$emit("changePopupState")
			}
        }
    }
</script>

<style lang="less">
    .share {
        width: 100%;
        height: 100%;
    }
    .share-box {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0rpx; left: 0rpx; bottom: 0rpx; right: 0rpx;
        background-color: rgba(0, 0, 0, 0.4);
        transition: .4s;
        z-index: 999;
    }
    // 进入分享动画
    .share-show {
        transition: all 0.4s ease;
        transform: translateY(0%) !important;
    }
    // 离开分享动画
    .share-item {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: auto;
        background-color: #FFFFFF;
        transition: all 0.4s ease;
        transform: translateY(100%);
        z-index: 1999;
        .content {
            width: 100%;
            height: 600rpx;
            display: flex;
			align-content: flex-start;
            flex-wrap: wrap;
			overflow: auto;
			view {
				margin: 20rpx;
				height: 60rpx;
				padding: 10rpx 30rpx;
				line-height: 60rpx;
				text-align: center;
				flex-shrink: 0;
				font-size: 26rpx;
				background-color: #E3E3E3;
				border-radius: 5rpx;
				&.active {
					background-color: #FFD04E;
				}
			}
        }
    }
</style>