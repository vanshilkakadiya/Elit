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

const CreateInvoice = ({navigation}:any) => {

  const currentDate = new Date();
  useEffect(() => {
    let nextMonth = currentDate.getMonth() + 1;
    let nextYear = currentDate.getFullYear();
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
    const nextMonthDate = new Date(nextYear, nextMonth, 1);
    setNextMonthDates(nextMonthDate);
    setNextMonthYear(nextMonthDate.getFullYear());
  }, []);
  const [nextMonthDates, setNextMonthDates]: any = useState('');
  const [nextMonthYear, setNextMonthYear]: any = useState('');
    const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const helpAlert = () => {
    Alert.alert(strings.HELP, strings.enterProductDetailHelp, [
      {text: 'OK', onPress: () => console.log('OK pressed')},
    ]);
  };

  return (
    <SafeAreaView style={styles.mainView}>
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
            <Text style={styles.mediumTxt}>{strings.hashinvoicetwel}</Text>
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
            >
              <View style={styles.flexDirectionRow}>
                <Text style={styles.fontSize20}>
                  {[
                    currentDate.getDate(),
                    ', ',
                    currentDate.toLocaleString('default', {month: 'long'}),
                    ', ',
                    currentDate.getFullYear(),
                  ]}
                </Text>
                <Image source={ImagePath.rightIcon} style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalline} />
          <View style={styles.flexDirectionRowSpaceBetween}>
            <Text style={styles.regularTxt}>{strings.PaymentDue}</Text>
            <TouchableOpacity >
              <View style={styles.flexDirectionRow}>
                <Text style={styles.fontSize20}>
                  {[
                    currentDate.getDate(),
                    ', ',
                    nextMonthDates.toLocaleString('default', {month: 'long'}),
                    ', ',
                    nextMonthYear,
                  ]}
                </Text>
                <Image source={ImagePath.rightIcon} style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
          </View>


          <View style={styles.addCustomerBorder}>
            <Text style={[styles.darkTxt, styles.addItemTxt]}>
              {strings.AddCustomer}
            </Text>

            <TouchableOpacity
              style={styles.calenderTopac}
              >
              <Image
                source={ImagePath.rightarrow}
                style={styles.calenderArrow}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.addCustomerBorder}>
            <Text style={[styles.darkTxt, styles.addItemTxt]}>
              {strings.AddItem}
            </Text>
            <TouchableOpacity
              style={styles.calenderTopac}
              >
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
            <Text style={[styles.headerName, styles.totalAmountNum]}>000</Text>
          </View>
          <View
            style={[styles.flexDirectionRowSpaceBetween, styles.amountDueTxt]}>
            <Text style={styles.fontSize30}>{strings.AmountDue}</Text>
            <Text style={styles.fontSize30}>{'\u20B9'} 000</Text>
          </View>
        </View>
      </ScrollView>

      <EventTopac
        bottom={50}
        topacTxt={strings.SEND}
        fontStyle={styles.sendTopac}
        onPressEvent={()=>{navigation.navigate('Invoices')}}
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
    marginRight:wp(15)
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



