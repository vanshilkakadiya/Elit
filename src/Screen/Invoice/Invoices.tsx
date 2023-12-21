import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import EventButton from '../../Components/EventButton'
import strings from '../../Constants/data/Strings'
import Back from '../../Components/Back'

const Invoices = () => {
//     buttonName,
//   fontSize,
//   navScreenName,
//   bottomSize,
//   onPressEvent,
//   disabled,
//   isLogo,
//   logoPath,
//   logoStyle
  return (
    <SafeAreaView style={{flex:1}}>
        {/* <EventButton buttonName={strings.MENU} /> */}
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>

        <Back backwardString={strings.MENU} />
        <Back backwardString={strings.HELP} />
        </View>
      <Text>Invoices</Text>
      <Text>Invoices</Text>
      <Text>Invoices</Text>
    </SafeAreaView>
  )
}

export default Invoices