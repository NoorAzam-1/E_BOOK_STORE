import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import dotenv from "dotenv";

dotenv.config();

const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
      secure: true,
    });
  } catch (error) {
    console.error("❌ Cloudinary Config Error:", error.message);
  }
};

// Helper for Multer Buffer uploads
const uploadStream = (fileBuffer, folder, resourceType) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(stream);
  });
};

/**
 * Uploads files to Cloudinary. 
 * Handles BOTH Multer file objects (buffers) AND Base64 strings/URLs automatically.
 */
const uploadFiles = async (files, folder = "uploads") => {
  const filesArray = Array.isArray(files) ? files : [files];

  if (filesArray.length === 0 || !filesArray[0]) {
    throw new Error("No files provided for upload");
  }

  const uploadPromises = filesArray.map(async (file) => {
    let result;

    // SCENARIO 1: File is a Multer Object (has buffer and mimetype)
    if (file.buffer && file.mimetype) {
      const resourceType = file.mimetype.startsWith("image") ? "image" : "raw";
      result = await uploadStream(file.buffer, folder, resourceType);
      
      return {
        url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
        original_name: file.originalname,
      };
    } 
    
    // SCENARIO 2: File is a Base64 String or URL (from raw JSON body)
    else if (typeof file === 'string' && file.length > 0) {
      // Cloudinary's standard upload automatically detects base64 and URLs
      result = await cloudinary.uploader.upload(file, {
        folder: folder,
      });

      return {
        url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
      };
    } 
    
    else {
      throw new Error("Invalid file format: must be a Multer file object or a Base64 string.");
    }
  });

  return await Promise.all(uploadPromises);
};

/**
 * Deletes files from Cloudinary.
 * @param {Array<String>} publicIds - Array of public IDs to delete.
 */
const deleteFiles = async (publicIds) => {
  if (!publicIds || publicIds.length === 0) {
    // Don't throw an error here, just return silently if there's nothing to delete
    return { success: true, message: "No files to delete" }; 
  }

  await cloudinary.api.delete_resources(publicIds);
  return { success: true, message: "Files deleted successfully" };
};

export { connectCloudinary, uploadFiles, deleteFiles };