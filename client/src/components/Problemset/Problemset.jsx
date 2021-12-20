import React from 'react'
import Problem from './Problem.jsx'
import './Problemset.css'
import { useState, useEffect } from 'react'
import Unauthorized from '../unauthorized/Unauthorized.js'
export default function Problemset(props) {
    const [filter, setFilter] = useState({
        status: { solved: true, unsolved: true },
        difficulty: { easy: true, medium: true, hard: true },
        tag: { implementation: true, strings: true, sorting: true, greedy: true },
    });
    const [questions, setQuestions] = useState();
    useEffect(() => {
        filterData();
        document.title = 'Practice | Space'
        // eslint-disable-next-line
    }, [])
    const parseDifficulty = (data) => {
        let parsedDiff = "";
        if (data.difficulty.easy) {
            parsedDiff = parsedDiff + "difficulty=easy&";
        }
        if (data.difficulty.medium) {
            parsedDiff = parsedDiff + "difficulty=medium&";
        }
        if (data.difficulty.hard) {
            parsedDiff = parsedDiff + "difficulty=hard&";
        }
        if (parsedDiff.length === 0) {
            parsedDiff = "difficulty=easy&difficulty=medium&difficulty=hard&";
        }
        return parsedDiff;
    }
    const parseTag = (data) => {
        let parsedTag = "";
        if (data.tag.implementation) {
            parsedTag = parsedTag + "tag=implementation&";
        }
        if (data.tag.strings) {
            parsedTag = parsedTag + "tag=strings&";
        }
        if (data.tag.sorting) {
            parsedTag = parsedTag + "tag=sorting&";
        }
        if (data.tag.greedy) {
            parsedTag = parsedTag + "tag=greedy&";
        }
        if (parsedTag.length === 0) {
            parsedTag = "tag=implementation&tag=strings&tag=sorting&tag=greedy&";
        }
        return parsedTag;
    }
    const filterData = async () => {

        let res = await fetch(`http://localhost:9002/problemset/filter/?${parseDifficulty(filter) + parseTag(filter)}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        let data = await res.json();

        setQuestions(data.questions);

    }
    const handleTags = async (event) => {
        event.preventDefault();
        let status = { solved: true, unsolved: true };
        let difficulty = { easy: true, medium: true, hard: true };
        let tag = { implementation: true, strings: true, sorting: true, greedy: true };
        status.solved = document.getElementById("status-solved").checked;
        status.unsolved = document.getElementById("status-unsolved").checked;
        difficulty.easy = document.getElementById("difficulty-easy").checked;
        difficulty.medium = document.getElementById("difficulty-medium").checked;
        difficulty.hard = document.getElementById("difficulty-hard").checked;
        tag.implementation = document.getElementById("tag-implementation").checked;
        tag.strings = document.getElementById("tag-strings").checked;
        tag.sorting = document.getElementById("tag-sorting").checked;
        tag.greedy = document.getElementById("tag-greedy").checked;
        let data = { status: status, tag: tag, difficulty: difficulty }
        setFilter(data);
        let res = await fetch(`http://localhost:9002/problemset/filter/?${parseDifficulty(data) + parseTag(data)}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        let data2 = await res.json();

        setQuestions(data2.questions);
    }
    if (props.user === undefined) {
        return (
            <Unauthorized />
        )
    }
    else {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark problempage-heading">
                    <h3 className="mx-4" style={{ "color": "white" }}>Problemset</h3>
                </nav>
                <div id="problemset-container" className="container d-flex">
                    <div id="problems-container">
                        {

                            questions && questions.map((question) => {
                                return <Problem question={question} key={question._id} />
                            })
                        }
                    </div>
                    <div id="tag-form-container">
                        <form id="tags-form" onSubmit={handleTags}>
                            <h6>STATUS</h6>
                            <div id="status-input">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="status" value="solved" id="status-solved" />
                                    <label className="form-check-label" htmlFor="status-solved">
                                        Solved
                                    </label>

                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="solved" id="status-unsolved" />
                                    <label className="form-check-label" htmlFor="status-unsolved">
                                        Unsolved
                                    </label>

                                </div>
                            </div>
                            <hr></hr>
                            <h6>DIFFICULTY</h6>
                            <div id="difficulty-input">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="easy" id="difficulty-easy" />
                                    <label className="form-check-label" htmlFor="difficulty-easy">
                                        Easy
                                    </label>

                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="medium" id="difficulty-medium" />
                                    <label className="form-check-label" htmlFor="difficulty-medium">
                                        Medium
                                    </label>

                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="hard" id="difficulty-hard" />
                                    <label className="form-check-label" htmlFor="difficulty-hard">
                                        Hard
                                    </label>

                                </div>

                            </div>
                            <hr></hr>
                            <h6>Tags</h6>
                            <div id="tags-input">

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="implementation" id="tag-implementation" />
                                    <label className="form-check-label" htmlFor="tag-implementation">
                                        Implementation
                                    </label>

                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="strings" id="tag-strings" />
                                    <label className="form-check-label" htmlFor="tag-strings">
                                        Strings
                                    </label>

                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="sorting" id="tag-sorting" />
                                    <label className="form-check-label" htmlFor="tag-sorting">
                                        Sorting
                                    </label>

                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="greedy" id="tag-greedy" />
                                    <label className="form-check-label" htmlFor="tag-greedy">
                                        Greedy
                                    </label>
                                </div>

                            </div>
                            <button type="submit" className="btn btn-dark">Apply</button>
                        </form>
                    </div>

                </div>

            </>
        )
    }
}
