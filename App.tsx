import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Chat } from "./chat";
import { Home } from "./home";
import { SignIn } from "./signIn";
import { SignUp } from "./SignUp";
import { Setting } from "./setting";
import { Splash } from "./splash";

const Stack = createNativeStackNavigator(); 

function App() {

  const ui = (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Splash"} screenOptions={{headerShown: false}} >

        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Sign In"  component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Setting"  component={Setting} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Splash" component={Splash} />

      </Stack.Navigator>
    </NavigationContainer>

  );

  return ui;

}

export default App;