import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const gabarito: Record<number, number> = {
    1: 2, // git init
    2: 3, // .git
    3: 1, // git pull
    4: 1, // git status
    5: 1, // .gitignore
  };

  let acertos = 0;

  for (const [key, value] of formData.entries()) {
    const match = key.match(/question-(\d+)/);
    if (match) {
      const perguntaId = Number(match[1]);
      const respostaUsuario = Number(value);
      if (gabarito[perguntaId] === respostaUsuario) {
        acertos++;
      }
    }
  }

  const total = Object.keys(gabarito).length;
  const nota = Math.round((acertos / total) * 100);

  console.log("Passou aqui! Acertos: " + acertos);

  return NextResponse.json({
    mensagem: "Quiz enviado com sucesso!",
    acertos,
    total,
    nota,
  });
}
