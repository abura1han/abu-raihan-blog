/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    DB_USER: "your_db_user",
    DB_PASS: "your_db_user_pass",
    site_url: "http://localhost:3000/",
    api_url: "http://localhost:3000/api/",
    user_url: "http://localhost:3000/api/users",
    posts_url: "http://localhost:3000/api/posts/",
    blog_posts_url: "http://localhost:3000/api/posts/blog-posts",
    projects_url: "http://localhost:3000/api/posts/projects",
    edit_user_url: "http://localhost:3000/api/admin/edit-user",

    login_url: "http://localhost:3000/api/login",
    access_token_secret:
      "your_access_token_secret",

    cloudinary_name: "your_cloud_user_name",
    cloudinary_api_key: "your_cloud_api_key",
    cloudinary_api_secret: "your_cloud_api_secret",
  },
};
