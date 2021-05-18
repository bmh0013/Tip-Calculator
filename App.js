import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Keyboard,
  Image,
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
  const [customTip, onChangeCustomTip] = React.useState(null);

  let tipAmount = total * (tip * 0.01);
  let grandTotal = total + tipAmount;

  const TipButton = ({ percent }) => {
    let result = total * percent;
    result = Math.round(result * 100) / 100;
    return (
      <TouchableOpacity
        style={percent === tip ? styles.active : styles.button}
        onPress={() => {
          onChangeTip(percent);
        }}
      >
        <Text style={{ fontSize: 17 }}>{percent}%</Text>
      </TouchableOpacity>
    );
  };

  const CustomTipButton = ({ percent }) => {
    const inputRef = React.useRef();

    return (
      <>
        <TextInput
          style={styles.hidden}
          ref={inputRef}
          keyboardType="decimal-pad"
          onEndEditing={(e) => {
            onChangeCustomTip(+e.nativeEvent.text);
            onChangeTip(+e.nativeEvent.text);
          }}
        />
        <TouchableOpacity
          style={customTip === tip ? styles.active : styles.button}
          onPress={() => inputRef.current.focus()}
        >
          <Text style={{ fontSize: 12 }}>Custom</Text>
          <Text style={{ fontSize: 12 }}>{customTip}%</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <LinearGradient colors={["#096d82", "#103f60"]} style={styles.background}>
        <View style={styles.icon_container}>
          <Image
            style={{ width: 50, height: 50, marginRight: 20 }}
            source={require("./assets/CalculatorIcon.jpeg")}
          />
          <Text style={{ fontSize: 22, color: "white" }}>Tip Calculator</Text>
        </View>
        <View style={{ height: 600 }}>
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
                    placeholderTextColor="#cecece"
                    onChangeText={(text) => onChangeTotal(+text)}
                  />
                </View>
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={styles.text}>Tip Amount</Text>
                <Text style={styles.dollar}>$ {tipAmount.toFixed(2)}</Text>
              </View>

              <View style={styles.tipContainer}>
                <TipButton percent={10} />
                <TipButton percent={15} />
                <TipButton percent={20} />
                <CustomTipButton />
              </View>

              <View style={styles.resultContainer}>
                <Text style={styles.text}>
                  Grand Total: ${grandTotal.toFixed(2)}
                </Text>
              </View>

              <StatusBar style="auto" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  active: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 45,
    backgroundColor: "#1ACB40",
    padding: 10,
    margin: 7,
    borderRadius: 7,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  billAmount: {
    width: 300,
    justifyContent: "center",
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 45,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 7,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  containers: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  dollar: {
    color: "white",
    marginTop: 20,
    fontSize: 20,
    marginLeft: 42,
  },
  hidden: {
    display: "none",
  },
  icon_container: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginTop: 50,
    flexDirection: "row",
  },
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    fontSize: 20,
    color: "white",
    borderColor: "transparent",
  },
  resultContainer: {
    justifyContent: "center",
  },
  tipAmount: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 10,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    color: "white",
  },
});
