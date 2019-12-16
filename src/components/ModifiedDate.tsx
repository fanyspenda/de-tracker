import React from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { View, Text } from "react-native";

interface ModifiedDateState {
  date: Date;
  show: boolean;
}

interface ModifiedDateProps {
  label: String;
  value: Date;
  onChange(event: any, date: any): void;
}

class ModifiedDate extends React.Component<
  ModifiedDateProps,
  ModifiedDateState
> {
  state: ModifiedDateState = {
    date: new Date("2020-06-12T14:42:42"),
    show: false
  };

  render() {
    return (
      <View>
        <Text style={{ fontWeight: "bold" }}>{this.props.label}</Text>
      </View>
    );
  }
}

export default ModifiedDate;
