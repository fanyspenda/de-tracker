import React from "react";
import { Picker, Text, StyleSheet } from "react-native";

interface ModifiedPickerProps {
  label: string;
  selectedValue: any;
  onValueChange(itemValue: any, itemIndex: number): void;
  data: Array<any>;
}

class ModifiedPicker extends React.Component<ModifiedPickerProps> {
  render() {
    return (
      <>
        <Text style={{ fontWeight: "bold" }}>{this.props.label}</Text>
        <Picker
          style={style.picker}
          selectedValue={this.props.selectedValue}
          onValueChange={this.props.onValueChange}
        >
          {this.props.data.map((item, index) => (
            <Picker.Item key={`${index}-${item}`} label={item} value={item} />
          ))}
        </Picker>
      </>
    );
  }
}

const style = StyleSheet.create({
  picker: {
    backgroundColor: "#fff",
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10
  }
});

export default ModifiedPicker;
