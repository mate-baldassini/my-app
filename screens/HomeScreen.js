import React, { useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Button } from "react-native";
import { CartContext } from "../context/CartContext";
import { globalStyles } from "../style";

const products = [
  { id: 1, name: "PS5", category: "Consola", price: 500, image: require("/assets/play5.png") },
  { id: 2, name: "Xbox Series X", category: "Consola", price: 480, image: require("/assets/xboxseriex.png") },
  { id: 3, name: "Nintendo Switch", category: "Consola", price: 300, image: require("/assets/switch.png") },
  { id: 4, name: "Steam Deck", category: "Consola", price: 350, image: require("/assets/steamdeack.png") },
  { id: 5, name: "PS4", category: "Consola", price: 250, image: require("/assets/play4.png") },
  { id: 6, name: "Joystick PS5", category: "Accesorio", price: 70, image: require("/assets/joystick.png") },
  { id: 7, name: "Auriculares Gamer", category: "Accesorio", price: 50, image: require("/assets/headset.png") },
  { id: 8, name: "Mouse Gamer", category: "Accesorio", price: 40, image: require("/assets/mouse.png") },
  { id: 9, name: "Teclado Mecánico", category: "Accesorio", price: 60, image: require("/assets/keyboard.png") },
  { id: 10, name: "Cámara PS5", category: "Accesorio", price: 100, image: require("/assets/camera.png") },
];

export default function HomeScreen() {
  const { addToCart } = useContext(CartContext);
  const [filter, setFilter] = useState("Todos");

  const filteredProducts = filter === "Todos" ? products : products.filter(p => p.category === filter);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Productos</Text>

      <View style={globalStyles.filterContainer}>
        <Button title="Todos" onPress={() => setFilter("Todos")} />
        <Button title="Consolas" onPress={() => setFilter("Consola")} />
        <Button title="Accesorios" onPress={() => setFilter("Accesorio")} />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={globalStyles.productCard}>
            <Image source={item.image} style={globalStyles.productImage} />
            <Text style={globalStyles.productName}>{item.name}</Text>
            <Text style={globalStyles.productPrice}>${item.price}</Text>
            <TouchableOpacity
              style={globalStyles.buttonPrimary}
              onPress={() => addToCart(item)}
            >
              <Text style={globalStyles.buttonText}>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
