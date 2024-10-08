const msal = require('@azure/msal-node');
const axios = require('axios');
const configFile = require('./client_key.json');

// Azure AD 설정
const config = {
    auth: {
        clientId: configFile.clientId,
        authority: 'https://login.microsoftonline.com/'+configFile.tenantId,
        clientSecret: configFile.clientSecret,
    },
};

const cca = new msal.ConfidentialClientApplication(config);

// 액세스 토큰 얻기
async function getAccessToken() {
    const result = await cca.acquireTokenByClientCredential({
        scopes: ['https://graph.microsoft.com/.default'],
    });
    return result.accessToken;
}

// 메시지 보내기
async function sendMessage(message) {
    const teamId = configFile.teamName;
    const channelId = configFile.channelName;
    const token = await getAccessToken();
    const url = `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`;

    const response = await axios.post(url, {
        body: {
            content: message,
        },
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}
async function getChats() {
    const accessToken = await getAccessToken(); 
    const url = 'https://graph.microsoft.com/v1.0/me/chats';
  
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data; // 채팅 목록 반환
    } catch (error) {
      console.error('Error fetching chats:', error.response.data);
    }
  }

// 사용 예시
const message = '안녕하세요, 이 메시지는 자동으로 전송된 것입니다!';
getChats()
    .then(response => {
        console.log('채팅방 목록: ', response);
    })
    .catch(error => {
        console.log('채팅방 목록 실패:', error);
    })
sendMessage(message)
    .then(response => {
        console.log('메시지 전송 성공:', response);
    })
    .catch(error => {
        console.error('메시지 전송 실패:', error);
    });
