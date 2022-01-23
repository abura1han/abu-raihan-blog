import React from "react";

interface Props {
  title: string;
  thumbnail: string;
  author: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  react: string;
  relatedPosts: string;
  prevPost: string;
  nextPost: string;
}

const PageContent: React.FC<Props> = ({
  title,
  thumbnail,
  author,
  description,
  createdAt,
  updatedAt,
  react,
  relatedPosts,
  prevPost,
  nextPost,
}) => {
  return <div></div>;
};

export default PageContent;
