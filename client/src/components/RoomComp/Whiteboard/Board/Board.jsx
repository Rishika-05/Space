import React, { Component } from 'react';
import './Board.css';
import io from "socket.io-client";

export class Board extends Component {
    ctx1;
    timeout;
    canvas1;
    socket = io.connect("https://white-board-1234.herokuapp.com/",{ transports: ['websocket', 'polling', 'flashsocket'] });
    constructor(props){
        super(props);
        this.socket.on('canvas-data',(data)=>{
            var image = new Image();
            var canvas = document.getElementById("board");
            var ctx = canvas.getContext('2d');
            
            if(data.reset){
                canvas = document.getElementById('board');
                ctx.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            }
            image.onload = ()=>{
                ctx.drawImage(image,0,0);
            };
            image.src = data.base64ImageData;
            
        })
        
    }
    
        
    
    
    componentDidMount(){
        this.drawOnCanvas();
        this.joinRoom();
    }
    
    
    componentDidUpdate(){
        
        this.ctx1.lineWidth = this.props.brushSize;
        this.ctx1.strokeStyle = this.props.brushColor;
        
        
        if(this.props.modeEraser){
            this.ctx1.lineWidth = 30;
            this.ctx1.strokeStyle = '#FFFFFF';
            // this.ctx1.globalCompositeOperation="destination-out";
            
            
            
        }
        if(this.props.resetBoard){
            
            this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            this.canvas1 = document.getElementById('board');
            var base64ImageData = this.canvas1.toDataURL("image/png");
            var data = {base64ImageData:base64ImageData,reset:1};
            this.props.resetStateShift();
            this.socket.emit('canvas-data',data);
            
        }
        if(this.props.penStyle === "pen"){
            this.ctx1.globalCompositeOperation = "source-over";
            this.ctx1.lineJoin = 'round';
            this.ctx1.globalAlpha = 1;
        }
        if(this.props.penStyle === "highlighter"){
            this.ctx1.globalCompositeOperation = "source-over";
            this.ctx1.lineJoin = 'round';
            this.ctx1.globalAlpha = 1;
        }
        if(this.props.penStyle === "paint"){
            this.ctx1.globalCompositeOperation = "source-over";
            this.ctx1.lineJoin = 'round';
            this.ctx1.globalAlpha = 1;
        }
        
    }
    joinRoom(){
        var a = window.localStorage.getItem('ID');
        

        this.socket.emit('joinRoom',a);
    }
    
    drawOnCanvas(){
        var base64ImageData;
        var canvas = document.querySelector('#board');
        this.canvas1 = canvas;
        var ctx = canvas.getContext('2d');
        this.ctx1 = ctx;

        var sketch = document.querySelector('#sketch');    
        var sketch_style = getComputedStyle(sketch);    
        

        
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));
            
        // $(window).on("resize", function(){                  
        //     canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        //     canvas.height = parseInt(sketch_style.getPropertyValue('height'));
        //     var image = new Image();
        //     image.onload = ()=>{
        //         ctx.drawImage(image,0,0);
        //     };
        //     image.src =base64ImageData;
        // });
          
        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            
        }, false);
        canvas.addEventListener("touchstart", function (e) {
            mouse = getTouchPos(canvas, e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
            canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
            });
            if (e.target == canvas) {
                e.preventDefault();
              }
            canvas.dispatchEvent(mouseEvent);

        }, false);
      
      // Get the position of a touch relative to the canvas
      function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
          x: touchEvent.touches[0].clientX - rect.left,
          y: touchEvent.touches[0].clientY - rect.top
        };
      }

        /* Drawing on Paint App */
        ctx.lineWidth = this.ctx1.brushSize;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.ctx1.brushColor;
        

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
            if (e.target == canvas) {
                e.preventDefault();
              }
        }, false);
        

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
        
        var root  = this;
        
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
            if(root.timeout != undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(()=>{
                base64ImageData = canvas.toDataURL("image/png");
                var data = {base64ImageData:base64ImageData,reset:0};
                root.socket.emit("canvas-data",data);
                 
            },500)
        };
    }   
    
    render() {

        return (
            <>
            <div className="sketch" id = "sketch">
                <canvas className = "board" id = "board"></canvas>
            </div>
            
            </>
            
        )
    }
}

export default Board
