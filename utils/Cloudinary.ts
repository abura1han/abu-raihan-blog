import { v2 as cloudinary } from "cloudinary";

// Cloudinary configs
cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

// Upload preset
cloudinary.api.create_upload_preset(
  {
    name: "abus_blog",
    unsigned: false,
    folder: "abu_ra1han_blog",
  },
  function (error, result) {
    if (error) throw error;
  }
);

// Upload image
export const uploadImage = async (thumbnail: string) => {
  try {
    const uploadRes = await cloudinary.uploader.upload(thumbnail, {
      overwrite: false,
      upload_preset: "abus_blog",
    });
    return uploadRes;
  } catch (error) {
    throw error;
  }
};

// Update image
export const updateImage = async (publicId: string, thumbnail: string) => {
  try {
    const updateRes = await cloudinary.uploader.upload(thumbnail, {
      public_id: publicId,
    });
    console.log(updateRes);
    return updateRes;
  } catch (error) {
    throw error;
  }
};

// Remove image
export const removeImage = async (publicId: string) => {
  try {
    const removeRes = await cloudinary.uploader.destroy(publicId);
    return removeRes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
