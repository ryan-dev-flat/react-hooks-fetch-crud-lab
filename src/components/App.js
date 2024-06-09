import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true; // add a local variable to track the mounted status

    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) { // only update state if the component is still mounted
          setQuestions(data);
        }
      });

    return () => {
      isMounted = false; // update the mounted status when the component is unmounted
    };
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions((prevQuestions) => prevQuestions.map((question) => question.id === updatedQuestion.id ? updatedQuestion : question));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleUpdateQuestion} />}
    </main>
  );
}

export default App;
