"use client";

import Sidebar from "@/components/Sidebar";

export default function newPost() {
  const handleSubmit = (e) => {
    return;
  };

// TODO - TERMINAR DE TRANSFORMAR ISSO EM UMA PÁGINA PRÓPRIA, DEIXAR RECURSOS DE ADICIONAR IMAGENS E ETC.. PRÉ-ADICIONADOS
// TODO - E MUDAR SCHEMA PARA CONTER IMAGEM, APESAR DE TALVEZ TER QUE TER ALGUM TIPO DE ARMAZENAMENTO (TALVEZ DEIXE PARA LÁ)

  return (
    <>
      <Sidebar />

      {/* <div className="fixed inset-0 bg-black/50 dark:bg-white/50 flex items-center justify-center z-50"> */}
      <div className="bg-[#FFFFFF] dark:bg-[#111827] rounded-lg p-8 shadow-lg w-full max-w-md">
        <h3 className=" text-center text-lg font-bold mb-4 text-gray-900 dark:text-white">
          CREATE NEW POST
        </h3>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Tittle"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white"
          />
          <textarea
            name="content"
            placeholder="Content"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white"
          />
          <div className="flex gap-5">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
            >
              Post
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {/* </div> */}
    </>
  );
}
