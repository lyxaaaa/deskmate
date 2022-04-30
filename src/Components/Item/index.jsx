import { Component } from 'react'
import { View,Image } from '@tarojs/components'
// eslint-disable-next-line no-unused-vars
import Taro  from '@tarojs/taro'
import './index.css'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toapplySending = (users_id) => {
    
    Taro.navigateTo({
      url:'/pages/applySending/index?users_id='+users_id
    })
  }

  render () {
      const {nickname,tag1,tag2,tag3,tag4,tag5,declaration,college,major,grade,avatar,users_id}=this.props;
    return (
        <View className='item'  onClick={()=>this.toapplySending(users_id)}>
        <View className='top'>
          <View className='head'><Image className='head-img' src={avatar}></Image></View>
          <View className='info'>
            <View className='userName'>{nickname}</View>
            <View>
            <View className='school'>{college}</View>
            <View className='majorGrade'>{major} {grade}</View>
            </View>
          </View>
        </View>
        <View className='line'></View>
        <View className='tags'>
          <View className='tag1'>{tag1}</View>
          <View className='tag2'>{tag2}</View>
          <View className='tag3'>{tag3}</View>
          <View className='tag4'>{tag4}</View>
          <View className='tag5'>{tag5}</View>
        </View>
        <View className='motto'>{declaration}</View>
      </View>
    )
  }
}