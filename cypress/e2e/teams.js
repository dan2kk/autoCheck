const msal = require('@azure/msal-node');
const axios = require('axios');

// Azure AD 설정
const config = {
    auth: {
        clientId: 'YOUR_CLIENT_ID',
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
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
async function sendMessage(channelId, teamId, message) {
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

// 사용 예시
const teamId = 'YOUR_TEAM_ID';
const channelId = 'YOUR_CHANNEL_ID';
const message = '안녕하세요, 이 메시지는 자동으로 전송된 것입니다!';

sendMessage(channelId, teamId, message)
    .then(response => {
        console.log('메시지 전송 성공:', response);
    })
    .catch(error => {
        console.error('메시지 전송 실패:', error);
    });
