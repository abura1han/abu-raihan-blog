import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import ContentWrapper from "../../components/ContentWrapper";
import { NotificationContext } from "../../contexts";
import { formatDate } from "../../utils/Date";

// Posts response types
interface PostsType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
}

const AddPost: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<PostsType[]>([]);
  const [projects, setProjects] = useState<PostsType[]>([]);
  const [blogPostCount, setBlogPostCount] = useState<number>(0);
  const [projectCount, steProjectCount] = useState<number>(0);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [currentPosts, setCurrentPosts] = useState<PostsType[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("blog");

  const { dispatchNotification } = useContext(NotificationContext);

  //  Fetch all posts
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        // If not success
        if (!data.success) {
          alert(data.error);
        }

        steProjectCount(data.data.projectCount);
        setBlogPostCount(data.data.blogPostCount);
        setBlogPosts([...data.data.blogPosts]);
        setProjects([...data.data.projects]);
        setTotalPosts(data.data.totalPostCount);
        setCurrentPosts([...data.data.blogPosts]);
      });
  }, []);

  // Delete post handler
  const handleDeletePost = (postId: string) => {
    fetch("/api/admin/delete-post", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
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

  return (
    <ContentWrapper>
      <Head>
        <title>Manage post</title>
      </Head>
      <AdminHeader />
      <div className="mt-3">
        <h2 className="font-semibold text-2xl text-left mt-10 text-gray-600">
          Total posts {totalPosts}
        </h2>
        <div className="border-b border-b-[#D1CFCF] mt-4">
          <button
            className={`px-2 py-1 text-black ${
              currentTab === "blog" && "bg-yellow-400"
            }`}
            onClick={(e) => {
              setCurrentPosts(blogPosts);
              setCurrentTab("blog");
            }}
          >
            Blog posts {blogPostCount}
          </button>
          <button
            className={`px-2 py-1 text-black ${
              currentTab === "projects" && "bg-yellow-400"
            }`}
            onClick={(e) => {
              setCurrentTab("projects");
              setCurrentPosts(projects);
            }}
          >
            Projects {projectCount}
          </button>
        </div>
        <div className="mt-5">
          <ul className="table border-separate w-full">
            {currentPosts && (
              <li className="table-row font-bold">
                <div className="text-ellipsis overflow-hidden flex-[.7] table-cell">
                  Title
                </div>
                <div className="px-3 py-3 table-cell">Created at</div>
                <div className="px-3 py-3 table-cell">Updated at</div>
                <div className="px-3 py-3 table-cell">Action</div>
              </li>
            )}
            {currentPosts.length < 1 && (
              <li className="table-row py-3">
                <h2>No post found</h2>
              </li>
            )}
            {currentPosts?.map(
              ({ _id, createdAt, updatedAt, title, slug }, index) => (
                <li
                  key={index}
                  className="mb-10 table-row shadow-sm shadow-gray-400 rounded"
                >
                  <div className="whitespace-pre-wrap text-ellipsis overflow-hidden flex-[.7] table-cell text-blue-600 pl-2 hover:underline">
                    <Link href={`/posts/${slug}`}>{title}</Link>
                  </div>
                  <div className="px-3 py-4 table-cell text-black">
                    {formatDate(createdAt)}
                  </div>
                  <div className="px-3 py-4 table-cell text-black">
                    {formatDate(updatedAt)}
                  </div>
                  <div className="px-3 py-4 w-[20px] table-cell font-medium text-blue-600 hover:underline cursor-pointer">
                    <Link href={`edit-post?post=${slug}`}>Edit</Link>
                  </div>
                  <div
                    className="px-2 py-4 table-cell font-medium text-red-600 hover:underline cursor-pointer"
                    onClick={() => handleDeletePost(_id)}
                  >
                    Delete
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default AddPost;
