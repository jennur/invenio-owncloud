import React from 'react';
import '@ownclouders/file-picker/dist/wc/file-picker.min.js'
import axios from 'axios';

export default class OwnCloudFilePicker extends React.Component {
    constructor(props) {
        super(props)

        this.filePickerRef = React.createRef()
        this.configObject = {
            server: "https://localhost:9200",
            openIdConnect : {
              metadata_url: "https://localhost:9200/.well-known/openid-configuration",
              authority: "https://localhost:9200",
              client_id: "filepicker",
              response_type: "code",
              scope: "openid profile email"
            }
        }
    }

    handleFileURL = (fileUrl) => {
        this.props.onLoad(fileUrl)
    }

    componentDidMount(){
      console.log("Add event listeners");
        this.filePickerRef.current.addEventListener('select', event => {
            console.log("Select event:", event);
            let path = event.detail[0][0].path;
            let token = window.sessionStorage.getItem(`oc_oAuthuser:${this.configObject.server}:filepicker`);
            token = JSON.parse(token);
            token = token.access_token;

            axios.get(`https://localhost:9200/remote.php/webdav${path}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log("Response from fetch:", response)
                this.handleFileURL(response.data)
            })
            .catch(error => {
                console.log("Error in fetch:", error)
            })
        });

        this.filePickerRef.current.addEventListener('update', event => {
            console.log("Updated:", event);
        });

        this.filePickerRef.current.addEventListener('cancel', () => {
          this.props.closeModal();
      });
    }

    render(){
        return  <file-picker ref={this.filePickerRef}
                             config-object={JSON.stringify(this.configObject)}
                             id="file-picker"
                             variation="resource"
                             cancel-btn-label="Cancel"
                             class="file-picker"
                >
                </file-picker>
    }
}
