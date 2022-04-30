import { Component } from 'react'
import { View, Text ,Image,Button} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import Desk from './images/desk.png'
import Who from './images/who.png'
// eslint-disable-next-line no-unused-vars
//import Default from '../../images/default.png'
// eslint-disable-next-line import/no-duplicates
import Fetch from '../../service/fetch'
// eslint-disable-next-line import/no-duplicates
import token from '../../service/fetch'
import Default from '../../images/default.jpg'


export default class Index extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      avatar:'',//默认头像
      nickname : 'nickname'
      
    };
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    // eslint-disable-next-line no-unused-vars
    const {nickname,avatar} = this.state;


    Fetch(
      'api/v1/card',   
      { },
      'GET',
      {token}
    ).then(
      res => {
        console.log(res);
        console.log(res.code);
        switch(res.code){
          case 200:
            this.setState({
              avatar: res.data.avatar,
              nickname : res.data.nickname
              });
              console.log(666);
          break;
          case 401:
            Taro.showToast({
              title:'获取失败'
            })
          break;

        }
      }
    )
    .catch(error => {
      console.log(error);
    })
  }

  componentDidHide () { }

  toSquare = () => {
    Taro.navigateTo({
      url:'/pages/square/index'
    })
  }

  toApplys = () => {
    Taro.navigateTo({
      url:'/pages/deskmateApplys/index'
    })
  }

  toEdit = () => {
    Taro.navigateTo({
      url:'/pages/mine/index'
    })
  }

  render () {
    const {nickname,avatar} = this.state;
    return (
      <View className='container'>
        <View className='clock'>
            <View className='header'>
                <View className='my'><Image src={avatar==='' ? Default : avatar} className='my-img'></Image></View>
                <View onClick={this.toEdit.bind(this)}>
                    <View className='click'>{nickname}</View>
                    <View >
                      <Text className='my-detail line'>点击此编辑名片</Text></View>
                </View>
            </View>
            <View className='dash'>
                <View className='dot'></View><View className='dot'></View>
                <View className='dot'></View><View className='dot'></View>
                <View className='dot'></View><View className='dot'></View>
                <View className='dot'></View>
            </View>

            <View className='main'>
                <View className='main-1'>
                    <View className='circle-1'><Image className='my-img' src={avatar==='' ? Default : avatar}></Image></View>
                    <View className='three'><View className='circle-2'></View>
                    <View className='circle-2'></View><View className='circle-2'></View></View>
                    <View className='circle-1'><Image src={Who} className='whoimg'></Image></View>
                </View>
                <View className='main-2'>
                    <View><Text className='line one'>当前还没有同桌</Text></View>
                    <View><Text className='line '>快去 【同桌广场】 找一位同桌吧!</Text></View>
                </View>
                
                <View className='main-3'>
                    <Button className='btn' style='width:125px;height:34px;' onClick={this.toSquare}>
                        同桌广场</Button>
                    <Button className='btn last' style='width:125px;height:34px;' onClick={this.toApplys}>
                        收到的同桌申请</Button>
                </View>
            </View>
        </View>
        <View className='desk'><Image src={Desk}></Image></View>
      </View>
    )
  }
}
