import * as React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";

/**
 * de este modo se llama en otros formularios 
   <Search filterType={filterType} filterBySearch={filterBySearch} />
 */

export default function Search({ filterBySearch, filterType }) {
  const [inputValue, setInputValue] = React.useState("");
  const handleChange = (event, newInputValue) => {
    setInputValue(newInputValue.split(" ")[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    filterBySearch(inputValue + data.get("search"));
    /* console.log({
      documentType: inputValue,
      search: data.get("search"),
    });*/
  };

  return (
    <Box
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
      noValidate
      onSubmit={handleSubmit}
    >
      <FilterListIcon />
      <Autocomplete
        sx={{ ml: 1, flex: 1 }}
        id="documentType"
        inputValue={inputValue}
        onInputChange={handleChange}
        options={filterType}
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return <InputBase {...params.InputProps} {...rest} />;
        }}
      />
      <Divider orientation="vertical" flexItem />
      <InputBase
        fullWidth
        sx={{ ml: 1, flex: 4 }}
        placeholder="Busqueda"
        inputProps={{ "aria-label": "search google maps" }}
        id="search"
        name="search"
      />

      <IconButton type="sumbit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
