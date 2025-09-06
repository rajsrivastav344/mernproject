import axios from 'axios';
import React, { useState } from 'react';


const AdminLogin = () => {

    const [form, setForm] = useState({
        email:'',
        password:''
    });

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value});

    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/admin/login',form);
        if(res.data.message=="Login Successfully"){
            alert("Login Successfully");
            localStorage.setItem('adminEmail',res.data.admin.email);
            localStorage.setItem('id',res.data.admin.id);
            localStorage.setItem('role',res.data.admin.role);
            window.location.href='/adminDashboard'
        }

    }



    const styles = {
        page: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)',
            fontFamily: 'Segoe UI, sans-serif',
        },
        card: {
            width: '900px',
            height: '520px',
            display: 'flex',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
            backgroundColor: '#fff',
        },
        leftPanel: {
            flex: 1,
            background: 'linear-gradient(135deg, #570c78ff, #593a78, #8b44d2ff)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: '30px',
        },
        abstractCircles: {
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(239, 104, 248, 0.15)',
            zIndex: 0,
        },
        bigCircle: {
            width: '140px',
            height: '140px',
            top: '18%',
            left: '10%',
        },
        smallCircle: {
            width: '90px',
            height: '90px',
            bottom: '12%',
            right: '10%',
        },
        welcomeText: {
            fontSize: '23px',
            fontWeight: '600',
            marginBottom: '5px',
            zIndex: 1,
            color: '#9582bcff',
        },
        subText: {
            fontSize: '15px',
            opacity: 0.9,
            zIndex: 1,
            textAlign: 'center',
        },
        rightPanel: {
            flex: 1,
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
        },
        formBox: {
            width: '100%',
            maxWidth: '300px',
        },
        heading: {
            fontSize: '40px',
            marginBottom: '2px',
            fontWeight: '600',
            display: 'inline-block',

            borderBottom: '4px solid',
            color: '#4a0b65ff',

        },
        subheading: {
            color: '#d4a3ffff',
            fontSize: '37px',
            marginBottom: '1px',

        },
        label: {
            fontSize: '15px',
            fontWeight: '500',
            marginBottom: '1px',
        },
        input: {
            width: '100%',
            padding: '10px 8px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '14px',
            marginBottom: '10px',
            outline: 'none',
        },
        submitBtn: {
            width: '100%',
            padding: '11px',
            border: 'none',
            borderRadius: '6px',
            background: 'linear-gradient(to right, #3a0451ff, #7827c0ff)',
            color: '#fff',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '10px',
            transition: 'background 0.3s ease',
            marginTop: '5px'
        },
        orDivider: {
            textAlign: 'center',
            color: '#999',
            fontSize: '13px',
            marginBottom: '10px',
        },
        googleButton: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '12px',
        },
        createAccount: {
            textAlign: 'center',
            fontSize: '13px',
            marginTop: '6px',
            color: '#444',
        },
        link: {
            marginLeft: '6px',
            color: '#8e2de2',
            textDecoration: 'none',
            fontWeight: '500',
        },

    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                {/* Left Panel */}
                <div style={styles.leftPanel}>
                    <div style={{ ...styles.abstractCircles, ...styles.bigCircle }} />
                    <div style={{ ...styles.abstractCircles, ...styles.smallCircle }} />
                    <div style={styles.subheading}>Welcome Back Admin!!</div>
                    <div style={styles.welcomeText}>Your command center awaits.</div>
                    <div style={styles.subText}>Manage users, monitor exams, and track performance — all in one place.

                    </div>
                </div>

                {/* Right Panel */}
                <div style={styles.rightPanel}>
                    <form style={styles.formBox} method='POST' onSubmit={handleSubmit}>

                        <div style={{ textAlign: 'center' }}>
                            <div className='border-b-2' style={styles.heading}>Admin Login</div>
                        </div>
                        <br />
                        <label htmlFor="email" style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter Email"

                            style={styles.input}
                        />

                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="••••"
                            required
                            style={styles.input}
                        />

                        <button type="submit" style={styles.submitBtn}>Log In</button>

                        <div style={styles.orDivider}>or</div>

                        <div style={styles.googleButton}>
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                style={{ width: '16px', verticalAlign: 'middle' }}
                            />
                            Sign in with Google
                        </div>

                        <div style={styles.createAccount}>
                            Don't have an account?
                            <a href="#" style={styles.link}>Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
