import React from 'react';
import PropTypes from 'prop-types';
// import './image-form.scss';

const fileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('File Required'));
    }

    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => resolve(fileReader.result)); 
    fileReader.addEventListener('error', reject);
    fileReader.readAsDataURL(file);
    return undefined;
  });
};

const stopEvents = (event) => {
  event.stopPropagation();
  event.preventDefault();
};

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);

    this.emptyState = {
      preview: null, 
      image: '',
      fileType: '',
      dragOverClass: '',
      title: '',
    };

    this.overLayClassName = 'overlay';
    this.state = this.emptyState;
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onDragLeave);
    window.addEventListener('dragenter', this.onDragEnter);
    window.addEventListener('dragover', this.onDragOver);
    document.getElementById('drop-zone').addEventListener('dragleave', this.onDragLeave);
    window.addEventListener('drop', this.onDrop);
  }

  onDragEnter = (event) => {
    stopEvents(event);
  }

  onDragOver = (event) => {
    stopEvents(event);
    this.setState({ dragOverClass: this.overLayClassName });
  }

  onDragLeave = (event) => {
    stopEvents(event);
    this.setState({ dragOverClass: '' });
  }

  onDrop = (event) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    const [file] = files;
    fileToBase64String(file)
      .then((preview) => {
        this.setState({
          fileType: file.type,
          dragOverClass: '',
          title: file.name,
          image: file,
          preview,
        });
      })
      .catch(console.error);
  }

  handleChange = (event) => {
    const { type, value, files } = event.target; 
    if (type === 'file') {
      const [file] = files;
      fileToBase64String(file)
        .then((preview) => {
          this.setState({
            fileType: file.type,
            dragOverClass: '',
            title: file.name,
            image: file,
            preview,
          });
        })
        .catch(console.error);
    } else {
      this.setState({ title: value });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state)
      .then(() => {
        this.setState(this.emptyState);
      })
      .catch(console.error);
  }

  renderFile = (fileType) => {
    if (fileType.toLowerCase().includes('image')) {
      return <img src={this.state.preview} controls></img>;
    }
    return <img src={ this.state.preview } />;
  }

  clearFile = (event) => {
    stopEvents(event);
    this.setState(this.emptyState);
  }

  render() {
    return (
      <form
        onSubmit={ this.handleSubmit }
        className="image-form"
      >
        { this.renderFile(this.state.fileType) }
        <div className={this.state.dragOverClass} id="drop-zone">
          <label htmlFor="image">Upload a File or Drag and Drop One Here</label>
          <input 
            type="file"
            name="image"
            onChange={ this.handleChange }
          />
          <button onClick={ this.clearFile }>Clear File</button>
        </div>
        <label htmlFor="title">Title</label>
        <input 
            type="text"
            name="title"
            onChange={ this.handleChange }
          />
        <button type="submit">Upload a File!</button>
      </form>
    );
  }
}

ImageForm.propTypes = {
  onComplete: PropTypes.func,
};
