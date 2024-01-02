import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import strings from '../../Constants/data/Strings';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import colors from '../../Constants/data/Colors';
import {firebase} from '@react-native-firebase/auth';
import Back from '../../Components/Back';
import Events from '../../Components/Events';
import {useDispatch, useSelector} from 'react-redux';
import { ImagePath } from '../../../assets';
// import { deleteCustomerList } from '../../Redux/action/action';

const DetailCustomer = ({navigation, route}: any) => {
  // @ts-ignore
  const customerData = useSelector(state => state.customer.customerData);
  const [selectedUser, setSelectedUser]: any = useState([]);
  const currentSelectUser = selectedUser?.data;

  const user: any = firebase.auth().currentUser;

  const dispatch: any = useDispatch();

  const {otherParam} = route.params;
  console.log(otherParam, 'otherParamotherParamotherParam');

  useEffect(() => {
    customerData.filter(
      (value: any) =>
        value.id == otherParam &&
        (console.log(value, 'value insidet '), setSelectedUser(value)),
    );
  }, [route]);

  const deleteUser = () => {
    firebase
      .firestore()
      .collection('AllData')
      .doc(user.uid)
      .collection('Customers')
      .doc(otherParam)
      .delete()
      .then(() => {
        navigation.navigate('Customers');
      })
      .catch(err => {
        console.log('erororororororororor', err);
      });
    // dispatch(deleteCustomerList(otherParam))
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <Back backwardString={strings.Back} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.userName}>{currentSelectUser?.Name}</Text>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.CustomerName}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{currentSelectUser?.Name}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.PhoneNo}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{currentSelectUser?.PhoneNo}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.Email_Address}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{currentSelectUser?.Email}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.PANNo}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{currentSelectUser?.Pan}</Text>
        </View>
        <Text style={styles.GSTDetailsTxt}>{strings.GSTDetails}</Text>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.GSTNo}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{currentSelectUser?.GstNo}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.GSTState}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{currentSelectUser?.GstState}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.GSTStateCode}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>
            {currentSelectUser?.GstStateCode}
          </Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.BillingAddress}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>
            {currentSelectUser?.Address},{currentSelectUser?.City},
            {currentSelectUser?.State}
          </Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.Shipping_Address}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>
            {currentSelectUser?.ShippingAddress},
            {currentSelectUser?.ShippingCity},{currentSelectUser?.ShippingState}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.eventView}>
        <Events
          eventText={strings.DELETE}
          logoPath={ImagePath.bin}
          onPressEvent={() => {
            deleteUser();
          }}
        />
        <Events
          eventText={strings.EDIT}
          logoPath={ImagePath.pen}
          onPressEvent={() => {
            navigation.navigate('AddCustomer', {
              otherParam: currentSelectUser,
              id: otherParam,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  dotSize: {
    fontSize: fontSize(20),
    color: colors.black,
  },
  userName: {
    fontSize: fontSize(40),
    alignSelf: 'center',
    marginTop: hp(75),
    fontWeight: '500',
    color: colors.black,
    marginHorizontal: wp(75),
    textAlign: 'center',
  },
  customerDetail: {
    flexDirection: 'row',
    marginTop: hp(30),
    marginLeft: wp(30),
    marginRight: wp(150),
  },
  dataFont: {
    fontSize: fontSize(20),
    width: wp(150),
    color: colors.black,
  },
  dataValue: {
    textAlign: 'center',
    marginRight: wp(25),
    fontSize: fontSize(20),
    color: colors.black,
  },
  GSTDetailsTxt: {
    fontSize: fontSize(25),
    color: colors.infoSuggestText,
    marginTop: hp(25),
    marginLeft: wp(25),
  },
  eventView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: hp(15),
  },
});

export default DetailCustomer;
