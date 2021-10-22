import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useDispatch } from 'react-redux';
import { createContents } from '../../redux/action/createAct';

const editorConfiguration = {
   toolbar: [
      "Heading",
      "|",
      "FontSize",
      "Bold",
      "Italic",
      "|",
      "NumberedList",
      "BulletedList",
      "BlockQuote",
      "InsertTable",
      "Link",
      "Undo",
      "Redo",
   ]
};

const Editor5 = () => {
   const dispatch = useDispatch();
   const writeSave = (contents)=>{
      dispatch(createContents(contents));
   }
   return (
      <div style={{ width: "100%", padding: "8px" }}>
         <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data=""
            onBlur={(event, editor) => {
               const data = editor.getData();
               writeSave(data)
             }}
         />
      </div>
   );

}

export default Editor5;