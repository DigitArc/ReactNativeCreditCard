/* eslint-disable react/jsx-closing-tag-location */
import React, { useRef, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Animated from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";

const {
  event,
  Value,
  Clock,
  block,
  set,
  call,
  cond,
  useCode,
  concat,
  greaterThan,
  clockRunning,
  startClock,
  stopClock,
  not,
  and,
  spring
} = Animated;

const runSpring = (value: Animated.Value<number>) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    time: new Value(0)
  };
  const config = {
    stiffness: new Value(100),
    mass: new Value(1),
    damping: new Value(10),
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0)
  };

  return block([
    cond(and(not(clockRunning), not(state.finished)), [
      set(state.position, 0),
      set(state.velocity, 0),
      set(state.time, 0),
      set(config.toValue, value),
      startClock(clock)
    ]),
    spring(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position
  ]);
};

const CreditCard = () => {
  const [backSideState, setBackSideState] = useState(false);
  const [cardState, setCardState] = useState({
    cardHolderName: "BERK ELMAS",
    cardNumber: "2131 6787 7898 6787",
    cardExp: "12 / 20",
    cardCCV: "320"
  });
  const { x, focused } = useMemoOne(
    () => ({
      x: new Value(0),
      focused: new Value(0)
    }),
    []
  );
  let scrollViewRef = useRef(null);

  const handleScroll = event([
    {
      nativeEvent: {
        contentOffset: { x }
      }
    }
  ]);

  const rotationScrollX = Animated.interpolate(x, {
    inputRange: [0, Dimensions.get("window").width],
    outputRange: [0, 180]
  });

  const marginOnKeyboardCCV = Animated.interpolate(x, {
    inputRange: [0, Dimensions.get("window").width],
    outputRange: [0, -100]
  });

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const flipCard = () => {
    if (!backSideState) {
      // Animated.ScrollView way of having refs.
      // https://stackoverflow.com/questions/42051368/scrollto-is-undefined-on-animated-scrollview
      scrollViewRef.getNode().scrollTo({
        x: Dimensions.get("window").width * 2,
        animated: true
      });
    } else {
      scrollViewRef.getNode().scrollTo({
        x: 0,
        animated: true
      });
    }
    setBackSideState(prev => !prev);
  };

  return (
    <Animated.View
      style={{ ...styles.container, marginTop: marginOnKeyboardCCV }}
    >
      <View
        style={{
          marginTop: 50,
          height: Dimensions.get("window").height / 3,
          width: Dimensions.get("window").width - 20,
          position: "relative"
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width: "100%",
            zIndex: 10,
            position: "absolute",
            backfaceVisibility: "hidden",
            transform: [{ rotateY: concat(rotationScrollX, "deg") }]
          }}
        >
          <Image
            style={{
              position: "absolute",
              zIndex: 0,
              borderRadius: 20,
              height: "100%",
              width: "100%"
            }}
            source={require("../assets/images/secondpic.png")}
          />

          {/* CARD NUMBER HERE */}
          <View
            style={{ position: "absolute", zIndex: 1, top: "55%", left: 15 }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "white",
                fontFamily: "Roboto-Mono"
              }}
            >
              {cardState.cardNumber}
            </Text>
          </View>

          {/* NAME INFO HERE */}
          <View
            style={{ position: "absolute", zIndex: 1, bottom: 30, left: 15 }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#e1e1e1",
                fontFamily: "Roboto-Mono"
              }}
            >
              CARD HOLDER
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: "Roboto-Mono"
              }}
            >
              {cardState.cardHolderName}
            </Text>
          </View>

          {/* VISA IMAGE HERE */}
          <View style={{ position: "absolute", top: 30, right: 30 }}>
            <Image
              style={{ height: 50, width: 100, resizeMode: "contain" }}
              source={{
                uri:
                  "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
              }}
            />
          </View>

          {/* EXPIRATION DATE HERE */}
          <View style={{ position: "absolute", bottom: 30, right: 40 }}>
            <Text style={{ color: "#e1e1e1", fontSize: 10 }}>EXPIRATION</Text>
            <Text style={{ color: "#e1e1e1", fontSize: 20 }}>
              {cardState.cardExp}
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 5,
            transform: [{ rotateY: concat(rotationScrollX, "deg") }]
          }}
        >
          <Image
            style={{
              position: "absolute",
              zIndex: 0,
              borderRadius: 20,
              height: "100%",
              width: "100%"
            }}
            source={require("../assets/images/secondpic.png")}
          />

          {/* VISA IMAGE HERE */}
          <Image
            style={{
              position: "absolute",
              bottom: 30,
              left: 30,
              height: 70,
              width: 100,
              resizeMode: "contain",
              zIndex: 1,
              opacity: 0.8,
              transform: [{ rotateY: "180deg" }]
            }}
            source={{
              uri:
                "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
            }}
          />

          {/* CARD BLACK LINE HERE */}
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              backgroundColor: "black",
              width: "100%",
              height: 50,
              opacity: 0.8,
              top: 30
            }}
          />

          {/* WHITE CCV AND CCV VALUE HERE */}
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              right: 10,
              top: "40%",
              flexDirection: "row-reverse"
            }}
          >
            {/* CARD CCV WHITE BOX HERE */}
            <View
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: 5,
                height: 40,
                width: 280
              }}
            />

            {/* CARD CCV TEXT HERE */}
            <View>
              <Text
                style={{
                  fontSize: 15,
                  marginRight: 10,
                  color: "#e1e1e1",
                  transform: [{ rotateY: "180deg" }]
                }}
              >
                CCV
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginRight: 10,
                  color: "white",
                  transform: [{ rotateY: "180deg" }]
                }}
              >
                {cardState.cardCCV}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      <View
        style={{
          ...styles.formContainer
        }}
      >
        {/* CARD HOLDER */}
        <View style={{ ...styles.inputContainer }}>
          <Text style={{ ...styles.inputLabel }}>CARD HOLDER</Text>
          <TextInput
            autoCapitalize="characters"
            onChangeText={text =>
              setCardState(prev => ({
                ...prev,
                cardHolderName: text
              }))
            }
            value={cardState.cardHolderName}
            style={{ ...styles.inputField }}
          />
        </View>

        {/* CARD NUMBER */}
        <View style={{ ...styles.inputContainer }}>
          <Text style={{ ...styles.inputLabel }}>CARD NUMBER</Text>
          <TextInput
            onChangeText={text =>
              setCardState(prev => ({ ...prev, cardNumber: text }))
            }
            keyboardType="numeric"
            value={cardState.cardNumber}
            style={{ ...styles.inputField }}
          />
        </View>

        {/* EXPIRATION */}
        <View style={{ ...styles.inputContainer }}>
          <Text style={{ ...styles.inputLabel }}>EXPIRATION DATE</Text>
          <TextInput
            onChangeText={text =>
              setCardState(prev => ({ ...prev, cardExp: text }))
            }
            value={cardState.cardExp}
            style={{ ...styles.inputField }}
          />
        </View>

        {/* CCV */}
        <View style={{ ...styles.inputContainer }}>
          <Text style={{ ...styles.inputLabel }}>CCV</Text>
          <TextInput
            onFocus={flipCard}
            onBlur={flipCard}
            onChangeText={text =>
              setCardState(prev => ({ ...prev, cardCCV: text }))
            }
            value={cardState.cardCCV}
            style={{ ...styles.inputField }}
          />
        </View>

        <TouchableOpacity onPress={flipCard}>
          <View
            style={{
              ...styles.submitButton,
              marginTop: 40
            }}
          >
            <Text
              style={{
                ...styles.submitButtonText
              }}
            >
              Checkout!
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View />

      <Animated.ScrollView
        ref={c => (scrollViewRef = c)}
        pointerEvents="none"
        horizontal
        scrollEnabled={false}
        style={{
          ...StyleSheet.absoluteFillObject
        }}
        contentContainerStyle={{
          width: Dimensions.get("window").width * 2
        }}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      ></Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  formContainer: {
    backgroundColor: "#f7f7f7",
    height: (Dimensions.get("window").height * 9) / 18,
    width: (Dimensions.get("window").width * 6) / 7,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 6,

    elevation: 9
  },
  submitButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#1565c0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  submitButtonText: {
    color: "#f7f7f7",
    fontSize: 20,
    fontFamily: "Roboto-Light"
  },
  inputContainer: {
    marginVertical: 5
  },
  inputField: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    height: 40,
    padding: 10,
    fontFamily: "Roboto-Light"
  },
  inputLabel: {
    color: "gray",
    fontSize: 15,
    fontFamily: "Roboto-Light"
  }
});

export default CreditCard;
