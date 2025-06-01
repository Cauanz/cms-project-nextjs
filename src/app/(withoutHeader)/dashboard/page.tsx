"use client";
import Sidebar from "@/components/sidebar";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <main className="pl-64">
        <div className="cards flex justify-between">
          <div className="bg-gray-600 w-3xs h-28 flex items-center justify-center">
            <p>Posts:</p>
          </div>

          <div className="bg-gray-600 w-3xs h-28 flex items-center justify-center">
            <p>Total Posts:</p>
          </div>
        </div>

        <section>
          <div>
            <p>Posts:</p>
            {/* //TODO - Aba mostrando posts brevemente com data, views titulo etc... */}
          </div>
        </section>
      </main>
    </>
  );
}

//! FODA-SE A UI, A IDEIA É RESOLVER UM PROBLEMA, FOQUE NO BACKEND/API PRIMEIRO, DEIXE ESSA FRESCURA PARA DEPOIS, OU FAÇA O BÁSICO SÓ PARA TESTAR E TER UMA IDEIA USANDO CSS INLINE E TAGS HTML, OU NO INSOMNIA MESMO
