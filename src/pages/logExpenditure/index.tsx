import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import axios from "axios";

interface expenditure {
  _id: string;
  name: string;
  price: number;
  date: string;
}

interface LogExpenditureState {
  expenditures: Array<expenditure>;
}

class LogExpenditure extends React.Component<{}, LogExpenditureState> {
  state: LogExpenditureState = {
    expenditures: []
  };

  handleDeletePress = () => {};

  componentDidMount = () => {
    axios
      .get("https://daily-expanditure-backend.herokuapp.com/expenditure")
      .then(res => {
        this.setState({
          expenditures: res.data
        });
      });
  };

  render() {
    return (
      <View>
        {this.state.expenditures.map((expenditure, index) => (
          <View key={`${index}+${expenditure.name}`}>
            <View style={style.item}>
              <Text
                style={{
                  fontWeight: "bold"
                }}
              >
                {expenditure.name}
              </Text>
              <Button
                title={"delete"}
                color="#ff3014"
                onPress={this.handleDeletePress}
              />
            </View>
            <Text>{`\n`}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const style = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: "#d6d6d6",
    padding: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "stretch"
  }
});

export default LogExpenditure;
