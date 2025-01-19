import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

export class UploadService {
  static async uploadFile(link: string) {
    try {
      const result = await cloudinary.uploader.upload(link, {
        folder: "properties", // Carpeta en cloudinary donde se guardarán las imágenes
      });
      return result;
    } catch (error) {
      throw new Error("Error uploading file to Cloudinary");
    }
  }

  static uploadFromBuffer(buffer: Buffer): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "properties",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

  static async uploadFiles(files: Express.Multer.File[]) {
    try {
      const uploadPromises = files.map((file) =>
        this.uploadFromBuffer(file.buffer)
      );
      return await Promise.all(uploadPromises);
    } catch (error) {
      throw new Error("Error uploading files to Cloudinary");
    }
  }
}
