import React, {useEffect, useState} from "react";
import axios from "axios";
import csrf from '../src/csrf'

import { useCookies } from "react-cookie"

export default function Csrf({csrfToken}) {
    const [enabled, setEnabled] = useState<boolean>(false)

    useEffect(() => {
        axios.delete('/api/send-money')
    }, [])
    async function submitFormWithToken(event) {
        event.preventDefault()

        axios.post('https://web2-lab2-psi.vercel.app/api/send-money', {"receiver": "Hrvoje"}, {headers:{'CSRF-Token': csrfToken}} )
            .then(() => alert("SENT MONEY TO Hrvoje"))
    }


    return <div>
        CSRF ATTACK CAN BE USED: {enabled ? "YES" : "NO"} <input type={"checkbox"} defaultChecked={enabled}
                                                                 onChange={(e) => {
                                                                     setEnabled(e.target.checked)
                                                                     if(e.target.checked){
                                                                         axios.put('/api/send-money')
                                                                     }
                                                                     else{
                                                                         axios.delete('/api/send-money')
                                                                     }
                                                                 }}/>

        <hr/>

        Use this form to test if user can send money in both cases
        <form>
            Send money to Hrvoje:&nbsp;
            <input type={"submit"} onClick={(e) => submitFormWithToken(e)}/>
        </form>

        <hr/>
        Lets pretend that this is an email you received
        <br/>

        Hey Friend,
        Here's a 60% coupon for Cropp, just follow this link to redeem it.

        <a href={"https://web2-lab2-psi.vercel.app/bad-website.html"}>CLICK ME</a>

    </div>
}

export async function getServerSideProps(context) {
    const { req, res } = context
    await csrf(req, res)
    return {
        props: { csrfToken: req.csrfToken() },
    }
}
