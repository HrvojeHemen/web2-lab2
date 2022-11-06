import React, {useState} from "react";
import axios from "axios";
import csrf from '../src/csrf'

export default function Csrf({csrfToken}) {
    const [enabled, setEnabled] = useState<boolean>(false)


    async function submitFormWithToken(event) {
        event.preventDefault()

        axios.post('http://localhost:3000/api/hello', {}, {headers:{'CSRF-Token': csrfToken}} )
            .then(res=>console.log({data: res.data}))
    }

    async function submitFormWithoutToken(event) {
        event.preventDefault()

        axios.post('http://localhost:3000/api/hello', {})
            .then(res=>console.log({data: res.data}))
    }

    return <div>
        CSRF ATTACK CAN BE USED: {enabled ? "YES" : "NO"} <input type={"checkbox"} defaultChecked={enabled}
                                                                 onChange={(e) => {
                                                                     setEnabled(e.target.checked)

                                                                 }}/>

        <form>

            <input type={"submit"} onClick={(e) => submitFormWithToken(e)}/>


            <input type={"submit"} onClick={(e) => submitFormWithoutToken(e)}/>


        </form>
    </div>
}

export async function getServerSideProps(context) {
    const { req, res } = context
    await csrf(req, res)
    return {
        props: { csrfToken: req.csrfToken() },
    }
}
