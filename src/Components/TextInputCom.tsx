import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {TextInput} from 'react-native-paper';
import { fontSize, hp, wp } from '../Constants/helper/helper';

const TextInputCom = ({label,value,onchangeText,keyboardType,editable}:any) => {
  return (
    <View>
      <TextInput
            style={styles.inputStyle}
            label={label}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={value}
            onChangeText={onchangeText}
            keyboardType={keyboardType} 
            editable={editable}
            />
    </View>
  )
}

const styles=StyleSheet.create({
    inputStyle: {
        height: hp(55),
        marginTop: hp(30),
        marginRight: wp(25),
        backgroundColor: 'white',
        fontSize: fontSize(20),
      },
})

export default TextInputCom