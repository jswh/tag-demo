import React, { Component } from 'react'
import axios from 'axios'
import { Tag, Input, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './App.css'

const api = 'http://demo.jswh.me/api'
class Tags extends Component {
  constructor(props: any) {
    super(props)
    this.state.tags = props.tags
  }
  state = {
    tags: [''],
    inputVisible: false,
    inputValue: '',
    edittingTag: false,
    edittingValue: '',

  }
  props = {
    tags: [''],
    propertyId: 0
  }
  async handleClose(index: number) {
    let tag: any = this.state.tags[index]
    let removed = (await axios.delete(`${api}/tag/${tag.id}`)).data
    const tags = this.state.tags.filter((tag: any) => tag.id !== removed.id)
    this.setState({ tags })
  }

  showInput() {
    this.setState({ inputVisible: true })
  }

  handleInputChange(e: any) {
    this.setState({ inputValue: e.target.value })
  }

  handleEdittingInputChange(e: any) {
    this.setState({ edittingValue: e.target.value })
  }

  async handleInputConfirm() {
    const { inputValue } = this.state;
    let tag = (await axios.post(`${api}/property/${this.props.propertyId}/tag`, {
      value: inputValue
    })).data
    let { tags } = this.state;
    let newTags: any[] = []
    tags.map(function (t: any, index: number) {
      if (t.id != tag.id) {
        newTags.push(t)
      }
    })
    newTags.push(tag)
    this.setState({
      tags: newTags,
      inputVisible: false,
      inputValue: '',
    });
  }
  handleStartEditting(tag: any) {
    this.setState({
      edittingTag: tag,
      edittingValue: tag.value
    })
  }

  async handleEdittingConfirm(tag: any) {
    const { edittingValue } = this.state;
    let changedTag = (await axios.put(`${api}/api/tag/${tag.id}`, {
      value: edittingValue
    })).data
    let { tags } = this.state;
    let newTags: any[] = []
    tags.map(function (t: any, index: number) {
      if (t.id != changedTag.id) {
        newTags.push(t)
      } else {
        newTags.push(changedTag)
      }
    })
    this.setState({
      tags: newTags,
      edittingTag: false,
      edittingValue: '',
    });

  }

  saveInputRef(input: any) { this.setState({ input }) }

  render() {
    let edittingTag: any = this.state.edittingTag
    return (
      <div>
        {
          this.state.tags.map((tag: any, index: any) => {
            return (
              edittingTag.id != tag.id ? <Tag
                key={tag.id} closable={true}
                onClose={() => this.handleClose(index)}
                onDoubleClick={() => this.handleStartEditting(tag)}
              >
                {tag.value}
              </Tag> :
                <Input
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={this.state.edittingValue}
                  onChange={this.handleEdittingInputChange.bind(this)}
                  onBlur={() => { this.handleEdittingConfirm(tag) }}
                  onPressEnter={() => { this.handleEdittingConfirm(tag) }}
                />
            )
          })
        }
        {
          this.state.inputVisible && (
            <Input
              type="text"
              size="small"
              style={{ width: 78 }}
              value={this.state.inputValue}
              onChange={this.handleInputChange.bind(this)}
              onBlur={this.handleInputConfirm.bind(this)}
              onPressEnter={this.handleInputConfirm.bind(this)}
            />
          )
        }
        {
          !this.state.inputVisible && (
            <Tag className="site-tag-plus" onClick={this.showInput.bind(this)}>
              <PlusOutlined /> New Tag
            </Tag>
          )
        }
      </div>
    )
  }
}

class App extends Component {
  state = {
    property: null
  }
  componentDidMount() {
    this.getList()
  }
  async getList() {
    let property = await (await axios.get(`${api}/api/property/1/tag')).data
    this.setState({ property })
  }

  render() {
    let property: any = this.state.property
    return (
      property ?
        <Card title={"Property No." + property.id} style={{ width: 300 }} className="tag-card">
          <p>this is a property</p>
          <h4>tags:</h4>
          <Tags tags={property.tags} propertyId={property.id} />
        </Card> : 'loading'
    )
  }
}

export default App;