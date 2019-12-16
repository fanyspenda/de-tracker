import React from "react";
import { View, Button, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios, { AxiosResponse } from "axios";

import ModifiedInput from "../../components/ModifiedInput";
import ModifiedPicker from "../../components/ModifiedPicker";

interface expenditureState {
  name: string;
  categories: Array<string>;
  selectedCategory: string;
  price: number;
  date: string;
  visibleDate: boolean;
}

class InputExpenditure extends React.Component<{}, expenditureState> {
  state: expenditureState = {
    name: "",
    categories: [
      "Makanan & Minuman",
      "Transportasi",
      "Kesehatan",
      "Alat Rumah Tangga",
      "Hiburan"
    ],
    price: 0,
    selectedCategory: "",
    date: `${new Date().getDate()} - ${new Date().getMonth() +
      1} - ${new Date().getFullYear()}`,
    visibleDate: false
  };

  handleChangeName = value => {
    this.setState({
      name: value
    });
  };

  handleChangeSelectedCategory = (itemValue: any, itemIndex: number) => {
    this.setState({
      selectedCategory: itemValue
    });
  };

  handleChangePrice = value => {
    this.setState({
      price: value
    });
  };

  handleButtonDate = () => {
    this.setState({
      visibleDate: true
    });
  };

  handleDateConfirm = (selectedDate: Date) => {
    let stringDate = `${selectedDate.getDate()} - ${selectedDate.getMonth() +
      1} - ${selectedDate.getFullYear()}`;
    this.setState({
      date: stringDate
    });
    this.handleDateCancel();
  };

  handleDateCancel = () => {
    this.setState({
      visibleDate: false
    });
  };

  handleSubmitButton = () => {
    const { name, price, date } = this.state;
    axios
      .post("https://daily-expanditure-backend.herokuapp.com/expenditure", {
        name,
        price,
        date
      })
      .catch(err => {
        alert(err.toString());
      })
      .then((res: AxiosResponse) => {
        if (res.status == 200) {
          alert(`${res.status}: berhasil mengirim data`);
        }
      });
  };

  componentDidMount = () => {
    //memberi nilai default saat pertama kali load halaman
    this.setState({
      selectedCategory: this.state.categories[0]
    });
  };

  render() {
    const {
      name,
      categories,
      selectedCategory,
      price,
      date,
      visibleDate
    } = this.state;

    return (
      <View>
        <ModifiedInput
          label="Nama Pengeluaran"
          onChangeText={value => this.handleChangeName(value)}
          value={name}
        />

        <ModifiedPicker
          label="Kategori"
          onValueChange={(itemValue, itemIndex) =>
            this.handleChangeSelectedCategory(itemValue, itemIndex)
          }
          selectedValue={selectedCategory}
          data={categories}
        />

        <ModifiedInput
          label="Harga"
          onChangeText={value => this.handleChangePrice(value)}
          keyboardType="numeric"
          value={price.toString()}
        />
        <Text style={{ fontWeight: "bold" }}>{`Tanggal`}</Text>
        <Button onPress={this.handleButtonDate} title={date.toString()} />
        <DateTimePicker
          isVisible={visibleDate}
          onConfirm={this.handleDateConfirm}
          onCancel={this.handleDateCancel}
          mode={`date`}
        />
        <Text>{`\n \n \n`}</Text>
        <Button
          color={`#00d427`}
          onPress={this.handleSubmitButton}
          title={`Simpan Data`}
        />
      </View>
    );
  }
}

export default InputExpenditure;
