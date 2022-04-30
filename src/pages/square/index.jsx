/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
import Taro from '@tarojs/taro'
// eslint-disable-next-line no-unused-vars
import React ,{ Component } from 'react'
import { View, Image, Input, ScrollView,Button} from '@tarojs/components'
import './index.less'
import backImg from '../../images/backImg2.png'
import searchImg from '../../images/search.png'
// eslint-disable-next-line no-unused-vars
import Fetch from '../../service/fetch'
import Default from '../../images/default.jpg'


export default class Index extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      avatar : '',
      nickname : ' nickname',
      tag1 : '',
      tag2 : '',
      tag3 : '',
      tag4 : '',
      tag5 : '',
      declaration : '',
      college : '',
      major : '',
      grade : '',
      persons : [],
      users_id:'',
      
    };
  }
  componentWillMount () {
    console.log('@')

   }

  componentDidMount () { 
    console.log('**')

       
  }

  componentWillUnmount () { }


  componentDidShow () {
    const {grade,college,persons} = this.state;
    //获取广场名片信息流
    Fetch(
      'api/v1/square',
      {},
      'GET'
    ).then(res => { 
      console.log(res);
      this.setState({
        persons : res.data       
      });     
    
   
   let Promises = (this.state.persons || []).map((person)=>{
    //从用户界面接口获得grade college    
   return Fetch('api/v1/user/infor',
    {users_id:person.users_id},
    'POST'
    )
   })   
   let newRes = Promise.all(Promises)
   newRes.then(r => {
    console.log(r.length, this.state.persons.length)
    let newPer = this.state.persons.map((person, i) => {
      return {...person, grade: r[i].data.grade, college: r[i].data.college} 
    })
    this.setState({persons: newPer})
  }
    )
    
   },

)}

  toapplySending = (users_id)=>{   
    Taro.navigateTo({
      url:'/pages/applySending/index?users_id='+users_id
    })
    return 1
  }

  tonomate(){
    Taro.redirectTo({
      url:'/pages/nomate/index'
    })
  }

  toTag(){
    Taro.navigateTo({
      url:'/pages/square-search/index'
    })
  }

  render () {
    // eslint-disable-next-line no-unused-vars
    const {persons,grade,college} = this.state;

   
    return (
      <View className='index'>
        
        <Button className='back'  plain  onClick={this.tonomate.bind(this)} >
          <Image src={backImg} className='backImg' />
        </Button>
        <View className='search'>
          <Image src={searchImg} className='searchImg' />
        </View>       
        <Input  className='input' onClick={this.toTag.bind(this)} 
          placeholder='搜索tag' placeholder-style='color:#FFFFFF' 
        ></Input>
        <ScrollView className='items'   scrollY   scrollWithAnimatio enableBackToTop >
          
          

          {/* 实现数组的遍历，达到数据流的形式 */}
          <View className='showmore'>
            {
              // eslint-disable-next-line no-unused-vars
              (persons || []).map((person)=> {
                const users_id = person.users_id;
                
              return(
             
            // eslint-disable-next-line react/jsx-key
            <View className='item'  onClick={()=>this.toapplySending(users_id)}>
            <View className='top'>
              <View className='head'><Image className='head-img' src={person.avatar==='' ? Default : person.avatar}></Image></View>
              <View className='info'>
                <View className='userName'>{person.nickname}</View>
                <View>
                  <View className='school'>{person.college}</View>
                  <View className='majorGrade'>{person.major} {person.grade}</View>
                </View>
              </View>
            </View>
            <View className='line'></View>
            <View className='tags'>
              <View className='tag1'>{person.tag1}</View>
              <View className='tag2'>{person.tag2}</View>
              <View className='tag3'>{person.tag3}</View>
              <View className='tag4'>{person.tag4}</View>
              <View className='tag5'>{person.tag5}</View>
            </View>
            <View className='motto'>{person.declaration}</View>
          </View>
                )
              })
            }
          </View>
          
        </ScrollView>
        {/* 搜索tag  */}
        <View className='hotlist'>
          <View className='hot'>热门搜索tag</View>
          <View className='hotlistItem'>四六级</View>
          <View className='devide'></View>
          <View className='hotlistItem'>考研英语</View>
          <View className='devide'></View>
          <View className='hotlistItem'>高等数学</View>
          <View className='devide'></View>
          <View className='hotlistItem'>线性代数</View>
          <View className='devide'></View>
          <View className='hotlistItem'>教资</View>
          <View className='devide'></View>
          <View className='hotlistItem'>考研数学</View>
          <View className='devide'></View>
        </View>
      </View>
    )
  }
}



