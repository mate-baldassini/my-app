import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { CartContext } from "/context/CartContext";
import { globalStyles } from "../screens";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Carrito</Text>

      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={globalStyles.cartItem}>
            <Text>{item.name} - ${item.price}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={{ color: "red" }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={globalStyles.total}>Total: ${total}</Text>

      <TouchableOpacity style={globalStyles.buttonPrimary} onPress={clearCart}>
        <Text style={globalStyles.buttonText}>Vaciar carrito</Text>
      </TouchableOpacity>
    </View>
  );
}
