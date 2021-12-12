import React from 'react'
import './Problem.css'
export default function Problem(props) {
    return (
        
        <div className = "container" id = "problem-container">
        <div className="card d-flex card-css" id = "inner-problem-div">
                <div className="card-body">
                    <h5 className="card-title">{props.question.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.question.difficulty}, {props.question.tag}</h6>
                   
                    
                </div>
                <div id = "button-container">
                    <button type="button" class="btn btn-dark but-c">Solve</button>
                </div>
        </div>
        </div>
    )
}
