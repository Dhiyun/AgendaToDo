import { View, Text, StyleSheet } from "react-native";

export default function TodoCard({ todo }: any) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                {todo.title}
            </Text>

            <Text style={{
                color: todo.completed ? "green" : "red",
                marginTop: 8,
            }}>
                {todo.completed ? "Selesai" : "Belum Selesai"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
    },
})