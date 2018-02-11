import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PhotoAdd from 'material-ui/svg-icons/image/add-a-photo';

const buttonCamera = (props) => {

  const style = {
    marginRight: 20,
  };

  return (
    <FloatingActionButton style={style}>
      <PhotoAdd>
      <input type="file" name="image" accept="image/*" capture="user"/>
      </PhotoAdd>
    </FloatingActionButton>
  )
}

export default buttonCamera;