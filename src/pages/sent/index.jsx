import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Button} from '@tarojs/components'
import './index.less'
import success from '../../images/success.png'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  tonomate(){
    Taro.navigateBack({
      delta: 2
    })
  }

  render () {
    return (
      <View className='index'>
        <View className='top'>
          <Image src={success} className='success' />
          <View className='text'>
            <View>已成功发送同桌申请</View>
          </View>
        </View>
        <Button className='button' onClick={this.tonomate}>返回广场</Button>
      </View>
    )
  }
}