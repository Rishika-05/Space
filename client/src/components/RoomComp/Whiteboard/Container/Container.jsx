import React, { Component } from 'react';
import Board from '../Board/Board';
import './Container.css';
import {useLocation} from "react-router-dom";
export class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            brushSize:2,
            brushColor:'black',
            modeEraser:0,
            resetBoard:0,
            penStyle:'pen',
            room:1
            
        }
         
    }
    
    changeBrushSize(brushSizeChanged,penStyle){
        this.setState({
            brushSize:brushSizeChanged,
            modeEraser:0,
            penStyle:penStyle
        })
        
        
        
    }
    changeBrushColor(brushColorChanged){
        this.setState({
            brushColor:brushColorChanged,
            modeEraser:0,
        })

    }
    resetStateShift = ()=>{ 
        this.setState({
            resetBoard:0,
        })
    }

    
    render() {

        return (
            
            <div className = "container-n">
                
                <div className="tools d-flex justify-content-center">
                    <div className = "tools-selector mx-4">
                        <div className="btn-group dropend main-button d-flex" >
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id = "outer-button">
                                <i className="fas fa-pen"></i>
                            </button>
                            <ul className="dropdown-menu mx-3">
                            <li><button type = "button" className = "drp-but" onClick = {()=>{this.changeBrushSize(2,"pen")}}><i className="fas fa-pen"></i></button></li>
                            <li><button type = "button" className = "drp-but" onClick = {()=>{this.changeBrushSize(5,"pen")}}><i className="fas fa-marker"></i></button></li>
                            <li><button type = "button" className = "drp-but" onClick = {()=>{this.changeBrushSize(10,"highlighter")}}><i className="fas fa-highlighter"></i></button></li>
                            <li><button type = "button" className = "drp-but" onClick = {()=>{this.changeBrushSize(15,"paint")}}><i className="fas fa-paint-brush"></i></button></li>
                            </ul>
                        </div>
                        <div className="btn-group dropend main-button d-flex">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id = "outer-button">
                            <i className="fas fa-palette"></i>
                            </button>
                            <ul className="dropdown-menu mx-3">
                            <li><button type = "button" className = "drp-but drp-but-1" id = "black-btn" onClick = {()=>{this.changeBrushColor("#2B2B2B")}}></button></li>
                            <li><button type = "button" className = "drp-but drp-but-1" id = "blue-btn" onClick = {()=>{this.changeBrushColor("#04ACC1")}}></button></li>
                            <li><button type = "button" className = "drp-but drp-but-1" id = "green-btn" onClick = {()=>{this.changeBrushColor("#6DA23E")}}></button></li>
                            <li><button type = "button" className = "drp-but drp-but-1" id = "yellow-btn" onClick = {()=>{this.changeBrushColor("#F4B41E")}}></button></li>
                            <li><button type = "button" className = "drp-but drp-but-1" id = "red-btn" onClick = {()=>{this.changeBrushColor("#DC483B")}}></button></li>
                            </ul>
                        </div>
                        <div className="btn-group main-button d-flex">
                            <button type="button" className="btn btn-secondary" onClick = {()=>{this.setState({modeEraser:1,})}}  id = "outer-button">
                            <i className="fas fa-eraser" ></i>
                            </button>
                            
                        </div>
                        <div className="btn-group main-button d-flex">
                            <button type="button" className="btn btn-secondary" onClick = {()=>{this.setState({resetBoard:1,})}}  id = "outer-button">
                            <i className="fas fa-redo-alt"></i>
                            </button>
                            
                        </div>
                        
                    </div>
                    
                </div>
                <div className = "board-container">
                    
                    <Board brushSize = {this.state.brushSize} brushColor = {this.state.brushColor} modeEraser = {this.state.modeEraser} resetBoard ={this.state.resetBoard} resetStateShift = {this.resetStateShift} penStyle = {this.state.penStyle}  />
                </div>
                
            </div>
        )
    }
}

export default Container
