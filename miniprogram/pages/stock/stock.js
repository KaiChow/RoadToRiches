Component({
  data: {
    buyPrice: '',
    sellPrice: '',
    result: null
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        });
      }
    }
  },

  methods: {
    onBuyPriceInput(e) {
      this.setData({
        buyPrice: e.detail.value
      });
    },

    onSellPriceInput(e) {
      this.setData({
        sellPrice: e.detail.value
      });
    },

    calculate() {
      const { buyPrice, sellPrice } = this.data;
      
      if (!buyPrice || !sellPrice) {
        wx.showToast({
          title: '请输入完整的价格信息',
          icon: 'none'
        });
        return;
      }

      const buy = parseFloat(buyPrice);
      const sell = parseFloat(sellPrice);

      if (isNaN(buy) || isNaN(sell) || buy <= 0) {
        wx.showToast({
          title: '请输入有效的价格',
          icon: 'none'
        });
        return;
      }

      const percentage = ((sell - buy) / buy * 100).toFixed(2);
      this.setData({
        result: parseFloat(percentage)
      });
    }
  }
}); 