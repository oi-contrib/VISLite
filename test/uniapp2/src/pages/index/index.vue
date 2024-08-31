<template>
    <view class="view">
        <button type="primary" class="btn" @click="goto('canvas')">Canvas画笔</button>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        goto(pagename) {
            uni.navigateTo({
                url: `/pages/${pagename}/index`,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.view {
    padding-bottom: 10rpx;

    .btn {
        margin: 20rpx;
        font-size: 32rpx;
        background-color: #2196f3;
    }
}
</style>
