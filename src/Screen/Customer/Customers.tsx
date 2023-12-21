import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import React, {  useState} from 'react';
import strings from '../../Constants/data/Strings';
import colors from '../../Constants/data/Colors';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import Back from '../../Components/Back';
import {useDispatch, useSelector} from 'react-redux';

const Customers = ({navigation}: any) => {  
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 12548431)
    .toString(16)
    .padStart(6, '0');
    return `#${randomColor}`;
  };
  
  const customerAllData = useSelector((state:any) => state.customer.customerData);

  const customerRenderItem = ({item}: any) => {
    return (
      <View style={styles.flatListView}>
        <TouchableOpacity
          style={styles.dataTopac}
          onPress={() =>
            navigation.navigate('DetailCustomer', {
              otherParam: item.id,
            })
          }>
          <View
            style={[styles.firstLetter, {backgroundColor: generateColor()}]}>
            <Text style={styles.firstLetterText}>
              {item?.data?.Name?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={{justifyContent: 'space-evenly'}}>
            <Text style={styles.customerNameText}>{item.data?.Name}</Text>
            <Text style={styles.customerContactNoText}>
              {item.data?.PhoneNo}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Back backwardString={strings.Back} />
      <Text style={styles.customersText}>{strings.Customers}</Text>
      <FlatList
        data={customerAllData}
        showsVerticalScrollIndicator={false}
        // @ts-ignore
        renderItem={customerRenderItem}
      />
      <View style={[styles.topacView, {bottom: 30}]}>
        <TouchableOpacity
          style={styles.topac}
          onPress={() => {
            navigation.navigate('AddCustomer', {});
          }}>
          <Image
            source={require('../../../assets/Images/plusLogo.png')}
            style={styles.plusLogo}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topacView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  topac: {
    height: hp(100),
    width: hp(100),
    borderRadius: 100,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(15),
  },
  customersText: {
    fontSize: fontSize(50),
    marginLeft: wp(25),
    marginTop: wp(45),
    fontWeight: '500',
    color: colors.black,
    marginBottom: hp(25),
  },
  firstLetter: {
    height: hp(65),
    width: wp(65),
    borderRadius: wp(100),
    alignSelf: 'center',
    marginHorizontal: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.black,
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
    color: colors.black,
  },
  flatListView: {
    flex: 1,
    position: 'relative',
  },
  customerNameText: {
    fontWeight: '600',
    fontSize: fontSize(25),
    color: colors.black,
    width: wp(260),
  },
  plusLogo: {
    height: hp(50),
    width: wp(50),
    tintColor: colors.white,
    resizeMode: 'contain',
  },
  customerContactNoText: {
    fontSize: fontSize(20),
    color: colors.black,
  },
});

export default Customers;
