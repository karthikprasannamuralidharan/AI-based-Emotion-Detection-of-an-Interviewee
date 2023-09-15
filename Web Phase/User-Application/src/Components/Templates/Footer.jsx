import React from 'react'
function Footer() {
    return (
        <>
        <script src="https://kit.fontawesome.com/12f34b22b8.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://kit.fontawesome.com/12f34b22b8.css" crossorigin="anonymous"></link>
            <footer>
                <div className="footer-content">
                    <div className="main-item">
                        <p className='item-heading'>About Us</p>
                        <p style={{color: "#FF8300",fontSize: "1em"}}>We are startup company providing Interviewee Analysis feature.</p>
                    </div>
                    <div className="main-item">
                        <p className='item-heading'>Connect WIth Us</p>
                        <div className='sub-items'>
                            <p style={{color: "#FF8300",margin: '2px'}}><i class="fab fa-twitter fa-lg fa-beat"></i></p>
                            <p style={{color: "#FF8300",margin: '2px'}}><i class="fab fa-instagram"></i></p>
                            <p style={{color: "#FF8300",margin: '2px'}}><i class="fab fa-linkedin"></i></p>
                        </div>
                    </div>
                    <div className="main-item">
                        <p className='item-heading'>Contact Us Here</p>
                        <div className='contact-us'>
                            <div className='contact-us-sub-items'>
                                <p style={{color: "#FF8300",margin: '2px'}}><i class="fas fa-map-marker-alt"></i></p>
                                <p style={{color: "#FF8300",margin: '2px'}}><i class="fas fa-envelope"></i></p>
                            </div>
                            <div className='contact-us-sub-items'>
                                <h6>Pillai COllege Of Engineering</h6>
                                <h6>college@gmail.com</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer