import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const getCategories = () => {
  return axios.get(API_URL + "categories");
};

const RecipeService = {
  getCategories,
}

export default RecipeService;
