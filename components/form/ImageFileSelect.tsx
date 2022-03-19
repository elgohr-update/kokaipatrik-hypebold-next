import { Component, createRef } from 'react';

import Axios from '@/utils/axios';
import ImageIcon from '@/assets/svg/image.svg';

type ImageFileSelectProps = {
  buttonContent: any;
}

type ImageFileSelectState = {
  selectedImageIsUploading: Boolean;
  selectedImageIsUpload: Boolean;
  selectedImagePreview: string;
};

class ImageFileSelect extends Component<ImageFileSelectProps, ImageFileSelectState> {
  public state: ImageFileSelectState = {
    selectedImageIsUploading: false,
    selectedImageIsUpload: false,
    selectedImagePreview: '',
  };

  private fileSelectRef = createRef<HTMLInputElement>();
  
  public render() {
    return (
      <>
        <button
          className="btn btn-image-upload"
          onClick={() => this.triggerFileSelect()}
        >
          <img src={ImageIcon.src} alt="Image upload" title="Image upload" />
          {this.props.buttonContent}
        </button>
        <input
          ref={this.fileSelectRef}
          hidden
          type="file"
          onChange={this.fileSelect} />
      </>
    );
  };

  public triggerFileSelect(): void {
    if (this.fileSelectRef.current != undefined && this.fileSelectRef.current.click != undefined)
      this.fileSelectRef.current.click();
  };

  public async fileSelect(event): Promise<void> {
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
}

export default ImageFileSelect;
