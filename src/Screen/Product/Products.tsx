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
import EventButton from '../../Components/EventButton';

const Item = ({title, imagePath}: any) => (
  <View style={styles.flatListMainView}>
    <TouchableOpacity style={styles.dataBox}>
      <Image source={imagePath} style={styles.productImage} />
      <Text style={styles.productName}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const Products = ({navigation, route}: any) => {
  const {addStocks, productDetailParam} = route?.params;
  console.log(addStocks,"addStocksaddStocksaddStocks",productDetailParam,"productDetailParamproductDetailParamproductDetailParam");
  

  const Products = useSelector((state: any) => state);
  const [allProducts, setAllProducts]: any = useState();
  const [allAmount, setAllAmount] = useState(0);
  
  console.log(allAmount);

  const [newData, setNewData]: any = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    firebase
      .firestore()
      .collection('AllProducts')
      .onSnapshot(documentSnapshot => {
        setAllProducts(documentSnapshot.docs);
      });
  };

  const onQuantityPress = (id: string, count: number) => {
    firebase
      .firestore()
      .collection('AllProducts')
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
  console.log(productsFromStore, 'after updating');

  

  const checkNewId = (item: any, typeOfOpration: any) => {
    console.log(typeOfOpration);
    const temp: any = [];
    allProducts.map((value: any) => {
      value._data.id == item._data.id
        ? // typeOfOpration=="plus"&&(console.log("yes",(value?._data?.newStock + 1) * value?._data?.price),temp.push((value?._data?.newStock + 1) * value?._data?.price)):(console.log((value?._data?.newStock ) * value?._data?.price),temp.push((value?._data?.newStock ) * value?._data?.price));
          typeOfOpration == 'plus'
          ? (console.log(
              'yes',
              (value?._data?.newStock + 1) * value?._data?.price,
            ),
            temp.push((value?._data?.newStock + 1) * value?._data?.price))
          : (console.log(
              'yes',
              (value?._data?.newStock - 1) * value?._data?.price,
            ),
            temp.push((value?._data?.newStock - 1) * value?._data?.price))
        : (console.log(value?._data?.newStock * value?._data?.price),
          temp.push(value?._data?.newStock * value?._data?.price));
    });
    let sum = 0;
    for (let i = 0; i < temp.length; i++) {
      sum += temp[i];
    }
    setAllAmount(sum);
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
        renderItem={({item, index}) => {
          // console.log(item,"inside the flatist");
          
          return (
            <View style={styles.flatListMainView}>
              <TouchableOpacity
                style={styles.dataBox}
                disabled={addStocks? true : false}
                onPress={() => {
                  navigation.navigate('ProductDetails', {
                    otherParam: item.id,
                  });
                }}>
                <Image
                  source={{uri: item?.data?.imageUrl}}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>
                  {item?.data?.productName}
                </Text>
                {addStocks && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <TouchableOpacity
                      style={{marginRight: wp(20)}}
                      disabled={item?._data?.newStock < 1}
                      onPress={() => {
                        onQuantityPress(item?.id, -1);
                        checkNewId(item, 'minus');
                      }}>
                      <Text style={styles.stockTextLogo}>
                        {strings.minusLogo}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={
                        styles.stockText
                      }>{`${item?.data?.newStock}`}</Text>

                    <TouchableOpacity
                      style={{marginRight: wp(20)}}
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


      {/* <FlatList
        data={allProducts}
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatListMainView}>
              <TouchableOpacity
                style={styles.dataBox}
                disabled={productDetailParam?._data ? true : false}
                onPress={() => {
                  navigation.navigate('ProductDetails', {
                    otherParam: item,
                  });
                }}>
                <Image
                  source={{uri: item?._data?.imageUrl}}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>
                  {item?._data?.productName}
                </Text>
                {addStocks && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <TouchableOpacity
                      style={{marginRight: wp(20)}}
                      disabled={item?._data?.newStock < 1}
                      onPress={() => {
                        onQuantityPress(item?.id, -1);
                        checkNewId(item, 'minus');
                      }}>
                      <Text style={styles.stockTextLogo}>
                        {strings.minusLogo}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={
                        styles.stockText
                      }>{`${item?._data?.newStock}`}</Text>

                    <TouchableOpacity
                      style={{marginRight: wp(20)}}
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
      /> */}

      <View>
        {addStocks ? (
          <EventButton
            buttonName={strings.DONE}
            fontSize={15}
            bottomSize={10}
            onPressEvent={() => {
              navigation.navigate('CreateInvoice'), setAllAmount(0);
            }}
          />
        ) : (
          <View
            style={{
              bottom: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Events
              eventText={strings.Add_Product}
              logoPath={require('../../../assets/Images/addproduct.png')}
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
  flatListMainView: {
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
});

export default Products;
