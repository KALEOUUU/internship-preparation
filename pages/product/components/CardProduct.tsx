import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  TablePagination,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";

export default function TableProduct({
  products,
  onUpdate,
  onDelete,
  page,
  rowsPerPage,
  total,
  onChangePage,
  onChangeRowsPerPage,
}: any) {
  const router = useRouter();

  return (
    <Box>
      <Grid
        container
        component="div"
        spacing={2}
        columns={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {products && products.length > 0 ? (
          products.map((product: any) => (
            <Grid
              item
              size={1}
              key={product.id}
              sx={{
                // border: "1px solid #ccc",
                width: {
                  xs: "100%",
                  sm: "45%",
                  md: "30%",
                },
                bgcolor: "#fff",
                borderRadius: 2,
                boxShadow: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
              }}
            >
              <div>
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{
                    height: {
                      xs: "100%",
                      sm: "100%",
                      md: "100%",
                    },
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: {
                      xs: "100%",
                      sm: "100%",
                      md: "100%",
                    },
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom noWrap>
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minHeight: 70 }}
                    >
                      {product.description?.slice(0, 60)}...
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      ${product.price}
                    </Typography>
                  </Box>

                  <Box>
                    <Stack direction="row" spacing={1} mt={2}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => onUpdate(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => onDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </Stack>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => router.push(`/products/${product.id}`)}
                      >
                        More Details
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </div>
            </Grid>
          ))
        ) : (
          <Typography>No products available.</Typography>
        )}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={onChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onChangeRowsPerPage}
          rowsPerPageOptions={[3, 6, 12, 24, 48]}
          labelRowsPerPage="Cards per page:"
        />
      </Box>
    </Box>
  );
}
