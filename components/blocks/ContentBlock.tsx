import { Component } from 'react';

type ContentBlockProps = {
  title?: string;
  content: any;
};

class ContentBlock extends Component<ContentBlockProps> {
  public render() {
    return (
      <div className="block block--content">
        {this.props.title && (
        <h2 className="block__title">
          {this.props.title}
        </h2>
        )}
        <div className="block__content">
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default ContentBlock;
