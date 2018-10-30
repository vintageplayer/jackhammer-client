import React, {Component} from 'react'
import {fetchFinding} from '../../Actions/FindingActions'
import {fetchAllFindingUploads, uploadFile,} from '../../Actions/UploadActions'
import {formtTime} from '../Common'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_uri: null,
      name: null,
      type: null
    }
    this.onFormSubmit = this
      .onFormSubmit
      .bind(this)
    this.onChange = this
      .onChange
      .bind(this)
    this.fileUpload = this
      .fileUpload
      .bind(this)
  }
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file)
  }
  onChange(e) {
    this.setState({file: e.target.files[0]})
  }
  fileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('findingId', this.props.findingId);
    this
      .props
      .dispatch(uploadFile(formData));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadResponse) {
      toastr.success('File uploaded successfully...');
      const payload = {
        findingId: this.props.findingId
      }
      this
        .props
        .dispatch(fetchAllFindingUploads(payload));
    } else if (nextProps.errorResponse) {
      toastr.error("File upload got failed,\n" + nextProps.errorResponse.message.toLowerCase())
    }
  }
  componentDidMount() {
    const payload = {
      findingId: this.props.findingId
    }
    this
      .props
      .dispatch(fetchAllFindingUploads(payload));
  }
  renderUploadList(fetchedUploads) {
    return (
      <div id="uploads-list">
        {fetchedUploads.map((upload, index) => (
          <div key={index} class="upload jumptarget" id="comment-2">
            <p>
              <span class="label">{upload.userName}:</span>
            </p>
            <blockquote>
              <a title="Download" href="/findings/1379/uploads/download_file?upload_id=2">
                <i class="glyphicon glyphicon-download text-danger"></i>&nbsp;&nbsp; {upload.name}</a>
              <small>
                <em>{formtTime(upload.createdAt)}</em>
              </small>
            </blockquote>
          </div>
        ))
}
      </div>
    )
  }
  renderUploadForm(finding) {
    if (finding.createUploads) {
      return (
        <form onSubmit={this.onFormSubmit}>
          <div class="form-group">
            <input type="file" class="file-input btn btn-success" name="files[]" onChange={this.onChange}/>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Upload file</button>
          </div>
        </form>
      );
    }
  }
  render() {
    const {fetchedUploads} = this.props;
    const {finding} = this.props;
    return (
      <div class="finding-uploads">
        <div class="uploads-list">
          {this.renderUploadList(fetchedUploads)}
        </div>
        <div class="upload-form" id="upload-form">
          {this.renderUploadForm(finding)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({fetchedUploads: state.uploads.fetchedUploads, uploadResponse: state.uploads.uploadResponse,});
export default connect(mapStateToProps)(Upload);
