import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      resultText: '',
      calculationText: '',
    };
    this.operations = ['DEL', '+', '-', '*', '/'];
  }
  calculateResult() {
    const text = this.state.resultText;
    this.setState({
      calculationText: eval(text),
    });
  }
  buttonPressed(text) {
    console.log(text);
    if (text == '=') {
      return this.validate() && this.calculateResult();
    }
    this.setState({
      resultText: this.state.resultText + text,
    });
  }

  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  }
  operate(operations) {
    switch (operations) {
      case 'DEL': {
        if (this.state.resultText == '') return;
        let text = this.state.resultText.split('');
        text.pop();
        this.setState({
          resultText: text.join(''),
        });
        break;
      }
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop();

        if (this.operations.indexOf(lastChar) > 0) return;
        if (this.state.resultText == '') return;
        this.setState({
          resultText: this.state.resultText + operations,
        });
    }
  }
  render() {
    let rows = [];
    let nums = [[7, 8, 9],[4, 5, 6],[1, 2, 3], ['.', 0, '=']];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity key={nums[i][j]}
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.btn}>
            <Text style={styles.btntext}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(<View style={styles.row}>{row}</View>);
    }

    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity key={this.operations[i]}
          onPress={() => this.operate(this.operations[i])}
          style={styles.btn}>
          <Text style={[styles.btntext, styles.white]}>
            {this.operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btntext: {
    fontSize: 30,
    color:'white',
  },
  white: {
    color: 'white',
  },
  resultText: {
    fontSize: 30,
    color: 'black',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  calculationText: {
    fontSize: 24,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flex: 7,
  },

  numbers: {
    flex: 3,
    backgroundColor: '#434343',
    
  },
  operations: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around',
  },
});
