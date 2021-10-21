import React, { Component } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
   toolbar: [
   "Undo",
   "Redo",
   "Heading",
   "FontSize",
   "Bold",
   "HtmlEmbed",
   "Indent",
   "Italic",
   "BlockQuote",
   "Link"]
};

class Editor5 extends Component {
   render() {
      return (
         <div style={{width:"100%",padding:"8px"}}>
            <CKEditor
               editor={Editor}
               config={editorConfiguration}
               data=""
               onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, data });
               }}
            />
         </div>
      );
   }
}

export default Editor5;
