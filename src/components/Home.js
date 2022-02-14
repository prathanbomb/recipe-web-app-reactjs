import React, {useState, useEffect} from 'react';
import axios from "axios";
import RecipeService from "../services/recipe.service";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";

export default function Home() {

    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        RecipeService.getCategories().then(
            (response) => {
                setCategories(response.data);
            }
        );
    }, []);

    function fetchRecipeByCategory(categoryId) {
        axios.get('http://localhost:3000/api/recipes/category', { params: { id: categoryId } })
            .then(
                (response) => {
                    console.log(response.data)
                    setRecipes(response.data);
                }
            );
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Category Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category ID</TableCell>
                            <TableCell align="left">Category Name</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow
                                key={category.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {category.id}
                                </TableCell>
                                <TableCell align="left">{category.name}</TableCell>
                                <TableCell align="center"><Button onClick={() => fetchRecipeByCategory(category.id)}>Detail</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <p/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Recipe Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Recipe ID</TableCell>
                            <TableCell align="left">Recipe Name</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">How To Cook</TableCell>
                            <TableCell align="left">Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipes.map((recipe) => (
                            <TableRow
                                key={recipe.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {recipe.id}
                                </TableCell>
                                <TableCell align="left">{recipe.name}</TableCell>
                                <TableCell align="left">
                                    <ul>
                                        {
                                            recipe.categoryList.map(category =>
                                                <li>
                                                    {category.name}
                                                </li>
                                            )
                                        }
                                    </ul>
                                </TableCell>
                                <TableCell align="left">
                                    <ul>
                                        {
                                            recipe.recipeStepList.map(step =>
                                                <li>
                                                    {step.instruction}
                                                </li>
                                            )
                                        }
                                    </ul>
                                </TableCell>
                                <TableCell align="left">
                                    <ul>
                                        {
                                            recipe.imageList.map(image =>
                                                <li>
                                                    {image.name}
                                                </li>
                                            )
                                        }
                                    </ul>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}
