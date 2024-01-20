
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';


export default makeStyles(() => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    smMargin: {
        margin: useTheme().spacing(1),
    },
    actionDiv: {
        textAlign: 'center',
    },
}));