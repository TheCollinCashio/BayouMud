import React from 'react';

/* Import Components */
import {
    IconButton,
    InputAdornment,
    TextField,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function PasswordField(props) {
    const [showPassword, setVisibility] = React.useState(false)

    return (
        <TextField
            variant="outlined"
            type={showPassword ? "text" : "password"}
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            value={props.value}
            onChange={props.onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            aria-label="Toggle password visibility"
                            onClick={() => setVisibility(!showPassword)}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}
