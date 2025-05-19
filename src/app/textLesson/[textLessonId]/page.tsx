import { Menu } from "@/src/components/menu";
import { BackButton } from "@/src/components/backButton";
import React from "react";
import Image from "next/image";
import { NextLessonButton } from "@/src/components/nextLessonButton";

const textLessonExemple = {
    id: 101,
    type: 1,
    title: "Introduction to Git",
    courseId: 5,
    moduleId: 1,
    completed: true,
    content: [
        {
        type: 1,
        title: "Git e github",
        value: "O GitHub é uma plataforma baseada em nuvem em que é possível armazenar, compartilhar e trabalhar com outras pessoas para escrever códigos. O Git é um sistema de controle de versão que acompanha as alterações nos arquivos de forma inteligente. O Git é particularmente útil quando você e um grupo de pessoas fazem alterações nos mesmos arquivos ao mesmo tempo."
        },
        {
        type: 2,
        value: "https://kinsta.com/pt/wp-content/uploads/sites/3/2020/01/pagina-inicial-github-1.png"
        },
        {
        type: 1,
        title: "Como eles trabalham juntos?",
        value: "Ao carregar arquivos no GitHub, você os armazenará em um 'repositório Git'. Isso significa que, quando você faz alterações (ou 'commits') nos arquivos que estão no GitHub, o Git começa automaticamente a monitorar e gerenciar essas alterações. Há muitas ações relacionadas ao Git que você pode realizar diretamente no GitHub pelo navegador, como criar um repositório Git, criar branches e carregar e editar arquivos. No entanto, a maioria das pessoas trabalha localmente nos arquivos (no próprio computador) e sincroniza continuamente essas alterações locais, além de todos os dados relacionados do Git, com o repositório central 'remoto' no GitHub. Há muitas ferramentas que você pode usar para fazer isso, como o GitHub Desktop."
        }
    ],
    nextLesson: {
        id: 102,
        type: 2,
        title: "Installing Git"
    }
}

const nextLessonHref = () => {
    const nextLesson = textLessonExemple.nextLesson;
    
    switch(nextLesson.type) {
      case 1:
        return `/textLesson/${nextLesson.id}`;
      case 2:
        return `/videoLesson/${nextLesson.id}`;
      case 3:
        return `/quiz/${nextLesson.id}`;
      case 4:
        return `/project/${nextLesson.id}`;
      case 5:
        return `/exam/${nextLesson.id}`;
      default:
        return '/';

    }
}

const textLesson = async ({ params } : { params: string }) => {


    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex gap-8 items-center w-full p-1">
                    <BackButton/>
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">{textLessonExemple.title}</h1>
                </div>

                {/* Details */}
                <div className="flex flex-col md:p-10 p-3 bg-(--card) shadow-(--shadow) rounded-2xl gap-10">
                    {textLessonExemple.content.map((content, index) => (
                        <React.Fragment key={index}>
                            {content.type === 1 ? 
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-(--text) text-xl font-bold">{content.title}</h1>
                                    <p className="text-(--text)">{content.value}</p>
                                </div>
                            :
                                <Image className="self-center md:max-w-10/12 rounded-xl" src={content.value} alt={content.value.toString()} width={3000} height={3000} priority></Image>
                            }
                        </React.Fragment>
                    ))}
                    <div className="self-center">
                        <NextLessonButton href={nextLessonHref()}></NextLessonButton>

                    </div>

                </div>
            </div>
        </>
    )
}

export default textLesson;