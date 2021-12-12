import React from 'react'

export default function QuestionForm() {
    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(event.target.tag.value)
        let data = {
            title:event.target.title.value,
            problem:{
                problemStatement:event.target.problemStatement.value,
                sampleInput:event.target.sampleInput.value,
                sampleOutput:event.target.sampleOutput.value
            },
            answer:event.target.answer.value,
            
            testCase:event.target.testCase.value,
            difficulty:event.target.difficulty.value,
            tag:event.target.tag.value,
        }
        
        let res = fetch(`http://localhost:9002/admin/questionUpload`,{method:"POST",body: JSON.stringify(data),headers: {
            'Content-Type': 'application/json'
        },});
        
        
    }
    return (
        <>
            <div>
            <form className = "container" onSubmit = {handleSubmit}>
            <div className="form-group">
                    <label for="problem-title">Problem Title</label>
                    <textarea className="form-control" name = "title" id="problem-title" rows="1" required></textarea>
                </div>
                <div className="form-group">
                    <label for="problem-statement">Problem Statement</label>
                    <textarea className="form-control" name = "problemStatement" id="problem-statement" rows="6" required></textarea>
                </div>
                <div className="form-group">
                    <label for="sample-input">Sample input</label>
                    <textarea className="form-control" name = "sampleInput" id="sample-input" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label for="sample-output">Sample output</label>
                    <textarea className="form-control" name = "sampleOutput" id="sample-output"  rows="3" required></textarea>
                </div>
                <div className="form-group">
                    <label for="hidden-input">Hidden input</label>
                    <textarea className="form-control" name = "testCase" id="hidden-input" rows="3" ></textarea>
                </div>
                <div className="form-group">
                    <label for="hidden-output">Hidden output</label>
                    <textarea className="form-control" name = "answer" id="hidden-output" rows="3" required></textarea>
                </div>
                <div className="form-group">
                    <label for="difficulty-select">Problem Difficulty</label>
                    <select className="form-control" name = "difficulty" id="difficulty-select">
                        <option value = "easy">Easy </option>
                        <option value = "medium">Medium</option>
                        <option value = "hard">Hard</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="tag-select">Problem Tag</label>
                    <select className="form-control" name = "tag" id="tag-select">
                        <option value = "implementation">Implementation</option>
                        <option value = "strings">Strings</option>
                        <option value = "sorting">Sorting</option>
                        <option value = "greedy">Greedy</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Upload</button>
            
            
            </form>
            </div>
        </>
    )
}
