"use client";

// import LoadingPage from "@/components/LoadingPage";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import Image from "next/image";
import AlertComponent from "@/components/alertComponent";
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
  image: string;
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
    userId: clerkId,
    // sessionId,
    // getToken
  } = useAuth();

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setIsLoading(false);
      });
  }, []);

  async function handleLike(postId: string) {
    if (!isSignedIn) {
      setIsAlertOpen(true);
      setTimeout(() => {
        setIsAlertOpen(false);
      }, 4000);
      setAlertTittle("Erro ao curtir postagem");
      setAlertDescription("Voce deve estar logado para curtir uma postagem");
      return;
    }

    const res = await fetch("/api/likes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, clerkId }),
    });

    if (res.ok) {
      fetch("/api/posts")
        .then((res) => res.json())
        .then((data) => setPosts(data.posts));
    }
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  //TODO - COMEÇAR A ENTENDER E PENSAR NO QUE PODE SER MELHORADO E QUAIS FEATURES A MAIS PODEM SER ADICIONADAS

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
            <div className="text-center text-[#111827] dark:text-[#E5E7EB]">
              No posts were found.
            </div>
          ) : (
            posts.map((post: Post) => (
              <div
                key={post.id}
                className="bg-[#ffffff] dark:bg-[#111827] rounded-lg shadow-md p-6 flex flex-col gap-2"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
                    {post.author?.name.charAt(0) || "?"}
                  </div>
                  <div>
                    <div className="font-semibold text-[#4b5563] dark:text-[#9CA3AF]">
                      {post.author.name || "Anônimo"}
                    </div>
                    <div className="text-xs text-[#4b5563] dark:text-[#9CA3AF]">
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-lg font-medium text-[#111827] dark:text-[#E5E7EB]">
                  {post.title}
                </div>
                <div className="text-[#4b5563] dark:text-[#9CA3AF]">
                  {post.content}
                </div>
                {post?.image && (
                  <Image
                    src={post?.image}
                    alt="Imagem da postagem"
                    className="mt-3 rounded-md max-h-60 object-cover w-full"
                  />
                )}
                <div className="flex gap-4 mt-4 text-[#4b5563] dark:text-[#9CA3AF] text-sm">
                  <span>
                    {post.likes !== undefined
                      ? `${post.likes} curtidas`
                      : "0 curtidas"}
                  </span>
                  <button
                    className="hover:text-green-500 transition-colors cursor-pointer"
                    onClick={() => handleLike(post.id)}
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
