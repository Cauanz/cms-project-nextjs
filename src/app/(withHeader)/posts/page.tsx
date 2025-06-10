"use client";
import Sidebar from "@/components/Sidebar";
import { useAuth, useUser } from "@clerk/nextjs";
import { FormEvent, useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { user } = useUser();

  const { userId } = useAuth();

  useEffect(() => {
    fetch(`/api/posts?clerkId=${userId}`)
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, [userId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const content = (form.elements.namedItem("content") as HTMLInputElement)
      .value;

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, authorId: user?.id }),
    });

    if (res.ok) {
      setShowForm(false);
      form.reset();

      fetch(`/api/posts?clerkId=${userId}`)
        .then((res) => res.json())
        .then((data) => setPosts(data.posts));
    }
  };

  const handleEdit = async (e: FormEvent, postId: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const content = (form.elements.namedItem("content") as HTMLInputElement)
      .value;

    const res = await fetch("/api/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, postId }),
    });

    if (res.ok) {
      setShowEditForm(false);
      form.reset();

      fetch("/api/posts")
        .then((res) => res.json())
        .then((data) => setPosts(data.posts));
    }
  };

  const handleDelete = async (postId: string) => {
    const res = await fetch(`/api/posts?postId=${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      fetch(`/api/posts?clerkId=${userId}`)
        .then((res) => res.json())
        .then((data) => setPosts(data.posts));
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pt-16 sm:pl-64 w-full">
        <div className="flex justify-end p-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-colors cursor-pointer"
          >
            New Post
          </button>
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-700 text-xl cursor-pointer"
                aria-label="Fechar"
              >
                &times;
              </button>
              <h3 className="text-lg font-bold mb-4 text-gray-900">
                Create new post
              </h3>
              <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                <input
                  name="title"
                  type="text"
                  placeholder="Tittle"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600">{post.content}</p>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                  onClick={() => {
                    setTitle(post.title || "");
                    setContent(post.content || "");
                    setShowEditForm(true);
                  }}
                >
                  Edit
                </button>
                {showEditForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md relative">
                      <button
                        onClick={() => setShowEditForm(false)}
                        className="absolute top-2 right-2 text-gray-700 hover:text-gray-700 text-xl cursor-pointer"
                        aria-label="Fechar"
                      >
                        &times;
                      </button>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">
                        Edit Post: {post.title}
                      </h3>
                      <form
                        onSubmit={(e) => handleEdit(e, post.id)}
                        className="space-y-4"
                      >
                        <input
                          name="title"
                          type="text"
                          placeholder="Título"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                        />
                        <textarea
                          name="content"
                          placeholder="Conteúdo"
                          required
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                        />
                        <button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
                        >
                          Finish
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
