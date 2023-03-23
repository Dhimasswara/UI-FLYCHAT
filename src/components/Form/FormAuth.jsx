import React from 'react'

const FormAuth = (props) => {
    return (
        <div class="mb-3">
            <label class="form-label">{props.title}</label>
            <input type={props.type} class="form-control" placeholder={props.placeholder} onChange={props.onchange} name={props.name} value={props.value}/>
        </div>

    )
}

export default FormAuth