Page({
  data: {

  },
  goto(event) {

    // console.log(event)

    wx.navigateTo({
        url: '../'+event.target.dataset.page+'/index'
    })
  }
})
