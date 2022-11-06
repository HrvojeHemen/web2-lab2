// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import csrf from "../../src/csrf";

export default async function handler(req, res) {
    console.log(req.headers)
    let asd =  await csrf(req, res);
    console.log(asd)
    res.status(200).json({name: 'John Doe'})
}