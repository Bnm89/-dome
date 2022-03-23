import axios, { AxiosResponse } from "axios"
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { XixirequestHook, Xixiconfig } from './type'
//封装一些自己的类型
class Xixirequest {
  instance: AxiosInstance
  interceptors: XixirequestHook
  constructor(config: Xixiconfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors.requestInterceptors,
      this.interceptors.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors.responseInterceptor,
      this.interceptors.responseInterceptorCatch
    );
    //添加所有实例的都有的拦截器
    this.instance.interceptors.request.use((config) => {
      console.log('所有的实例都有的请求拦截器:请求拦截');
      
    },(err)=>{
      console.log('所有的实例都有的请求拦截器:请求拦截失败');
    })
    this.instance.interceptors.response.use((res) => {
      
      console.log('所有的实例都有的响应拦截器:响应成功拦截');
      return res.data
    },(err)=>{
      console.log('所有的实例都有的拦截器:响应失败拦截');
    })
  }
  request(config: Xixiconfig):void{
    if(config.interceptors?.requestInterceptors){
      config=config.interceptors.requestInterceptors(config)
    }
    this.instance.request(config).then((res) => {
      if(config.interceptors?.responseInterceptor){
        config=config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
  post() {

  }
  get() {

  }
  put() {

  }
}
export default Xixirequest