import { Box, Button, TextField, Stack, Alert } from "@mui/material";
import { useState, useEffect } from "react";

export default function FormProduct({ onSubmit, selectedProduct }: any) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const [error, setError] = useState<string | null>(null);

  // Track field-level errors
  const [fieldErrors, setFieldErrors] = useState({
    title: false,
    description: false,
    price: false,
    category: false,
    stock: false,
  });

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        title: selectedProduct.title || "",
        description: selectedProduct.description || "",
        price: String(selectedProduct.price || ""),
        image: selectedProduct.thumbnail || "",
        category: selectedProduct.category || "",
        stock: String(selectedProduct.stock || ""),
      });
      setFieldErrors({
        title: false,
        description: false,
        price: false,
        category: false,
        stock: false,
      });
    }
  }, [selectedProduct]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (["price", "stock"].includes(name) && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });

    // Remove error as user types
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors({ ...fieldErrors, [name]: false });
    }
  };

  const handleSubmit = () => {
    const { title, description, price, category, stock } = form;

    // Check for empty fields and set field errors
    const newFieldErrors = {
      title: !title,
      description: !description,
      price: !price,
      category: !category,
      stock: !stock,
    };

    setFieldErrors(newFieldErrors);

    if (!title || !description || !price || !category || !stock) {
      setError("Semua field harus diisi kecuali gambar (jika update)");
      return;
    }

    setError(null);

    const payload = selectedProduct
      ? {
          id: selectedProduct.id,
          title: form.title,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          stock: Number(form.stock),
          image: form.image,
        }
      : {
          title: form.title,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          stock: Number(form.stock),
          image: form.image,
        };

    onSubmit(payload);

    setForm({
      title: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: "",
    });
    setFieldErrors({
      title: false,
      description: false,
      price: false,
      category: false,
      stock: false,
    });
  };

  return (
    <Stack spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        error={fieldErrors.title}
        helperText={fieldErrors.title ? "Product Name is required" : ""}
        label="Product Name"
        name="title"
        value={form.title}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        error={fieldErrors.description}
        helperText={fieldErrors.description ? "Description is required" : ""}
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
      />
      {!selectedProduct && (
        <TextField
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
          fullWidth
        />
      )}
      <TextField
        error={fieldErrors.price}
        helperText={fieldErrors.price ? "Price is required" : ""}
        label="Price"
        name="price"
        value={form.price}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        error={fieldErrors.category}
        helperText={fieldErrors.category ? "Category is required" : ""}
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        error={fieldErrors.stock}
        helperText={fieldErrors.stock ? "Stock is required" : ""}
        label="Stock"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit}>
        {selectedProduct ? "Update Product" : "Add Product"}
      </Button>
    </Stack>
  );
}
