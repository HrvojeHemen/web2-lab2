import React, {useEffect, useState} from "react";
import InnerHTML from 'dangerously-set-html-content'

export default function Xss() {

    const [enabled, setEnabled] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")

    const [divValue, setDivValue] = useState<string>("")
    function getDiv(){
        if(enabled){
            return <InnerHTML html={divValue ? divValue : " "} />
        }
        return <div>{divValue}</div>

    }
    return <div>

        <div>
            XSS ATTACK CAN BE USED: {enabled ? "YES" : "NO"} <input type={"checkbox"} defaultChecked={enabled}
                                                                    onChange={(e) => {
                                                                        setEnabled(e.target.checked)
                                                                        setDivValue("")
                                                                    }}/>
        </div>

        <form method={"GET"}>
            Enter text to be displayed on this webpage
            <input type={"text"} id={"value"} name={"value"} defaultValue={value} onChange={(e) => {
                setValue(e.target.value)
            }
            }/>
            <input type={"submit"} onClick={(e) => {
                e.preventDefault()
                setDivValue(value)
            }
            }/>
        </form>
        {getDiv()}
    </div>
}