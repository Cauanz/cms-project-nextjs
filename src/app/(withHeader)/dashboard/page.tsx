"use client";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);

  return (
    <>
      <Sidebar />
      <main className="pl-64">
        <div className="cards flex justify-between">
          <div className="bg-gray-600 w-3xs h-28 flex items-center justify-center">
            <p>Posts:{posts.length}</p>
          </div>

          <div className="bg-gray-600 w-3xs h-28 flex items-center justify-center">
            <p>Total Posts:</p>
          </div>
        </div>

        <section>
          <div>
            <p>Posts:</p>
            {posts.map((post: Post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600">{post.content}</p>
              </div>
            ))}
            {/* //TODO - Aba mostrando posts brevemente com data, views titulo etc... */}
          </div>
        </section>
      </main>
    </>
  );
}

//! FODA-SE A UI, A IDEIA É RESOLVER UM PROBLEMA, FOQUE NO BACKEND/API PRIMEIRO, DEIXE ESSA FRESCURA PARA DEPOIS, OU FAÇA O BÁSICO SÓ PARA TESTAR E TER UMA IDEIA USANDO CSS INLINE E TAGS HTML, OU NO INSOMNIA MESMO
