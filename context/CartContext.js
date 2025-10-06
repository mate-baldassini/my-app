 import React, { createContext, useState, useEffect } from "react";
 import * as SQLite from "expo-sqlite";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
   const db = SQLite.openDatabase("cart.db");

  // Crear tabla si no existe
   useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY NOT NULL, name TEXT, price REAL, image TEXT);"
      );
    });
    loadCart();
  }, []);


 const loadCart = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM cart;", [], (tx, results) => {
        const rows = results.rows;
        let items = [];
        for (let i = 0; i < rows.length; i++) {
          items.push(rows.item(i));
        }
        setCart(items);
      });
    });
  };


   const addToCart = (product) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO cart (id, name, price, image) VALUES (?, ?, ?, ?);",
        [product.id, product.name, product.price, product.image],
        () => loadCart()
      );
    });
  };


   const removeFromCart = (id) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM cart WHERE id = ?;", [id], () => loadCart());
    });
  };


   const clearCart = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM cart;", [], () => loadCart());
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

