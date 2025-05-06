"use client";
import { Dispatch, SetStateAction, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";

// Actions
import { UploadImage } from "../../app/api/crud/s3";
import { useEffect } from "react";
interface dataType {
    url: string;
    name?: string;
}
const ImageUploader = ( {defaultValue, onValueChange} : {defaultValue: dataType[], onValueChange: Dispatch<SetStateAction<dataType[]>>
} ) => {
  useEffect(() => {
    setUploadedImageList(defaultValue);
  }, [defaultValue]);
  // State
  const [uploadedImageList, setUploadedImageList] = useState<dataType[]>(defaultValue); // Image list state
  const [images, setImages] = useState<ImageListType>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Allowed file types
  const allowedFileTypes = ["image/png", "image/webp", "image/jpeg"];

  // OnImageChange
  const onImageChange = async (imageList: ImageListType) => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    const updatedImageList = [...uploadedImageList]; // Keep existing images

    for (const image of imageList) {
      if (image.file) {
        // Validate file type
        if (!allowedFileTypes.includes(image.file.type)) {
          setError("Only PNG, WEBP, and JPG files are allowed.");
          continue; // Skip this image if the type is not allowed
        }

        const formData = new FormData();
        formData.append("file", image.file as File);
        formData.append("folderName", "images");

        try {
          // Call the server action function
          const data = await UploadImage(formData);
          image["fvr-url"] = data.location; // Add the uploaded image URL to the image object
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      updatedImageList.push({url: image["fvr-url"], name: image.file ? image.file.name : undefined}); // Add the new image to the list
    }

    setUploadedImageList(updatedImageList); // Update the uploaded image list
    setImages([]); // Update the state with all images
    setLoading(false); // Stop loading
    onValueChange(updatedImageList); // Call the onValueChange function with the updated list
  };
  return (
    <div>
      <ImageUploading
        value={images}
        onChange={onImageChange}
        multiple={true} // Enable multiple image uploads
        maxFileSize={5000000}
      >
        {({ imageList, onImageUpload, isDragging, dragProps }) => (
          <div>
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                <p className="ml-4 text-blue-500 font-medium">Uploading...</p>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-center mb-4">
                <p>{error}</p>
              </div>
            )}
            {!loading  && (
              <button
                className="w-full"
                onClick={onImageUpload}
                {...dragProps}
                type="button"
              >
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto size-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                </div>
              </button>
            )}
            
          </div>
        )}
      </ImageUploading>

      {!loading && uploadedImageList.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedImageList.map((image, i) => (
                  <div
                  
                    key={i}
                    className={`relative cursor-pointer group rounded-md overflow-hidden`}
                  >
                    <Image
                      src={image.url}
                      alt="Image"
                      width={400}
                      height={400}
                      className="w-full object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            )}
    </div>
  );
};

export default ImageUploader;