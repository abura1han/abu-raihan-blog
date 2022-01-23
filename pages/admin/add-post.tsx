import Cookies from "js-cookie";
import Head from "next/head";
import React, { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import ContentWrapper from "../../components/ContentWrapper";

const addPost = () => {
  const [title, setTitle] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [categorie, setCategorie] = useState<string>("blog");
  const [description, setDescription] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");

  // Create new post
  const handleCreatePost = () => {
    fetch("/api/admin/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify({
        title,
        thumbnail,
        categorie,
        shortDescription,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // If post creation successful
        if (data.success) window.location.reload();
      });
  };

  // Handle image
  const handleImage = (e: any) => {
    if (e.target !== null) {
      const image = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => setThumbnail(String(reader.result));
    }
  };

  return (
    <ContentWrapper>
      <Head>
        <title>Add new post</title>
      </Head>
      <AdminHeader />
      <div className="mt-4 mx-auto max-w-[1000px]">
        <h2 className="font-semibold text-3xl text-left mt-10 text-gray-600">
          Add new post
        </h2>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreatePost();
            }}
          >
            <div className="mt-3">
              <label className="block font-medium text-black" htmlFor="title">
                Title*
              </label>
              <input
                type="text"
                id="title"
                className="block border border-[#D1CFCF] w-full px-1 py-1 text-black"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className="mt-3">
              <label
                className="block font-medium text-black"
                htmlFor="thumbnail"
              >
                Thumbnail(780x585).webp*
              </label>
              <input
                type="file"
                accept="image/webp"
                name="thumbnail"
                id="thumbnail"
                className="block border border-[#D1CFCF] w-full px-1 py-1 text-black"
                required
                onChange={handleImage}
              />
            </div>

            <div className="mt-3">
              <label
                className="block font-medium text-black"
                htmlFor="categorie"
              >
                Categorie*
              </label>
              <select
                id="categorie"
                className="block border border-[#D1CFCF] w-full px-1 py-1 text-black"
                required
                onChange={(e) => setCategorie(e.target.value)}
                value={categorie}
              >
                <option value="blog">Blog post</option>
                <option value="project">Project</option>
              </select>
            </div>

            <div className="mt-3">
              <label
                className="block font-medium text-black"
                htmlFor="short-description"
              >
                Short description*
              </label>
              <textarea
                id="short-description"
                className="block border border-[#D1CFCF] w-full px-1 py-1 text-black"
                required
                onChange={(e) => setShortDescription(e.target.value)}
                value={shortDescription}
              />
            </div>

            <div className="mt-3">
              <label
                className="block font-medium text-black"
                htmlFor="description"
              >
                Description*
              </label>
              <textarea
                id="description"
                className="block border border-[#D1CFCF] w-full px-1 py-1 text-black"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div className="mt-3">
              <button className="px-4 py-1 bg-yellow-400 font-medium">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default addPost;
