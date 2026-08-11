import cloudinary from '../config/cloudinary.js';

/**
 * Upload a file to Cloudinary.
 * @param {string} filePath - Local file path to upload
 * @param {object} options  - Cloudinary upload options
 * @returns {object} Cloudinary upload result
 */
export const uploadImage = async (filePath, options = {}) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'faizan-e-madina/gallery',
    ...options,
  });
  return result;
};

/**
 * Delete an asset from Cloudinary by its public ID.
 * Logs a warning instead of throwing if deletion fails (asset may already be gone).
 * @param {string} publicId - Cloudinary public ID
 * @param {string} resourceType - 'image' or 'video' (default: 'image')
 */
export const deleteImage = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.warn(`⚠️  Cloudinary deletion failed for ${publicId}:`, error.message);
    return null;
  }
};
