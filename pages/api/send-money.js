// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import csrf from "../../src/csrf";
let enabled = true
export default async function handler(req, res) {
    if(req.method === 'PUT') {
        enabled = true;
        res.status(200).send()
        return
    }
    if(req.method === 'DELETE'){
        enabled = false;
        res.status(200).send()
        return
    }
    if(req.method !== 'POST') {
        res.status(404).send()
        return
    }

    let receiver = req.body.receiver
    console.log("ENABLED", enabled)
    if(enabled){
        return res.status(200).json("Successfully sent money to " +  receiver)
    }
    else {
        try{
            await csrf(req, res)
            return res.status(200).json("Successfully sent money to " + receiver)
        }
        catch (e) {
            return res.status(404).json("UNAUTHORIZED")
        }
    }
}