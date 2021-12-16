import React, { useState } from 'react'
import reset from './reset.png'
import AceEditor from 'react-ace';
import Unauthorized from '../unauthorized/Unauthorized';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
export default function Ide(props) {

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

    const [theme, setTheme] = useState('nord_dark')
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

    function passlanguage(lan) {

        if (lan === 'c_cpp') {
            return 'cpp17';
        }
        if (lan === 'python') {
            return 'python3';
        }
        if (lan === 'java') {
            return 'java';
        }
        if (lan === 'kotlin') {
            return 'kotlin';
        }
    }
    const questionSolved = async () => {
        let data = { user: props.user._id, question: props.question._id };
        let res = await fetch(`http://localhost:9002/problemPage/solved`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            },
        });
    }
    function passVersion(lan) {
        if (lan === 'c_cpp') {
            return '1';
        }
        if (lan === 'python') {
            return '4';
        }
        if (lan === 'java') {
            return '4';
        }
        if (lan === 'kotlin') {
            return '3';
        }
    }

    const submitter = async () => {

        let inn, qID, uID;
        if (props.question) {
            inn = props.question.testCase;
            qID = props.question._id;
            uID = props.user._id;
        }
        else {
            inn = "";
            qID = "";
            uID = "";
        }
        setOutput('Loading result...');
        var data = {
            script: value,
            language: passlanguage(language),
            stdin: inn,
            versionIndex: passVersion(language),
            questionID: qID,
            userID: uID
        }
        let res = await fetch(`http://localhost:9002/run`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            },
        });
        let res2 = await res.json();
        setOutput(res2.apiOut.output);
        checkerToast(res2.apiOut.output, data);
    }
    const soluLog = async (solution) => {
        let res = await fetch(`http://localhost:9002/solution`, {
            method: "POST", body: JSON.stringify(solution), headers: {
                'Content-Type': 'application/json'
            },
        });

    }

    const checkerToast = (ou, codeObj) => {
        let solution = {
            code: codeObj.script,
            language: codeObj.language,
            question: props.question ? props.question._id : "",
            user: props.user ? props.user._id : "",
            verdict: "",
        }
        if (props.question === undefined) { }
        else if (ou === props.question.answer) {
            questionSolved();
            solution.verdict = "Accepted"
            soluLog(solution)
            toast.success('Correct answer', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            solution.verdict = "Rejected"
            soluLog(solution);
            toast.error('Incorrect Answer', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const myStyle = {
        maxWidth: '5vw',
        marginLeft: '35vw'
    }
    if (props.user._id === undefined) {
        return (<Unauthorized />)
    }
    else {
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
                                        <option selected value="nord_dark">Nord Dark</option>
                                        <option value="github">Github</option>
                                        <option value="eclipse">Eclipse</option>
                                        <option value="monokai">monokai</option>
                                        <option value="chrome">Chrome</option>
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
                <button type="button" className="btn btn-primary" style={myStyle} onClick={submitter}>Run</button>
                <h5>Output</h5>
                <textarea className="outputBox" style={{ width: '40vw', height: '20vh' }} value={output}></textarea>
                <ToastContainer />
            </>
        )
    }
}
