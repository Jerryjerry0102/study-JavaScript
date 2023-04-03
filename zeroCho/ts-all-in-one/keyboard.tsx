import React, { FC, ReactNode } from "react";
import {
  Keyboard,
  StyleSheetProperties,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const DismissKeyBoardView: FC<{
  children: ReactNode;
  style: StyleSheetProperties;
}> = ({ children, ...props }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView {...props} style={props.style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyBoardView;
