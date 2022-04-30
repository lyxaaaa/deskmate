import { Component } from 'react'
import { View, Text,Image,Button,Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import Login from './images/login.png'
import Fetch from '../../service/fetch'


export default class Index extends Component {

  constructor(){
    super(...arguments);
    this.state = {
      student_id : '',
      password : '',     
      token:'',
      // eslint-disable-next-line react/no-unused-state
      count:''
    }
  }

  // eslint-disable-next-line react/sort-comp
  changeStudent_id(e){
    let value = e.detail.value;
    this.setState({
      student_id : value
    });
  }

  changePassword(e){
    let value = e.detail.value;
    this.setState({
      password : value
    });
  }

  

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  

  componentDidShow () {
    // eslint-disable-next-line no-unused-vars
    const {student_id,password} = this.state;
    Taro.getStorage({
      key: 'token',
    }).then((token) => {
      console.log(token);
      //如果有token，拿到学号
      Taro.getStorage({
        key:'student_id',
      }).then((ids)=>{
        console.log(ids.data);
        this.setState({          
          student_id:ids.data
        })
      })
      //如果有token，拿到密码
      Taro.getStorage({
        key:'password',
      }).then((pas)=>{
        console.log(pas.data);
        this.setState({
          password:pas.data
        })
      })
      
    })
  }
     
  

  componentDidHide () { }

  getUserInfo() {}


  handleLogin (){
    // eslint-disable-next-line no-unused-vars
    const {student_id,password,token,count} = this.state;
    
    if (student_id && password ) {
      
      Fetch(
        'api/v1/user',
        {
          student_id: student_id,
          password: password
        },
        'POST'
      ).then(res => {
        console.log(456);
        console.log(res)
        switch (res.code) {
          case 200:
            Taro.getStorage({
              key:'token',
            }).then(
              this.setState({
                count:'more'
              })
            ).catch({
              count:'first'
            })
            console.log('count',this.state.count);
            Taro.setStorage({
              key: 'student_id',
              data: student_id
            });
            Taro.setStorage({
              key: 'password',
              data: password
            });
            Taro.setStorage({
              key: 'token',
              data: res.data
            });
            console.log(987); 
            //首次登录，直接跳到mine页面设置信息          
            if(this.state.count==='first'){
              Taro.redirectTo({
                url: '/pages/mine/index'
              }); 
            }else{
              //判断有无同桌
              Fetch(
                'api/v1/card',
                {},
                'GET',
                {token}
              ).then(ress => {
                console.log(ress);
                console.log(ress.data);
                //无同桌
                if(ress.data.status==='0'){
                  Taro.redirectTo({
                    url: '/pages/nomate/index'
                  }); 
                }else{
                  //有同桌，还得根据是否打卡，选择跳转到mate-clock还是mate-noclock
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
              }).catch(e => {
                console.log(e);
              })
            }               
          break;
          case 400:
            console.log(213);
            Taro.showToast({
              icon: 'none',
              title: '账号或者密码错误'
            });
          break;
          case 401:
            console.log(333);
            Taro.showToast({
              icon: 'none',
              title: '账号或者密码错误'
            });
          break;
          
        }
      }).catch(e => {
        console.log(e)
      })
    }

    if (!student_id || !password) {
      Taro.showToast({
        icon: 'none',
        title: '账号或密码不能为空'
      });
     
    }
    
    
  }
  

  render () {
    // eslint-disable-next-line no-unused-vars
    const {student_id,password}=this.state;
    return (
    <View className='container'>
        <View className='img-login'><Image src={Login}></Image></View>
        <View className='login'>
            <View className='header'>
                <Text>请输入您的用户名和密码</Text>
            </View>
            <View className='main'>
                <View className='username'>
                    <Text>用户名:</Text>
                    <Input type='number' className='put' value={student_id}                 
                      onInput={this.changeStudent_id.bind(this)}  
                    ></Input>
                </View>
                <View className='password'>
                    <Text>密码:</Text>
                    <Input password className='put' value={password}
                      onInput={this.changePassword.bind(this)}  
                    ></Input>
                </View>
                <Text className='please'>请输入信息门户账号与密码</Text>
            </View>
            <View className='footer'>
            {/* <Button className='btn' style='width:110px'>忘记密码</Button>      */}
            <Button className='btn' style='width:200px' onClick={this.handleLogin.bind(this)}>登录</Button>
            </View>
        </View>
    </View>
    )
  }
}
