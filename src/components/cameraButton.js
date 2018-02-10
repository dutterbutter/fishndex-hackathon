import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionCameraEnhance from 'material-ui/svg-icons/action/camera-enhance';

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};

const ButtonCamera = () => (
  <div>
    <IconButton
      iconStyle={styles.smallIcon}
      style={styles.small}
    >
      <ActionCameraEnhance />

    </IconButton>
  </div>
);

export default ButtonCamera;