Component({
  data: {
    selected: 0
  },
  methods: {
    onTabChange(e) {
      const index = Number(e.detail.value);
      const pages = [
        '/pages/stock/stock',
        '/pages/price/price',
        '/pages/index/index'
      ];
      if (getCurrentPages()[0].route !== pages[index].replace(/^\//, '')) {
        wx.switchTab({ url: pages[index] });
      }
      this.setData({ selected: index });
    }
  }
}); 