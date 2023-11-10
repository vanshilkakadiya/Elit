import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../Constants/helper/helper';
import colors from '../Constants/data/Colors';

const CustomCheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <TouchableOpacity
      style={styles.mainView}
      onPress={() => {
        setIsChecked(!isChecked);
      }}>
      {isChecked ? (
        <Image
          source={require('../../assets/Images/checkmark.png')}
          style={styles.checkMarkImg}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: hp(20),
    width: wp(20),
    borderWidth: 1,
    borderColor: colors.infoSuggestText,
    borderRadius: 5,
  },
  checkMarkImg: {
    height: hp(15),
    width: wp(18),
  },
});

export default CustomCheckBox;
