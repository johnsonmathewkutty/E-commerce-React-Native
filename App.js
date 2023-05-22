import React from "react";
import { View,StyleSheet,Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon  from "react-native-vector-icons/MaterialIcons";
import { Provider,useSelector} from "react-redux";
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
 const cartcounts=useSelector(state=>state.Cartdatas.cartcount)
  return(
  <bottomtab.Navigator>
    <bottomtab.Screen
    name="Home"
    component={Home}
    options={{
      headerShown:false,
      tabBarIcon:({focused})=>focused ?
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
    options={({route})=>({
      headerShown:false,
      tabBarActiveTintColor:'#000C66',
      tabBarInactiveTintColor:'#87ACA3',
      tabBarLabelStyle:{
         fontSize:14,
         fontWeight:'bold',
         marginBottom:3
      },
      tabBarIcon:({focused})=>(
        <View>
        { focused?(
      <Icon name="shopping-cart" size={35} color='#00D100' />
      )
      :(
      <Icon name="shopping-cart" size={35} color='#87ACA3' />
      )}
       {route.name === 'Cart' && cartcounts > 0 && (
                <View style={styles.cartcount}>
                  <Text style={styles.textcartcount}>{cartcounts}</Text>
                </View>
              )}
      </View>
      ),
      tabBarIconStyle:{
        marginTop:5
      },
    })}
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

const styles=StyleSheet.create({
  cartcount:{
    width:20,
    height:20,
    borderRadius:50,
    backgroundColor:'#00cc00',
    position:'absolute',
    right:-3,
    top:-4,
    alignItems:'center'
  },
  textcartcount:{
    color:'#fff',
    fontSize:15,
    fontWeight:'900'
  }
})