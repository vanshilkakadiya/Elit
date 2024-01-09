import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Back from '../../Components/Back';
import strings from '../../Constants/data/Strings';
import colors from '../../Constants/data/Colors';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import Events from '../../Components/Events';
import {firebase} from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {ImagePath} from '../../../assets';
import EventTopac from '../../Components/EventTopac';

const Products = ({navigation, route}: any) => {
  const user = firebase.auth().currentUser;

  const {addStocks} = route?.params ?? {route};
  const [allProducts, setAllProducts]: any = useState([]);
  const [allAmount, setAllAmount]: any = useState();
  const [newData, setNewData]: any = useState([]);
  
  useEffect(() => {
    getData();
    clearAllNewStock();
  }, []);

  const getData = () => {
    firebase
      .firestore()
      .collection('AllData')
      .doc(user?.uid)
      .collection('Products')
      .onSnapshot(documentSnapshot => {
        setAllProducts(documentSnapshot.docs);
      });
  };

  const onQuantityPress = (id: string, count: number) => {
    firebase
      .firestore()
      .collection('AllData')
      .doc(user?.uid)
      .collection('Products')
      .doc(id)
      .update({
        newStock: firebase.firestore.FieldValue
          ? firebase.firestore.FieldValue.increment(count)
          : firebase.firestore.FieldValue,
      })
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  };

  const productsFromStore = useSelector(
    (state: any) => state.products.productList,
  );

  const checkNewId = (item: any, typeOfOpration: any) => {
    const temp: any = [];
    allProducts.map((value: any) => {
      value._data.id == item.data.id
        ? typeOfOpration == 'plus'
          ? temp.push((value?._data?.newStock + 1) * value?._data?.price)
          : temp.push((value?._data?.newStock - 1) * value?._data?.price)
        : temp.push(value?._data?.newStock * value?._data?.price);
    });
    let sum = 0;
    for (let i = 0; i < temp.length; i++) {
      sum += temp[i];
    }
    setAllAmount(sum);
  };

  const clearAllNewStock = () => {
    productsFromStore.map((item: any) => {
      firebase
        .firestore()
        .collection('AllData')
        .doc(user?.uid)
        .collection('Products')
        .doc(item?.id)
        .update({
          newStock: 0,
        });
    });
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <Back backwardString={strings.Back} />
      <Text style={styles.ProductTxt}>{strings.Products}</Text>
      {addStocks && (
        <View style={styles.totalView}>
          <Text style={styles.totalTxt}>{strings.Total}</Text>
          <Text style={styles.totalNumber}>{allAmount}</Text>
        </View>
      )}

      <FlatList
        data={productsFromStore}
        renderItem={({item}) => {
          return (
            <View style={styles.mainView}>
              <TouchableOpacity
                style={styles.dataBox}
                disabled={addStocks ? true : false}
                onPress={() => {
                  {
                    navigation.navigate('ProductDetails', {
                      otherParam: item.id,
                    });
                  }
                }}>
                <Image
                  source={{uri: item?.data?.imageUrl}}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>
                  {item?.data?.productName}
                </Text>
                {addStocks && (
                  <View style={styles.plusMinusView}>
                    {item?.data?.newStock > 0 && (
                      <TouchableOpacity
                        style={styles.plusMinusMarginRight}
                        disabled={item?.data?.newStock < 1}
                        onPress={() => {
                          onQuantityPress(item?.id, -1);
                          checkNewId(item, 'minus');
                        }}>
                        <Text style={styles.stockTextLogo}>
                          {strings.minusLogo}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <Text
                      style={
                        styles.stockText
                      }>{`${item?.data?.newStock}`}</Text>

                    <TouchableOpacity
                      style={styles.plusMinusMarginRight}
                      onPress={() => {
                        newData.push(item);
                        checkNewId(item, 'plus');
                        onQuantityPress(item?.id, 1);
                      }}>
                      <Text style={styles.stockTextLogo}>
                        {strings.plusLogo}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View>
        {addStocks ? (
          <EventTopac
            topacTxt={strings.DONE}
            bottom={50}
            fontStyle={styles.submitTxt}
            // disable={!isValidDataCheck()}
            onPressEvent={() => {
              {
                clearAllNewStock(),
                  navigation.navigate('CreateInvoice', {amount: allAmount});
              }
            }}
          />
        ) : (
          <View style={styles.appProductView}>
            <Events
              eventText={strings.Add_Product}
              logoPath={ImagePath.addProduct}
              onPressEvent={() => {
                navigation.navigate('AddProduct', {detail: undefined});
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  ProductTxt: {
    fontSize: fontSize(50),
    marginTop: hp(50),
    marginLeft: wp(25),
    marginBottom: hp(25),
    fontWeight: '500',
    color: colors.black,
  },
  dataBox: {
    height: hp(90),
    borderWidth: 1,
    marginHorizontal: wp(5),
    borderRadius: hp(10),
    borderColor: colors.borderColor,
    flexDirection: 'row',
  },

  plusMinusView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  productName: {
    fontSize: fontSize(25),
    alignSelf: 'center',
    marginLeft: wp(10),
    color: colors.black,
  },
  productImage: {
    height: hp(50),
    width: wp(50),
    alignSelf: 'center',
    marginHorizontal: wp(5),
  },
  plusMinusMarginRight: {
    marginRight: wp(20),
  },
  totalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(10),
    marginBottom: hp(25),
  },
  totalTxt: {
    fontSize: fontSize(25),
    fontWeight: '500',
    color: colors.black,
  },
  appProductView: {
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalNumber: {
    fontSize: fontSize(25),
    color: colors.black,
  },
  stockText: {
    fontSize: fontSize(30),
    color: colors.black,
    fontWeight: '300',
    marginRight: wp(20),
  },
  stockTextLogo: {
    fontSize: fontSize(50),
    color: colors.black,
    fontWeight: '200',
  },
  submitTxt: {
    fontSize: fontSize(15),
    color: colors.white,
    fontWeight: '600',
  },
});

export default Products;
