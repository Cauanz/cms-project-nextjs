"use client";

import AlertComponent from "@/components/AlertComponent";
import LoadingPage from "@/components/LoadingPage";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
interface Author {
  name: string;
  id: string;
}
interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: Date;
  likes: number;
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [alertTitle, setAlertTittle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    // isLoaded,
    isSignedIn,
    // userId,
    // sessionId,
    // getToken
  } = useAuth();

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);

  async function handleLike(postId: string, currentLikes: number) {
    if (!isSignedIn) {
      setIsAlertOpen(true);
      setTimeout(() => {
        setIsAlertOpen(false);
      }, 4000);
      setAlertTittle("Erro ao curtir postagem");
      setAlertDescription(
        "Voce deve estar logado para poder curtir uma postagem"
      );
      return;
    }

    const res = await fetch("/api/likes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, like: currentLikes + 1 }),
    });

    if (res.ok) {
      fetch("/api/posts")
        .then((res) => res.json())
        .then((data) => setPosts(data.posts));
    }
  }

  if (isLoading) {
    return <LoadingPage onFinish={() => setIsLoading(false)} />;
  }

  //TODO - FUTURE TODO, MUDAR SISTEMA DE LIKES PARA USAR ID DO USUÁRIO PARA PERMITIR APENAS 1 LIKE DE CADA USER

  return (
    <>
      <div className="content w-full pt-16 flex items-center justify-center">
        {isAlertOpen && (
          <AlertComponent
            title={alertTitle}
            description={alertDescription}
            closeAlert={setIsAlertOpen}
          />
        )}
        <div className="feed flex flex-col gap-6 mt-12 w-full max-w-xl">
          {posts.length === 0 ? (
            <div className="text-center text-gray-400">
              No posts were found.
            </div>
          ) : (
            posts.map((post: Post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-2 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
                    {post.author?.name.charAt(0) || "?"}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">
                      {post.author.name || "Anônimo"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-lg font-medium text-gray-600">
                  {post.title}
                </div>
                <div className="text-gray-800">{post.content}</div>
                {/* {post.image && (
                  <img
                    src={post.image}
                    alt="Imagem da postagem"
                    className="mt-3 rounded-md max-h-60 object-cover w-full"
                  />
                )} */}
                <div className="flex gap-4 mt-4 text-gray-500 text-sm">
                  <span>
                    {post.likes !== undefined
                      ? `${post.likes} curtidas`
                      : "0 curtidas"}
                  </span>
                  <button
                    className="hover:text-green-500 transition-colors cursor-pointer"
                    onClick={() => handleLike(post.id, post.likes || 0)}
                  >
                    Like
                  </button>
                  <button className="hover:text-blue-500 transition-colors cursor-pointer">
                    Comment
                  </button>
                  <button className="hover:text-yellow-500 transition-colors cursor-pointer">
                    Share
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
