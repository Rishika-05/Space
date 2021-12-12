import React from 'react'
import './Problem.css'
export default function Problem(props) {
    return (
        
        <div className = "container" id = "problem-container">
        <div className="card d-flex card-css" id = "inner-problem-div">
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                   
                    <a href="#" className="card-link">Card link</a>
                </div>
                <div>
                    <button type="button" class="btn btn-dark but-c">Solve</button>
                </div>
        </div>
        </div>
    )
}
