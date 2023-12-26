import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Back from '../../Components/Back';
import strings from '../../Constants/data/Strings';
import colors from '../../Constants/data/Colors';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import Events from '../../Components/Events';
import { useSelector } from 'react-redux';
import { ImagePath } from '../../../assets';

const ProductDetails = ({route,navigation}: any) => {
  const {otherParam} = route.params;  
  console.log(otherParam,"otherParamotherParamotherParamotherParam");
  
    
  const [selectedProduct,setSelectedProduct]:any=useState([])
  const currentProduct=selectedProduct?.data
  // console.log("otherParams",selectedProduct);
  

  const editData=()=>{    
    navigation.navigate('AddProduct',{detail:selectedProduct})
  }
  const addStock=()=>{
    navigation.navigate('Products',{addStocks:true,productDetailParam:otherParam})
  }

  const  currentProducts  = useSelector((state:any) => state);
  useEffect(()=>{
   currentProducts?.products?.productList.filter((val:any)=>{
      val.id==otherParam&&
      setSelectedProduct(val)
    })
  },[route])
  
  return (
    <SafeAreaView style={styles.mainView}>
      <Back backwardString={strings.Back} />
      <View style={styles.flexOne}>
        <View style={styles.imageDetails}>
          <Text style={styles.productNameHeading}>
            {/* {otherParam?._data?.productName} */}
            {currentProduct?.productName}
          </Text>
          <Image
            source={{uri: currentProduct?.imageUrl ? currentProduct?.imageUrl : null}}
            style={styles.image}
          />
        </View>
        <ScrollView>
          <View style={styles.dataView}>
            <Text style={[styles.dataFont, styles.dataHeading]}>
              {strings.Product_name}
            </Text>
            <Text style={styles.dataFont}> : </Text>
            <Text style={styles.dataFont}>{currentProduct?.productName}</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={[styles.dataFont, styles.dataHeading]}>
              {strings.Stock}
            </Text>
            <Text style={styles.dataFont}> : </Text>
            <Text style={styles.dataFont}>{currentProduct?.stock}</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={[styles.dataFont, styles.dataHeading]}>
              {strings.Description}
            </Text>
            <Text style={styles.dataFont}> : </Text>
            <Text style={styles.dataFont}>{currentProduct?.description}</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={[styles.dataFont, styles.dataHeading]}>
              {strings.Price}
            </Text>
            <Text style={styles.dataFont}> : </Text>
            <Text style={styles.dataFont}>{currentProduct?.price}</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={[styles.dataFont, styles.dataHeading]}>
              {strings.IGST}
            </Text>
            <Text style={styles.dataFont}> : </Text>
            <Text style={styles.dataFont}>{currentProduct?.igst}</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={[styles.dataFont, styles.dataHeading]}>
              {strings.HSN_Code}
            </Text>
            <Text style={styles.dataFont}> : </Text>
            <Text style={styles.dataFont}>{currentProduct?.hsnCode}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.eventTopac}>
        <Events eventText={strings.Add_Stock} onPressEvent={()=>addStock()} />
        <Events
          eventText={strings.EDIT}
          logoPath={ImagePath.pen}
          onPressEvent={()=>{editData()
          }}
        />
      </View>
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flexOne: {
    flex: 1,
  },
  imageDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(60),
  },
  productNameHeading: {
    fontSize: fontSize(35),
    fontWeight: '700',
    color: colors.black,
    marginBottom: hp(25),
  },
  image: {
    height: hp(125),
    width: wp(125),
    marginBottom: hp(10),
  },
  dataView: {
    flexDirection: 'row',
    marginVertical: hp(20),
  },
  dataFont: {
    fontSize: fontSize(18),
    fontWeight: '500',
    color: colors.black,
  },
  dataHeading: {
    width: wp(150),
    marginLeft: wp(35),
  },
  eventTopac: {
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ProductDetails;
