import React, { useState, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import './problemPage.css'
import Ide from '../ide/Ide';
export default function ProblemPage(props) {
    const { id } = useParams();
    const [qquestion, setQuestion] = useState();
    const getQuestion = async () => {
        let res = await fetch(`http://localhost:9002/problemPage/${id}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(res);
        const questionData = await res.json();
        console.log(questionData);
        setQuestion(questionData.question);
    }
    useLayoutEffect(() => {
        getQuestion();
        // eslint-disable-next-line
    }, [])


    if (qquestion) {
        return (
            <>
                <div className='pPage'>

                    <h1>{qquestion.title}</h1>
                    <div className='problem-container'>
                        <h4 className='hhh'>Problem Statement</h4>
                        <p className='para'>{qquestion.problem.problemStatement}</p>
                        <h5 className='hhh'>Input Format</h5>
                        <p className='para'>{qquestion.problem.inputFormat}</p>
                        <h5 className='hhh'>OutPut Format</h5>
                        <p className='para'>{qquestion.problem.outputFormat}</p>
                        <h5 className='hhh'>Sample Input</h5>
                        <p className='para'>{qquestion.problem.sampleInput}</p>
                        <h5 className='hhh'>Sample Output</h5>
                        <p className='para'>{qquestion.problem.sampleOutput}</p>
                        <h5 className='hhh'>Constraints</h5>
                        <p className='para'>{qquestion.problem.constraints}</p>
                        <h5 className='hhh'>Explanation</h5>
                        <p className='para'>{qquestion.problem.explanation}</p>
                    </div>
                    <div className='ide'>
                        <hr></hr>
                        <Ide user={props.user} question={qquestion} />
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <h3>Loading...</h3>
            </>
        )
    }
}
