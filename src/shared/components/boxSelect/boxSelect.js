import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
export default function BasicSelect(props) {
    const [state, setState] = React.useState('');

    const handleChange = (event) => {
        setState(event.target.value);
        props.onChange(event.target.value)
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80vh"
        }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label={props.title}
                    onChange={handleChange}
                >
                    {props.itens.map(e =>
                        <MenuItem value={e.value}>{e.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
        </Container>
        
    );
}
