const {initializeDatabase}=require("./db/db.connect");
const {Recipe}=require("./models/recipe.models");
const express=require('express');
const cors = require("cors");
app.use(cors());
const app=express();
require('dotenv').config();
const port=process.env.PORT
app.use(express.json());

initializeDatabase();
app.listen(port,()=>{
    console.log(`Express running on ${port}`)
})

const saveRecipe=async(data)=>{
    const recipe=await Recipe(data);
    recipe.save();
    return recipe;
}
const readRecipe=async()=>{
    const recipes=await Recipe.find();
    return recipes;
}
const findRecipeByTitle=async(title)=>{
    const recipe=await Recipe.find({title:title});
    return recipe;
}
const findRecipeByAuthor=async(author)=>{
    const recipe=await Recipe.find({author:author});
    return recipe;
}
const findRecipeByLevel=async(level)=>{
    const recipe=await Recipe.find({difficulty:level});
    return recipe;
}
const updateRecipeById=async(id,data)=>{
    const recipe=await Recipe.findByIdAndUpdate(id,data);
    return recipe;
}
const updateRecipeByTitle=async(title,data)=>{
    const recipe=await Recipe.findOneAndUpdate({title:title},data,{new:true});
    return recipe;
}
const deleteRecipeById=async(id)=>{
    const recipe=await Recipe.findByIdAndDelete(id);
    return recipe;
}

app.delete("/recipes/:id",async(req,resp)=>{
    try{
        const recipe=await deleteRecipeById(req.params.id);
        if(recipe){
            resp.status(201).json({message:"Recipe deleted."})
        }
        else{
            resp.status(404).json({error:"Recipe not found."})
        }
        
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetchig data."})
    }
})

app.post("/recipes/title/:title",async(req,resp)=>{
    try{
        const recipe=await updateRecipeByTitle(req.params.title,req.body);
        if(recipe){
            resp.json(recipe);
        }
        else{
            resp.status(404).json({error:"Recipe not found."})
        }
    }
    catch(error){
        resp.status(500).error("Error occur while fetching data.")
    }
})

app.post("/recipes/:id",async(req,resp)=>{
    try{
        const recipe=await updateRecipeById(req.params.id,req.body);
        if(recipe){
            resp.json(recipe);
        }
        else{
            resp.status(404).json({error:"Recipe not found."})
        }
        
    }
    catch(error){
        resp.status(500).json({error:"Error while fetching data"})
    }
})

app.get("/recipes/difficulty/:level",async(req,resp)=>{
    try{
        const recipe=await findRecipeByLevel(req.params.level);
        if(recipe.length){
            resp.json(recipe);
        }
        else{
            resp.status(404).json({error:"Recipe not found."})
        }
    }
    catch(error){
        resp.status(500).json({error:"Error while fetching data"})
    }
})

app.get("/recipes/author/:author",async(req,resp)=>{
    try{

        const recipe=await findRecipeByAuthor(req.params.author);
        if(recipe.length){
            resp.json(recipe)
        }
        else{
            resp.status(404).json({error:"Recipe not found"})
        }
    }
    catch(error){
        resp.status(500).json({error:"Error while fetching data"})
    }
})

app.get("/recipes/title/:title",async(req,resp)=>{
    try{
        const recipe=await findRecipeByTitle(req.params.title);
        if(recipe.length){
            resp.json(recipe);
        }
        else{
            resp.status(404).json({error:"Recipe not found"})
        }
        
    }
    catch(error){
        resp.status(404).json({error:'error while fetching data.'})
    }
})

app.get("/recipes",async(req,resp)=>{
    try{
        const recipes=await readRecipe();
        if(recipes.length){
            resp.json(recipes)
        }
        else{
            resp.status(404).json({error:"Recipes not found"})
        }
    }
    catch(error){
        resp.status(500).json({error:'Error occur while fetching data.'})
    }
})

app.post("/recipes",async(req,resp)=>{
    try{
        const recipe=await saveRecipe(req.body);
        if(recipe){
            resp.json(recipe);
        }
        else{
            resp.status(400).json({error:'Error while posting recipe'});
        }
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching data"})
    }
})

