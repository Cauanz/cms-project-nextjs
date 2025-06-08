"use client";
import Sidebar from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [allposts, setAllPosts] = useState([]);

  const { userId } = useAuth();

  useEffect(() => {
    fetch(`/api/posts?clerkId=${userId}`)
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));

    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setAllPosts(data.posts));
  }, [userId]);

  return (
    <>
      <Sidebar />
      <main className="pt-16 sm:pl-64 w-full">
        <div className="cards flex justify-between">
          <div className="bg-gray-600 w-3xs h-28 flex items-center justify-center">
            <p>Your Posts:{posts.length}</p>
          </div>

          <div className="bg-gray-600 w-3xs h-28 flex items-center justify-center">
            <p>Total Posts:{allposts.length}</p>
          </div>
        </div>

        <section>
          <div>
            <p>Posts:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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
            </div>
            {/* //TODO - Aba mostrando posts brevemente com data, views titulo etc... */}
          </div>
        </section>
      </main>
    </>
  );
}

//! FODA-SE A UI, A IDEIA É RESOLVER UM PROBLEMA, FOQUE NO BACKEND/API PRIMEIRO, DEIXE ESSA FRESCURA PARA DEPOIS, OU FAÇA O BÁSICO SÓ PARA TESTAR E TER UMA IDEIA USANDO CSS INLINE E TAGS HTML, OU NO INSOMNIA MESMO
