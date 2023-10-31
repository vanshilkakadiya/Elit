import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import indexs from '../../../assets/Svg/index/indexs'
import { fontSize, hp, wp } from '../../Constants/helper/helper'
import strings from '../../Constants/data/Strings'
import { TextInput } from "@react-native-material/core";
import colors from '../../Constants/data/Colors'

const Auth = () => {
      const [showPassword,setShowPassword]=useState(true)
  return (
      <SafeAreaView style={styles.mainView}>
        <View style={styles.appLogoView}>
      <indexs.SVGComponent/>
      <Text style={styles.ELIT_LoginTxt}>{strings.ELIT_Login}</Text>
      </View>
      <TextInput variant='standard' label={strings.Email_Address} style={styles.textInput} color='black' />
      <TextInput variant='standard' label={strings.Password} style={styles.textInput} color='black' secureTextEntry={showPassword} />
      <View style={{flex:1,flexDirection:'column-reverse',marginBottom:hp(50)}}>
        <TouchableOpacity style={styles.nextBtn}>
        <Text style={styles.nextText}>{strings.NEXT}</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:colors.white,
  },
  appLogoView:{
    marginVertical:hp(50)
  },
  ELIT_LoginTxt:{
    fontSize:fontSize(50),
    fontWeight:'500',
    marginLeft:wp(25),
  },
  textInput:{
    marginHorizontal:wp(25),
    backgroundColor:colors.white,
    marginVertical:hp(10)
  },
  nextBtn:{
    height:hp(100),
    width:wp(90),
    backgroundColor:colors.black,
    borderRadius:hp(100),
    alignSelf:'flex-end',
    marginRight:wp(25),
    justifyContent:'center',
    alignItems:'center',
  },
  nextText:{
    color:colors.white,
    fontSize:fontSize(25)
  }
})

export default Auth