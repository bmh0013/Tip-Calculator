import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [total, onChangeTotal] = React.useState(null);
  const [tip, onChangeTip] = React.useState(.20);
  const [customTip, onChangeCustomTip] = React.useState(null);

  const TipButton = ({ percent, total, tip }) => {
    let result = total * percent;
    result = Math.round(result * 100) / 100;
    return (
      <TouchableOpacity
      style={percent === tip ? styles.active : styles.button}
      onPress={() => {onChangeTip(percent)}}
      >
        <Text>{percent * 100}%</Text>
        <Text>${result}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>How much was the bill?</Text>
        <TextInput
          style={styles.input}
          value={total}
          keyboardType="decimal-pad"
          onChangeText={onChangeTotal}
        />
        <Text>Enter Custom Tip</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(text) => onChangeCustomTip(text)}
        />
      </View>
      <View style={styles.tipContainer}>
        <TipButton percent={0.1} total={total} tip={tip} onPress={() => onChangeTip(tip)} />
        <TipButton percent={0.15} total={total} tip={tip} onPress={() => onChangeTip(tip)} />
        <TipButton percent={0.2} total={total} tip={tip} onPress={() => onChangeTip(tip)} />
      </View>
      <View style={styles.resultContainer}>
        <Text>Grand Total: ${!customTip ? +total + (+total * +tip) : +total + (+total * (+customTip * .01) )}</Text>
      </View>
      {tip === 'custom' && Text}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 5,
  },
  resultContainer: {
    justifyContent: "center",
  },
  active: {
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 10,
    margin: 5,
  }
});
