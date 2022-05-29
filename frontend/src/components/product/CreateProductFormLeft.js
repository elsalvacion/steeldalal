import React from "react";
import "./CreateProductFormLeft.css";
import { DropzoneArea } from "material-ui-dropzone";

class CreateProductFormLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  handleChange(files) {
    this.setState({
      files: files,
    });
  }

  render() {
    return (
      <div className="createProductFormLeft">
        <DropzoneArea
          acceptedFiles={["image/*"]}
          onChange={this.handleChange.bind(this)}
          showFileNames
          showAlerts={false}
          filesLimit={3}
        />
      </div>
    );
  }
}

export default CreateProductFormLeft;
