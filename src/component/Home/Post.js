import React, { useContext, useState } from "react";
import ProfileContext from "./ProfileContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../URL"
export default function Post() {
  const navigate = useNavigate();
  const { prodata } = useContext(ProfileContext);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const ProductImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct(files);
    console.log(files);
  };

  const AddProduct = async () => {
    if (product.length === 0) {
      toast.error("Please select at least one image to upload.");
      return;
    }

    setLoading(true); // Start loading
    const token = localStorage.getItem("token");

    try {
      const ProductForm = new FormData();
      ProductForm.append("id", prodata._id);
      product.forEach((img) => {
        ProductForm.append("Productimages", img);
      });

      const response = await fetch(`${baseURL}/product`, {
        method: "POST",
        body: ProductForm,
        headers: {
          "auth-token": token,
        },
      });

      const result = await response.json();
      setLoading(false); // Stop loading

      if (response.ok) {
        console.log(result);
        toast.success("Uploaded Successfully");
        navigate("/"); // Redirect to homepage or another page
      } else {
        console.error("Error:", result);
        toast.error(result.error || "An error occurred while uploading.");
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      console.error("Error adding product:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      <div className="post">
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={ProductImageUpload}
          />
        </div>
        <div>
          <button onClick={AddProduct} disabled={loading}>
            {loading ? "Uploading..." : "Post"}
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
