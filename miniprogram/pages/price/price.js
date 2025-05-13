Component({
  data: {
    initialPrice: '',
    percentage: '',
    result: null
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        });
      }
    }
  },

  methods: {
    onInitialPriceInput(e) {
      this.setData({
        initialPrice: e.detail.value
      });
    },

    onPercentageInput(e) {
      this.setData({
        percentage: e.detail.value
      });
    },

    calculate() {
      const { initialPrice, percentage } = this.data;
      
      if (!initialPrice || !percentage) {
        wx.showToast({
          title: '请输入完整的信息',
          icon: 'none'
        });
        return;
      }

      const price = parseFloat(initialPrice);
      const percent = parseFloat(percentage);

      if (isNaN(price) || isNaN(percent) || price <= 0) {
        wx.showToast({
          title: '请输入有效的数值',
          icon: 'none'
        });
        return;
      }

      const finalPrice = (price * (1 + percent / 100)).toFixed(2);
      this.setData({
        result: parseFloat(finalPrice)
      });
    }
  }
}); 