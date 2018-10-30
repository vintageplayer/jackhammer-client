import React, {Component} from 'react'
import TagsInput from 'react-tagsinput'
import Autosuggest from 'react-autosuggest'
import {fetchAllFindingTags, addTag,} from '../../Actions/TagActions'
import {axiosInstance} from '../../Config/AxiosInstance'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

class Tag extends React.Component {
  constructor() {
    super()
    this.state = {
      tags: [],
      dbTags: [],
    }
    this.handleSaveTags = this
      .handleSaveTags
      .bind(this)
  }
  handleChange(tags) {
    this.setState({tags})
  }
  handleSaveTags() {
    const payload = {
      tagList: this.state.tags,
      findingId: parseInt(this.props.findingId)
    }
    this
      .props
      .dispatch(addTag(payload));
  }
  componentDidMount() {
    axiosInstance
      .post("tags/list", {findingId: -1})
      .then((response) => {
        this.setState({dbTags: response.data.items})
      });
    const payload = {
      findingId: this.props.findingId
    }

    axiosInstance
      .post("tags/list", payload)
      .then((response) => {
        var items = response.data.items;
        var selectedTags = [];
        items.map((tag) => selectedTags.push(tag.name));
        this.setState({tags: selectedTags})
      });
  }
  renderAddTagBtn(finding) {
    if (finding.createTags) {
      return (
        <div class="col-xs-1 col-xs-offset-9">
          <button type="button" class='btn btn-danger pull-right' onClick={this.handleSaveTags}>Save</button>
        </div>
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.createResponse) {
      toastr.success("Tag created successfully");
    }
  }

  render() {
    const {dbTags} = this.state;
    const {findingTags} = this.props;
    const {finding} = this.props;
    function autocompleteRenderInput({
      addTag,
      ...props
    }) {
      const handleOnChange = (e, {newValue, method}) => {
        if (method === 'enter') {
          e.preventDefault()
        } else {
          props.onChange(e)
        }
      }

      const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
      const inputLength = inputValue.length

      let suggestions = dbTags.filter((state) => {
        return state
          .name
          .toLowerCase()
          .slice(0, inputLength) === inputValue
      })

      return (<Autosuggest ref={props.ref} suggestions={suggestions} shouldRenderSuggestions={(value) => value && value.trim().length > 0} getSuggestionValue={(suggestion) => suggestion.name} renderSuggestion={(suggestion) => <span>{suggestion.name}</span>} inputProps={{
        ...props,
        onChange: handleOnChange
      }} onSuggestionSelected={(e, {suggestion}) => {
        addTag(suggestion.name)
      }} onSuggestionsClearRequested={() => {}} onSuggestionsFetchRequested={() => {}}/>)
    }
    return (
      <div class="tags top-buffer">
        <div class="row top-buffer">
          <div class="col-xs-10">
            <TagsInput renderInput={autocompleteRenderInput} value={this.state.tags} onChange={:: this.handleChange}/>
          </div>
        </div>
        <div class="row top-buffer">
          {this.renderAddTagBtn(finding)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({finding: state.findings.finding, findingTags: state.tags.fetchedTags, createResponse: state.tags.createResponse});
export default connect(mapStateToProps)(Tag);
