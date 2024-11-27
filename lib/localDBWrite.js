import * as SQLite from 'expo-sqlite';
import { LocalDB } from './localDB';

export async function localDBWrite(creator_id, recipe_name, recipe_desc, recipe_method, banner_img, img, fork_count, ingredients) {
    const statement = await localDB.prepareAsync(
        'INSERT INTO Fork (creator_id, recipe_name, recipe_desc, recipe_method, banner_img, img, icon, fork_count) VALUES ($creator_id, $recipe_name, $recipe_desc, $recipe_method, $banner_img, $img, $fork_count, $ingredients)'
    );

    try {
        statement.executeAsync({
            $creator_id: creator_id,
            $recipe_name: recipe_name,
            $recipe_desc: recipe_desc,
            $recipe_method: recipe_method,
            $banner_img: banner_img,
            $img: img,
            $fork_count: fork_count,
            $ingredients: ingredients
        });
        console.log("Wrote data to database successfully");
    } catch (error) {
        console.log("Failed to write to database");
    }
    finally {
        await statement.finalizeAsync();
    }

}