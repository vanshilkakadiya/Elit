import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../../Screen/Dashboard/Dashboard';
import Auth from '../../Screen/Auth/Auth';
import AddCustomer from '../../Screen/Customer/AddCustomer';
import Customers from '../../Screen/Customer/Customers';
import DetailCustomer from '../../Screen/Customer/DetailCustomer';
import Products from '../../Screen/Product/Products';
import AddProduct from '../../Screen/Product/AddProduct';
import ProductDetails from '../../Screen/Product/ProductDetails';
import CreateInvoice from '../../Screen/Invoice/CreateInvoice';
import Invoices from '../../Screen/Invoice/Invoices';
import { firebase } from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function StackNav() {
  const user = firebase.auth().currentUser;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user?'Dashboard':'Auth'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        {/* <Stack.Screen name="Dashboard" component={Dashboard} options={{gestureEnabled: false}} /> */}
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="Customers" component={Customers} />
        <Stack.Screen name="DetailCustomer" component={DetailCustomer} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
        <Stack.Screen name="Invoices" component={Invoices} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;
