import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

const { CLOUDINARY_APP_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_APP_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary environment variables are not set properly.');
}

// Configuration
cloudinary.config({
    cloud_name: CLOUDINARY_APP_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export default cloudinary