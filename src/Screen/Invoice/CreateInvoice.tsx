import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../Constants/data/Colors';
import Back from '../../Components/Back';
import strings from '../../Constants/data/Strings';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import EventTopac from '../../Components/EventTopac';
import {ImagePath} from '../../../assets';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/firestore';
import {addInvoice} from '../../Redux/action/invoiceAction';

const CreateInvoice = ({navigation, route}: any) => {
  const {selectedCustomer, amount} = route?.params ?? {route};
  console.log(selectedCustomer, 'selectedCustomerselectedCustomer');
  console.log(amount, 'amountamountamount');

  const user: any = firebase.auth().currentUser;
  console.log(user, 'useruseruser');

  const [currentUser, setCurrentUser]: any = useState();
  const [invoiceCart, setInvoiceCart]: any = useState();
  const [addedProduct, setAddedProduct]: any = useState();
  console.log(addedProduct, 'invoiceCartinvoiceCartinvoiceCart');
  const [allAmount, setAllAmount] = useState(0);
  const [invoiceIndex, setInvoiceIndex] = useState(0);
  console.log(invoiceIndex, 'invoiceIndexinvoiceIndexinvoiceIndex');

  const productsFromStore = useSelector(
    (state: any) => state.products.productList,
  );
  const a = useSelector((state: any) => state);
  console.log(a, 'a is =======');

  const customerData = useSelector((state: any) => state.customer.customerData);
  // console.log(customerData,"customerDatacustomerDatacustomerDatacustomerData");
  // useEffect(() => {
  //   customerData.map((item: any) => {
  //     selectedCustomer == item.id && setCurrentUser(item);
  //     // console.log(item,"123");
  //   });
  // },[route]);

  useEffect(() => {
    customerData.filter((value: any) => {
      console.log(value, 'inside the valuevaluevalue'),
        value.id == selectedCustomer &&
          (console.log(value, 'value insidet '), setCurrentUser(value));
    });

    setAllAmount(amount);
    let a: any = [];
    let allProducts: any = [];
    productsFromStore.filter((item: any) => {
      item?.data?.newStock > 0
        ? (a.push(item?.data?.productName), allProducts.push(item))
        : null;
    });
    console.log(allProducts, 'allProductsallProductsallProducts');

    setInvoiceCart(a);
    setAddedProduct(allProducts);
  }, [route]);

  const currentDate = new Date(2024, 0, 31);
  useEffect(() => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    var lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    currentDate.setDate(Math.min(currentDate.getDate(), lastDayOfMonth));

    setNextMonthDates(currentDate);
    setNextMonthYear(currentDate.getFullYear());

    getInvoiceIndex();
  }, []);

  const dispatch: any = useDispatch();

  const getInvoiceIndex = () => {
    firebase
      .firestore()
      .collection('AllData')
      .doc(user?.uid)
      .collection('Invoice')
      .get()
      .then(querySnapshot => {
        setInvoiceIndex(querySnapshot.size + 1);
      });
  };

  const [nextMonthDates, setNextMonthDates]: any = useState('');

  const [nextMonthYear, setNextMonthYear]: any = useState('');
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [paymentDate, setPaymentDate] = useState<Date>(new Date());
  const [isInvoiceDate, setIsInvoiceDate] = useState(false);
  const [opneDatePicker, setOpneDatePicker] = useState(false);

  const helpAlert = () => {
    Alert.alert(strings.HELP, strings.enterProductDetailHelp, [
      {text: 'OK', onPress: () => console.log('OK pressed')},
    ]);
  };

  const createInvoice = () => {
    firebase
      .firestore()
      .collection('AllData')
      .doc(user?.uid)
      .collection('Invoice')
      .doc()
      .set({
        customer: currentUser,
        product: addedProduct,
        invoiceDate: moment(invoiceDate).format('D,MMMM,YYYY'),
        // invoiceDate:invoiceDate,
        paymentDate: moment(paymentDate).format('D,MMMM,YYYY'),
        // paymentData:paymentDate,
        totalAmount: allAmount,
        invoiceNumber: invoiceIndex,
      });

    dispatch(
      addInvoice({
        customer: currentUser,
        product: addedProduct,
        // invoiceDate:invoiceDate,
        invoiceDate: moment(invoiceDate).format('D, MMMM, YYYY'),
        // paymentData:paymentDate,
        paymentDate: moment(paymentDate).format('D, MMMM, YYYY'),
        totalAmount: allAmount,
        invoiceNumber: invoiceIndex,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <DatePicker
        modal
        minimumDate={invoiceDate}
        open={opneDatePicker}
        date={invoiceDate}
        mode={'date'}
        onConfirm={date => {
          {
            if (isInvoiceDate) {
              setInvoiceDate(date);
              setPaymentDate(date);
              setIsInvoiceDate(false);
            } else {
              setPaymentDate(date);
            }
          }
          setOpneDatePicker(false);
        }}
        onCancel={() => {
          setOpneDatePicker(false);
        }}
      />
      <View style={styles.headerMenu}>
        <Back backwardString={strings.Back} />
        <Back
          backwardString={strings.HELP}
          onPressFunction={() => {
            helpAlert();
          }}
        />
      </View>
      <Text style={styles.headerName}>{strings.CreateInvoice}</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.contain}>
          <View style={styles.flexDirectionRowSpaceBetween}>
            <Text style={styles.mediumTxt}>
              {strings.hashinvoice}
              {invoiceIndex}
            </Text>
            <Text style={styles.mediumTxt}>{strings.Draft}</Text>
          </View>
          <View style={styles.flexDirectionRowSpaceBetween}>
            <Text style={styles.smallTxt}>{strings.Product_name}</Text>
            <Text style={styles.smallTxt}>{strings.PdotOshleshSOnumber}</Text>
          </View>

          <View
            style={[styles.flexDirectionRowSpaceBetween, styles.marginDataTxt]}>
            <Text style={styles.regularTxt}>{strings.Invoicedate}</Text>
            <TouchableOpacity
              onPress={() => {
                setOpneDatePicker(true), setIsInvoiceDate(true);
              }}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.fontSize20}></Text>
                <Text style={styles.fontSize20}>
                  {moment(invoiceDate).format('D, MMMM, YYYY')}
                  
                </Text>
                <Image source={ImagePath.rightIcon} style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalline} />
          <View style={styles.flexDirectionRowSpaceBetween}>
            <Text style={styles.regularTxt}>{strings.PaymentDue}</Text>
            <TouchableOpacity
              onPress={() => {
                setOpneDatePicker(true);
              }}>
              <View style={styles.flexDirectionRow}>
                {/* <Text style={styles.fontSize20}> */}
                {/* {` ${nextMonthDates?.getDate?.() ?? ''}, ${nextMonthDates?.toLocaleString('default', {month: 'long'})}, ${nextMonthYear}`} */}
                {/* {paymentDate==undefined?
                     `${nextMonthDates?.getDate?.() ?? ''}, ${nextMonthDates?.toLocaleString('default', {month: 'long'})}, ${nextMonthDates?.getFullYear?.()}`:
        
                    {/* {paymentDate?.getTime()<invoiceDate.getTime()&&`${invoiceDate?.getDate?.() ?? ''}, ${invoiceDate?.toLocaleString('default', {month: 'long'})}, ${invoiceDate?.getFullYear?.()}`} */}

                {/* {`${paymentDate?.getDate?.() ?? ''}, ${paymentDate?.toLocaleString('default', {month: 'long'})}, ${paymentDate?.getFullYear?.()}`} */}
                {/* </Text> */}

                <Text style={styles.fontSize20}>
                  {moment(paymentDate).format('D, MMMM, YYYY')}
                </Text>

                {/* )} */}
                <Image source={ImagePath.rightIcon} style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.addCustomerBorder}>
            <Text style={[styles.darkTxt, styles.addItemTxt]}>
              {currentUser?.data?.Name
                ? currentUser?.data?.Name
                : strings.AddCustomer}
            </Text>
            <TouchableOpacity
              style={styles.calenderTopac}
              onPress={() =>
                navigation.navigate('Customers', {isInvoice: true})
              }>
              <Image
                source={ImagePath.rightarrow}
                style={styles.calenderArrow}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.addCustomerBorder}>
            {invoiceCart < 1 && (
              <Text style={[styles.darkTxt, styles.addItemTxt]}>
                {strings.AddItem}
              </Text>
            )}
            <Text style={[styles.darkTxt, styles.addItemTxt]}>
              {invoiceCart && invoiceCart.join(', ')}
            </Text>

            <TouchableOpacity
              style={styles.calenderTopac}
              onPress={() => {
                navigation.navigate('Products', {addStocks: true});
              }}>
              <Image
                source={ImagePath.rightarrow}
                style={styles.calenderArrow}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.flexDirectionRowSpaceBetween,
              styles.marginVertical,
            ]}>
            <Text style={[styles.headerName, styles.fontSize30]}>
              {strings.Total}
            </Text>
            <Text style={[styles.headerName, styles.totalAmountNum]}>
              {allAmount}
            </Text>
          </View>
          <View
            style={[styles.flexDirectionRowSpaceBetween, styles.amountDueTxt]}>
            <Text style={styles.fontSize30}>{strings.AmountDue}</Text>
            <Text style={styles.fontSize30}>
              {'\u20B9'} {allAmount}
            </Text>
          </View>
        </View>
      </ScrollView>

      <EventTopac
        bottom={50}
        disable={!allAmount || !currentUser}
        topacTxt={strings.SEND}
        fontStyle={styles.sendTopac}
        onPressEvent={() => {
          createInvoice(), navigation.navigate('Invoices');
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
  headerMenu: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: hp(25),
  },
  scrollView: {
    paddingBottom: hp(50),
  },
  headerName: {
    fontSize: fontSize(50),
    fontWeight: '500',
    marginTop: hp(15),
    color: colors.black,
    marginLeft: wp(20),
  },
  contain: {
    marginHorizontal: wp(25),
  },
  mediumTxt: {
    fontSize: fontSize(30),
    fontWeight: '300',
    marginTop: hp(10),
    color: colors.black,
  },
  rightIcon: {
    height: hp(15),
    width: wp(15),
    resizeMode: 'contain',
  },
  addItemTxt: {
    marginTop: hp(10),
  },
  flexDirectionRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(5),
  },
  totalAmountNum: {
    fontSize: fontSize(30),
    fontWeight: '300',
  },
  horizontalline: {
    borderBottomColor: colors.infoSuggestText,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: hp(10),
  },
  marginDataTxt: {
    marginTop: hp(40),
  },
  addCustomerBorder: {
    borderWidth: 0.3,
    flexDirection: 'row',
    borderColor: colors.infoSuggestText,
    padding: hp(15),
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: hp(25),
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  calenderTopac: {
    backgroundColor: colors.invoiceBackground,
    height: hp(50),
    width: wp(50),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calenderArrow: {
    height: hp(20),
    width: wp(20),
  },
  smallTxt: {
    fontSize: fontSize(20),
    color: colors.infoSuggestText,
  },
  regularTxt: {
    fontSize: fontSize(20),
    color: colors.black,
    marginVertical: hp(5),
  },
  fontSize30: {
    fontSize: fontSize(30),
  },
  fontSize20: {
    fontSize: fontSize(20),
    marginRight: wp(15),
  },
  marginVertical: {
    marginVertical: hp(15),
  },
  darkTxt: {
    fontWeight: '500',
    fontSize: fontSize(25),
  },
  sendTopac: {
    color: colors.white,
    fontSize: fontSize(20),
    fontWeight: '700',
  },
  amountDueTxt: {
    backgroundColor: colors.invoiceBackground,
    padding: hp(20),
    borderRadius: 10,
  },
});

export default CreateInvoice;
