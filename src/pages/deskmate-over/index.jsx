import { Component } from 'react'
import { View,Image,Button,Text} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import Over from './images/deskmate-over.png'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toNomate = () => {
    Taro.redirectTo({
      url:'/pages/nomate/index'
    })
  }

  render () {
    return (
      <View className='container'>
        <View className='over'><Image src={Over}></Image></View>
        <View className='conclude'>
          <View><Text className='word'>同桌已中断</Text></View>
          <View className='two'><Text className='word'>再去寻找新的同桌吧</Text></View>
        </View>
        <Button className='btn'onClick={this.toNomate.bind(this)}>返回首页</Button>
      </View>
    )
  }
}
