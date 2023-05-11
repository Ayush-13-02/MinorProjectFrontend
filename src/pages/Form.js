import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import { green } from '@mui/material/colors';
import { TextField, Button } from '@mui/material';
import {MenuItem} from '@mui/material';
import CustomAlert from '../components/CustomAlert';
import EditorHeader from '../components/EditorHeader';
import EditorButtons from '../components/EditorButtons';
import Spacer from '../components/Spacer';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const Form = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(
        theme.breakpoints.up('md'),
        { defaultMatches: true }
    );
    const [send, setSend] = React.useState(false);
    const [result, setResult] = React.useState(false);
    const canvasRef = React.createRef();
    const [formData, setFormData] = useState({
        pH: "",
        Hardness: "",
        Solids: "",
        Chloramines: "",
        Sulfate: "",
        Conductivity: "",
        Organic_carbon: "",
        Trihalomethanes:"",
        Turbidity:""

    });
    const [prediction, setPrediction] = useState(null);

    const handleChange = (event) => {
        console.log(event.target.value)
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    // Create a new object with modified values
    const modifiedFormData = {
        pH: parseFloat(formData.pH),
        Hardness: parseFloat(formData.Hardness),
        Solids: parseFloat(formData.Solids),
        Chloramines: parseFloat(formData.Chloramines),
        Sulfate:parseFloat(formData.Sulfate),
        Conductivity: parseFloat(formData.Conductivity),
        Organic_carbon: parseFloat(formData.Organic_carbon),
        Trihalomethanes:parseFloat(formData.Trihalomethanes),
        Turbidity:parseFloat(formData.Turbidity)
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        window.scrollTo(0,0);
        try {
          const response = await fetch('http://127.0.0.1:8000/api/predict/', {
            method: 'POST',
            body:  JSON.stringify(modifiedFormData),
            
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          setPrediction(data);
          setSend(true);
          setResult(true);
          console.log(prediction)
          console.log(JSON.stringify(modifiedFormData))


        } catch (error) {
          console.error(error);
        }
      };
      
  
const handleDownload = () => {
    const documentDefinition = {
      content: [
        {
          text: "Is Water Good For Drinking  ",
          style: "header"
        },
        {
          text: "pH: " + formData.pH
        },
        {
          text: "Hardness: " + formData.Hardness
        },
        {
          text: "Solids: " + formData.Solids
        },
        {
          text: "Chloramines: " + formData.Chloramines
        },
        {
          text: "Sulfate: " + formData.Sulfate
        },
        {
          text: "Conductivity: " + formData.Conductivity
        },
        {
            text: "Organic_carbon: " + formData.Organic_carbon
        },
        {
            text: "Trihalomethanes: " + formData.Trihalomethanes
        },
        {
            text: "Turbidity: " + formData.Turbidity
        },
        {
          text: "Prediction: " +  `Water is ${prediction} good for Drinking`
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };
    pdfMake.createPdf(documentDefinition).download("WaterQuality.pdf");
  };
    

    

    return (
        <>
            <Helmet>
                <title>Form</title>
            </Helmet>
            <Box
                backgroundColor={theme.palette.background.default}
                minHeight='100%'
                paddingTop={15}
                paddingBottom={15}
            >
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid
                            item
                            container
                            alignItems='center'
                            justifyContent='space-between'
                            marginTop='-30px'
                            spacing={3}
                            xs={12}
                        >
                            <Grid item>
                                <EditorHeader />
                            </Grid>
                            <Grid item xs={12}>
                                {send && (
                                    <CustomAlert
                                        variant='outlined'
                                        severity='success'
                                        title='Success'
                                    >
                                        Successfully sent the Detail to the machine learning model .
                                    </CustomAlert>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                     
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="pH"
                                                    type="text"
                                                    name="pH"
                                                    value={formData.pH}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Hardness"
                                                    type="text"
                                                    name="Hardness"
                                                    value={formData.Hardness}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Solids"
                                                    type="text"
                                                    name="Solids"
                                                    value={formData.Solids}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                </TextField>
                                            </Grid>
                                         
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Chloramines"
                                                    type="text"
                                                    name="Chloramines"
                                                    value={formData.Chloramines}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Sulfate"
                                                    type="text"
                                                    name="Sulfate"
                                                    value={formData.Sulfate}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Conductivity"
                                                    type="text"
                                                    name="Conductivity"
                                                    value={formData.Conductivity}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Organic_carbon"
                                                    type="text"
                                                    name="Organic_carbon"
                                                    value={formData.Organic_carbon}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Trihalomethanes"
                                                    type="text"
                                                    name="Trihalomethanes"
                                                    value={formData.Trihalomethanes}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Turbidity"
                                                    type="text"
                                                    name="Turbidity"
                                                    value={formData.Turbidity}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                    fullWidth
                                                >
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Box height='320px'>
                                        <Box
                                            display='flex'
                                            justifyContent='center'
                                            marginBottom={2}
                                            marginTop={2}
                                        >
                                            <Typography
                                                variant='h1'
                                                align='center'
                                                fontSize='50px'
                                                marginTop="20px"
                                                gutterBottom
                                            >
                                                 Result <br />
                                            </Typography>
                                        </Box>
                                        <Box
                                            flexDirection='flex'
                                            justifyContent='center'
                                        >
                                            {result && (
                                                <>
                                                    {/* <Typography
                                                        variant='h3'
                                                        align='center'
                                                        fontSize='40px'
                                                        gutterBottom
                                                    >
                                                        The machine learning model has predicted the :
                                                    </Typography> */}
                                                    <Typography
                                                        variant='h2'
                                                        align='center'
                                                        gutterBottom
                                                    >
                                                        <span
                                                            style={{
                                                                color: green[600],
                                                                fontSize: '50px'
                                                            }}
                                                        >
                                                    { `Water is ${prediction} good for drinking` }
                                                    <br/>
                                                        </span>
                                                    </Typography>
                                                </ >
                                            )}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Box marginTop={4}>
                                <EditorButtons
                                    submitOnClick={handleSubmit}
                                    downloadOnClick={handleDownload}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Spacer sx={{ pt: 6 }} />
        </ >
    );
};

export default Form;