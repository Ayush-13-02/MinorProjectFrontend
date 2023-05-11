import React from 'react';
import AOS from 'aos';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import drinking from '../img/drinking.jpg'
import HeroButtons from '../components/HeroButtons';

const Hero = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(
        theme.breakpoints.up('md'),
        { defaultMatches: true }
    );

    React.useEffect(() => {
        AOS.init({
            once: true,
            delay: 50,
            duration: 600,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <Box
            maxWidth={{ sm: 720, md: 1236 }}
            width={1}
            margin='0 auto'
            paddingTop={10}
            backgroundColor={theme.palette.background.default}
        >
            <Grid container spacing={4} alignItems='center' marginTop='20px'>
                <Grid item xs={12} md={6}>
                    <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
                        <Box marginBottom={2}>
                            <Typography
                                variant='h1'
                                color={theme.palette.text.primary}
                                align='center'
                                marginTop='30px'
                            >
                                Fill the Water Detail
                            </Typography>
                        </Box>
                        <Box marginBottom={3}>
                            <Typography
                                variant='h4'
                                color={theme.palette.text.secondary}
                                align='center'
                                paddingTop={3}
                                paddingBottom={3}
                                marginBottom='15px'
                            >
                                Website will tell Water is Good for Drinking or not
                            </Typography>
                        </Box>
                        <HeroButtons />
                    </Box>
                </Grid>
                <Grid 
                    item 
                    container 
                    alignItems='left' 
                    justifyContent='left' 
                    xs={12} 
                    md={6}
                >
                    <Box
                        sx={{
                            height: { xs: 'auto', md: 1 },
                            '& img': {
                                objectFit: 'cover'
                            },
                            '& .lazy-load-image-loaded': {
                                height: 1,
                                width: 1
                            }
                        }}
                    >
                        <img style={{height:393, maxHeight:393}} src={drinking} alt='landing page image'/>
                        {/* <iframe width="200%" height="393"  src="https://www.youtube.com/embed/6azgSZVqhHI" title="19 02 2023 14 39 57 REC" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Hero;