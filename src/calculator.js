// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      lastOperand: 0
    };
    this.operand = 0;
    this.precision = -1;
    this.lastOperand = null;
    this.operator = null;
  }

  resetState() {
    this.operand = 0;
    this.precision = -1;
    this.lastOperand = null;
    this.operator = null;
    this.setState({display: 0});
  }

  showNotImplemented() {
      console.warn('This function is not implemented yet.');
    }

  leftpad (str, len, ch) {
    str = String(str);

    var i = -1;

    if (!ch && ch !== 0) ch = ' ';

    len = len - str.length;

    while (++i < len) {
      str = ch + str;
    }

    return str;
  }

  refreshDisplay() {
    let display = this.operand;
    if (this.precision !== -1) {
      let operandStr = this.operand.toString();
      let pointPosition = operandStr.length - this.precision;
      operandStr = this.leftpad(operandStr, this.precision, '0');
      pointPosition = pointPosition < 0 ? 0: pointPosition;
      if (pointPosition === 0)
        display = '0.' + operandStr;
      else
        display = operandStr.substring(0,pointPosition) + '.' + operandStr.substring(pointPosition);
    }
    this.setState({display: display});
  }

  inputOperand(input) {
    if (typeof input === 'number') {
      this.operand = this.operand*10 + input;
      if (this.precision !== -1)
        this.precision += 1;
      this.refreshDisplay()
    }
    else if (input === '.') {
      if (this.precision === -1) {
        this.precision = 0;
        let {display} = this.state;
        display += '.';
        this.setState({display: display});
      }
    }
  }

  clickPercent() {
    if (this.precision === -1)
      this.precision = 2
    else
      this.precision += 2;
    this.refreshDisplay();
  }

  clickOperator(operator) {
    if (this.lastOperand !== null || operator === '=') {
      this.evaluate(operator);
    }
    else {
      this.lastOperand = this.getOperand(this.operand, this.precision)
      console.log(this.lastOperand)
      this.operator = operator;
      this.operand = 0;
      this.precision = -1;
    }
  }

  getOperand(operand, precision) {
    if (this.precision !== -1)
      operand *= Math.pow(10, -precision)
    return operand;
  }

  evaluate(operator) {
    let operand = this.getOperand(this.operand, this.precision);
    switch(this.operator) {
      case '+':
        this.lastOperand += operand; break;
      case '-':
        this.lastOperand -= operand; break;
      case '×':
        this.lastOperand *= operand; break;
      case '÷':
        this.lastOperand /= operand; break;
    }
    if (operator !== '=') {
      this.operand = 0;
      this.precision = -1;
      this.operator = operator;
    }
    this.setState({display: this.lastOperand})
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.display}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.clickPercent.bind(this)}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.clickOperator.bind(this, '÷')}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.inputOperand.bind(this, 7)}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.inputOperand.bind(this, 8)}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.inputOperand.bind(this, 9)}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.clickOperator.bind(this, '×')}>×</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.inputOperand.bind(this, 4)}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.inputOperand.bind(this, 5)}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.inputOperand.bind(this, 6)}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.clickOperator.bind(this, '-')}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.inputOperand.bind(this, 1)}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.inputOperand.bind(this, 2)}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.inputOperand.bind(this, 3)}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.clickOperator.bind(this, '+')}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-zero" onClick={this.inputOperand.bind(this, 0)}>0</CalcButton>
            <CalcButton className="calc-number" onClick={this.inputOperand.bind(this, '.')}>.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.clickOperator.bind(this, '=')}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}


class CalcButton extends React.Component {
  render() {
    const { className, children, onClick } = this.props;
    return (
      <div
        className={'calc-btn ' + (className ? className : '')}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
}

CalcButton.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};

CalcButton.defaultProps = {
  onClick: () => {}
};


ReactDOM.render(<CalcApp />, document.getElementById('root'));
