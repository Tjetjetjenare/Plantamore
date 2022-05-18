import { NavigationContainer } from '@react-navigation/native';
import React from "react";


// If problems occur with stacked screens look up "reset stack route "StackActions""

import DrawerNavigator from "./navigation/DrawerNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
export default App