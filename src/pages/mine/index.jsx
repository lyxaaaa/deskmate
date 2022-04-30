/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import Taro ,{ getCurrentInstance }from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Image,Button, Input} from '@tarojs/components'
import './index.less'
import backjpg from '../../images/backImg.png'
import goTo from '../../images/goTo.png'
import Fetch from '../../service/fetch'
import Default from '../../images/default.jpg'


export default class Index extends Component {

    constructor(){
        super(...arguments);
          this.state = {
            headChangeCon: false,
            nicknameChangrCon: false,
            declarationChangrCon: false,
            tag1:'',
            tag2:'',
            tag3:'',
            tag4:'',
            tag5:'',
            declaration:'',
            nickname:'',
            avatar:Default,
            file:'',
            path:'',
            status:'',
            tempFilePaths:'',
            tempSaveNickname: '',
            tempSaveDeclaration: '',
            users_id:''
          }
      }

  componentWillMount () { }

  componentDidMount () {
    const {users_id} = this.state;
  Fetch('api/v1/card',{}, 'GET')
    .then(res =>{
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
            // grade: res.data.grade,
            path: res.data.path,
            sha: res.data.sha,
            users_id:res.data.users_id,
            // college: res.data.college,
            status: res.status,
            })
            console.log(this.state.users_id);
    
    //grade college
    Fetch('api/v1/user/infor',
    {users_id:this.state.users_id},
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
        }).catch(e=>{
        console.log(e);
    })
   
}

  componentWillUnmount () { }

  componentDidShow () { 
   } 

  componentDidHide () { }

  
 
  

  toLogin(){
    Taro.reLaunch({
        url:'/pages/login/index'
    })
  }

  tonomate(){
    const { nickname,declaration,tag1,tag2,tag3,tag4,tag5 } = this.state;
    if(nickname == ''||declaration == ''||tag1 == ''||tag2 == ''||tag3 == ''||tag4 == ''||tag5 == ''){
        Taro.showToast({ title: '名片尚未设置完毕！', icon: 'none' });
    }
    else{
        Fetch(
            'api/v1/dailyrecord/card',
            {},
            'GET'           
          ).then(ress => {
            console.log(ress);
            console.log(ress.data);
            if(ress.data===null){
              Taro.redirectTo({
                url: '/pages/nomate/index'
              }); 
            }else{
                Fetch(
                    'api/v1/dailyrecord/update',
                    {},
                    'PUT'                   
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

}


  change1(){
    const {headChangeCon} = this.state
    if(headChangeCon == false){
        this.setState({
            headChangeCon: true
          })
    }
    else{
        this.setState({
            headChangeCon: false
          })
    }
    this.setState({
        tempFilePaths: ''
    })
  }

  change2(){
    const {nicknameChangeCon} = this.state
    if(nicknameChangeCon == false){
        this.setState({
            nicknameChangeCon: true
          })
    }
    else{
        this.setState({
            nicknameChangeCon: false
          })
    }
    this.setState({
        tempSaveNickname:''
    })
  }

  change3(){
    const {tagChangeCon} = this.state
    if(tagChangeCon == false){
        this.setState({
            tagChangeCon: true
          })
    }
    else{
        this.setState({
            tagChangeCon: false
          })
    }
  }

  change4(){
    const {declarationChangeCon} = this.state
    if(declarationChangeCon == false){
        this.setState({
            declarationChangeCon: true
          })
    }
    else{
        this.setState({
            declarationChangeCon: false
          })
    }
    this.setState({
        tempSaveDeclaration:''
    })
  }

  uploadImg(){
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

  tag1delete(){
      this.setState({
          tag1:''
      })
  }

  tag2delete(){
    this.setState({
        tag2:''
    })
}

  tag3delete(){
    this.setState({
        tag3:''
    })
}

  tag4delete(){
    this.setState({
        tag4:''
    })
}

  tag5delete(){
    this.setState({
        tag5:''
    })
}
  tag1Change(e) {
    this.setState({
        tag1: e.detail.value
    })
}
  tag2Change(e) {
    this.setState({
        tag2: e.detail.value
    })
}
  tag3Change(e) {
    this.setState({
        tag3: e.detail.value
    })
}
  tag4Change(e) {
    this.setState({
        tag4: e.detail.value
    })
}
  tag5Change(e) {
    this.setState({
        tag5: e.detail.value
    })
}
  headSave(){
    const { file,tempFilePaths } = this.state
    this.change1() 
    Taro.uploadFile({
        url: 'http://119.3.2.168:4016/api/v1/card/avatar', 
        filePath: file,
        name: 'file',
        header: {
            token: Taro.getStorageSync('token')
        },
        success (res){
            console.log(res)
            if (res.statusCode == '200'){
                Taro.showToast({ title: '修改成功', icon: 'success' });
            }
            else{
                Taro.showToast({ title: '修改失败，请重试', icon: 'none' });
            }
        }       
      })
        this.setState({ 
            avatar: tempFilePaths,
        })
  }
  nicknameSave(){
    const {tempSaveNickname} = this.state
    this.change2()
    Fetch('api/v1/card',
        {
            nickname:tempSaveNickname,
            declaration: this.state.declaration,
            tag1: this.state.tag1,
            tag2: this.state.tag2,
            tag3: this.state.tag3,
            tag4: this.state.tag4,
            tag5: this.state.tag5
        },
        'POST').then(data => {
            if(data.code == 200){
                Taro.showModal({content: '编辑成功!',showCancel: false});
            }
            else if(data.code == 500){
                Fetch('api/v1/card',
                {
                    nickname:tempSaveNickname,
                    declaration: this.state.declaration,
                    tag1: this.state.tag1,
                    tag2: this.state.tag2,
                    tag3: this.state.tag3,
                    tag4: this.state.tag4,
                    tag5: this.state.tag5
                },
                'PUT').then(datas => {
                    if(datas.code == 200){
                        Taro.showModal({content: '编辑成功!',showCancel: false});
                    }
                    else{
                        Taro.showModal({content: '修改失败，请稍后重试', showCancel: false });
                    }
                })
            }
            else{
                Taro.showModal({content: '修改失败，请稍后重试', showCancel: false });
            }
        })
    this.setState({
        nickname: tempSaveNickname
    })
  }
  declarationSave(){
    const {tempSaveDeclaration} = this.state
    this.change4()
    Fetch('api/v1/card',{
        nickname: this.state.nickname,
        declaration:tempSaveDeclaration,
        tag1: this.state.tag1,
        tag2: this.state.tag2,
        tag3: this.state.tag3,
        tag4: this.state.tag4,
        tag5: this.state.tag5
    },
    'POST').then(data => {
            if(data.code == 200){
                Taro.showModal({content: '编辑成功!',showCancel: false});
            }
            else if(data.code == 500){
                Fetch('api/v1/card',{
                    nickname: this.state.nickname,
                    declaration:tempSaveDeclaration,
                    tag1: this.state.tag1,
                    tag2: this.state.tag2,
                    tag3: this.state.tag3,
                    tag4: this.state.tag4,
                    tag5: this.state.tag5
                },
                'PUT').then(data2 => {
                        if(data2.code == 200){
                            Taro.showModal({content: '编辑成功!',showCancel: false});
                        }
                        else{
                            Taro.showModal({content: '修改失败，请稍后重试', showCancel: false });
                        }
                    })
            }
            else{
                Taro.showModal({content: '修改失败，请稍后重试', showCancel: false });
            }
        })
    this.setState({
        declaration: tempSaveDeclaration
    })
  }
  tempSaveNickname(e){
    this.setState({
        tempSaveNickname: e.detail.value
    })
  }
  tempSaveDeclaration(e){
    this.setState({
        tempSaveDeclaration: e.detail.value
    })
  }
  tagsSave(){
    this.change3()
    Fetch('api/v1/card',
    {
        nickname: this.state.nickname,
        declaration: this.state.declaration,
        tag1: this.state.tag1,
        tag2: this.state.tag2,
        tag3: this.state.tag3,
        tag4: this.state.tag4,
        tag5: this.state.tag5
    },
    'POST').then(data => {
        if(data.code == 200){
            Taro.showModal({content: '编辑成功!',showCancel: false});
        }
        else if(data.code == 500){
            Fetch('api/v1/card',
            {
                nickname: this.state.nickname,
                declaration: this.state.declaration,
                tag1: this.state.tag1,
                tag2: this.state.tag2,
                tag3: this.state.tag3,
                tag4: this.state.tag4,
                tag5: this.state.tag5
            },
            'PUT').then(data3 => {
                if(data3.code == 200){
                    Taro.showModal({content: '编辑成功!',showCancel: false});
                }
                else{
                    Taro.showModal({content: '修改失败，请稍后重试', showCancel: false });
                }
            })
        }
        else{
            Taro.showModal({content: '修改失败，请稍后重试', showCancel: false });
        }
    })
  }
  
  
 
  render () {
    const {headChangeCon,nicknameChangeCon,declarationChangeCon,tagChangeCon,
    tag1,tag2,tag3,tag4,tag5,tempFilePaths,avatar,major,grade,users_id,
    declaration,nickname,tempSaveNickname,tempSaveDeclaration,college
    } = this.state
    return (
        <View className='index'>
            <View className='indexTop'>               
                <Button className='back' size='mini' onClick={this.tonomate.bind(this)}>
                    <Image className='backImg' src={backjpg} onClick={this.tonomate.bind(this)} />
                </Button>
                 <View className='title'>
                    <View className='titleText'>我的名片</View>
                </View>
            </View>
            <View className='indexBottom'>
                <View className='info'>
                    <View className='infoHead'>
                        <View className='head'>
                            <Image src={avatar===''? Default : avatar} className='headImg' />
                        </View>
                        <View className='name'>{nickname}</View>
                        <View className='tags'>
                            <View className='school'>{college}</View>
                            <View className='majorGrade'>{major} {grade}</View>
                        </View>
                    </View>
                    <View className='line'></View>
                    <View className='cb'>
                        <View className='tag'>
                            <View className='tag1'>{tag1}</View>
                            <View className='tag2'>{tag2}</View>
                            <View className='tag3'>{tag3}</View>
                            <View className='tag4'>{tag4}</View>
                            <View className='tag5'>{tag5}</View>
                        </View>
                    </View>
                    <View className='motto'>{declaration}</View>
                </View>
                <View className='changes'>
                    <View className='change'>
                        <View className='whiteDot'></View>
                        <View className='changeItem' onClick={this.change1.bind(this)}>
                            <View   className='changeText'>修改头像</View>
                            <View>
                                <Image src={goTo} className='go' />
                            </View>
                        </View>
                    </View>
                    <View className='change'>
                        <View className='whiteDot'></View>
                        <View className='changeItem' onClick={this.change2.bind(this)}>
                            <View className='changeText'>修改昵称</View>
                            <View>
                                <Image src={goTo} className='go' />
                            </View>
                        </View>
                    </View>
                    <View className='change'>
                        <View className='whiteDot'></View>
                        <View className='changeItem' onClick={this.change3.bind(this)}>
                            <View className='changeText'>编辑tag</View>
                            <View>
                                <Image src={goTo} className='go' />
                            </View>
                        </View>
                    </View> 
                    <View className='change'>
                        <View className='whiteDot'></View>
                        <View className='changeItem' onClick={this.change4.bind(this)}>
                            <View className='changeText'>编辑同桌宣言</View>
                            <View>
                                <Image src={goTo} className='go' />
                            </View>
                        </View>
                    </View>
                </View>
                <Button className='exit' onClick={this.toLogin}>退出登录</Button>
            </View>
            {headChangeCon&&<View>
                <View className='control'>
                </View>
                <View className='chooseHeadContainer'>
                    <View className='chooseHeadImg'>
                        <Image className='headImg' src={tempFilePaths} />
                    </View>
                    <Button className='chooseHead'
                      onClick={this.uploadImg.bind(this)}
                    >选择图片</Button>
                    <View className='YesOrNo'>
                        <Button className='backToMine' onClick={this.change1.bind(this)}>返回</Button>
                        <Button className='sure'
                          onClick={this.headSave.bind(this)}
                        >确认</Button>
                    </View>
                </View>
            </View>
            }
            {!headChangeCon&&<View />}
            {nicknameChangeCon&&<View>
                <View className='control'></View>
                <View className='changeNameContainer'>
                    <Input  className='changeNameInput'
                      placeholder='输入新昵称'
                      value={tempSaveNickname}
                      onInput={this.tempSaveNickname.bind(this)}
                    ></Input>
                    <View className='YesOrNo'>
                        <Button className='backToMine' onClick={this.change2.bind(this)}>返回</Button>
                        <Button className='sure'
                          onClick={this.nicknameSave.bind(this)}
                        >确认</Button>
                    </View>
                </View>
            </View>}
            {!nicknameChangeCon&&<View />}
            {declarationChangeCon&&<View>
                <View className='control'></View>
                <View className='changeMottoContainer'>
                    <Input  className='changeMottoInput'
                      placeholder='输入同桌宣言（不超过24个字）'
                      maxlength='24'
                      value={tempSaveDeclaration}
                      onInput={this.tempSaveDeclaration.bind(this)}
                    ></Input>
                    <View className='YesOrNo'>
                        <Button className='backToMine' onClick={this.change4.bind(this)}>返回</Button>
                        <Button className='sure'
                          onClick={this.declarationSave.bind(this)}
                        >确认</Button>
                    </View>
                </View>
            </View>}
            {!declarationChangeCon&&<View />}
            {tagChangeCon&&<View>
                <View className='control'></View>
                <View className='changeTagContainer'>
                    <View className='changeTagText1'>编辑Tag</View>
                    <View className='changeTagText2'>单个Tag字数不超过7个，总字数不超过25个
                    将Tag置为空，则视为删除Tag，不再显示</View>
                    <View className='changeTagItem'>
                        <Input className='changeTagInput'
                          value={tag1}
                          onInput={this.tag1Change.bind(this)}
                        ></Input>
                        <Button className='edit'>编辑</Button>
                        <Button className='delete'
                          onClick={this.tag1delete.bind(this)}
                        >删除</Button>
                    </View>
                    <View className='changeTagItem'>
                        <Input className='changeTagInput'
                          value={tag2}
                          onInput={this.tag2Change.bind(this)}
                        ></Input>
                        <Button className='edit'>编辑</Button>
                        <Button className='delete'
                          onClick={this.tag2delete.bind(this)}
                        >删除</Button>
                    </View>
                    <View className='changeTagItem'>
                        <Input className='changeTagInput'
                          value={tag3}
                          onInput={this.tag3Change.bind(this)}
                        ></Input>
                        <Button className='edit'>编辑</Button>
                        <Button className='delete'
                          onClick={this.tag3delete.bind(this)}
                        >删除</Button>
                    </View>
                    <View className='changeTagItem'>
                        <Input className='changeTagInput'
                          value={tag4}
                          onInput={this.tag4Change.bind(this)}
                        ></Input>
                        <Button className='edit'>编辑</Button>
                        <Button className='delete'
                          onClick={this.tag4delete.bind(this)}
                        >删除</Button>
                    </View>
                    <View className='changeTagItem'>
                        <Input className='changeTagInput'
                          value={tag5}
                          onInput={this.tag5Change.bind(this)}
                        ></Input>
                        <Button className='edit'>编辑</Button>
                        <Button className='delete'
                          onClick={this.tag5delete.bind(this)}
                        >删除</Button>
                    </View>
                    <View className='YesOrNo'>
                        <Button className='backToMine' onClick={this.change3.bind(this)}>返回</Button>
                        <Button className='sure'
                          onClick={this.tagsSave.bind(this)}
                        >确认</Button>
                    </View>
                </View>
            </View>} 
            {!tagChangeCon&&<View />}
        </View>
        
    )
  }
}