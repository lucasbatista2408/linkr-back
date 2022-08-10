import client from "../database/db.js";

export async function getLikes(req,res){
    try {
        
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export async function addLike(req,res){
    try {
        
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export async function deleteLike(req,res){
    try {
        
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
