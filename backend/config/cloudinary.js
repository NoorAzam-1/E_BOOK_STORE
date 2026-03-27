// backend\config\cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from 'dotenv';

dotenv.config();


const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
      secure: true,
    });
    console.log('✅ Cloudinary Configured');
  } catch (error) {
    console.error('❌ Cloudinary Config Error:', error.message);
  }
};

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
      }
    );
    
    // Convert buffer to readable stream and pipe to Cloudinary
    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(stream);
  });
};


const uploadFiles = async (files, folder = 'uploads') => {

  const filesArray = Array.isArray(files) ? files : [files];

  if (filesArray.length === 0 || !filesArray[0]) {
    throw new Error('No files provided for upload');
  }

  const uploadPromises = filesArray.map(async (file) => {
    
    const resourceType = file.mimetype.startsWith('image') ? 'image' : 'raw';

    const result = await uploadStream(file.buffer, folder, resourceType);

    return {
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      original_name: file.originalname,
    };
  });

  return await Promise.all(uploadPromises);
};

/**
 * Deletes files from Cloudinary.
 * @param {Array<String>} publicIds - Array of public IDs to delete.
 */
const deleteFiles = async (publicIds) => {
  if (!publicIds || publicIds.length === 0) {
    throw new Error('No public IDs provided for deletion');
  }

  await cloudinary.api.delete_resources(publicIds);
  return { success: true, message: 'Files deleted successfully' };
};

export { connectCloudinary, uploadFiles, deleteFiles };