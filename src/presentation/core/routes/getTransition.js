// getTransition.js
import { CardStyleInterpolators } from '@react-navigation/stack';
import NavigatorAnimation from './NavigatorAnimation';

const getTransition = (animationType) => {
  switch (animationType) {
    case NavigatorAnimation.POSITION:
      return {
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      };
    case NavigatorAnimation.SCALE:
      return {
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              transform: [
                {
                  scale: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          };
        },
      };
    case NavigatorAnimation.OPACITY:
    default:
      return {
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      };
  }
};

export default getTransition;
