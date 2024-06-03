import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useState } from "react";
import { AuthContext } from '../App';
import PrintDogIcon from '../assets/PrintDogIcon.png';

export default function Login() {
    const context = useContext(AuthContext);
    const [name, setName] = useState("");

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image source={PrintDogIcon} style={styles.logo} />
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry={true}
                />
                <Button 
                    title="Login"
                    onPress={() => {
                        context.actions.signIn({name});
                    }} 
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        alignItems: 'center', 
    },
    logo: {
        width: 100, 
        height: 100, 
        marginBottom: 20,
    },
    input: {
        padding: 10,
        borderColor: '#708090', 
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%', 
    },
});
