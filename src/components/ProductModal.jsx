import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProducts,
  createProduct,
} from "../apis/productsApis";

const ProductModal = ({
  onClose,
  isModalOpen,
  selectedProduct,
  isUpdating,
}) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: selectedProduct?.name || "",
      price: selectedProduct?.price || 0,
      description: selectedProduct?.description || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      if (isUpdating && selectedProduct) {
        dispatch(
          updateProduct({ productId: selectedProduct._id, updatedData: values })
        ).then(() => dispatch(getProducts(selectedProduct.userId)));
      } else {
        console.log("payload ===", { payload: { ...formik.values, userid: user.userId } })
        dispatch(
          createProduct({ payload: { ...formik.values, userid: user.userId } })
        ).then(() => dispatch(getProducts(user.userId)));
      }
      onClose();
    },
  });

  useEffect(() => {
    if (selectedProduct !== null) {
      formik.setValues({
        name: selectedProduct.name,
        price: selectedProduct.price,
        description: selectedProduct.description,
      });
    } else formik.setValues({ name: "", price: 0, description: "" });
  }, [selectedProduct]);

  return (
    <Dialog open={isModalOpen} onClose={onClose}>
      <DialogTitle>{isUpdating ? "Edit" : "Add"} Product</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <Box width={400} p={2}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              name="price"
              label="Price"
              fullWidth
              margin="normal"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              margin="normal"
              multiline
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Box>

          <DialogActions>
            <Button type="button" onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {isUpdating ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
