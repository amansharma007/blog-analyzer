import React, {Component} from 'react';
import {Alert, Button, Spin, Input, Col, Row, Layout, Table} from 'antd';

const {Content} = Layout

const columns = [
  {
    title: 'Article Links',
    render: text => <a target="_blank" href={text}>{text}</a>
  }
]

class ArticleLinks extends Component {
  
  startAnalyzing = () => {
    let val = document.getElementById('urlInput').value;
    this.props.getArticles(val);
  }

  displayWarning = () => {
    return (
      <Row>
        <Col span={24}>
          <Content
            style={{
              margin: '24px 16px'
            }}>
              <Alert message="Please Wait. It could take a while...." type="warning" />
          </Content>
        </Col>
      </Row>
    )
  }

  render() {
    return (
    <div style={{
      padding: 5
    }}>
        {(this.props.data.isLoading) ? this.displayWarning() : <Row></Row>}
        
        <Row>
          <Col span={8}>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff'  ,
                textAlign: 'center',
                minHeight: 220
              }}>
                  <p style={{
                    fontSize: 60,
                    color: '#69c0ff',
                    marginBottom: 10
                  }}>{this.props.data.isLoading ? <Spin size="large" /> : this.props.data.articlesData.totalArticles}</p>
                  <br />
                  <p>Total Blog Articles</p>
            </Content>
          </Col>

          <Col span={16}>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                textAlign: 'center',
                minHeight: 220
              }}>
                  <h1 style={{
                    fontSize: 30
                  }}>Enter the Blog URL</h1>
                  
                  <Input size="large" id="urlInput" onPressEnter={this.startAnalyzing} placeholder="Enter URL" style={{
                    width: 400
                  }} />
                  <br />
                  <br />
                  <Button size="large" onClick={this.startAnalyzing}>
                    Analyze Blog
                  </Button>
            </Content>
            </Col>
        </Row>

        <Row>
          <Col span={24}>
          <Content
              style={{
                margin: '16px 16px',
                background: '#fff'
              }}>
                <Table loading={this.props.data.isLoading} columns={columns} dataSource={this.props.data.isLoading ? [] : this.props.data.articlesData.articleList} pagination={{ pageSize: 50 }} scroll={{ y: 225 }}/>
            </Content>
          </Col>
        </Row>
    </div>     
    );
  }
}

export default ArticleLinks;
