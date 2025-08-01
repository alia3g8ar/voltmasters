import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-4">
      <div className="relative">
        <img
          src={images[selectedImage]}
          alt={productName}
          className={`w-full h-96 object-cover rounded-lg shadow-lg cursor-zoom-in transition-transform ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              ←
            </button>
            <button
              onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              →
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? 'border-blue-600' : 'border-gray-200'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}