Component({
  data: {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        });
      }
    }
  },

  methods: {
    appendNumber(e) {
      const number = e.currentTarget.dataset.number;
      const { displayValue, waitingForSecondOperand } = this.data;

      if (waitingForSecondOperand) {
        this.setData({
          displayValue: number,
          waitingForSecondOperand: false
        });
      } else {
        this.setData({
          displayValue: displayValue === '0' ? number : displayValue + number
        });
      }
    },

    appendDecimal() {
      const { displayValue, waitingForSecondOperand } = this.data;

      if (waitingForSecondOperand) {
        this.setData({
          displayValue: '0.',
          waitingForSecondOperand: false
        });
        return;
      }

      if (!displayValue.includes('.')) {
        this.setData({
          displayValue: displayValue + '.'
        });
      }
    },

    clear() {
      this.setData({
        displayValue: '0',
        firstOperand: null,
        operator: null,
        waitingForSecondOperand: false
      });
    },

    toggleSign() {
      const { displayValue } = this.data;
      this.setData({
        displayValue: (-parseFloat(displayValue)).toString()
      });
    },

    percentage() {
      const { displayValue } = this.data;
      const value = parseFloat(displayValue);
      this.setData({
        displayValue: (value / 100).toString()
      });
    },

    operator(e) {
      const { displayValue, firstOperand, operator } = this.data;
      const inputValue = parseFloat(displayValue);
      const newOperator = e.currentTarget.dataset.op;

      if (firstOperand === null) {
        this.setData({
          firstOperand: inputValue
        });
      } else if (operator) {
        const result = this.performCalculation();
        this.setData({
          displayValue: result.toString(),
          firstOperand: result
        });
      }

      this.setData({
        waitingForSecondOperand: true,
        operator: newOperator
      });
    },

    calculate() {
      const { firstOperand, operator, displayValue } = this.data;
      const inputValue = parseFloat(displayValue);

      if (operator && firstOperand !== null) {
        const result = this.performCalculation();
        this.setData({
          displayValue: result.toString(),
          firstOperand: null,
          operator: null,
          waitingForSecondOperand: true
        });
      }
    },

    performCalculation() {
      const { firstOperand, operator, displayValue } = this.data;
      const inputValue = parseFloat(displayValue);

      if (firstOperand === null) {
        return inputValue;
      }

      switch (operator) {
        case '+':
          return firstOperand + inputValue;
        case '-':
          return firstOperand - inputValue;
        case '×':
          return firstOperand * inputValue;
        case '÷':
          return firstOperand / inputValue;
        default:
          return inputValue;
      }
    }
  }
}); 