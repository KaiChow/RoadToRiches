// index.js
import Message from 'tdesign-miniprogram/message/index';
// 获取应用实例
const app = getApp()

Page({
  data: {
    tabIndex: 0,
    tabPanelstyle: 'display:flex;justify-content:center;align-items:center;',
    current: 0,
    options: [{
        value: 0,
        label: '上涨'
      },
      {
        value: 1,
        label: '下跌'
      }
    ],
    currentPrice: '',
    percent: '',
    finalPrice: '',
    motto: '一路发发啊！！！',
    confirmBtn: {
      content: '知道了',
      variant: 'base'
    },
    startPrice: '',
    endPrice: '',
    finalPercent: '',
    dialogKey: '',
    showText: false,
    showMultiText: false,
    showTextAndTitle: false,
    showTextAndTitle2: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    boCurentPrice: '',
    percent_5: '',
    percent_15: '',
    percent_25: '',
    percent_35: '',
    percent_38: '',
    profitPrice1: '',
    profitPrice2: '',
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onChange(event) {
    const {
      value
    } = event.detail;
    this.setData({
      current: value
    });
  },
  onPriceInput(event) {
    const {
      value
    } = event.detail;
    this.setData({
      currentPrice: value,
    });
  },
  onPercentInput(event) {
    const {
      value
    } = event.detail;
    this.setData({
      percent: value,
    });
  },
  handleReset() {
    if (this.data.tabIndex == 0) {
      this.setData({
        current: 0,
        currentPrice: '',
        finalPrice: '',
        percent: ''
      });
    }
    if (this.data.tabIndex == 1) {
      this.setData({
        startPrice: '',
        endPrice: '',
        finalPercent: '',
      });
    }

  },
  showDialog(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this.setData({
      [key]: true,
      dialogKey: key
    });
  },
  closeDialog() {
    const {
      dialogKey
    } = this.data;
    this.setData({
      [dialogKey]: false
    });
  },
  handleCount(e) {
    const {
      current,
      currentPrice,
      percent
    } = this.data;
    if (percent <= 0 || !percent) {
      this.showDialog(e)
      return
    }
    if (current == 0) {
      this.setData({
        finalPrice: (currentPrice * (1 + percent / 100)).toFixed(2),
      });
    }
    if (current == 1) {
      this.setData({
        finalPrice: (currentPrice * (1 - percent / 100)).toFixed(2),
      });
    }
  },
  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {
    console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
    this.setData({
      tabIndex: event.detail.value
    })
  },
  onStartPriceInput(event) {
    const {
      value
    } = event.detail;
    this.setData({
      startPrice: value,
    });
  },
  onEndPriceInput(event) {
    const {
      value
    } = event.detail;
    this.setData({
      endPrice: value,
    });
  },
  handlePercentCount(e) {
    const {
      startPrice,
      endPrice,
    } = this.data;
    console.log(this.data)
    if (startPrice == 0 || !startPrice) {
      this.showDialog(e)
      return
    }
    const temp = ((endPrice - startPrice) / startPrice) * 100
    this.setData({
      finalPercent: (temp).toFixed(2),
    });
    // 下跌反弹 才有止盈
    if (parseInt(endPrice) < parseInt(startPrice)) {
      const temp1 = (endPrice - startPrice) / startPrice
      this.setData({
        profitPrice1: (endPrice * (1 - temp1)).toFixed(2),
        profitPrice2: startPrice,
      });
    }
  },
  onBoPriceInput(event) {
    const {
      value
    } = event.detail;
    this.setData({
      boCurentPrice: value,
      percent_5: (value * (1 - 0.05)).toFixed(2),
      percent_15: (value * (1 - 0.15)).toFixed(2),
      percent_25: (value * (1 - 0.25)).toFixed(2),
      percent_35: (value * (1 - 0.35)).toFixed(2),
      percent_38: (value * (1 - 0.38)).toFixed(2),
    })
  },
  handleBoReset() {
    this.setData({
      boCurentPrice: '',
      percent_5: '',
      percent_15: '',
      percent_25: '',
      percent_35: '',
      percent_38: '',
    })
  }
})