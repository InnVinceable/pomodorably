import React from 'react';
import Logo from './logo';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/Input'
import Switch from '@material-ui/core/Switch';

const Options = () => <div className="app">
    <Logo />
    <label className="input-group">
        <FormControlLabel
          control={<Switch value="hidden" color="primary" />}
          label="Use notifications"
        />
        <FormControlLabel
          control={<Switch value="hidden" color="primary" />}
          label="Start when computer starts"
        />
        <FormControlLabel
          control={<Switch value="hidden" color="primary" />}
          label="Minimize to tray"
        />
        <FormControlLabel
          control={<TextField
            id="standard-name"
            label="Name"
          />}
          label="Minimize to tray"
        />
    </label>
</div>

export default Options;
