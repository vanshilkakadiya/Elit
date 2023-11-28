import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import strings from '../../Constants/data/Strings';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import colors from '../../Constants/data/Colors';
import OperationButton from '../../Components/OperationButton';
import {firebase} from '@react-native-firebase/auth';

const DetailCustomer = ({navigation, route}: any) => {
  const {otherParam} = route.params;
  console.log('otherParam', otherParam);

  const deleteUser = () => {
    firebase
      .firestore()
      .collection('AllCustomers')
      .doc(otherParam.id)
      .delete()
      .then(() => {
        navigation.navigate('Customers');
      });
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{strings.Back}</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.userName}>{otherParam?.Name}</Text>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.CustomerName}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{otherParam?.Name}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.PhoneNo}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{otherParam?.PhoneNo}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.Email_Address}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{otherParam?.Email}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.PANNo}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{otherParam?.Pan}</Text>
        </View>
        <Text style={styles.GSTDetailsTxt}>{strings.GSTDetails}</Text>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.GSTNo}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{otherParam?.GstNo}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.GSTState}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{otherParam?.GstState}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.GSTStateCode}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>{otherParam?.GstStateCode}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.BillingAddress}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>
            {otherParam?.Address},{otherParam?.City},{otherParam?.State}
          </Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.dataFont}>{strings.Shipping_Address}</Text>
          <Text style={styles.dotSize}>: </Text>
          <Text style={styles.dataValue}>
            {otherParam?.Address},{otherParam?.City},{otherParam.State}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.eventView}>
        <OperationButton
          eventName={strings.DELETE}
          iconPath={require('../../../assets/Icon/bin.png')}
          onPressEvent={() => {
            deleteUser();
          }}
        />

        <OperationButton
          eventName={strings.EDIT}
          iconPath={require('../../../assets/Icon/pen.png')}
          onPressEvent={() => {
            navigation.navigate('AddCustomer', {
              otherParam: otherParam,
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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 27,
    flexWrap: 'wrap',
    alignSelf: 'center',
    textAlign: 'center',
  },
  backText: {
    fontSize: fontSize(30),
    marginLeft: wp(25),
    fontWeight: '500',
    color: colors.black,
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
  userDataTxt: {
    fontSize: fontSize(20),
    textAlign: 'center',
    flex: 1,
    backgroundColor: 'red',
    marginRight: wp(25),
  },
  GSTDetailsTxt: {
    fontSize: fontSize(25),
    color: colors.infoSuggestText,
    marginTop: hp(25),
    marginLeft: wp(25),
  },
  eventView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp(100),
  },
});

export default DetailCustomer;
