'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 計算機 App

var CalcApp = function (_React$Component) {
  _inherits(CalcApp, _React$Component);

  function CalcApp(props) {
    _classCallCheck(this, CalcApp);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CalcApp).call(this, props));

    _this.state = {
      display: '0',
      lastOperand: 0
    };
    _this.operand = 0;
    _this.precision = -1;
    _this.lastOperand = null;
    _this.operator = null;
    return _this;
  }

  _createClass(CalcApp, [{
    key: 'resetState',
    value: function resetState() {
      this.operand = 0;
      this.precision = -1;
      this.lastOperand = null;
      this.operator = null;
      this.setState({ display: 0 });
    }
  }, {
    key: 'showNotImplemented',
    value: function showNotImplemented() {
      console.warn('This function is not implemented yet.');
    }
  }, {
    key: 'leftpad',
    value: function leftpad(str, len, ch) {
      str = String(str);

      var i = -1;

      if (!ch && ch !== 0) ch = ' ';

      len = len - str.length;

      while (++i < len) {
        str = ch + str;
      }

      return str;
    }
  }, {
    key: 'refreshDisplay',
    value: function refreshDisplay() {
      var display = this.operand;
      if (this.precision !== -1) {
        var operandStr = this.operand.toString();
        var pointPosition = operandStr.length - this.precision;
        operandStr = this.leftpad(operandStr, this.precision, '0');
        pointPosition = pointPosition < 0 ? 0 : pointPosition;
        if (pointPosition === 0) display = '0.' + operandStr;else display = operandStr.substring(0, pointPosition) + '.' + operandStr.substring(pointPosition);
      }
      this.setState({ display: display });
    }
  }, {
    key: 'inputOperand',
    value: function inputOperand(input) {
      if (typeof input === 'number') {
        this.operand = this.operand * 10 + input;
        if (this.precision !== -1) this.precision += 1;
        this.refreshDisplay();
      } else if (input === '.') {
        if (this.precision === -1) {
          this.precision = 0;
          var display = this.state.display;

          display += '.';
          this.setState({ display: display });
        }
      }
    }
  }, {
    key: 'clickPercent',
    value: function clickPercent() {
      if (this.precision === -1) this.precision = 2;else this.precision += 2;
      this.refreshDisplay();
    }
  }, {
    key: 'clickOperator',
    value: function clickOperator(operator) {
      if (this.lastOperand !== null || operator === '=') {
        this.evaluate(operator);
      } else {
        this.lastOperand = this.getOperand(this.operand, this.precision);
        console.log(this.lastOperand);
        this.operator = operator;
        this.operand = 0;
        this.precision = -1;
      }
    }
  }, {
    key: 'getOperand',
    value: function getOperand(operand, precision) {
      if (this.precision !== -1) operand *= Math.pow(10, -precision);
      return operand;
    }
  }, {
    key: 'evaluate',
    value: function evaluate(operator) {
      var operand = this.getOperand(this.operand, this.precision);
      switch (this.operator) {
        case '+':
          this.lastOperand += operand;break;
        case '-':
          this.lastOperand -= operand;break;
        case '×':
          this.lastOperand *= operand;break;
        case '÷':
          this.lastOperand /= operand;break;
      }
      if (operator !== '=') {
        this.operand = 0;
        this.precision = -1;
        this.operator = operator;
      }
      this.setState({ display: this.lastOperand });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'calc-app' },
        React.createElement(
          'div',
          { className: 'calc-container' },
          React.createElement(
            'div',
            { className: 'calc-output' },
            React.createElement(
              'div',
              { className: 'calc-display' },
              this.state.display
            )
          ),
          React.createElement(
            'div',
            { className: 'calc-row' },
            React.createElement(
              CalcButton,
              { onClick: this.resetState.bind(this) },
              'AC'
            ),
            React.createElement(
              CalcButton,
              { onClick: this.showNotImplemented.bind(this) },
              '+/-'
            ),
            React.createElement(
              CalcButton,
              { onClick: this.clickPercent.bind(this) },
              '%'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-operator', onClick: this.clickOperator.bind(this, '÷') },
              '÷'
            )
          ),
          React.createElement(
            'div',
            { className: 'calc-row' },
            React.createElement(
              CalcButton,
              { className: 'calc-number', onClick: this.inputOperand.bind(this, 7) },
              '7'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-number', onClick: this.inputOperand.bind(this, 8) },
              '8'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-number', onClick: this.inputOperand.bind(this, 9) },
              '9'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-operator', onClick: this.clickOperator.bind(this, '×') },
              '×'
            )
          ),
          React.createElement(
            'div',
            { className: 'calc-row' },
            React.createElement(
              CalcButton,
              { className: 'calc-number', onClick: this.inputOperand.bind(this, 4) },
              '4'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-number', onClick: this.inputOperand.bind(this, 5) },
              '5'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-number', onClick: this.inputOperand.bind(this, 6) },
              '6'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-operator', onClick: this.clickOperator.bind(this, '-') },
              '-'
            )
          ),
          React.createElement(
            'div',
            { className: 'calc-row' },
            React.createElement(
              CalcButton,
              { className: 'calc-number', onClick: this.inputOperand.bind(this, 1) },
              '1'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-number', onClick: this.inputOperand.bind(this, 2) },
              '2'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-number', onClick: this.inputOperand.bind(this, 3) },
              '3'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-operator', onClick: this.clickOperator.bind(this, '+') },
              '+'
            )
          ),
          React.createElement(
            'div',
            { className: 'calc-row' },
            React.createElement(
              CalcButton,
              { className: 'calc-zero', onClick: this.inputOperand.bind(this, 0) },
              '0'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-number', onClick: this.inputOperand.bind(this, '.') },
              '.'
            ),
            React.createElement(
              CalcButton,
              { className: 'calc-operator', onClick: this.clickOperator.bind(this, '=') },
              '='
            )
          )
        )
      );
    }
  }]);

  return CalcApp;
}(React.Component);

var CalcButton = function (_React$Component2) {
  _inherits(CalcButton, _React$Component2);

  function CalcButton() {
    _classCallCheck(this, CalcButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CalcButton).apply(this, arguments));
  }

  _createClass(CalcButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var onClick = _props.onClick;

      return React.createElement(
        'div',
        {
          className: 'calc-btn ' + (className ? className : ''),
          onClick: onClick
        },
        children
      );
    }
  }]);

  return CalcButton;
}(React.Component);

CalcButton.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};

CalcButton.defaultProps = {
  onClick: function onClick() {}
};

ReactDOM.render(React.createElement(CalcApp, null), document.getElementById('root'));