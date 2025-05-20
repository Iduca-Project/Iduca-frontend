"use client";

import { useState } from "react";
import { NextLessonButton } from "./nextLessonButton";
import { CuteButton } from "./cuteButton";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/src/constants/routes";

interface IQuizClient {
  quizId: number;
  isExam?: boolean;
}

interface Option {
  id: number;
  text: string;
  alternative: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

interface QuizData {
  id: number;
  title: string;
  questions: Question[];
  nextLesson: {
    id: number;
    type: number;
    title: string;
  };
}

const projectExemple = {
  id: 1,
  title: "Prova Final",
  courseId: 2,
  questions: [
    {
      id: 1,
      question: "Qual é o comando para iniciar um repositório Git?",
      options: [
        { id: 1, text: "git start", alternative: "a" },
        { id: 2, text: "git init", alternative: "b" },
        { id: 3, text: "git begin", alternative: "c" }
      ]
    },
    {
      id: 2,
      question: "Qual pasta armazena o histórico de commits de um repositório Git?",
      options: [
        { id: 1, text: ".git/config", alternative: "a" },
        { id: 2, text: ".gitignore", alternative: "b" },
        { id: 3, text: ".git", alternative: "c" }
      ]
    },
    {
      id: 3,
      question: "Imagine que você está trabalhando em um projeto com uma equipe de várias pessoas desenvolvedoras, e todas estão colaborando usando Git e GitHub. Qual comando você deve utilizar para garantir que sua cópia local do projeto esteja atualizada com a versão mais recente que está no repositório remoto, antes de iniciar uma nova funcionalidade?",
      options: [
        { id: 1, text: "git pull", alternative: "a" },
        { id: 2, text: "git update", alternative: "b" },
        { id: 3, text: "git merge", alternative: "c" }
      ]
    },
    {
      id: 4,
      question: "Qual comando usamos para verificar o estado atual do repositório?",
      options: [
        { id: 1, text: "git status", alternative: "a" },
        { id: 2, text: "git check", alternative: "b" },
        { id: 3, text: "git log", alternative: "c" }
      ]
    },
    {
      id: 5,
      question: "Qual desses arquivos é usado para ignorar arquivos no Git?",
      options: [
        { id: 1, text: ".gitignore", alternative: "a" },
        { id: 2, text: ".gitconfig", alternative: "b" },
        { id: 3, text: ".ignore", alternative: "c" }
      ]
    }
  ],
  nextLesson: {
    id: 102,
    type: 4,
    title: "Instalando o Git"
  }
};

export const QuizClient = ({ quizId, isExam }: IQuizClient) => {
  const router = useRouter();

  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  const handleSelect = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };


  const nextLessonHref = () => {
    const nextLesson = projectExemple.nextLesson;

    switch (nextLesson.type) {
      case 1: return `/textLesson/${nextLesson.id}`;
      case 2: return `/videoLesson/${nextLesson.id}`;
      case 3: return `/quiz/${nextLesson.id}`;
      case 4: return `/project/${nextLesson.id}`;
      case 5: return `/exam/${nextLesson.id}`;
      default: return '/';
    }
  };

  return (
    <div className="flex flex-col md:p-10 p-3 rounded-2xl gap-10 items-center">
        {/* Questões */}
        <div className="flex flex-col w-full gap-6">
            {projectExemple.questions.map((q, index) => (
            <div key={q.id} className="bg-(--card) shadow-(--shadow) rounded-xl p-6">
                <p className="text-lg mb-4 text-(--text)">{index + 1}. {q.question}</p>
                <ul className="flex flex-col gap-2">
                {q.options.map(option => {
                    const isSelected = answers[q.id] === option.id;
                    return (
                    <li
                        key={option.id}
                        onClick={() => handleSelect(q.id, option.id)}
                        className={`
                        flex px-4 py-2 rounded-md cursor-pointer transition duration-300
                        ${isSelected ? "bg-(--hoverWhite)" : "bg-(--lightGray)"}
                        hover:bg-(--hoverWhite)
                        `}
                    >
                        <span className="font-bold mr-2 text-(--text)">{option.alternative.toUpperCase()}.</span>
                        <p className="text-(--text)">{option.text}</p>
                    </li>
                    );
                })}
                </ul>
            </div>
            ))}
        </div>

        {/* Só pra eu testar se tava pegando as respostas mesmo,ta funfando */}
        {/* <pre className="bg-(--lightGray) p-4 rounded text-(--text) w-full max-w-2xl overflow-x-auto">
            {JSON.stringify(answers, null, 2)}
        </pre> */}

        {/* Botão de próxima aula */}
        {!isExam ? 
          <div className="self-center">
              <CuteButton text="Encerrar Prova" icon={CheckCircleOutlineIcon} onClick={() => (router.push(`/courses/${projectExemple.courseId}`))}/>
          </div>
        :
          <div className="self-center">
              <NextLessonButton href={nextLessonHref()} />
          </div>
        }
    </div>
  );
};
