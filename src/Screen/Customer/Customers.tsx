import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import strings from '../../Constants/data/Strings';
import colors from '../../Constants/data/Colors';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import EventButton from '../../Components/EventButton';
import {firebase} from '@react-native-firebase/firestore';

const Customers = ({navigation}: any) => {
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 12545457)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const [allCustomer, setAllCustomer]: any = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('AllCustomers')
      .onSnapshot(documentSnapshot => {
        let tempData: any = [];
        documentSnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          data.id = documentSnapshot.id;
          tempData.push(data);
        });
        setAllCustomer(tempData);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.backText}>{strings.Back}</Text>
      </TouchableOpacity>
      <Text style={styles.customersText}>{strings.Customers}</Text>
      <FlatList
        data={allCustomer}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: {item: any}) => {
          return (
            <View style={styles.flatListView}>
              <TouchableOpacity
                style={styles.dataTopac}
                onPress={() =>
                  navigation.navigate('DetailCustomer', {
                    otherParam: item,
                  })
                }>
                <View
                  style={[
                    styles.firstLetter,
                    {backgroundColor: generateColor()},
                  ]}>
                  <Text style={styles.firstLetterText}>
                    {item?.Name?.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={{justifyContent: 'space-evenly'}}>
                  <Text style={styles.customerNameText}>{item?.Name}</Text>
                  <Text style={styles.customerContactNoText}>
                    {item?.PhoneNo}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <EventButton
        // buttonName={strings.plusLogo}
        isLogo={true}
        logoPath={require('../../../assets/Images/plusLogo.png')}
        logoStyle={styles.plusLogo}
        fontSize={70}
        onPressEvent={() => {
          navigation.navigate('AddCustomer', {});
        }}
        bottomSize={20}
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
    color: colors.black,
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
  flatListView: {flex: 1, marginTop: hp(15), position: 'relative'},
  customerNameText: {
    fontWeight: '600',
    fontSize: fontSize(25),
    color: colors.black,
    width: wp(260),
  },
  plusLogo:{
    height:hp(50),
    width:wp(50),
    tintColor:colors.white,
    alignSelf:'center',
    resizeMode:'contain'
  },
  customerContactNoText: {
    fontSize: fontSize(20),
    color: colors.black,
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
