import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import strings from '../../Constants/data/Strings';
import colors from '../../Constants/data/Colors';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import allData from '../../Constants/data';
import EventButton from '../../Components/EventButton';
import { useNavigation } from '@react-navigation/native';
import DetailCustomer from './DetailCustomer';

const Customers = ({navigation: {goBack}}: any) => {
  const {navigate}:any=useNavigation()
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 1254554)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <TouchableOpacity onPress={() => goBack()}>
        <Text style={styles.backText}>{strings.Back}</Text>
      </TouchableOpacity>
      <Text style={styles.customersText}>{strings.Customers}</Text>
      <FlatList
        data={allData.CustomerList}
        renderItem={({item, index}: {item: any; index: number}) => {
          return (
            <View style={{flex: 1, marginTop: hp(15), position: 'relative'}}>
              <TouchableOpacity style={styles.dataTopac} onPress={()=>navigate({DetailCustomer})}>
                <View
                  style={[
                    styles.firstLetter,
                    {backgroundColor: generateColor()},
                  ]}>
                  <Text style={styles.firstLetterText}>
                    {item.customerName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={{justifyContent: 'space-evenly'}}>
                  <Text style={styles.customerNameText}>
                    {item.customerName}
                  </Text>
                  <Text style={styles.customerContactNoText}>
                    {item.mobileNo}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <EventButton
        buttonName={strings.plusLogo}
        fontSize={70}
        navScreenName={'AddCustomer'}
        bottomSize={0}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backText: {
    fontSize: fontSize(30),
    marginLeft: wp(25),
    fontWeight: '500',
  },
  customersText: {
    fontSize: fontSize(50),
    marginLeft: wp(25),
    marginTop: wp(45),
    fontWeight: '500',
  },
  firstLetter: {
    height: hp(65),
    width: wp(65),
    borderRadius: wp(100),
    alignSelf: 'center',
    marginHorizontal: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataTopac: {
    height: hp(90),
    marginHorizontal: wp(5),
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: hp(10),
    flexDirection: 'row',
  },
  firstLetterText: {
    fontSize: fontSize(30),
    fontWeight: '500',
  },
  customerNameText: {
    fontWeight: '600',
    fontSize: fontSize(25),
  },
  customerContactNoText: {
    fontSize: fontSize(20),
  },
  mainConatinerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  nextBtn: {
    height: hp(90),
    width: wp(90),
    backgroundColor: colors.black,
    borderRadius: hp(150),
    marginRight: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: hp(50),
  },
  nextText: {
    color: colors.white,
    fontSize: fontSize(100),
  },
});

export default Customers;
