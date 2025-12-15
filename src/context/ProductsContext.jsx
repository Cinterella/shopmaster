import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  /* ================= VALIDACIONES ================= */

  const validarProducto = (producto) => {
    const errores = {};

    if (!producto.nombre?.trim()) {
      errores.nombre = "El nombre es obligatorio.";
    }

    if (producto.precio === "" || producto.precio === undefined) {
      errores.precio = "El precio es obligatorio.";
    } else if (isNaN(producto.precio) || Number(producto.precio) <= 0) {
      errores.precio = "Precio no válido.";
    }

    if (!producto.descripcion?.trim()) {
      errores.descripcion = "La descripción es obligatoria.";
    } else if (producto.descripcion.length < 10) {
      errores.descripcion = "Mínimo 10 caracteres.";
    }

    if (!producto.categoria?.trim()) {
      errores.categoria = "La categoría es obligatoria.";
    }

    return errores;
  };

  const validar = (producto) => ({
    esValido: Object.keys(validarProducto(producto)).length === 0,
    errores: validarProducto(producto),
  });

  /* ================= CARGAR PRODUCTOS ================= */

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "productos"));

        const productosFirestore = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: Number(data.precio),
            categoria: data.categoria || "General",
            avatar:
              data.avatar ||
              `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019`,
          };
        });

        setProductos(productosFirestore);
      } catch (err) {
        console.error("Error Firestore:", err);
        setError("Hubo un problema al cargar los productos.");
        toast.error("No se pudieron cargar los productos");
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);


  /* ================= CRUD ================= */

  const agregarProducto = async (nuevoProducto) => {
    try {
      const productoAGuardar = {
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        precio: Number(nuevoProducto.precio),
        categoria: nuevoProducto.categoria,
        avatar:
          nuevoProducto.avatar ||
          `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019`,
      };

      const docRef = await addDoc(
        collection(db, "productos"),
        productoAGuardar
      );

      const productoCreado = {
        id: docRef.id,
        ...productoAGuardar,
      };

      setProductos((prev) => [productoCreado, ...prev]);

      toast.success("Producto agregado correctamente");

      return productoCreado;
    } catch (error) {
      console.error("Error al agregar producto:", error);
      toast.error("Error al agregar el producto");
      throw error;
    }
  };


  const editarProducto = async (productoActualizado) => {
    try {
      const ref = doc(db, "productos", productoActualizado.id);

      const productoEditado = {
        nombre: productoActualizado.nombre,
        descripcion: productoActualizado.descripcion,
        precio: Number(productoActualizado.precio),
        categoria: productoActualizado.categoria,
        avatar: productoActualizado.avatar,
      };

      await updateDoc(ref, productoEditado);

      setProductos((prev) =>
        prev.map((p) =>
          p.id === productoActualizado.id
            ? { ...p, ...productoEditado }
            : p
        )
      );

      toast.success("Producto actualizado correctamente");

      return productoActualizado;
    } catch (error) {
      console.error("Error al editar producto:", error);
      toast.error("Error al actualizar el producto");
      throw error;
    }
  };


  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));

      setProductos((prev) => prev.filter((p) => p.id !== id));

      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      toast.error("No se pudo eliminar el producto");
      throw error;
    }
  };


  return (
    <ProductsContext.Provider
      value={{
        productos,
        cargando,
        error,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        validarProducto,
        validar,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe usarse dentro de ProductsProvider");
  }
  return context;
};
