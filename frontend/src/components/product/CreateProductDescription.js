import React from 'react';
import "./CreateProductDescription.css";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

const CreateProductDescription = ({handleDetails, values }) => {

  function handleEditorChange({ html, text }) {
    
    handleDetails(html, `${text}`)
  }
  
  return (
    <div className="CreateProductDescriptionContainer">
          <MdEditor value={values.details.text}   style={{ height: '350px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />

    </div>
  );

};

export default CreateProductDescription;
