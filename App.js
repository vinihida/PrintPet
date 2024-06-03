import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Home from "./screens/Home";
import Dog from "./screens/Dog";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export const AuthContext = React.createContext();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignIn: true,
            userName: action.name,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignIn: false,
            userName: "",
          };
      }
    },
    {
      isLoading: true,
      isSignIn: false,
      userName: "",
    }
  );

  const actions = React.useMemo(
    () => ({
      signIn: async ({name}) => {
        dispatch({ type: 'SIGN_IN', name });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

  return (
    <AuthContext.Provider value={{state, actions}}>
      <NavigationContainer>
        <StatusBar style="auto" backgoundColor="#f1f5f9" />
        <Stack.Navigator screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: "slide_from_right",
        }}>

          {state.isSignIn ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Dog" component={Dog} />
            </>
          ) : (<Stack.Screen name="Login" component={Login} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}