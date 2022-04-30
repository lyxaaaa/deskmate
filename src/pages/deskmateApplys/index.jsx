/* eslint-disable react/no-unused-state */
import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, ScrollView, Button} from '@tarojs/components'
import './index.less'
import backImg from '../../images/backImg2.png'
import Fetch from '../../service/fetch'
import Default from '../../images/default.jpg'

export default class Index extends Component {

    constructor(){
        super(...arguments);
          this.state = {
            avatar : Default,
            nickname : '',
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
            users_id:'2020213773'
          }
      }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    Fetch(
      'api/v1/apply',
      {},
      'GET'
    ).then(res => {
      // console.log(res.data[0].nickname); 
      console.log(res);
      this.setState({
        persons : res.data ,
        // users_id : res.data[0].users_id      
      });
      console.log(223);
     ( this.state.persons || []).map((person)=>{
        //从用户界面接口获得grade college
        Fetch('api/v1/user/infor',
        {users_id:person.users_id},
        'POST'
        ).then(ress=>{
            console.log(ress);
            
            this.setState({
                grade: ress.data.grade,
                college: ress.data.college,
            })
        }).catch(e=>{
            console.log(e);
        })    
        })
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentDidHide () { }

  tonomate(){
    Taro.redirectTo({
      url:'/pages/nomate/index'
    })
  } 

  toapplyAccepting(users_id){
    Taro.navigateTo({
      url:'/pages/applyAccepting/index?users_id='+users_id
    })
  }

  render () {
    const {persons,grade,college} = this.state;
    return (
      <View className='index'>
        <View className='stick'>
        <Button className='back'   plain  onClick={this.tonomate.bind(this)}  >
            <Image src={backImg} className='backImg' onClick={this.tonomate.bind(this)} />
          </Button>
          <View className='title'>同桌申请</View>
        </View>
        <ScrollView className='items' scrollY enableFlex>
        <View className='showmore'>
            {
              // eslint-disable-next-line no-unused-vars
              ( persons || []).map((person)=> {
                const users_id = person.users_id;
              return(
              // eslint-disable-next-line react/jsx-key
            <View className='item'  onClick={()=>this.toapplyAccepting(users_id)}  >
            <View className='top'>
              <View className='head'><Image className='head-img' src={person.avatar===''? Default : person.avatar}></Image></View>
              <View className='info'>
                <View className='userName'>{person.nickname}</View>
                <View>
                  <View className='school'>{college}</View>
                  <View className='majorGrade'>{person.major} {grade}</View>
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
         
           {/* <View className='item'
                onClick={this.toapplyAccepting}
                >
            <View className='top'>
              <View className='head'></View>
              <View className='info'>
                <View className='userName'>用户名</View>
                <View className='school'>计算机学院</View>
                <View className='majorGrade'>计算机科学与技术 2020级</View>
              </View>
            </View>
            <View className='line'></View>
            <View className='tags'>
              <View className='tag1'>六级</View>
              <View className='tag2'>六级</View>
              <View className='tag3'>数据结构</View>
              <View className='tag4'>六级</View>
              <View className='tag5'>计算机组成原理</View>
            </View>
            <View className='motto'>高数好难，求大佬带带</View> 
          </View>
          <View className='item'
                onClick={this.toapplyAccepting}
                >
            <View className='top'>
              <View className='head'></View>
              <View className='info'>
                <View className='userName'>用户名</View>
                <View className='school'>计算机学院</View>
                <View className='majorGrade'>计算机科学与技术 2020级</View>
              </View>
            </View>
            <View className='line'></View>
            <View className='tags'>
              <View className='tag1'>六级</View>
              <View className='tag2'>六级</View>
              <View className='tag3'>数据结构</View>
              <View className='tag4'>六级</View>
              <View className='tag5'>计算机组成原理</View>
            </View>
            <View className='motto'>高数好难，求大佬带带</View>
          </View> */}
        </ScrollView>
      </View>
    )
  }
}