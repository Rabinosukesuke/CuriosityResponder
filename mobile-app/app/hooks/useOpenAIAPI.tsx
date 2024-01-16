import { promptPrefix } from '../PromptConfig';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

type OpenAIAPI = {
    sendToGPT: (question: string) => Promise<string>;
}

export const useOpenAIAPI = (): OpenAIAPI => {
    const sendToGPT = async (question: string): Promise<string> => {
        console.log("sendToGPT");
        try {
            const prompt = `${promptPrefix} ${question}`;

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: prompt
                        },
                        {
                            role: "user",
                            content: question
                        }
                    ],
                    max_tokens: 150
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`
                    }
                }
            );

            // APIレスポンスの確認
            if (response.status !== 200) {
                console.error("API request failed with response:", response);
                return 'リクエストに失敗しました。';
            }

            // レスポンスがOKの場合、応答データでナビゲート
            const answer = response.data.choices[0].message.content.trim();

            return answer;
        } catch (error) {
            console.error(error);
            return 'エラーが発生しました。';
        }
    }
    return { sendToGPT }
}