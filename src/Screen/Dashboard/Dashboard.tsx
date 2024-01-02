import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import strings from '../../Constants/data/Strings';
import auth from '@react-native-firebase/auth';
import {fontSize, hp, isIos, wp} from '../../Constants/helper/helper';
import colors from '../../Constants/data/Colors';
import allData from '../../Constants/data';
import React, {useEffect, useState} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {addCustomerList} from '../../Redux/action/action';
import {addProductList} from '../../Redux/action/productAction';
import {DATA} from '../../Constants/data/DashboardPackage';
import { addInvoice } from '../../Redux/action/invoiceAction';

const Dashboard = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [productLength, setProductLength]:any = useState();
  const [customerLength, setCustomerLength]:any = useState();
  const user: any = firebase.auth().currentUser;
  const data1 = DATA;

  useEffect(() => {
    customer_data();
    product_data();
    invoice_date()
  }, []);

  const product_data = () => {
    firebase
      .firestore()
      .collection('AllData')
      .doc(user?.uid)
      .collection('Products')
      .onSnapshot(documentSnapshot => {
        const temp = documentSnapshot?.docs?.map(item => {
          return {data: item?.data(), id: item?.id};
        });
        setProductLength(temp?.length);
        dispatch(addProductList(temp));
      });
  };

  const customer_data = () => {
    firebase
      .firestore()
      .collection('AllData')
      .doc(user?.uid)
      .collection('Customers')
      .onSnapshot(documentSnapshot => {
        const temp = documentSnapshot?.docs?.map(item => {
          return {data: item?.data(), id: item?.id};
        });
        setCustomerLength(temp?.length);
        dispatch(addCustomerList(temp));
      });
  };

  const invoice_date = () => {
    firebase
      .firestore()
      .collection('AllData')
      .doc(user?.uid)
      .collection('Invoice')
      .onSnapshot(documentSnapshot => {
        
        const temp = documentSnapshot?.docs?.map(item => {
          return {data: item?.data(), id: item?.id};
        });
        console.log(temp,"temp is = temptemptemptemptemptemp");
        
        // setCustomerLength(temp?.length);
        dispatch(addInvoice(temp));
      });
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace('Auth');
      });
  };

  const logoutAlert = () => {
    Alert.alert('Hold on!', 'Are you sure you want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => logout()},
    ]);
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <TouchableOpacity
        onPress={() => {
          logoutAlert();
        }}>
        <Text style={styles.LogoutText}>{strings.Logout}</Text>
      </TouchableOpacity>
      <Text style={styles.DashBoardText}>{strings.DashBoard}</Text>

      <FlatList
        data={data1}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item, index}: {item: any; index: number}) => {
          console.log(item.nameOfPackage,"item inside the function");
          
          return (
            <View style={styles.flatListMainView}>
              <TouchableOpacity
                style={
                  isIos
                    ? [
                        styles.boxView,
                        styles.shadowOffset,
                        {
                          backgroundColor:
                            allData.PackageColor[
                              index % allData.PackageColor.length
                            ],
                        },
                      ]
                    : [
                        styles.boxView,
                        styles.elevation,
                        {
                          backgroundColor:
                            allData.PackageColor[
                              index % allData.PackageColor.length
                            ],
                        },
                      ]
                }
                onPress={() => {
                  navigation.navigate(
                    item?.nameOfPackage,
                    item?.nameOfPackage == 'Products'
                      ? {addStocks: false}
                      : item?.nameOfPackage == 'Customers'
                      ? {isInvoice: false}:null,
                    
                  );
                }}>
                <Text style={styles.packageNameText}>
                  {item?.nameOfPackage == 'Customers'
                    ? customerLength
                    : item?.nameOfPackage == 'Products'
                    ? productLength
                    : 0}
                </Text>
                <Text style={styles.packageNameText}>{item.nameOfPackage}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  LogoutText: {
    alignSelf: 'flex-end',
    fontSize: fontSize(30),
    fontWeight: '500',
    marginRight: wp(15),
    color: colors.black,
  },
  DashBoardText: {
    fontSize: fontSize(40),
    fontWeight: '500',
    marginLeft: wp(15),
    marginTop: hp(75),
    marginBottom: hp(50),
    color: colors.black,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  flatListMainView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: hp(10),
    flex: 1,
  },
  boxView: {
    height: hp(110),
    width: wp(185),
    borderRadius: 10,
    justifyContent: 'center',
  },
  shadowOffset: {
    shadowColor: colors.black,
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 50,
  },
  packageNameText: {
    fontSize: fontSize(30),
    marginLeft: wp(15),
    color: colors.white,
    fontWeight: '500',
  },
  elevation: {
    elevation: 10,
    shadowColor: colors.black,
  },
});

export default Dashboard;
