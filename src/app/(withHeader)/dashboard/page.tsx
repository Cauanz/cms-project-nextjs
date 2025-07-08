"use client";
import LoadingPage from "@/components/LoadingPage";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
}

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [allposts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [res1, res2] = await Promise.all([
          fetch(`/api/posts?clerkId=${userId}`),
          fetch("/api/posts"),
        ]);
        const userPosts = await res1.json();
        const posts = await res2.json();

        setPosts(userPosts.posts);
        setAllPosts(posts.posts);
      } catch (error) {
        console.log("An error occurred trying to get posts", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    // fetch(`/api/posts?clerkId=${userId}`)
    //   .then((res) => res.json())
    //   .then((data) => setPosts(data.posts)); //posts: Array[{}]
    // fetch("/api/posts")
    //   .then((res) => res.json())
    //   .then((data) => setAllPosts(data.posts)); //posts: Array[{}]
  }, [userId]);

  if (isLoading) {
    return <LoadingPage />;
  }

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

          <div className="bg-gray-600 w-3xs h-28 flex items-center justify-center">
            <p>
              Total Likes:{posts.reduce((acc, cur: Post) => acc + cur.likes, 0)}
            </p>
          </div>
        </div>

        <section>
          <div>
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
          </div>
        </section>
      </main>
    </>
  );
}
