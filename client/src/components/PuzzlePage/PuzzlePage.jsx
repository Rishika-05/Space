import React, { useState, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import './puzzlePage.css'
import Loading from '../Loading/Loading';
export default function ProblemPage(props) {
    const { id } = useParams();
    const [qquestion, setQuestion] = useState();
    const getQuestion = async () => {
        let res = await fetch(`http://localhost:9002/puzzlePage/${id}`, {
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
                            <h5 className='mb-2'>Puzzle Statement</h5>
                            <p className='mb-4'>{qquestion.problem}</p>

                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button bg-dark acc-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            See Solution
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {qquestion.answer}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Loading />
            </>
        )
    }
}
