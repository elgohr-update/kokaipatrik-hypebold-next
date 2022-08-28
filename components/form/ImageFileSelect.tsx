import React, { useRef, useState } from 'react';

import Axios from '@/utils/axios';
import ImageIcon from '@/assets/svg/image.svg';

type ImageFileSelectProps = {
  buttonContent: any;
}

const ImageFileSelect: React.FC<ImageFileSelectProps> = (props: ImageFileSelectProps) => {
  const [selectedImageIsUploading, setSelectedImageIsUploading] = useState<boolean>(false);
  const [selectedImageIsUpload, setSelectedImageIsUpload] = useState<boolean>(false);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string>('');

  const fileSelectRef = useRef<HTMLInputElement>();

  const triggerFileSelect = (): void =>{
    if(fileSelectRef.current != undefined && fileSelectRef.current.click != undefined) {
      fileSelectRef.current.click();
    }
  };

  const fileSelect = async (event): Promise <void> => {
    const file = event?.target?.files[0];
    const formData = new FormData();

    formData.append('image', file);

    await Axios.post('/ad/upload-images',
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((e) => {
        console.log('err', e);
      });
  };

  return (
    <>
      <button
        className="btn btn-image-upload"
        onClick={() => triggerFileSelect()}
      >
        <img src={ImageIcon.src} alt="Image upload" title="Image upload" />
        {props.buttonContent}
      </button>
      <input
        ref={fileSelectRef}
        hidden
        type="file"
        onChange={fileSelect} />
    </>
  );
}

export default ImageFileSelect;
