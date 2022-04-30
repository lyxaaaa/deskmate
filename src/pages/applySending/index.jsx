/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
import Taro ,{ getCurrentInstance }from '@tarojs/taro'
// eslint-disable-next-line no-unused-vars
import React,{ Component } from 'react'
import { View, Button,Image } from '@tarojs/components'
import './index.less'
import ques from '../../images/ques.png'
import Fetch from '../../service/fetch'
import Default from '../../images/default.jpg'

export default class Index extends Component {

  constructor(){
    super(...arguments);
    this.state = {
      users_id:'',
      nickname:'',
      avatar: Default,
      tag1: '',
      tag2: '',
      tag3: '',
      tag4: '',
      tag5: '',
      major: '',
      grade: '',
      college:'',
      declaration:'',
      
    }
      
    
  }
  componentWillMount () { 
    const a = getCurrentInstance().router.params.users_id

    Fetch('api/v1/card/infor', {
          users_id: a
    }, 'POST')
    .then(res =>{
      console.log(res.data);
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
  
  componentDidMount () {}

  componentWillUnmount () { }

  componentDidShow () { 
    
  }

  componentDidHide () { }

  
  tosent(){
    const users_id = getCurrentInstance().router.params.users_id
    console.log(users_id);
    
    Fetch('api/v1/apply',{respondent_id:users_id},'POST').then(res=>{
      console.log(res);
      if(res.data===null){
        Taro.showToast({
          icon:'none',
          title:'你不能成为自己的同桌哦！'
        })
      }
      else{
        Taro.navigateTo({
          url:'/pages/sent/index'
        })
      }
    })
    
  }

  tosquare(){
    Taro.navigateBack({
      url:'/pages/square/index'
    })
  }

  render () {
    // eslint-disable-next-line no-unused-vars
    const {users_id,nickname,avatar,tag1,tag2,tag3,tag4,tag5,major,grade,college,declaration}=this.state;
    return (
      <View className='index'>
        <View className='item'>
          <View className='top'>
             <View className='head'>
              <Image className='headImg' src={avatar===''? Default : avatar} />
             </View>
             <View className='info'>
              <View className='userName'>{nickname}</View>
              <View>
              <View className='school'>{college}</View>
              <View className='majorGrade'>{major+' '+grade}</View>
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
          <View className='text'>确定向ta发送同桌申请吗？</View>
          <View className='text'>可同时向多个陌生人发送申请</View>
          <View className='text'>最先通过申请的将会结成同桌</View>
        </View>
        <Button className='sure' onClick={this.tosent}>确认</Button>
        <Button className='back' onClick={this.tosquare}>返回</Button> 
      </View>
    )
  }
}