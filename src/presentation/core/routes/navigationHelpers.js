
import { CommonActions, StackActions } from '@react-navigation/native';

export const push = (navigation, name, params = {}) => {
  navigation.navigate(name, params);
};

export const replacement = (navigation, name, params = {}) => {
  navigation.dispatch(StackActions.replace(name, params));
};

export const pushAndRemoveUntil = (navigation, name, params = {}) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name, params }],
    })
  );
};
