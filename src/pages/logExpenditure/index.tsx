import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  RefreshControl,
  ScrollView
} from "react-native";
import axios from "axios";

interface expenditure {
  _id: string;
  name: string;
  price: number;
  date: string;
}

interface LogExpenditureState {
  expenditures: Array<expenditure>;
  isRefreshing: boolean;
}

class LogExpenditure extends React.Component<{}, LogExpenditureState> {
  state: LogExpenditureState = {
    expenditures: [],
    isRefreshing: true
  };

  handleDeletePress = (id: string) => {
    axios
      .delete(
        `https://daily-expanditure-backend.herokuapp.com/expenditure/${id}`
      )
      .catch(err => {
        alert(err);
        this.setState(
          {
            isRefreshing: true
          },
          this.getData
        );
      })
      .then(() => {
        alert("data berhasil dihapus!");
        this.setState(
          {
            isRefreshing: true
          },
          this.getData
        );
      });
  };

  getData = () => {
    axios
      .get("https://daily-expanditure-backend.herokuapp.com/expenditure")
      .then(res => {
        this.setState(
          {
            expenditures: res.data,
            isRefreshing: false
          },
          () => {
            let expendituresCopy = this.state.expenditures;

            //mengurutkan berdasarkan tahun
            expendituresCopy.sort((a: expenditure, b: expenditure) => {
              let exA = a.date.split("-");
              let exB = b.date.split("-");
              return parseInt(exA[1]) - parseInt(exB[1]);
            });

            this.setState({
              expenditures: expendituresCopy
            });
          }
        );
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={this.getData}
            refreshing={this.state.isRefreshing}
          />
        }
      >
        {this.state.expenditures.map((expenditure, index) => (
          <View key={`${index}+${expenditure.name}`}>
            {/* mengidentifikasi apakah tanggal sama dengan expenditure sebelumnya.
            jika iya, maka tidak perlu mengeluarkan header baru. */}
            {index === 0 ? (
              <View>
                <Text
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  {expenditure.date}
                </Text>
              </View>
            ) : expenditure.date !== this.state.expenditures[index - 1].date ? (
              <>
                <Text>{`\n`}</Text>
                <Text
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  {expenditure.date}
                </Text>
              </>
            ) : null}

            <View>
              <View style={style.item}>
                <Text>{expenditure.name}</Text>
                <Button
                  title={"delete"}
                  color="#ff3014"
                  onPress={() => this.handleDeletePress(expenditure._id)}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: "#d6d6d6",
    paddingBottom: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "stretch"
  }
});

export default LogExpenditure;
