import React, { useState } from "react";
import { Button } from "../common/Button";
import { BACKEND_URL } from "../../config";
import { Photo } from "../property/inputs";
import Trash from "/trash-solid.svg";

interface PhotoUploaderProps {
  onPhotosChange: (photos: Photo[]) => void;
}

const PhotoUploader = ({ onPhotosChange }: PhotoUploaderProps) => {
  const [photoLink, setPhotoLink] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadPhotoByLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoLink) return;

    setIsUploading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/upload-by-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ link: photoLink }),
      });

      const data = await response.json();
      const newPhotos = [...uploadedPhotos, data.data];
      setUploadedPhotos(newPhotos);
      onPhotosChange(newPhotos);
      setPhotoLink("");
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadPhotosFromDevice = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/upload-from-device`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      const newPhotos = [...uploadedPhotos, ...data.data];
      setUploadedPhotos(newPhotos);
      onPhotosChange(newPhotos);
    } catch (error) {
      console.error("Error uploading photos:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = (indexToRemove: number) => {
    const newPhotos = uploadedPhotos.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadedPhotos(newPhotos);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Usa un link ..."
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          className="w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff07c1]"
        />
        <Button
          onClick={uploadPhotoByLink}
          name={isUploading ? "Subiendo..." : "Agregar foto"}
          disabled={isUploading}
          className="bg-gray-200 px-4 rounded-lg"
        />
      </div>

      <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {uploadedPhotos.map((photo, index) => (
          <div key={index} className="relative">
            <img
              src={photo.url}
              alt="property"
              className="rounded-lg object-cover aspect-square"
            />
            <button
              onClick={() => removePhoto(index)}
              className="absolute bottom-1 right-1 bg-white bg-opacity-60 rounded-full p-1 cursor-pointer"
            >
              <img src={Trash} className="w-6 h-6" />
            </button>
          </div>
        ))}
        <label className="border bg-transparent rounded-lg p-8 text-2xl text-gray-600 flex items-center gap-1 justify-center cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhotosFromDevice}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
};

export default PhotoUploader;
