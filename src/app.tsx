import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';
import request from 'umi-request';

const defaultFooterDom = (
    <DefaultFooter
      copyright="2020 燕文物流"
      links={[]}
    />
  );
  export const layout = {
    logout: () => {
  
    }, // do something
    footerRender: () => {
      return defaultFooterDom;
    },
    fixSiderbar: true,
    fixedHeader: true,
    fixedFooter: true,
 
  };

  // 运行时配置初始化state
export async function getInitialState() {
    console.log('getInitialState');
    return await request('/api/currentUser');
  }