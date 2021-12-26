import {useState, useEffect} from "react";
import {Box, Grid} from '@mui/material';
import {connect} from "react-redux";
import {Alert} from "@mui/material";
import axios from "axios";
import ContactModal from "../components/ContactModal";
import ContactPopup from "../components/ContactPopup";


function Contact ({token, user_id}) {
    const [auth, setAuth] = useState("");
    const [contact, setContact] = useState([])

    const refresh = async () => {
        setAuth("");
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({
            user_id: user_id,
            token: token
        });
        try {
            const res = await axios.post(`/api/dashboard`, body, config);
            setAuth(res.data.message);
            console.log(res);
            if (res.data.message === "Success") {
                setContact(res.data.data);
            }
        } catch (err) {
            console.log(err);
            setAuth("Error when authenticating user. Try logout and login again.");
            return;
        }
    }

    //Refresh contact list
    useEffect(() => {
        refresh();
     },[])

    return (
        <div className={"contact"}>
            <Grid centered>
                <br/>
                {(auth !== "Success") && <Alert severity="error">{auth}</Alert>}
                {(auth === "Success") &&
                contact.length ? contact.map((info) => (
                    <ContactPopup name={info.name} detail={`Phone: ${info.phone} | Email: ${info.email}`} className={"modal"}/>
                )) : <h1>No contact...</h1>
                }
                {(auth === "Success") &&
                <ContactModal/>
                }
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    user_id: state.auth.user_id
})

export default connect(mapStateToProps)(Contact);
