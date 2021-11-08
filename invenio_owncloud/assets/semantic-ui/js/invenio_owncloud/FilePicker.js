import React from 'react';
import '@ownclouders/file-picker/dist/wc/file-picker.min.js'
// import '@ownclouders/file-picker/dist/lib/file-picker.css'
// import '../../less/file-picker.less';

//todo: move to config:
const OWNCLOUD_SERVER = 'https://localhost:9200';
const OWNCLOUD_DOWNLOAD_URL = `${OWNCLOUD_SERVER}/remote.php/webdav`;


export default class OwnCloudFilePicker extends React.Component {
    constructor(props) {
        super(props)

        this.filePickerRef = React.createRef()
        this.configObject = {
            server: OWNCLOUD_SERVER,
            openIdConnect : {
              metadata_url: `${OWNCLOUD_SERVER}/.well-known/openid-configuration`,
              authority: OWNCLOUD_SERVER,
              client_id: "filepicker",
              response_type: "code",
              scope: "openid profile email"
            }
        }
    }

    addCustomStyles() {
      let filepicker = this.filePickerRef.current;
      let shadowRoot = filepicker && filepicker.shadowRoot;
      let filepickerContent = shadowRoot.querySelector("#oc-file-picker");
      let cernboxHeader = document.createElement('h3');
      cernboxHeader.innerHTML = "CERNBox";
      filepickerContent.insertBefore(cernboxHeader, filepickerContent.firstChild);

      let shadowStyles = document.createElement('style');
      shadowStyles.setAttribute('type', 'text/css');

      shadowStyles.innerHTML = `
        #oc-file-picker h3 {
          text-align: center;
        }
        #oc-file-picker header > div {
          display: flex;
        }
        #oc-file-picker header nav::before {
          content: "CERNBox";
          display: block;
          font-size: 32px;
        }
      `
      shadowRoot.appendChild(shadowStyles);
    }

    componentDidMount(){
      this.addCustomStyles();
      console.log("invenio_owncloud Add event listeners");
      let filepicker = this.filePickerRef.current;


      filepicker.addEventListener('select', event => {
          console.log("#1 Select event:", event);
          let files = event.detail[0];

          files = files.map(file => {
              return {
                  url: OWNCLOUD_DOWNLOAD_URL + file.path,
                  lastModifiedDate: new Date(file.mdate),
                  name: file.name,
                  size: parseInt(file.size),
                  external: true
              }
          });

          let uploadEvent = new CustomEvent('upload', { detail: files });
          filepicker.dispatchEvent(uploadEvent);
      });
    }

    render(){
      let token = this.props.token;
      return  <file-picker ref={this.filePickerRef}
                            id="filePicker"
                            config-object={JSON.stringify(this.configObject)}
                            variation="resource"
                            select-btn-label="Upload files"
                            cancel-btn-label="Cancel"
                            class="file-picker"
                            bearer-token={token}
              >
              </file-picker>
    }
}
