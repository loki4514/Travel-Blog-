import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import { deepPurple } from "@mui/material/colors";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // verticalAlign: 'middle',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    float : 'right',
    alignItems: 'right',
    // width: '400px',
    justifyContent : 'space-between'

  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    gap: '15px', 
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',

  },
  login : {
    marginLeft:'50px'
  },
  purple: {
    color: useTheme().palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));