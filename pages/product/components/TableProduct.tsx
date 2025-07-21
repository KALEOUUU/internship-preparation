"use client";

import { Box, Button, Stack, TablePagination } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";

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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Name", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "stock", headerName: "Stock", width: 100 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      valueFormatter: (params) => `$${params.value}`,
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => router.push(`/product/${params.row.id}`)}
          >
            <VisibilityIcon />
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => router.push(`/product/${params.row.id}/edit`)}
          >
            <EditIcon />
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onDelete(params.row.id)}
          >
            <ClearIcon />
          </Button>
        </Stack>
      ),
    },
  ];

  // const handlePaginationModelChange = (model: GridPaginationModel) => {
  //   onChangePage(null, model.page);
  //   onChangeRowsPerPage({ target: { value: model.pageSize } });
  // };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        hideFooterPagination
        rows={products}
        columns={columns}
        // pagination
        // paginationMode="server"
        // rowCount={total}
        // paginationModel={{
        //   page: page,
        //   pageSize: rowsPerPage,
        // }}
        // onPaginationModelChange={handlePaginationModelChange}
        autoHeight
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            color: "#333",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #e0e0e0",
          },
        }}
        // slotProps={{
        //   pagination: {
        //     rowsPerPageOptions: [3, 6, 12, 24],
        //   },
        // }}
      />
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
