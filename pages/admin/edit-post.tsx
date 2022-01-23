import Cookies from "js-cookie";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AdminHeader from "../../components/admin/AdminHeader";
import ContentWrapper from "../../components/ContentWrapper";
import { NotificationContext } from "../../contexts";

// Props types
interface Props {
  error: string;
  statusCode: number;
  success: boolean;
  data?: {
    categorie: string;
    createdAt: string;
    description: string;
    shortDescription: string;
    slug: string;
    thumbnail: {
      url: string;
    };
    title: string;
    updatedAt: string;
    _id: string;
  };
}

const EditPost: NextPage<Props> = ({ error, data }) => {
  const [postId, setPostId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [categorie, setCategorie] = useState<string>("blog");
  const [description, setDescription] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<string>("edit");

  const { dispatchNotification } = useContext(NotificationContext);

  useEffect(() => {
    // If error occurred
    if (error) {
      return alert(error);
    }

    setPostId(String(data?._id));
    setTitle(String(data?.title));
    setThumbnail(String(data?.thumbnail.url));
    setCategorie(String(data?.categorie));
    setDescription(String(data?.description));
    setShortDescription(String(data?.shortDescription));
  }, [data]);

  // Update post hadle
  const handleUpdatePost = () => {
    fetch("/api/admin/update-post", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify({
        postId,
        title,
        thumbnail,
        categorie,
        shortDescription,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          return dispatchNotification({ type: "error", msg: data.error });
        }

        dispatchNotification({ type: "success", msg: data.message });
      });
  };

  // Delete post handler
  const handleDeletePost = () => {
    fetch("/api/admin/delete-post", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          return dispatchNotification({ type: "error", msg: data.error });
        }

        dispatchNotification({ type: "success", msg: data.message });
      });
  };

  // Handle image
  const handleImage = (e: any) => {
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => setThumbnail(String(reader.result));
  };

  return (
    <ContentWrapper>
      <Head>
        <link rel="stylesheet" href="/markdown.css" />
        <title>Edit post</title>
      </Head>
      <AdminHeader />
      <div className="my-4 mx-auto max-w-[1000px]">
        <h2 className="font-semibold text-3xl text-left mt-10 text-gray-600">
          Edit post
        </h2>
        <div className="flex my-2 border-b border-b-[#D1CFCF]">
          <button
            type="button"
            className={`px-3 py-1 flex border border-b-0 ${
              currentAction === "edit"
                ? "border-[#d1cfcfcf]"
                : "border-transparent"
            }`}
            onClick={() => setCurrentAction("edit")}
          >
            <span className="material-icons-outlined text-base mr-1">edit</span>
            Edit
          </button>
          <button
            type="button"
            className={`px-3 py-1 flex border border-b-0 ${
              currentAction === "preview"
                ? "border-[#d1cfcfcf]"
                : "border-transparent"
            }`}
            onClick={() => setCurrentAction("preview")}
          >
            <span className="material-icons-outlined text-base mr-1">
              visibility
            </span>
            Preview
          </button>
        </div>
        {currentAction === "edit" ? (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdatePost();
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
                  Thumbnail*
                </label>
                <input
                  type="file"
                  accept="image/webp"
                  name="thumbnail"
                  id="thumbnail"
                  className="block border border-[#D1CFCF] w-full px-1 py-1 text-black"
                  onChange={handleImage}
                />
                <div>
                  <img src={thumbnail} alt="" className="w-20" />
                </div>
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
                  className="block border border-[#D1CFCF] w-full px-1 py-1 text-black min-h-[200px]"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>

              <div className="mt-3">
                <button className="px-4 py-1 bg-yellow-400 font-medium">
                  Update
                </button>
                <button
                  className="px-4 py-1 ml-2 bg-red-400 font-medium"
                  onClick={handleDeletePost}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="single-post">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {description}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
};

// Fetch previous post data
EditPost.getInitialProps = async (req: NextPageContext) => {
  // Get post slug from req.query
  const queryData = req.query;

  const data = await (
    await fetch(`${process.env.posts_url}${queryData.post}`, {
      headers: { "Content-Type": "application/json" },
    })
  ).json();

  return data;
};

export default EditPost;
