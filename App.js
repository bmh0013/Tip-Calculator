import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [total, onChangeTotal] = React.useState(null);
  const [tip, onChangeTip] = React.useState(null);

  let tipAmount = total * (tip * .01);
  let grandTotal = total + tipAmount;

  const TipButton = ({ percent, isCustom = false }) => {
    let result = total * percent;
    result = Math.round(result * 100) / 100;
    return (
      <TouchableOpacity
        style={percent === tip ? styles.active : styles.button}
        onPress={() => {
          onChangeTip(percent);
        }}
      >
        {!isCustom ? <Text style={{fontSize: 17}}>{percent}%</Text> : <Text style={{fontSize: 14}}>Custom %</Text>}
      </TouchableOpacity>
    );
  };

  const CustomTipButton = ({ percent, isCustom = false }) => {
    let result = total * percent;
    result = Math.round(result * 100) / 100;
    return (
      <TouchableOpacity
        style={percent === tip ? styles.active : styles.button}
        onPress={() => {
          onChangeTip(percent);
        }}
      >
        {!isCustom ? <Text style={{fontSize: 17}}>{percent}%</Text> : <Text style={{fontSize: 14}}>Custom %</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <LinearGradient
        colors={['#096d82', '#103f60']}
        style={styles.background}
      >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.containers}>
            <Text style={styles.text}>Bill Amount</Text>
            <View style={styles.billAmount}>
              <Text style={styles.dollar}>$</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor = "#cecece"
                onChangeText={(text) => onChangeTotal(+text)}
              />
            </View>
            <Text style={styles.text}>Tip Amount</Text>
            <Text style={styles.text}>$ { tipAmount.toFixed(2) }</Text>
          </View>
          <View style={styles.tipContainer}>
            <TipButton percent={10} />
            <TipButton percent={15} />
            <TipButton percent={20} />
            <TipButton/>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.text}>Grand Total: ${grandTotal.toFixed(2)}</Text>
          </View>
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containers: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  text: {
    fontSize: 25,
    color: 'white',
  },
  billAmount: {
    width: 300,
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginBottom: 30,

  },
  dollar: {
    color: 'white',
    marginTop: 20,
    fontSize: 20,
    marginLeft: 42,
  },
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    fontSize: 20,
    color: 'white',
    borderColor: 'transparent',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 45,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 7,
    borderRadius: 7,
  },
  resultContainer: {
    justifyContent: "center",
  },
  active: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 45,
    backgroundColor: "#1ACB40",
    padding: 10,
    margin: 7,
    borderRadius: 7,
  },
});
