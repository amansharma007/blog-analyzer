import React, {Component} from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import ArticleLinks from './components/ArticleLinks';
import axios from 'axios';

const { Header, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    isLoading: false,
    articlesData: {
      totalArticles: 0,
      articleList: []
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  getArticles = async (url) => {
    this.setState({isLoading: true});

    await axios.get(`https://blog-analyzer-api.herokuapp.com/get-blog-list?url=${url}`)
    .then((res) => {
      this.setState({isLoading: false, articlesData: res.data});
    })
    .catch((err) => console.log("We have an error", err))

    
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" >
            <Icon style={{fontSize: '30px', color: 'whitesmoke'}} type="bar-chart" />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="link" />
              <span>All Articles</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <ArticleLinks getArticles={this.getArticles} data={this.state}/>
        </Layout>
      </Layout>
    );
  }
}

export default App;
