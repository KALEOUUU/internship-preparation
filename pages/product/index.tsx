"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  Fab,
  Slide,
  Paper,
} from "@mui/material"
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getCategorie,
} from "@/pages/product/lib/api"
import FormProduct from "./components/FormProduct"
import Swal from "sweetalert2"
import TableProduct from "./components/TableProduct"
import TableRowsIcon from "@mui/icons-material/TableRows"
import AppsIcon from "@mui/icons-material/Apps"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import CardProducts from "./components/CardProduct"
import SearchProduct from "./components/SearchProduct"

export default function Crud() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [total, setTotal] = useState(0)
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [searchQuery, setSearchQuery] = useState<string>("")
  // State baru untuk mengontrol visibility form
  const [showForm, setShowForm] = useState(false)

  const fetchProducts = async (search = "") => {
    try {
      if (search) {
        // If searching, fetch all products and filter client-side
        const res = await getProducts(0, 1000) // fetch a large number for search
        const filtered = res.data.products.filter((p: any) => p.title.toLowerCase().includes(search.toLowerCase()))
        setProducts(filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
        setTotal(filtered.length)
      } else if (category && category !== "all") {
        const res = await getProductByCategory(category, page, rowsPerPage)
        setProducts(res.data.products)
        setTotal(res.data.total)
      } else {
        const res = await getProducts(page, rowsPerPage)
        setProducts(res.data.products)
        setTotal(res.data.total)
      }
    } catch (err) {
      console.error("Gagal fetch produk", err)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await getCategorie()
      const data = res.data
      const cleanCategories = Array.isArray(data)
        ? data.map((item: any) => (typeof item === "string" ? item : item.name))
        : []
      setCategories(cleanCategories)
    } catch (err) {
      console.error("Gagal fetch kategori", err)
    }
  }

  useEffect(() => {
    fetchProducts(searchQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, category, searchQuery])

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCreateProduct = async (data: any) => {
    try {
      await createProduct(data.title, data.description, data.price, data.category, data.stock, data.image)
      Swal.fire("Success", "Product created!", "success")
      fetchProducts(searchQuery)
      // Sembunyikan form setelah berhasil create
      setShowForm(false)
    } catch (err) {
      console.error("Create error", err)
    }
  }

  const handleUpdateProduct = async (data: any) => {
    try {
      await updateProduct(data.id, data.title, data.description, data.price, data.category, data.stock)
      fetchProducts(searchQuery)
      setSelectedProduct(null)
      // Sembunyikan form setelah berhasil update
      setShowForm(false)
    } catch (err) {
      console.error("Update error", err)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    })

    if (!result.isConfirmed) return

    try {
      await deleteProduct(id)
      fetchProducts(searchQuery)
    } catch (err) {
      console.error("Delete error", err)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    // setPage(0);
  }

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value)
    setPage(0)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(0)
  }

  // Fungsi untuk menampilkan form add product
  const handleAddProduct = () => {
    setSelectedProduct(null) // Reset selected product
    setShowForm(true)
  }

  // Fungsi untuk menampilkan form edit product
  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setShowForm(true)
  }

  // Fungsi untuk menutup form
  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedProduct(null)
  }

  return (
    <Container sx={{ bgcolor: "#fff", py: 8, position: "relative" }}>
      <Typography variant="h4" sx={{ my: 4, textAlign: "center", color: "#013e87" }}>
        Halo, Wanna Change Your Products?
      </Typography>


      {/* Form Product dengan animasi slide */}
      <Slide direction="down" in={showForm} mountOnEnter unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            position: "relative",
            borderRadius: 2,
            border: "2px solid #013e87",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" color="#013e87">
              {selectedProduct ? "Edit Product" : "Add New Product"}
            </Typography>
            <Button onClick={handleCloseForm} startIcon={<CloseIcon />} color="error" variant="outlined" size="small">
              Close
            </Button>
          </Box>
          <FormProduct
            onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
            selectedProduct={selectedProduct}
          />
        </Paper>
      </Slide>

      <Box sx={{ my: 8 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            my: 4,
            px: 4,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Sort by</Typography>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-category-label">Category</InputLabel>
              <Select
                labelId="select-category-label"
                id="select-category"
                value={category}
                onChange={handleChangeCategory}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {String(cat)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* Tombol Add Product */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddProduct}
              sx={{
                bgcolor: "#013e87",
                "&:hover": {
                  bgcolor: "#012a5c",
                },
              }}
            >
              Add Product
            </Button>

            <SearchProduct onSearch={handleSearch} />

            <ButtonGroup variant="contained">
              <Button
                startIcon={<TableRowsIcon />}
                onClick={() => setViewMode("table")}
                color={viewMode === "table" ? "primary" : "inherit"}
              >
                Table
              </Button>
              <Button
                startIcon={<AppsIcon />}
                onClick={() => setViewMode("card")}
                color={viewMode === "card" ? "primary" : "inherit"}
              >
                Card
              </Button>
            </ButtonGroup>
          </Box>
        </Box>

        {viewMode === "table" ? (
          <TableProduct
            products={products}
            onUpdate={handleEditProduct} // Menggunakan handleEditProduct
            onDelete={handleDeleteProduct}
            page={page}
            rowsPerPage={rowsPerPage}
            total={total}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          <CardProducts
            products={products}
            onUpdate={handleEditProduct} // Menggunakan handleEditProduct
            onDelete={handleDeleteProduct}
            page={page}
            rowsPerPage={rowsPerPage}
            total={total}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Box>

      {/* Floating Action Button sebagai alternatif */}
      {!showForm && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleAddProduct}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            bgcolor: "#013e87",
            "&:hover": {
              bgcolor: "#012a5c",
            },
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Container>
  )
}
