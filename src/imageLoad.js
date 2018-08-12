import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";

import TagsInput from 'reason-tags-input';

import 'reason-tags-input/build/styles.css';

import { Form, FormGroup, FormControl, Button, Row, Col, Modal} from 'react-bootstrap';

import './home.css';
import './Css/PopupStyle.css'
import LocalStorage from 'localstorage';
import {post} from 'axios';

import Popup from 'react-popup';

const imageMaxSize=1000000 //bytes
const acceptedFileType ='image/png, image/jpg, image/jpeg'
const acceptedFileTypesArray= acceptedFileType.split(',').map(item=>{return item.trim()})

class Example extends Component {
    constructor(props) {
        super(props);

    this.state = {
        open: false,

        button1: true,
        img: '',
        file1: '',
        file2:'',
        file3:'',
        file4:'',
        caption: '',
        Plocation: '',
        userData1: '',
        mydata: '',
        files1: '',
        images: [],
        search: '',
        value: '',
        submitted: false,
        text: "",
        tags: []
    };
        this.handleTagInput = this.handleTagInput.bind(this);
        this.handleTagRemove = this.handleTagRemove.bind(this);
        this.handleTagsClear = this.handleTagsClear.bind(this);
}

    componentWillMount(){
        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData1:abc[1]});
    }

    VerifyFiles=(files)=>{
        if(files && files.length >0){
            const currentFiles=files[0];
            const currentFileType = currentFiles.type
            const currentFileSize = currentFiles.size
            if(currentFileSize> imageMaxSize){
                Popup.create({
                    title:'Image size alert',
                    content:"Image size exceed the limit 1 Mb ",
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
            if(!acceptedFileTypesArray.includes(currentFileType)){
                Popup.create({
                    title:'Image format alert',
                    content:"This image format is not allow",
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
            return true
        }
    }

    addFile = (event) => {
        // console.log(event.target.files[0]);
        event.preventDefault();
        const files= event.target.files
        const isVarified = this.VerifyFiles(files)
        if(isVarified){
            let file1 = event.target.files[0];
            const output1 = document.getElementById('output1');
            output1.src = URL.createObjectURL(event.target.files[0]);
            this.setState({file1:file1});
        }
    };

    addFile1 = (event) => {

        event.preventDefault();
        const files= event.target.files
        const isVarified = this.VerifyFiles(files)
        if(isVarified){
            const output2 = document.getElementById('output2');
            output2.src = URL.createObjectURL(event.target.files[0]);
            let file2 = event.target.files[0];
            this.setState({file2:file2});
        }

        // console.log(this.state.file2)
    };

    addFile2 = (event) => {
        event.preventDefault();
        const files= event.target.files
        const isVarified = this.VerifyFiles(files)
        if(isVarified){
            const output3 = document.getElementById('output3');
            output3.src = URL.createObjectURL(event.target.files[0]);
            let file3 = event.target.files[0];
            this.setState({file3:file3});
        }

        // console.log(this.state.file3)
    };

    addFile3 = (event) => {
        event.preventDefault();
        const files= event.target.files
        const isVarified = this.VerifyFiles(files)
        if(isVarified){
            const output4 = document.getElementById('output4');
            output4.src = URL.createObjectURL(event.target.files[0]);
            let file4 = event.target.files[0];
            this.setState({file4:file4});
        }

        // console.log(this.state.file4)
    };

    addCaption=(event)=>{
        let caption = event.target.value;
        this.setState({caption:caption});
    };

    HandleHide=()=>{
        this.setState({show:false})
    };


// to send file data to node js
    handleForm =(event)=>{
        event.preventDefault();
        const file1=this.state.file1;
        const file2=this.state.file2;
        const file3=this.state.file3;
        const file4=this.state.file4;
        if(file1==="" && file2==="" && file3==="" && file4===""){
            Popup.create({
                title:'Image alert',
                content:"Please select atleast one image",
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

            const location = document.getElementById('ploc').value;
            const self = this;
            this.fileUpload(
                this.state.file1,
                this.state.file2,
                this.state.file3,
                this.state.file4,
                this.state.caption,
                this.state.tags,
                location,
                self.state.userData1.data2._id,
                self.state.userData1.data2.username
            )
                .then((response) => {
                    console.log(response);
                    console.log("file upload response", response.data.upload);
                    self.setState({files1: response.data.upload, images: response.data});
                    console.log('imag data', self.state.images);

                    document.location.href = '/Home';
                })
                .catch((err) => {
                    console.log("Error", err);
                });
        }

    };

    fileUpload = (file1, file2, file3, file4, caption,tags, location, userid, username) => {
        const url = 'http://localhost:4000/api/posts';
        const formData = new FormData();
        tags.map((item,i)=>{
            formData.append(`tag[]`,item);
        })
        formData.append('file1',file1);
        formData.append('file2',file2);
        formData.append('file3',file3);
        formData.append('file4',file4);

        formData.append('caption', caption);
        formData.append('location', location);
        formData.append('userid', userid);
        formData.append('username', username);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return  post(url, formData,config)
    };
    // handle hashtag

    handleTagInput(tag) {
        console.log(tag)
        this.setState({ tags: [...this.state.tags, tag]});
    }
    handleTagRemove(tag) {
        this.setState({ tags: [...this.state.tags.filter(t => t !== tag)]});
    }
    handleTagsClear() {
        this.setState({ tags: []});
    }


    // file upload ends here
    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value, Plocation:e.target.value})
    };

    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction);
        this.setState({search: "", value: geocodedPrediction.formatted_address})
    };



    render() {
        const Key= "AIzaSyAsqj2hZecaNhLJ4nAt4TQuW8j2d9B7lwQ";
        const {search, value} = this.state;

        return (
            <div>
                <Popup />


                <div className="post-form">
                    <Link to="#" id="compose" onClick={()=>this.setState({show:true})} >
                        <span className="fa fa-camera-retro">

                        </span>
                        <span id="cpost">Compose post</span>
                    </Link>
                </div>

                <Modal show={this.state.show}
                       onHide={this.HandleHide}
                       container={this}
                       aria-labelledby="homeModal"
                >
                    <Modal.Header closeButton />
                    <Modal.Body>
                    <div id="modal-div" >

                        <Form  encType="multipart/form-data" >
                            <Row>
                                <Col md={3} sm={3} xs={6}>
                                    <input type="file"
                                           style={{display:'none'}}
                                           ref={fileInput=>this.fileInput= fileInput}
                                           onChange={this.addFile}
                                           accept={acceptedFileType}
                                    />
                                    <p  id="custom-file" onClick={()=>this.fileInput.click()} >
                                        <span className="fa fa-plus"/>
                                    </p>
                                    <img id="output1" className="img-rounded"  />
                                </Col>

                                <Col md={3} sm={3} xs={6} >
                                    <input type="file"
                                           style={{display:'none'}}
                                           ref={fileInput1=>this.fileInput1= fileInput1}
                                           onChange={this.addFile1}
                                           accept={acceptedFileType}
                                    />
                                    <p  id="custom-file" onClick={()=>this.fileInput1.click()} >
                                        <span className="fa fa-plus"/>
                                    </p>
                                    <img id="output2" className="img-rounded" />
                                </Col>

                                <Col md={3} sm={3} xs={6} >
                                    <input type="file"
                                           style={{display:'none'}}
                                           ref={fileInput2=>this.fileInput2= fileInput2}
                                           onChange={this.addFile2}
                                           accept={acceptedFileType}
                                    />
                                    <p  id="custom-file" onClick={()=>this.fileInput2.click()} >
                                        <span className="fa fa-plus"/>
                                    </p>
                                    <img id="output3" className="img-rounded" />
                                </Col>

                                <Col md={3} sm={3} xs={6} >
                                    <input type="file"
                                           style={{display:'none'}}
                                           ref={fileInput3=>this.fileInput3= fileInput3}
                                           onChange={this.addFile3}
                                           accept={acceptedFileType}
                                    />
                                    <p  id="custom-file" onClick={()=>this.fileInput3.click()} >
                                        <span className="fa fa-plus"/>
                                    </p>
                                    <img id="output4" className="img-rounded" />
                                </Col>

                            </Row>


                        <div id="image-form">
                            <FormGroup>
                                <FormControl  componentClass="textarea"
                                              rows="3"
                                              id="cap"
                                              onChange={this.addCaption}
                                              placeholder="Add Caption"

                                />
                            </FormGroup>
                            <FormGroup>

                                <TagsInput
                                    onTagInput={this.handleTagInput}
                                    onTagRemove={this.handleTagRemove}
                                    onClear={this.handleTagsClear}
                                    title="press Enter after type"
                                    placeholder="hashtag"
                                />
                            </FormGroup>

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
                                            <FormGroup>
                                            <FormControl
                                                type="text"
                                                value={value}
                                                id="ploc"
                                                name="Plocation"
                                                placeholder="Search a location"
                                                autoComplete="off"
                                                onChange={this.handleInputChange}
                                            />
                                            </FormGroup>
                                        </ReactGooglePlacesSuggest>
                                    )
                                }
                            />

                            <FormGroup>
                                <Button type="button" onClick={this.handleForm} bsStyle="info" block>Post</Button>
                            </FormGroup>


                        </div>
                        </Form>
                    </div>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }


}
export default Example