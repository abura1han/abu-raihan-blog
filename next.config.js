/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    DB_USER: "aburaihan",
    DB_PASS: "C9d5wM0BeahgOHJE",
    site_url: "http://localhost:3000/",
    api_url: "http://localhost:3000/api/",
    user_url: "http://localhost:3000/api/users",
    posts_url: "http://localhost:3000/api/posts/",
    blog_posts_url: "http://localhost:3000/api/posts/blog-posts",
    projects_url: "http://localhost:3000/api/posts/projects",
    edit_user_url: "http://localhost:3000/api/admin/edit-user",

    login_url: "http://localhost:3000/api/login",
    access_token_secret:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhdWJyYTFoYW4iLCJuYW1lIjoiQWJ1IFJhMWhhbiIsImlhdCI6MTUxNjIzOTAyMn0.7MP1IMULEdV1ekRiKvF_uBh5F6XI2iSV7dVm80AozBQ",

    cloudinary_name: "abu-raihan",
    cloudinary_api_key: "119984673713254",
    cloudinary_api_secret: "yXYus9pRkAwupztYksYTFm6Ealw",
  },
};
