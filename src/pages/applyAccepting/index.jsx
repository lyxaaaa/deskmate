/* eslint-disable react/no-unused-state */
import Taro ,{ getCurrentInstance }from '@tarojs/taro'
import { Component } from 'react'
import { View, Button,Image } from '@tarojs/components'
import './index.less'
import ques from '../../images/ques.png'
import Fetch from '../../service/fetch'
import Default from '../../images/default.jpg'

export default class Index extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      nickname:'',
      declaration:'',
      avatar: Default,
      tag1:'',
      tag2:'',
      tag3:'',
      tag4:'',
      tag5:'',
      major:'',
      grade:'',
      path:'',
      sha:'',
      college:'',
      status:''
    }
  }
  componentWillMount () {
    const a = getCurrentInstance().router.params.users_id
    // eslint-disable-next-line no-unused-vars
    const {nickname,avatar,declaration,tag1,tag2,tag3,tag4,tag5,major,grade,college} = this.state;
    Fetch('api/v1/card/infor', {
          users_id: a
    }, 'POST')
    .then(res =>{
      console.log(res);
      console.log(res.data)
        this.setState({
          nickname: res.data.nickname,
          declaration: res.data.declaration,
          avatar: res.data.avatar,
          tag1: res.data.tag1,
          tag2: res.data.tag2,
          tag3: res.data.tag3,
          tag4: res.data.tag4,
          tag5: res.data.tag5,
          major: res.data.major,
          grade: res.data.grade,
          path: res.data.path,
          sha: res.data.sha,
          college: res.data.college,
          status: res.status,
      })
    }
  );
  //grade college
  Fetch('api/v1/user/infor',
  {users_id:a},
  'POST'
  ).then(ress=>{
      console.log(ress)
      this.setState({
          grade: ress.data.grade,
          college: ress.data.college,
      })
  }).catch(e=>{
      console.log(e);
  })
   }

  componentDidMount () { }

  componentWillUnmount () {
    
   }

  componentDidShow () { }

  componentDidHide () { }

  toaccepted(){
    const users_id = getCurrentInstance().router.params.users_id
    console.log(users_id);
    
    Fetch('api/v1/apply',{
       respondent_id:users_id 
      },'PUT')
      .then(res=>{
      console.log(res);
      Taro.navigateTo({
        url:'/pages/accepted/index'
      })
    })  
  }

  todeskmateApplys(){
    Taro.navigateBack({
    })
  }

  render () {
    const {nickname,avatar,declaration,tag1,tag2,tag3,tag4,tag5,major,grade,college} = this.state;
    return (
      <View className='index'>
        <View className='item'>
          <View className='top'>
             <View className='head'>
              <Image className='headImg' src={avatar==='' ? Default : avatar}></Image>
             </View>
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
        <Image src={ques} className='ques' />
        <View className='texts'>
          <View className='text'>确认与ta结成同桌吗？</View>
          <View className='text'>接受同桌申请后</View>
          <View className='text'>将会撤回已发出和收到的同桌申请</View>
        </View>
        <Button className='sure' onClick={this.toaccepted}>确认</Button>
        <Button className='back' onClick={this.todeskmateApplys}>返回</Button>
      </View>
    )
  }
}