import React from 'react'
import Problem from './Problem.jsx'
import './Problemset.css'
export default function Problemset() {
    const handleTags = (event)=>{
        event.preventDefault();
        let status = {solved:true,unsolved:true};
        let difficulty = {easy:true,medium:true,hard:true};
        let tag = {implementation:true,strings:true,sorting:true,greedy:true};
        status.solved = document.getElementById("status-solved").checked;
        status.unsolved = document.getElementById("status-unsolved").checked;
        difficulty.easy = document.getElementById("difficulty-easy").checked;
        difficulty.medium = document.getElementById("difficulty-medium").checked;
        difficulty.hard = document.getElementById("difficulty-hard").checked;
        tag.implementation = document.getElementById("tag-implementation").checked;
        tag.strings = document.getElementById("tag-strings").checked;
        tag.sorting = document.getElementById("tag-sorting").checked;
        tag.greedy = document.getElementById("tag-greedy").checked;
        let data = {status:status,tag:tag,difficulty:difficulty}
        console.log(data);
        
    }
    return (
        <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light problempage-heading">
                    <h3 className = "mx-4">Problemset</h3>
                </nav>
                <div id = "problemset-container" className = "container d-flex">
                    <div id = "problems-container">
                        <Problem/>
                        <Problem/>
                        <Problem/>
                        <Problem/>
                    </div>
                    <div id = "tag-form-container">
                        <form id = "tags-form" onSubmit = {handleTags}>
                            <h6>STATUS</h6>
                            <div id = "status-input">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name = "status" value="solved" id="status-solved"/>
                                    <label className="form-check-label" for="status-solved">
                                        Solved
                                    </label>
                                    
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="solved" id="status-unsolved"/>
                                    <label className="form-check-label" for="status-unsolved">
                                        Unsolved
                                    </label>
                                    
                                </div>
                            </div>
                            <hr></hr>
                            <h6>DIFFICULTY</h6>
                            <div id = "difficulty-input">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="easy" id="difficulty-easy"/>
                                    <label className="form-check-label" for="difficulty-easy">
                                        Easy
                                    </label>
                                    
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="medium" id="difficulty-medium"/>
                                    <label className="form-check-label" for="difficulty-medium">
                                        Medium
                                    </label>
                                    
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="hard" id="difficulty-hard"/>
                                    <label className="form-check-label" for="difficulty-hard">
                                        Hard
                                    </label>
                                    
                                </div>
                                
                            </div>
                            <hr></hr>
                            <h6>Tags</h6>
                            <div id = "tags-input">
                                
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="implementation" id="tag-implementation"/>
                                    <label className="form-check-label" for="tag-implementation">
                                        Implementation
                                    </label>
                                    
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="strings" id="tag-strings"/>
                                    <label className="form-check-label" for="tag-strings">
                                        Strings
                                    </label>
                                    
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="sorting" id="tag-sorting"/>
                                    <label className="form-check-label" for="tag-sorting">
                                        Sorting
                                    </label>
                                    
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="greedy" id="tag-greedy"/>
                                    <label className="form-check-label" for="tag-greedy">
                                        Greedy
                                    </label>
                                </div>
                                
                            </div>
                            <button type="submit" class="btn btn-dark">Apply</button>
                        </form>
                    </div>
                   
                </div>
            
        </>
    )
}
