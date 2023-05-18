import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon  from "react-native-vector-icons/MaterialIcons";
import { Provider} from "react-redux";

import Home from "./src/Screens/Home";
import Cart from "./src/Screens/Cart";
import Order from "./src/Screens/Order";
import Account from "./src/Screens/Account";
import Store from "./src/Redux/Store";
import Itemdetails from "./src/Screens/Itemdetails";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";

function Bottomtabs(){
 const bottomtab=createBottomTabNavigator()
  return(
  <bottomtab.Navigator>
    <bottomtab.Screen
    name="Home"
    component={Home}
    options={{
      headerShown:false,
      tabBarIcon:({focused})=> focused ?
      <Icon name='home' size={25} color='#00D100' /> : <Icon name="home" size={22} color='#87ACA3' />,
        tabBarLabelStyle:{
          fontSize:13,
          fontWeight:'bold',
          marginBottom:4,
        },
        tabBarActiveTintColor:'#000C66',
        tabBarInactiveTintColor:'#87ACA3',
        tabBarIconStyle:{
          marginTop:5
        }
      }}
    />
    <bottomtab.Screen
    name="Cart"
    component={Cart}
    options={{
      headerShown:false,
      tabBarActiveTintColor:'#000C66',
      tabBarInactiveTintColor:'#87ACA3',
      tabBarLabelStyle:{
         fontSize:14,
         fontWeight:'bold',
         marginBottom:3
      },
      tabBarIcon:({focused})=> focused?
      <Icon name="shopping-cart" size={25} color='#00D100' />:<Icon name="shopping-cart" size={22} color='#87ACA3' />,
      tabBarIconStyle:{
        marginTop:5
      },
    }}
    />
    <bottomtab.Screen
    name="Order"
    component={Order}
    options={{
      headerShown:false,
      tabBarActiveTintColor:'#000C66',
      tabBarInactiveTintColor:'#87ACA3',
      tabBarLabelStyle:{
         fontSize:14,
         fontWeight:'bold',
         marginBottom:3
      },
      tabBarIcon:({focused})=> focused?
      <Icon name="card-giftcard" size={25} color='#00D100' />:<Icon name="card-giftcard" size={22} color='#87ACA3' />,
      tabBarIconStyle:{
        marginTop:5
      },

    }}/>
    <bottomtab.Screen
    name="Account"
    component={Account}
    options={{
      headerShown:false,
      tabBarActiveTintColor:'#000C66',
      tabBarInactiveTintColor:'#87ACA3',
      tabBarLabelStyle:{
         fontSize:14,
         fontWeight:'bold',
         marginBottom:3
      },
      tabBarIcon:({focused})=> focused?
      <Icon name="account-circle" size={25} color='#00D100' />:<Icon name="account-circle" size={22} color='#87ACA3' />,
      tabBarIconStyle:{
        marginTop:5
      },
    }}/>
  </bottomtab.Navigator>
  )
}


const App=()=>{
  const stack=createStackNavigator()
  
  return(
    <Provider store={Store}>
    <NavigationContainer>
      <stack.Navigator>
      <stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown:false
        }}/>
        <stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown:false
        }}/>
      <stack.Screen
      options={{
        headerShown:false
      }}
        name="Bottomtabs"
        component={Bottomtabs}/>
        <stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown:false
        }}
        />
        <stack.Screen
        name="Itemdetails"
        component={Itemdetails}
       options={{
        title:'Back'
       }}
        />
        <stack.Screen
        name="Cart"
        component={Cart}/>
      </stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}


export default App;