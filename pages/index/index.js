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
    percent_10: '',
    percent_15: '',
    percent_20: '',
    profitPrice1: '',
    profitPrice2: '',
    finalPoint: 0,
    lowPrice: "",
    heightPrice: "",
    buyPrice: "",
    heightBoPrice: "",
    lowBoPrice: "",
    outPrice: "",
    price1: "",
    price2: "",
    price3: "",
    price4: "",
    price5:'',
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
    const temp = ((endPrice - startPrice) / startPrice)
    this.setData({
      finalPercent: (temp * 100).toFixed(2),
    });
    this.setData({
      finalPoint: endPrice * (temp + 1).toFixed(2),
    });
    // 下跌反弹 才有止盈
    if (parseInt(endPrice) < parseInt(startPrice)) {
      const temp1 = (endPrice - startPrice) / startPrice
      this.setData({
        profitPrice1: (endPrice * (1 - temp1)).toFixed(2),
        profitPrice2: startPrice,
        finalPoint: endPrice * (1 - temp1).toFixed(2),
      });
    }
  },
  onLowPrice(event) {
    const {
      value
    } = event.detail;
    this.setData({
      lowPrice: value,
    });
  },
  onHeightPrice(event) {
    const {
      value
    } = event.detail;
    this.setData({
      heightPrice: value,
    });
  },
  onLowBoPrice(event) {
    const {
      value
    } = event.detail;
    this.setData({
      lowBoPrice: value,
    });
  },
  onHeightBoPrice(event) {
    const {
      value
    } = event.detail;
    this.setData({
      heightBoPrice: value,
    });
  },
  onBuyPrice(event) {
    const {
      value
    } = event.detail;
    this.setData({
      buyPrice: value,
    });
  },

  handleBoCount() {
    const {
      lowPrice,
      heightPrice,
      lowBoPrice,
      heightBoPrice,
    } = this.data;
    //四舍五入保留2位小数（不够位数，则用0替补）
    function keepTwoDecimalFull(num) {
      var result = parseFloat(num);
      if (isNaN(result)) {
        alert('传递参数错误，请检查！');
        return false;
      }
      result = Math.round(num * 100) / 100;
      var s_x = result.toString();
      var pos_decimal = s_x.indexOf('.');
      if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
      }
      while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
      }
      return s_x;
    }
    if (lowPrice) {
      let _lowPrice = Number(lowPrice)
      this.setData({
        price1: _lowPrice*(1+0.01),
        price2: keepTwoDecimalFull(_lowPrice * (1 - 0.06)),
        price3: keepTwoDecimalFull(_lowPrice * (1 - 0.13)),
        price4: keepTwoDecimalFull(_lowPrice * (1 - 0.20)),
        price5: keepTwoDecimalFull(_lowPrice * (1 - 0.21)),
      })
    }
    if (lowBoPrice && heightBoPrice){
      let _lowPrice = Number(lowBoPrice)
      let _heightPrice = Number(heightBoPrice)
      let _percent = ((_heightPrice - _lowPrice) / _heightPrice)
      let price = _lowPrice*(1+_percent)
      this.setData({outPrice:price})
    }
  },
  handleBoReset() {
    this.setData({
      lowPrice: '',
      heightPrice: '',
      lowBoPrice: '',
      heightBoPrice: '',
      outPrice: "",
      price1: '',
      price2: '',
      price3: '',
      price4: '',
      price5:'',
    })
  }
})