import React, { useState } from 'react'
import reset from './reset.png'
import AceEditor from 'react-ace';
import axios from 'axios';
import Beautify from 'ace-builds/src-noconflict/ext-beautify';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/ext-language_tools"
export default function Ide() {

    const cDefault = `#include<bits/stdc++.h>
using namespace std;
int main(){

return 0;
}`
    const javaDefault = `public class Main
{   
    public static void main(String[] args){
        System.out.println("Hello world");
    }
}`
    const kotDefault = `fun main(){
    println("Hello world!")
}`
    const pyDefault = `print('hello world')`

    const [theme, setTheme] = useState('chrome')
    const [language, setLanguage] = useState('c_cpp')
    const [value, setValue] = useState(cDefault)
    const [output, setOutput] = useState('')

    const themeChange = (event) => {
        setTheme(event.target.value);
    }

    const lanChange = (event) => {
        setLanguage(event.target.value);
        let lann = event.target.value;
        if (lann === 'c_cpp') {
            setValue(cDefault)
        }
        if (lann === 'python') {
            setValue(pyDefault)
        }
        if (lann === 'java') {
            setValue(javaDefault)
        }
        if (lann === 'kotlin') {
            setValue(kotDefault)
        }
    }

    function onChange(newValue) {
        setValue(newValue);
    }

    function resetClicked() {
        console.log("fyujjhgtyuik");
        if (language === 'c_cpp') {
            setValue(cDefault);
        }
        if (language === 'python') {
            setValue(pyDefault);
        }
        if (language === 'java') {
            setValue(javaDefault);
        }
        if (language === 'kotlin') {
            setValue(kotDefault);
        }
    }
    //https://codexweb.netlify.app/.netlify/functions/enforceCode

    function passlanguage(lan) {

        if (lan === 'c_cpp') {
            return 'cpp';
        }
        if (lan === 'python') {
            return 'py';
        }
        if (lan === 'java') {
            return 'java';
        }
        if (lan === 'kotlin') {
            return 'kt';
        }
    }

    const submitter = () => {
        var data = {
            code: value,
            language: passlanguage(language),
            input: ""
        }
        var config = {
            method: "post",
            url:
                "https://codexweb.netlify.app/.netlify/functions/enforceCode",
            headers: {
                "Content-Type": "application/json"
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                setOutput(response.data.output);
            })
            .catch(function (error) {
                setOutput('network error')
            });
        console.log(data);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <text className="navbar-brand">Space Online IDE</text>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <text className="nav-link disabled">Language</text>
                            </li>
                            <li>
                                <select className="form-select" aria-label="Default select example" onChange={lanChange}>
                                    <option selected value="c_cpp">C++</option>
                                    <option value="java">Java</option>
                                    <option value="python">Python</option>
                                    <option value="kotlin">Kotlin</option>
                                </select>
                            </li>
                            <li className="nav-item">
                                <text className="nav-link disabled">Theme</text>
                            </li>
                            <li>
                                <select className="form-select" aria-label="Default select example" onChange={themeChange}>
                                    <option selected value="chrome">Chrome</option>
                                    <option value="github">Github</option>
                                    <option value="eclipse">Eclipse</option>
                                    <option value="monokai">monokai</option>
                                    <option value="nord_dark">Nord Dark</option>
                                    <option value="dreamweaver">Dream Weaver</option>
                                </select>
                            </li>
                            <li>
                                <img src={reset} width="30" height="30" alt="reset"
                                    style={{ marginLeft: '7px', marginTop: '5px' }}
                                    onClick={resetClicked}
                                ></img>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <AceEditor
                placeholder={`//Write code here`}
                mode={language}
                theme={theme}
                name="editor"
                width="100%"
                fontSize={20}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={value}
                onChange={onChange}
                commands={Beautify.commands}
                editorProps={{
                    $blockScrolling: true
                }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }} />
            <br />
            <button type="button" className="btn btn-primary" onClick={submitter}>Run</button>
            <h5>Output</h5>
            <textarea className="outputBox">{output}</textarea>
        </>
    )
}
