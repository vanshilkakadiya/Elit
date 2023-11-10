import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../../Screen/Dashboard/Dashboard';
import Auth from '../../Screen/Auth/Auth';
import AddCustomer from '../../Screen/Customer/AddCustomer';
import Customers from '../../Screen/Customer/Customers';

const Stack = createNativeStackNavigator();

function StackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="Customers" component={Customers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;
