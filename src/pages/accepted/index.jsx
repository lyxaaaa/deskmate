import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View,   Image, Button} from '@tarojs/components'
import './index.less'
import success from '../../images/success.png'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  tomateNoClock(){
    Taro.reLaunch({
      url:'/pages/mate-noclock/index'
    })
  }

  render () {
    return (
      <View className='index'>
        <View className='top'>
          <Image src={success} className='success' />
          <View className='text'>
            <View>成功接受同桌申请！</View>
            <View>快去完成今日打卡吧</View>
          </View>
        </View>
        <Button className='button' onClick={this.tomateNoClock}>我的同桌</Button>
      </View>
    )
  }
}