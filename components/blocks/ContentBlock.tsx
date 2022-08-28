import React from 'react';

type ContentBlockProps = {
  title?: string;
  content: any;
};

const ContentBlock: React.FC<ContentBlockProps> = (props: ContentBlockProps) => {
  return (
    <div className="block block--content">
      {props.title && (
        <h2 className="block__title">
          {props.title}
        </h2>
      )}
      <div className="block__content">
        {props.content}
      </div>
    </div>
  );
}

export default ContentBlock;
