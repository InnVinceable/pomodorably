import React from 'react';
import Logo from './logo';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/Input'
import Switch from '@material-ui/core/Switch';

const Options = () => <div className="app">
  <Logo />
  <div className="input-group">
    <FormControlLabel
      control={<Switch value="hidden" color="primary" />}
      label="Use notifications"
    />
  </div>
  <div className="input-group">
    <FormControlLabel
      control={<Switch value="hidden" color="primary" />}
      label="Minimize to tray"
    />
  </div>
</div>

export default Options;
