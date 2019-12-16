import React from "react";
import {
  Text,
  TextInput,
  KeyboardTypeOptions,
  View,
  StyleSheet
} from "react-native";

interface ModifiedInputProps {
  label: string;
  value: any;
  onChangeText(value: any): void;
  keyboardType?: KeyboardTypeOptions;
}

class ModifiedInput extends React.Component<ModifiedInputProps> {
  render() {
    return (
      <View style={style.container}>
        <Text style={{ fontWeight: "bold" }}>{this.props.label}</Text>
        <TextInput
          style={style.input}
          keyboardType={this.props.keyboardType}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 15
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 5,
    backgroundColor: "#fff"
  }
});

export default ModifiedInput;
