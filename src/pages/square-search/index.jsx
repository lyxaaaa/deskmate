import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image,Input,Button } from '@tarojs/components'
import './index.css'
import backImg from '../../images/backImg2.png'
import searchImg from '../../images/search.png'

export default class Index extends Component {
    constructor(){
        super(...arguments);
        this.state={
            // eslint-disable-next-line react/no-unused-state
            gettag:''
        }
    }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  backSquare(){
      Taro.redirectTo({
          url:'/pages/square/index'
      })
  }

  toSearchtag(){
      const {gettag}=this.state;
      Taro.navigateTo({
          url:'/pages/search-tag/index?gettag='+gettag
      })
  }
  
  getTag(e){
    let value = e.detail.value;
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      gettag:value
    });
  }

  render () {
    return (
        <View className='container'>
        <Button className='back'  plain  onClick={this.backSquare.bind(this)} >
            <Image src={backImg} className='backImg' />
        </Button>
       <View className='search'>
            <Image src={searchImg} className='searchImg' onClick={this.toSearchtag.bind(this)} />
       </View>       
      <Input  className='input' focus='true'  confirmType='search'  onConfirm={this.toSearchtag.bind(this)}
        placeholder='搜索tag' placeholder-style='color:#FFFFFF' onInput={this.getTag.bind(this)}
      ></Input>

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