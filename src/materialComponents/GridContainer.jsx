import React from 'react'
import {Grid,Container,Paper,makeStyles} from '@material-ui/core';

function GridContainer() {
    let useStyles = makeStyles({
        size: {
            height: "20vh",
            backgroundColor: "lightgray"
        },
        color: {
            color: "lightgreen"
        }
    })
    let classes = useStyles();
    return (
       
            <Container>
                <Grid container spacing={4} >
                    <Grid item  md={5}>
                        <Paper className={[classes.size, classes.color]}
                        >Hello1</Paper>
                    </Grid>
                    <Grid item  md={5} >
                        <Paper className={classes.size}>Hello2</Paper>

                    </Grid>
                    <Grid item >
                        <Paper className={classes.size}>Hello3</Paper>
                    </Grid>
                </Grid>
                
            </Container>
    
    )
}

export default GridContainer;
