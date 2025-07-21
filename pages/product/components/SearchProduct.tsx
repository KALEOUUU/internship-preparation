import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchProduct({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(search);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={{ mb: 0, width: "20%" }}>
      <TextField
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search" onClick={handleSearch} edge="end">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
