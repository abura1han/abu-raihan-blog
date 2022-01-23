import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
interface Props {
  posts: {
    thumbnail: {
      url: string;
    };
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    updatedAt: string;
  }[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <>
      {posts?.length < 1 && (
        <div>
          <h2 className="font-semibold text-xl text-center mt-10 text-gray-600">
            No post found
          </h2>
          <div className="text-black flex justify-center mt-10">
            Check out some
            <div className="text-blue-500 mx-1 underline">
              <Link href="/popular">popular</Link>
            </div>
            posts that people love
          </div>
        </div>
      )}
      <ul
        className="mt-5 grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-2"
        role="list"
      >
        {posts?.map((post, index) => (
          <li role="listitem" className="w-full max-w-[385px] mb-6" key={index}>
            <Link href={`posts/${post.slug}`}>
              <div className="px-1 py-2 border border-gray-300 hover:border-gray-400 cursor-pointer">
                <div>
                  <img
                    src={post.thumbnail.url}
                    alt={post.title}
                    className="max-w-full"
                    title={post.title}
                  />
                </div>
                <h2 className="mt-4" role="heading">
                  <a
                    href={`posts/${post.slug}`}
                    className="font-bold text-2xl text-black hover:underline"
                  >
                    {post.title}
                  </a>
                </h2>
                <div>
                  <div
                    className="text-merri font-bold text-sm text-blue-700 mt-2"
                    role="textbox"
                    title={`Post updated at ${new Date(post.updatedAt)
                      .toDateString()
                      .slice(3)
                      .toUpperCase()}`}
                  >
                    UPDATED{" "}
                    {new Date(post.updatedAt)
                      .toDateString()
                      .slice(3)
                      .toUpperCase()}
                  </div>
                  <div
                    className="text-[15px] font-merri mt-3 text-gray-800 leading-tight"
                    role="definition"
                    aria-roledescription="Post short description"
                  >
                    <ReactMarkdown>{post.shortDescription}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
