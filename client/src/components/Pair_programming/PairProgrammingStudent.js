import { jssPreset } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyGroupPp } from '../../redux/actions/pp'
import { getStudent } from '../../redux/actions/user';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import MessageIcon from '@material-ui/icons/Message';
import {getMsg,deleteMsgs} from '../../redux/actions/msg'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: "10px",
        width: "30%",
        backgroundColor: "#FFFFDD"
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function PairProgrammingStudent(){
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem("user"))
    const compañeros = useSelector(state => state.myGroupPp.data)
    const miInfoStudent = useSelector(state => state.student.data)
    const [active, setActive] = useState(false)
    const chats = useSelector(state => state.msg.chats)
    const token = localStorage.getItem('token')
    const history = useHistory();
    const userId = localStorage.getItem("idUser")  

    useEffect(() => {
        dispatch(getStudent(user.id))
        
    }, [])

    const handleClick = user => { 
        let validate = true;
        chats.map((chat) => {
            if(chat.from.id === user.id || chat.to.id === user.id){
                dispatch(getMsg(chat.id,token))
                validate = false
            }

        })
        if(validate){
            dispatch(deleteMsgs())
            localStorage.removeItem('chat');
        }
        localStorage.setItem('toUser', JSON.stringify(user));       
        history.push('/panel/mensaje_directo')
    };

    if(miInfoStudent && !active) {
        dispatch(getMyGroupPp(miInfoStudent[0].grouppId))
        setActive(true)
    } 
    console.log(compañeros)

    return (
        <div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <h1>{ compañeros && compañeros.gpp.name} </h1>
                <h1>Mis Compañeros</h1>
            </div>
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {compañeros && compañeros.students.map(alumno => (
                    <Paper key={alumno.id} className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img style={{ height: "70px", display: "flex", alignItems: "center" }} className={classes.img} alt="complex" src={alumno.user.image} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" style={{ fontWeight: "bold", height: "30px" }}>
                                            {alumno.user && alumno.user.name + " " + alumno.user.lastName}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>
                                            {alumno.user.email}
                        </Typography>
                                    </Grid>
                                    <Grid item>
                                    </Grid>
                                </Grid>
                                <Grid item>                                                 
                                {alumno.user.id != userId ?<Typography variant="subtitle1" style={{ display: "flex", marginTop: "25px", cursor: "pointer" }} >
                                     <MessageIcon onClick={()=>handleClick(alumno.user)}/>
                                    </Typography>: null}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </div>
        </div>
    )
}