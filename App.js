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
import Addnewadress from "./src/Screens/Addnewadress";
import Adress from "./src/Screens/Adress";
import Orderdetails from "./src/Screens/Orderdetails";
import Orderstatus from "./src/Screens/Orderstatus";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';


const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{borderLeftColor:'#00D100'}}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight:'400',
         fontFamily:'Poppins-Thin',
         color:'#00D100'
      }}
      text2Style={{
        fontSize:15
      }}
    renderLeadingIcon={()=>(
      <Icon name="check-circle" size={30} style={styles.toasterroricon} color={'#00D100'}/>
    )}
    />
  ),
 
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 18,
        color:'red',
        fontWeight:'200',
          fontFamily:'Poppins-Thin'
      }}
      text2Style={{
        fontSize: 16,
        fontFamily:'Poppins-Thin',
        color:'red'
      }}
      renderLeadingIcon={()=>(
        <Icon name="warning" size={30} style={styles.toasterroricon} color={'red'}/>
      )}
    />
  ),
};



function Bottomtabs(){
 const bottomtab=createBottomTabNavigator()
 const cartcounts=useSelector(state=>state.Cartdatas.cartcount)
 const  previous_Screen=''
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
      initialParams={{previousScreen:previous_Screen}}
    />
    <bottomtab.Screen
    name="Cart"
    component={Cart}
    options={({route})=>({
      headerShown:true,
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
      options={{
        headerShown:false
      }}
        name="Bottomtabs"
        component={Bottomtabs}/>
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
        component={Cart}
      />
      <stack.Screen
      name="Addnewadress"
      component={Addnewadress}/>
      <stack.Screen
      name="Adress"
      component={Adress}/>
      <stack.Screen 
      name="Orderdetails"
      component={Orderdetails}/>
      <stack.Screen
      name="Orderstatus"
      component={Orderstatus}
      options={{
        headerShown:false
      }}/>
      </stack.Navigator>
      <Toast config={toastConfig}/>
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
  },
  toasterroricon:{
    marginTop:15,
    marginLeft:15
  }
})