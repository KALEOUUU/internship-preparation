import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "@/pages/product/lib/api";
import FormProduct from "../components/FormProduct";
import { Button, Container, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Swal from "sweetalert2";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (id) {
      getProductById(Number(id))
        .then((res) => {
          setSelectedProduct(res.data);
        })
        .catch((err) => {
          console.error("Gagal ambil produk:", err);
        });
    }
  }, [id]);

  const handleUpdate = async (data: any) => {
    try {
      await updateProduct(
        data.id,
        data.title,
        data.description,
        data.price,
        data.category,
        data.stock
      );
      Swal.fire({
        title: "Product updated!",
        icon: "success",
        draggable: true
      });
      router.push("/ProdukTable");
    } catch (err) {
      console.error("Gagal update:", err);
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Button
        variant="contained"
        onClick={() => router.back()}
        startIcon={<ArrowBackIosNewIcon />}
        sx={{ my: 4 }}
      >
        Back
      </Button>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Update Product
      </Typography>

      {selectedProduct && (
        <FormProduct
          onSubmit={handleUpdate}
          selectedProduct={selectedProduct}
        />
      )}
    </Container>
  );
}
