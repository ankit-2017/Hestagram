import React, {Component} from 'react';
import {Button, Col, Row, Form, FormControl, FormGroup, ControlLabel,Alert, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import LocalStorage from 'localstorage';
import UserData from "./UserData";
import user from './images/user.png';
import axios from 'axios';
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import {post} from "axios/index";

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import ip from './env'

import {image64toCanvasRef,
    extractImageFileExtensionFromBase64,
    base64StringtoFile,
    downloadBase64File} from './ReusableUtils'
import Popup from 'react-popup'
import './Css/PopupStyle.css'

const imageMaxSize=1000000 //bytes
const acceptedFileType ='image/png, image/jpg, image/jpeg'
const acceptedFileTypesArray= acceptedFileType.split(',').map(item=>{return item.trim()})




class EditProfilePage extends Component{
    constructor(props){
        super(props);
        this.imagePreviewCanvasRef = React.createRef()
        this.state={
            UserData:'',
            userDetail:'',
            search:'',
            value:'',
            RawImage:'',
            view:true,
            showform:false,
            cityView:true,
            cityform:false,
            schoolView:true,
            schoolform:false,
            collegeView:true,
            collegeform:false,
            HobbyView:true,
            Hobbyform:false,
            EmailView:true,
            Emailform:false,
            MobileView:true,
            Mobileform:false,
            nameChanged:false,
            message:'',
            showPic:true,
            profilePicture:'',
            ProfileData:'',
            withoutCrop:true,

            imgSrc:null,
            cropedImage:null,
            crop:{
                aspect:1/1

            },
            showSaveButton:false
        }

    }

    EditForm=()=>{
        let view1= this.state.view;
        let show = this.state.showform;
        this.setState({view:!view1, showform:!show});
    }
    EditSchool=()=>{
        let view1= this.state.schoolView;
        let show = this.state.schoolform;
        this.setState({schoolView:!view1, schoolform:!show});
    }
    EditCollege=()=>{
        let view1= this.state.collegeView;
        let show = this.state.collegeform;
        this.setState({collegeView:!view1, collegeform:!show});
    }
    EditEmail=()=>{
        let view1= this.state.EmailView;
        let show = this.state.Emailform;
        this.setState({EmailView:!view1, Emailform:!show});
    }
    EditMobile=()=>{
        let view1= this.state.MobileView;
        let show = this.state.Mobileform;
        this.setState({MobileView:!view1, Mobileform:!show});
    }

    EditCity=()=>{
        let view1= this.state.cityView;
        let show = this.state.cityform;
        this.setState({cityView:!view1, cityform:!show});
    }


    componentWillMount(){
        const foo= new LocalStorage('UserData');
        const abc= foo.get('UserData');
        this.setState({UserData: abc[1]})
    }
    componentDidMount(){
        const self=this;
        axios.post(`${ip}/api/getUserDetail`,{
            username: self.state.UserData.data2.username
        })
            .then(response=>{
                console.log('user detail', response);
                self.setState({userDetail:response.data.data})
            })
            .catch(error=>{
                console.log(error);
            })

    }

    SaveName=()=>{
        const name=document.getElementById('name').value;
        if(name===""){
            Popup.create({
                title:'Null value alert',
                content:"Fields cannot be empty",
                buttons:{
                    right:[{
                        text:'Cancel',
                        className:'danger',
                        action:function () {
                            Popup.close();
                        }

                    }]
                }
            })
            return false
        }
        else {

            const self = this;
            axios.post(`${ip}/api/EditName`, {
                username: this.state.UserData.data2.username,
                name: name
            })
                .then(response => {
                    if (response.data.error === false) {
                        self.setState({nameChanged: true, message: response.data.message});
                        let view1 = self.state.view;
                        let show = self.state.showform;
                        self.setState({view: !view1, showform: !show});
                        window.location = '/Edit-profile';
                    }
                })
                .catch(error => {
                    console.log('error');
                })
        }
    }

    SaveCity=()=>{
        const city=document.getElementById('city1').value;
        if(city===""){
            Popup.create({
                title:'Null value alert',
                content:"Fields cannot be empty",
                buttons:{
                    right:[{
                        text:'Cancel',
                        className:'danger',
                        action:function () {
                            Popup.close();
                        }

                    }]
                }
            })
            return false
        }
        else {

            const self = this;
            axios.post(`${ip}/api/EditCity`, {
                username: this.state.UserData.data2.username,
                city: city
            })
                .then(response => {
                    console.log('Edited Name', response);
                    if (response.data.error === false) {
                        self.setState({nameChanged: true, message: response.data.message});
                        let view1 = self.state.cityView;
                        let show = self.state.cityform;
                        self.setState({cityView: !view1, cityform: !show});
                        window.location = '/Edit-profile';
                    }
                })
                .catch(error => {
                    console.log('error');
                })
        }
    }

    SaveSchool=()=>{
        const school=document.getElementById('school').value;
        if(school===""){
            Popup.create({
                title:'Null value alert',
                content:"Fields cannot be empty",
                buttons:{
                    right:[{
                        text:'Cancel',
                        className:'danger',
                        action:function () {
                            Popup.close();
                        }

                    }]
                }
            })
            return false
        }
        else {

            const self = this;
            axios.post(`${ip}/api/EditSchool`, {
                username: this.state.UserData.data2.username,
                school: school
            })
                .then(response => {
                    console.log('Edited Name', response);
                    if (response.data.error === false) {
                        self.setState({nameChanged: true, message: response.data.message});
                        let view1 = self.state.schoolView;
                        let show = self.state.schoolform;
                        self.setState({schoolView: !view1, schoolform: !show});
                        window.location = '/Edit-profile';
                    }
                })
                .catch(error => {
                    console.log('error');
                })
        }
    }

    SaveCollege=()=>{
        const college=document.getElementById('college').value;
        if(college===""){
            Popup.create({
                title:'Null value alert',
                content:"Fields cannot be empty",
                buttons:{
                    right:[{
                        text:'Cancel',
                        className:'danger',
                        action:function () {
                            Popup.close();
                        }

                    }]
                }
            })
            return false
        }
        else {

            const self = this;
            axios.post(`${ip}/api/EditCollege`, {
                username: this.state.UserData.data2.username,
                college: college
            })
                .then(response => {
                    console.log('Edited Name', response);
                    if (response.data.error === false) {
                        self.setState({nameChanged: true, message: response.data.message});
                        let view1 = self.state.collegeView;
                        let show = self.state.collegeform;
                        self.setState({collegeView: !view1, collegeform: !show});
                        window.location = '/Edit-profile';
                    }
                })
                .catch(error => {
                    console.log('error');
                })
        }
    }

    SaveEmail=()=>{
        const email=document.getElementById('Email').value;
        if(email===""){
            Popup.create({
                title:'Null value alert',
                content:"Fields cannot be empty",
                buttons:{
                    right:[{
                        text:'Cancel',
                        className:'danger',
                        action:function () {
                            Popup.close();
                        }

                    }]
                }
            })
            return false
        }
        else {

            const self = this;
            axios.post(`${ip}/api/EditEmail`, {
                username: this.state.UserData.data2.username,
                email: email
            })
                .then(response => {
                    console.log('Edited Name', response);
                    if (response.data.error === false) {
                        self.setState({nameChanged: true, message: response.data.message});
                        let view1 = self.state.EmailView;
                        let show = self.state.Emailform;
                        self.setState({EmailView: !view1, Emailform: !show});
                        window.location = '/Edit-profile';
                    }
                })
                .catch(error => {
                    console.log('error');
                })
        }
    }

    SaveMobile=()=>{
        const mobile=document.getElementById('mobile').value;
        if(mobile===""){
            Popup.create({
                title:'Null value alert',
                content:"Fields cannot be empty",
                buttons:{
                    right:[{
                        text:'Cancel',
                        className:'danger',
                        action:function () {
                            Popup.close();
                        }

                    }]
                }
            })
            return false
        }
        else {

            const self = this;
            axios.post(`${ip}/api/EditMobile`, {
                username: this.state.UserData.data2.username,
                mobile: mobile
            })
                .then(response => {
                    console.log('Edited Name', response);
                    if (response.data.error === false) {
                        self.setState({nameChanged: true, message: response.data.message});
                        let view1 = self.state.MobileView;
                        let show = self.state.Mobileform;
                        self.setState({MobileView: !view1, Mobileform: !show});
                        window.location = '/Edit-profile';

                    }
                })
                .catch(error => {
                    console.log('error');
                })
        }
    }
    handleHide=()=>{
        this.setState({show:false})
    };
// image cropping code

    VerifyFiles=(files)=>{
        if(files && files.length >0){
            const currentFiles=files[0];
            const currentFileType = currentFiles.type
            const currentFileSize = currentFiles.size
            if(currentFileSize> imageMaxSize){
                alert("file size exceed limit 1 mb")
                return false
            }
            if(!acceptedFileTypesArray.includes(currentFileType)){
                alert('this file type is not allowed')
                return false
            }
            return true
        }
    }

    ProfilePic=(event)=>{
        event.preventDefault()
        const files=event.target.files;
        if(files && files.length >0){
            const isVerified= this.VerifyFiles(files)
            if(isVerified){
                const currentFile=files[0]
                const myFileItemReader = new FileReader()
                const self = this;
                myFileItemReader.addEventListener("load",()=>{
                    console.log(myFileItemReader.result)
                    self.setState({
                        imgSrc:myFileItemReader.result,RawImage:files[0]
                    })
                }, false)
                myFileItemReader.readAsDataURL(currentFile)
            }
        }
        // this.setState({showPic:false});
        // let profile= event.target.files[0];
        // const preview1 = document.getElementById('profilepic');
        // preview1.src= URL.createObjectURL(event.target.files[0]);
        //
        // this.setState({profilePicture:profile});

    }

    handleImageloaded=(image)=>{
        // console.log(image)
    }
    handleOnCrop=(crop)=>{
        this.setState({crop:crop})

    }
    handleOnCropComplete=(crop, pixelCrop)=>{
        // console.log(crop, pixelCrop)
        const canvasRef = this.imagePreviewCanvasRef.current
        const imgSrc = this.state.imgSrc
        image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
    }

    handleDownloadClick=(event)=>{
        event.preventDefault()
        const canvasRef = this.imagePreviewCanvasRef.current
        const imgSrc = this.state.imgSrc
        const fileExtension=extractImageFileExtensionFromBase64(imgSrc)
        const image64Data = canvasRef.toDataURL('image/'+fileExtension)

        const myFileName = "ProfilePicture."+fileExtension

        //file to upload
        const myNewCropedFile = base64StringtoFile(image64Data, myFileName)
        console.log(myNewCropedFile)
        this.setState({cropedImage:myNewCropedFile?myNewCropedFile:this.state.RawImage, showSaveButton:true, withoutCrop:false})


        // downloadBase64File(image64Data, myFileName);
    }

    // image cropping ends here

    saveImage =(event)=>{
        event.preventDefault();

        if(this.state.cropedImage==="" || this.state.RawImage==="" ){
            alert('file cannot be empty');
            return false

        }
        else {
            const self = this;
            this.fileUpload(this.state.cropedImage?this.state.cropedImage:this.state.RawImage, self.state.UserData.data2.username)
                .then((response) => {
                    console.log(response);
                    self.setState({ProfileData: response.data.Picdata.profile_img});

                    document.location.href = '/Edit-profile';
                })
                .catch((err) => {
                    console.log("Error", err);
                });
        }

    };

    fileUpload = (Pic, username) => {
        const url = `${ip}/api/EditProfilePic`;
        const formData = new FormData();
        formData.append('Pic',Pic);
        formData.append('username', username);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return  post(url, formData,config)
    };


    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value, Plocation:e.target.value})
    };

    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction);
        this.setState({search: "", value: geocodedPrediction.formatted_address})
    };

    render(){
        const Key= "AIzaSyAsqj2hZecaNhLJ4nAt4TQuW8j2d9B7lwQ";
        const {search, value} = this.state;
        const name=this.state.userDetail.fullname;
        const city=this.state.userDetail.city;
        const school=this.state.userDetail.school;
        const editColor={
            color:'blue',
            cursor:'pointer'
        };
        const style={
            height:'80%',
            width:'100%',
            display:'inline-block'
        }


        const {imgSrc} = this.state
        const {crop} = this.state
        return(
            <div >
                <div id="top-detail">
                    <Popup />
                    <Row >
                        {this.state.nameChanged?<Alert bsStyle='success'>{this.state.message}</Alert>:null}
                        <Col md={2} sm={2} xs={2} >
                            <div id="edit-photo">
                                {this.state.userDetail.profile_img === "" ?
                                    <img src={user} className="img-circle" alt="profile"/> :
                                    <img
                                        src={`${ip}/upload/assets/profile/` + this.state.userDetail.profile_img}
                                        className="img-circle"
                                        alt="profile"
                                    />
                                }
                            </div>
                        </Col>
                        <Col md={6} sm={8} xs={8} >
                            <div id="editUser">
                                <p>{this.state.userDetail.username}</p>
                                <Link to='#' onClick={()=>this.setState({show: true})} >Edit Profile photo</Link>
                            </div>
                            <Modal {...this.props}
                                   show={this.state.show}
                                   onHide={this.handleHide}
                                   container={this}
                                   bsSize='large'
                                   aria-labelledby="editPic"
                            >

                                <Modal.Header closeButton >
                                    <Modal.Title id='editPic' >Select your profile picture</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        {/*<div id="profileDiv" >*/}
                                                {/*<img id="profilepic" className='img-circle'/>*/}
                                        {/*</div>*/}
                                        <div id="profileDiv"  >
                                            <input type="file"
                                                    required
                                                    id="fileButton"
                                                   accept={acceptedFileType}
                                                    ref={selectFile=>this.selectFile=selectFile}
                                                    onChange={this.ProfilePic}
                                            />
                                            {this.state.imgSrc !== null ?
                                                <div>
                                                    {/*<img src={imgSrc} style={style} alt="preview" />*/}
                                                    <div style={style} >
                                                        <ReactCrop
                                                            src={imgSrc}
                                                            crop={crop}
                                                            onImageLoaded={this.handleImageloaded}
                                                            onComplete={this.handleOnCropComplete}
                                                            onChange={this.handleOnCrop}
                                                        />
                                                    </div>
                                                    <div>
                                                            <canvas id="mycanvas" ref={this.imagePreviewCanvasRef}></canvas>
                                                            <Button bsStyle="success" onClick={this.handleDownloadClick}>Done Cropping</Button>
                                                        {this.state.withoutCrop ?
                                                            <Button bsStyle="primary" onClick={this.saveImage}>Save
                                                                without crop </Button>
                                                            : null
                                                        }
                                                    </div>

                                                </div> :
                                                <Button
                                                    id="selectButton"
                                                    type="button"
                                                    onClick={() => this.selectFile.click()}
                                                    bsStyle="primary">Select Picture
                                                </Button>
                                            }

                                            {this.state.showSaveButton?
                                                <Button
                                                    type="button"
                                                    id="saveButton"
                                                    onClick={this.saveImage}
                                                    bsStyle="primary" >Save Profile Picture
                                                </Button>
                                                    :null
                                            }
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </Col>
                    </Row>
                </div>
                <Form horizontal >
                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel >Full Name</ControlLabel>
                        </Col>
                        <Col md={6} sm={8} xs={8}  >
                            {this.state.view?<span>{name}</span>:null}
                            {this.state.showform?<span><FormControl type="text" id="name" placeholder="Full name" />
                                    <Button type='button' bsStyle='success' onClick={this.SaveName} bsSize='small'>save</Button>
                                </span>
                                : null}
                        </Col>
                        <Col md={1} sm={1} xs={1} >
                            <span style={editColor} className='fa fa-edit' onClick={this.EditForm} />
                        </Col>

                    </FormGroup>

                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel >City</ControlLabel>
                        </Col>
                        <Col md={6} sm={8} xs={8} >
                            {this.state.cityView?<span>{city}</span>:null}
                            <ReactGoogleMapLoader
                                params={{
                                    key: Key,
                                    libraries: "places,geocode",
                                }}
                                render={googleMaps =>
                                    googleMaps && (
                                        <ReactGooglePlacesSuggest
                                            googleMaps={googleMaps}
                                            autocompletionRequest={{
                                                input: search,
                                                // Optional options
                                                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                                            }}
                                            // Optional props
                                            onSelectSuggest={this.handleSelectSuggest}
                                            textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                                            customRender={prediction => (
                                                <div className="customWrapper">
                                                    {prediction
                                                        ? prediction.description
                                                        : "My custom no results text"}
                                                </div>
                                            )}
                                        >

                                            { this.state.cityform?
                                                <FormGroup ><span>
                                                <FormControl
                                                    type="text"
                                                    id="city1"
                                                    value={value}
                                                    autoComplete='off'
                                                    placeholder="Search Your city"

                                                    onChange={this.handleInputChange}
                                                />
                                                <Button type='button' onClick={this.SaveCity} bsStyle='success' bsSize='small' >Save</Button>
                                            </span>
                                            </FormGroup>:null}
                                        </ReactGooglePlacesSuggest>
                                    )
                                }
                            />

                        </Col>
                        <Col md={1} sm={1} xs={1} >
                            <span style={editColor} className='fa fa-edit' onClick={this.EditCity} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel >School</ControlLabel>
                        </Col>
                        <Col md={6} sm={8} xs={8} >
                            {this.state.schoolView?<span>{school}</span>:null}
                            {this.state.schoolform?
                                <span>
                                    <FormControl type="text" id="school" placeholder="School"/>
                                    <Button type='button' onClick={this.SaveSchool} bsStyle='success' bsSize='small'>save</Button>
                                </span>:
                                null}
                        </Col>
                        <Col md={1} sm={1} xs={1}>
                            <span style={editColor} className='fa fa-edit' onClick={this.EditSchool} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel >College</ControlLabel>
                        </Col>
                        <Col md={6} sm={8} xs={8}>
                            {this.state.collegeView?<span>{this.state.userDetail.college}</span>:null}
                            {this.state.collegeform?
                                <span>
                                <FormControl type="text" id="college" placeholder="college"/>
                                    <Button type='button' onClick={this.SaveCollege} bsStyle='success' bsSize='small'>save</Button>
                                </span>
                                    : null}
                        </Col>
                        <Col md={1} sm={1} xs={1}>
                            <span style={editColor} className='fa fa-edit' onClick={this.EditCollege} />
                        </Col>
                    </FormGroup>


                    <FormGroup>
                        <Col md={5} mdOffset={2}>
                            <h4>Private Information</h4>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={2} >
                            <ControlLabel >Email Id</ControlLabel>
                        </Col>
                        <Col md={6} sm={8} xs={8} >
                            {this.state.EmailView?<span>{this.state.userDetail.Email}</span>:null}
                            {this.state.Emailform?
                                <span>
                                <FormControl type="email" id="Email" placeholder="Email"/>
                                    <Button type='button' onClick={this.SaveEmail} bsStyle='success' bsSize='small'>save</Button>
                                </span>
                                    : null}
                        </Col>
                        <Col md={1} sm={1} xs={1} >
                            <span style={editColor} className='fa fa-edit' onClick={this.EditEmail} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel >Mobile no.</ControlLabel>
                        </Col>
                        <Col md={6} sm={8} xs={8} >
                            {this.state.MobileView?<span>{this.state.userDetail.mobile_no}</span>:null}
                            {this.state.Mobileform?
                                <span>
                                <FormControl type="text" id="mobile" placeholder="Contact no"/>
                                    <Button type='button' onClick={this.SaveMobile} bsStyle='success' bsSize='small'>save</Button>
                                </span>
                                    : null}
                        </Col>
                        <Col md={1} sm={1} xs={1} >
                            <span style={editColor} className='fa fa-edit' onClick={this.EditMobile} />
                        </Col>
                    </FormGroup>

                </Form>
            </div>
        );
    }
}
export default EditProfilePage