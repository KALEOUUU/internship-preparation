import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductDetail } from "@/pages/product/lib/api";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProductDetail(Number(id))
        .then((res) => setProduct(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }
  return (
    <Container>
      <Container
        sx={{
          bgcolor: "#fff",
          m: 4,
          borderRadius: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => router.back()}
          startIcon={<ArrowBackIosNewIcon />}
          sx={{ my: 4 }}
        >
          Back
        </Button>

        <Box sx={{ display: "flex", mt: 4 }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              p: 4,
              mr: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={product.thumbnail} alt={product.title} />
          </Box>
          <Box sx={{ flex: 1, ml: 4, mt: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              {product.title}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "justify" }}>
              <span style={{ fontWeight: "bold" }}>Description</span> :{" "}
              {product.description}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>Price</span> : $
              {product.price}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>Stock</span> :{" "}
              {product.stock}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>Rating</span> :{" "}
              {product.rating}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" , textTransform: "capitalize"}}>Category</span> :{" "}
              {product.category}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4, py: 4 }}>
          <Typography variant="h6">
            Reviews ({product.reviews?.length})
          </Typography>
          {product.reviews?.map((review: any, index: number) => (
            <Box
              key={index}
              sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
            >
              <Typography variant="body1">
                {review.rating} - {review.comment}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by {review.reviewerName} ({review.reviewerEmail})
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Container>
  );
}
