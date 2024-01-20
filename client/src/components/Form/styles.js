
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: useTheme().spacing(1),
        },
    },
    paper: {
        padding: useTheme().spacing(2),
        position: 'absolute',
        // top: useTheme().spacing(2),
        right: useTheme().spacing(5),
        // width: '300px', // Adjust the width as needed
        // maxHeight: '80vh', // Adjust the max height as needed
        // overflow: 'auto',
        width : '300px',
        display : "flex",

    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        boxShadow: 'inherit'
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        margin: useTheme().spacing(2),
    },
}));