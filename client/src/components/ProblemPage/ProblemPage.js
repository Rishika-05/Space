import React, { useState, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import './problemPage.css'
import Ide from '../ide/Ide';
import Loading from '../Loading/Loading';
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
                <div className='container'>
                    <div className='col-sm-9 col-lg-9 col-xs-12'>
                        <h3 className='mt-4'>{qquestion.title}</h3>
                        <div className='problem-container p-3 mt-4'>
                            <h5 className='mb-2'>Problem Statement</h5>
                            <p className='mb-4'>{qquestion.problem.problemStatement}</p>
                            <h6 className='mb-2 mt-4'>Input Format</h6>
                            <p className='mb-4'>{qquestion.problem.inputFormat}</p>
                            <h6 className='mb-2 mt-4'>Output Format</h6>
                            <p className='mb-4'>{qquestion.problem.outputFormat}</p>
                            <h6 className='mb-2 mt-4'>Constraints</h6>
                            <p className='mb-4'>{qquestion.problem.constraints}</p>
                            <h6 className='mb-2 mt-4'>Sample Input</h6>
                            <p className='mb-4'>{qquestion.problem.sampleInput}</p>
                            <h6 className='mb-2 mt-4'>Sample Output</h6>
                            <p className='mb-4'>{qquestion.problem.sampleOutput}</p>
                            <h6 className='mb-2 mt-4'>Explanation</h6>
                            <p className='mb-4'>{qquestion.problem.explanation}</p>
                        </div>
                        <div className='ide mt-5'>
                            <Ide user={props.user} question={qquestion} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Loading/>
            </>
        )
    }
}
