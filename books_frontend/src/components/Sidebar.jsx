import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { fetchCategories } from "../services/CategoryService"

const Sidebar = ({selectedCategory, onSelect}) => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const loadCategories = async () => {
            try {
              const data = await fetchCategories();
              setCategories(data);
            } catch (error) {
              console.error('Failed to load categories:', error);
            }
        }
        loadCategories()
    }, [])
    return (
        <Box sx={{ width: 200, padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Categories
            </Typography>
            <List>
                <ListItem disablePadding>
                    <ListItemButton selected={!selectedCategory} onClick={() => onSelect(null)}>
                    <ListItemText primary='All'/>   
                    </ListItemButton>
                </ListItem>
                {Array.isArray(categories) && categories.map((category) =>{
                    return (
                    <ListItem key={category.categoryId} disablePadding>
                        <ListItemButton
                        selected={selectedCategory === category.categoryId}
                        onClick={() => onSelect(category.categoryId)}
                        >
                        <ListItemText primary={category.name} />
                        </ListItemButton>
                    </ListItem>
                    )
                } )}

            </List>
        </Box>
    )
}

export default Sidebar