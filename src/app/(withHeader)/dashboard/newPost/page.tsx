"use client";

import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { FormEvent, useState } from "react";

export default function NewPost() {
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { user } = useUser();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    setIsLoading(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, authorId: user?.id }),
    });

    if (res.ok) {
      form.reset();
      handleReset();
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
  };

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  // TODO - FUNCIONANDO, MAS PRECISA DE POLIMENTO E REVISÃO

  return (
    <>
      <SideBar />

      <main className="pt-16 sm:pl-64 w-full h-full flex justify-center items-center">
        {/* <div className="fixed inset-0 bg-black/50 dark:bg-white/50 flex items-center justify-center z-50"> */}
        <div className="bg-[#FFFFFF] dark:bg-[#111827] rounded-lg p-8 w-2/4">
          <h3 className=" text-center text-lg font-bold mb-4 text-gray-900 dark:text-white">
            CREATE NEW POST
          </h3>
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <Input
              name="title"
              type="text"
              placeholder="Tittle"
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white"
            />
            <Textarea
              name="content"
              placeholder="Content"
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white"
            />

            <div className="w-full flex justify-center border border-gray-300 rounded py-2 ">
              <Input
                type="file"
                name="image"
                id="imageInput"
                disabled
                className="w-3xs focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white cursor-pointer"
              />
            </div>

            <div className="flex w-full justify-end">
              <div className="w-1/3 flex gap-5">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
                >
                  {isLoading ? <Spinner /> : "Post"}
                </Button>
                <Button
                  onClick={() => handleReset()}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
        {/* </div> */}
      </main>
    </>
  );
}
