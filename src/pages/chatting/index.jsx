/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-undef */
import { Component } from 'react'
import { View ,Input,Text,Image, ScrollView,Button,Textarea} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import Picture from './images/picture.png'
import Back from './images/back.png'
// eslint-disable-next-line no-unused-vars
import Fetch from '../../service/fetch'
import token from '../../service/fetch'
import Default from '../../images/default.jpg'


export default class Index extends Component {
  constructor(){
    super(...arguments);
      this.state = {
        // eslint-disable-next-line react/no-unused-state
        my_avatar:'',
        avatar:'',
        nickname:'',
        college:'',
        major:'',
        grade:'',
        tag1:'',
        tag2:'',
        tag3:'',
        tag4:'',
        tag5:'',
        declaration:'',
        a: false,
        b:false,
        information: '',
        msglist : [
          //{name:2, information:'information',currenttime:''},                 
        ],
        currenttime:'',
        // eslint-disable-next-line react/no-unused-state
        dailyrecord:[
          //{information:'',user_id:'',time:'',name:''}
        ],
        days:'',
        height:'',
        isFocus:false
      }
  }

  componentWillMount () { }

  componentDidMount () {
    const {my_avatar,avatar,nickname,college,major,grade,tag1,tag2,tag3,tag4,tag5,declaration}=this.state;
    //获取我的头像my_avatar
    Fetch(
      'api/v1/card',
      {},
      'GET',
      {token}
    ).then(res => {
      console.log(res);
      console.log(res.code);
      if(res.code == 200){
        this.setState({
          my_avatar:res.data.avatar
        })
      }
      else{
        Taro.showToast({
          title:'请重试'
        })
      }
    })
    
    //获取同桌的各种信息
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
            avatar:res.data.avatar,
            nickname:res.data.nickname,
            college:res.data.college,
            major:res.data.major,
            grade:res.data.grade,
            tag1:res.data.tag1,
            tag2:res.data.tag2,
            tag3:res.data.tag3,
            tag4:res.data.tag4,
            tag5:res.data.tag5,
            declaration:res.data.declaration
          });
          console.log(this.state.avatar);//后端传过来的avatar是空的，所以同桌头像src里面是空的
        break;
        case 401:
          Taro.showToast({
            title:'请重试'
          })
        break;
      }
    }
    ).catch(e=>{
      console.log(e);
    })
    
    
   }

  componentWillUnmount () { }

  //获取消息记录，相当于onshow，页面出现一次就被调用一次
  componentDidShow () {
    const {dailyrecord,days} =this.state;
    Fetch(
      'api/v1/dailyrecord/message',
      {},
      'GET',
      {token}
      ).then(res=>{
          console.log(res.data);
          this.setState({
            // eslint-disable-next-line react/no-unused-state
            dailyrecord:res.data,
            days:res.msg
          },()=>{
            console.log(this.state.dailyrecord);            
          });          
        }
      ).catch((e)=>{
        console.log(e);
      })
      
   }

  componentDidHide () { }

  backTo= () => {
    Fetch(
      'api/v1/dailyrecord/update',
      {},
      'PUT',
      {token}
    ).then(re=>{
      console.log(re.msg);
      if(re.msg==='今天已经更新过了'){
        Taro.redirectTo({
          url: '/pages/mate-clock/index'
        }); 
      }else{
        Taro.redirectTo({
          url: '/pages/mate-noclock/index'
        }); 
      }
    }

    )
  }
 
  //点击更多，出现下拉菜单
  forMore(){
    const {a} = this.state
    if(a == false){
        this.setState({
            a: true
          })
    }
    else{
        this.setState({
            a: false
          })
    }
  }

  //查看同桌名片
  seeCord(){
    const {b} = this.state
    if(b==false){
      this.setState({
        b:true
      })
    }
    else{
      this.setState({
        b:false
      })
    }
  }

  //同桌中断的弹窗
  handleOver = () => {
    Taro.showModal({
      title: '确定要终止同桌吗？',
      content: '同桌之交来之不易，请同学慎重考虑！',
      confirmColor: '#eb7886',
      success: function (choose) {
        if (choose.confirm) {
          console.log('用户点击确定')
          Fetch(
            'api/v1/dailyrecord/end',
            {},
            'PUT',
            {token}
            
          ).then(res => {
            console.log(123);
            console.log(res);
            console.log(res.code);
            switch(res.code){
              case 200:
                Taro.setStorage({
                  key : 'token',
                  data : res.data
                });
                Taro.reLaunch({
                  url:'/pages/deskmate-over/index'
                  
                });
              break;
              case 400:
                Taro.showToast({
                  title:'强制中断失败'
                });
              break; 
              case 401:
                Taro.showToast({
                  title:'身份验证失败，请重新登录'
                });
                Taro.reLaunch({
                  url:'/pages/login/index'
                  
                });
              break;
            }
          }

          )         
        } else if (choose.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  //下拉刷新，尚未完全。。。
  function(){
    Taro.startPullDownRefresh();
  }

  getCurrentTime(){
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp); 
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
    //秒
    //var s = date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds();
    //整合起来，获取当前时间currenttime
    
    var currenttime = Y+'-'+M+'-'+D+' '+h+':'+m;
    console.log(currenttime);
    
    this.setState({
      currenttime : currenttime
    })
    
    return {
      currenttime
    }
   
  }

  //获取input框输入的值
  getinformation(e){
    const {information} = this.state;   
    this.setState({
      information : e.target.value
    })
  }

  //点击发送
  sendClick(){
    const {information,msglist,currenttime} = this.state;
    Fetch(
      'api/v1/dailyrecord/send',
      {information:information},
      'POST',
      {token}
    ).then(res => {
      console.log(res);
      if(res.code==200){
        console.log('创建成功');
        var time = this.getCurrentTime();  
        console.log(time.currenttime);//拿到另一个函数的返回值！！！，舍弃state
        let copy = this.state.msglist.slice();
        copy.push({name:'2', information:this.state.information, currenttime:time.currenttime})
          this.setState({
            msglist:copy,
            information:''
        }, ()=>{
          console.log(this.state.msglist)
      })

      }else{
        console.log('创建失败');
        Taro.showToast({
          title:'今日已发送过消息，请明日再发送!',
          icon:'none'
        });
      }
    }
    ).catch(error => {
      console.log(error);
    })
  }

  //选择图片来发送
  chooseImg(){
    const params = {};
    params.count = 1;
    params.sizeType = ['original', 'compressed'];
    params.sourceType = ['album', 'camera'];
    Taro.chooseImage(params)
      .then(res => {
        const { tempFilePaths } = res
        this.setState({
          tempFilePaths: tempFilePaths[0],
          file: tempFilePaths[0],
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onKeyboard(){
    this.setState({
      isFocus:true
    })
  }

  offkeyboard(){
    this.setState({
      isFocus:false
    })
  }

  render () {
     
     const {height,days,dailyrecord,currenttime, msglist,a ,b,my_avatar,avatar,nickname,college,major,
      grade,tag1,tag2,tag3,tag4,tag5,declaration} = this.state;
     return (
      <View className='container'>
        <View className='header'>
          <View className='back' onClick={this.backTo}><Image src={Back}></Image></View>
          <View className='title'>
            <View className='nickname'>{nickname}</View>
            <View className='day'>已同桌天数 : {days}天</View>
          </View>
          <View className='more' onClick={this.forMore.bind(this)}>更多</View>
        </View>
        {a && <View className='dropdown'>
          <View className='option seecard'onClick={this.seeCord.bind(this)}>查看同桌名片</View>
          <View className='option over' onClick={this.handleOver.bind(this)}>终止同桌</View>
        </View>}
        {!a && <View></View>}
        {b && <View className='control'>
          <View className='item'>
          <View className='top'>
             <View className='head'><Image className='head-img' src={avatar==='' ? Default : avatar}></Image></View>
             <View className='info'>
              <View className='userName'>{nickname}</View>
              <View className='school'>{college}</View>
              <View className='majorGrade'>{major} {grade}</View>
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
        </View></View>}
        {!b && <View></View>}
        <ScrollView className='msgss'   scrollY   scrollWithAnimatio enableBackToTop  >
        {/* 获取消息记录（同桌与自己的） */}

        <View className='dailyrecord'>
        {
          (dailyrecord || []).map((e)=>{
            if(e.name=='1'){
              return(
        <View className='user-1'>
          <View className='time'>{e.time}</View>
          <View className='main-1'>
              <View className='portrait one'><Image className='avatar-img' src={avatar==='' ? Default : avatar}></Image></View>
              <View className='content tz'>
              <View className='message'>
                <Text>{e.information}</Text>
              </View>
          </View>
        </View>
        </View>           
        
              )
            }else{
              return(
        <View className='user-2'>
          <View className='time'>{e.time}</View>
          <View className='main-2'>
            <View className='portrait two'><Image className='avatar-img' src={my_avatar==='' ? Default : my_avatar}></Image></View>
            <View className='content'>
              <View className='message'>
                <Text>{e.information}</Text>
              </View>
            </View>
          </View>
        </View> 
              )
            }
          })
        }
        </View>
        
        {/* 数组的遍历 ,自己发消息*/}
      <View className='showmore'>
        {
          (msglist || []).map((item) => {
            console.log(item);
            return(
            <View className='user-2'>
              <View className='time'>{item.currenttime}</View>
              <View className='main-2'>
                <View className='portrait two'><Image className='avatar-img' src={my_avatar==='' ? Default : my_avatar}></Image></View>
                <View className='content'>
                  <View  className='message'>
                  <Text>{item.information}</Text>
                </View>
            </View>
          </View>
        </View>
            )
          })
        }
      </View>
        </ScrollView>
        <View className={this.state.isFocus ? `footer keyboard` : `footer`} >
          <Textarea className='put' value={this.state.information} adjustPosition='{{false}}'
          onInput={this.getinformation.bind(this)} auto-height='{{true}}' 
          maxlength='-1'  showConfirmBar='{{false}}'  
          onFocus={this.onKeyboard.bind(this)}  onBlur={this.offkeyboard.bind(this)}
          ></Textarea>
          <Button className='send' onClick={this.sendClick.bind(this)}>发送</Button>  
          {/* 先把发送图片的功能省去，后续加上 */}
          {/* <View className='picture' onClick={this.chooseImg.bind(this)}><Image src={Picture} onClick={this.chooseImg.bind(this)} ></Image></View> */}
        </View>
      </View>
      
    )
  }
}
