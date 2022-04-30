/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
import { Component } from 'react'
import { View, Text ,Image,Button} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import Desk from './images/desk.png'
import Warning from './images/warning.png'
// eslint-disable-next-line no-unused-vars
import Fetch from '../../service/fetch'
import token from '../../service/fetch'
import Default from '../../images/default.jpg'



export default class Index extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      avatar:Default,
      nickname : 'nickname',
      mate_avatar: Default,
      days:''
    };
  }

  componentWillMount () { }

  componentDidMount () { 
    const {days} = this.state;
    //获取同桌天数days
    Fetch(
      'api/v1/dailyrecord/message',
      {},
      'GET',
      {token}
      ).then(res=>{
          console.log(res.data);
          this.setState({           
            days:res.msg
          });          
        }
      ).catch((e)=>{
        console.log(e);
      })
  }

  componentWillUnmount () { }

  componentDidShow () { 
    const {nickname,mate_avatar} = this.state;
    //获取同桌头像mate-avatar  
    Fetch(
      'api/v1/dailyrecord/card',
      {},
      'GET',
      {token}
    ).then(res => {
      console.log(res);
      console.log(res.code);
      switch(res.code){
        case 200:
          this.setState({
            mate_avatar:res.data.avatar
          })
        break;
        case 401:
          Taro.showToast({
            title:'身份认证失败，请重新登录'
          })
        break;
        case 500:
          Taro.showToast({
            title:'服务器错误'
          })
        break;
    }
    }
    ).catch(
      error =>  {
        console.log(error)
      }
    )


    Fetch(
      'api/v1/card',   
      { },
      'GET',
      {token}
    ).then(
      res => {
        console.log(res);
        console.log(res.data.nickname);
        this.setState({
        avatar:res.data.avatar, 
        nickname : res.data.nickname
        });
        console.log(555);
      }
    )
    .catch(error => {
      console.log(error);
    })
  }

  componentDidHide () { }

  toClock= () => {
    Taro.redirectTo({
        url:'/pages/chatting/index'
    })
  }

  toMine = () => {
    Taro.redirectTo({
        url:'/pages/mine/index'
    })
  }

  render () {
    const {days,nickname,avatar,mate_avatar} = this.state;
    return (
      <View className='container'>
        <View className='noclock'>
            <View className='header'>
                <View className='my'><Image className='my-img'  src={avatar==='' ? Default : avatar}></Image></View>
                <View onClick={this.toMine.bind(this)}>
                    <View className='click'>{nickname}</View>
                    <View ><Text className='my-detail line'>点击此进入个人主页</Text></View>
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
                    <View className='circle-1'><Image src={avatar==='' ? Default : avatar} className='my-img'></Image></View>
                    <View className='three'><View className='circle-2'></View>
                    <View className='circle-2'></View><View className='circle-2'></View></View>
                    <View className='circle-1'><Image src={mate_avatar==='' ? Default : mate_avatar} className='my-img'></Image></View>
                </View>
                <View className='main-2'>
                    <Text className='line one'>已同桌天数:{days}天</Text>
                </View>
                <View className='main-3'>
                    <Image src={Warning} className='warning'></Image>
                </View>
                <View className='main-4'>
                    <View><Text className='line'>今日尚未完成打卡任务</Text></View>
                    <View><Text className='line'>进入同桌打卡页</Text></View>
                    <View><Text className='line'>分享今日收获完成打卡</Text></View>
                </View>
                <View className='main-5'>
                    <Button className='btn' style='width:125px;height:34px;' onClick={this.toClock.bind(this)}>
                        同桌打卡</Button>
                </View>
            </View>
        </View>
        <View className='desk'><Image src={Desk}></Image></View>
      </View>
    )
  }
}
