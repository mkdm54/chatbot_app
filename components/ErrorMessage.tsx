import { View, Text } from "react-native";

interface MessageProops {
  message?: string;
}

const ErrorMessage = ({ message }: MessageProops) => {
  if (!message) return null;

  return (
    <View
      style={{
        backgroundColor: "#ffcccc",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignItems : "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: "#cc0000", fontWeight: "bold" }}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;
