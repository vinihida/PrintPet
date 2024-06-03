import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, ActivityIndicator, Pressable, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from "react";

export default function Home({ navigation }) {

    const [dogs, setDogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchString, setSearchString] = useState("");

    async function getDogs() {
        setIsLoading(true);

        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key": "live_fnPcllkFOxKVqDp4MNd4RwZsEdYtZymGo0iefvJquuTIKTZcMBf8m0hxwvKSOr4d"
        });

        let url;
        if (searchString !== "") {
            url = "https://api.thedogapi.com/v1/breeds";
        } else {
            url = "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10";
        }

        try {
            const res = await fetch(url, { headers });
            const data = await res.json();

            if (searchString !== "") {
                const dogsFiltered = data.filter((dog) => dog.name.toLowerCase().includes(searchString.toLowerCase()));
                setDogs(dogsFiltered.map(breed => ({
                    id: breed.id,
                    url: `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`,
                    breeds: [breed]
                })));
            } else {
                setDogs(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getDogs();
    }, [searchString]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="bg-slate-100 p-4">
                <Text className="font-bold text-base text-center text-slate-800">PrintDog</Text>
            </View>

            <View className="p-4">
                <TextInput
                    placeholder="Search for a breed"
                    value={searchString}
                    onChangeText={setSearchString}
                    className="p-2 border border-slate-300 rounded"
                />
            </View>

            <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 20 }} showsHorizontalScrollIndicator={false}>
                <View>
                    {isLoading ? <ActivityIndicator size="large" /> :
                        (
                            dogs.map((dog) => (
                                <Pressable key={dog.id} className="p-4 rounded-lg border border-slate-300 mb-4" onPress={() => navigation.navigate("Dog", dog)}>
                                    <Image source={{ uri: dog.url }} className="w-full h-52 object-cover object-top rounded-lg mb-4" />
                                    {dog.breeds.map((breed, index) => (
                                        <Text key={index} className="font-bold text-base text-slate-800 text-center">{breed.name}</Text>
                                    ))}
                                </Pressable>
                            ))
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
