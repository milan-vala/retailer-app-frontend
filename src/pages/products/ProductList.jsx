import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../apis/productsApis";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  AppBar,
  Toolbar,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { logoutUser } from "../../store/slices/user-slice";
import ProductModal from "../../components/ProductModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct } from "../../apis/productsApis";

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const dispatch = useDispatch();
  const { isFetchingProducts, products } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (user && user?.userId) dispatch(getProducts(user.userId));
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (isFetchingProducts) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (product) => {
    if (product?._id && user?.userId) {
      const payload = { productId: product._id };
      dispatch(deleteProduct(payload)).then(() =>
        dispatch(getProducts(user.userId))
      );
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="inherit"
            onClick={() => {
              setIsUpdatingProduct(false);
              setIsModalOpen(true);
              setSelectedProduct(null);
            }}
          >
            Add Product
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Paper
        elevation={1}
        style={{
          padding: "16px",
          marginTop: "20px",
          maxWidth: "600px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Product List
        </Typography>
        <List>
          {products?.length &&
            products?.map((product, index) => (
              <React.Fragment key={product._id}>
                <ListItem>
                  <ListItemText
                    primary={product.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Price: ${product.price}
                        </Typography>
                        <br />
                        {product.description}
                      </React.Fragment>
                    }
                    onClick={() => {
                      setIsUpdatingProduct(true);
                      handleProductClick(product);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteProduct(product)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                {index < products.length - 1 && <Divider />}
              </React.Fragment>
            ))}
        </List>
      </Paper>
      <ProductModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={selectedProduct}
        isUpdating={true}
      />
    </>
  );
};

export default ProductList;
