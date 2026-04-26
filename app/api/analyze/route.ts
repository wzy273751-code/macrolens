import { NextResponse } from "next/server";

type AnalyzeRequestBody = {
  indicator?: {
    name?: string;
    fullName?: string;
    value?: string;
    change?: string;
    date?: string;
    description?: string;
  };
};

const SYSTEM_PROMPT = `你是一位在中国一线券商宏观研究部工作10年的资深分析师。你的写作风格清晰、有洞察、不说废话。你擅长把复杂的经济现象讲给完全没有金融背景的普通人听。

读者是一位30岁的中国上班族，有本科学历但没学过经济或金融。他每天花5分钟读你的解读，希望看完后既能"看懂数据"，又能"获得一个可以和同事分享的观点"。

你的解读必须遵守以下规则：
1. 用一个生活化的比喻开头（30字以内）
2. 必须分析当前数据反映的经济现象
3. 必须给出"对三类人的具体含义"：打工人、投资者、企业主
4. 总字数控制在 300-400 字
5. 禁止使用以下空话词汇：综上所述、值得注意的是、众所周知、毫无疑问
6. 禁止编造具体的历史数据或政策案例，只用我提供的数据
7. 语气像朋友聊天，专业但不学究
8. 输出纯文本，不要使用 Markdown 格式（不要 ## 标题、不要 ** 加粗）`;

function buildUserPrompt(indicator: NonNullable<AnalyzeRequestBody["indicator"]>) {
  return `请解读以下经济指标的最新数据：

指标名称：${indicator.name}（${indicator.fullName}）
当前值：${indicator.value}
同比变化：${indicator.change}
数据日期：${indicator.date}
背景信息：${indicator.description}

请按上述规则生成一段 300-400 字的解读。`;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, message: "API Key 未配置" }, { status: 500 });
    }

    const body = (await request.json()) as AnalyzeRequestBody;
    const indicator = body.indicator;

    if (
      !indicator?.name ||
      !indicator.fullName ||
      !indicator.value ||
      !indicator.change ||
      !indicator.date ||
      !indicator.description
    ) {
      return NextResponse.json(
        { success: false, message: "请求参数不完整" },
        { status: 400 },
      );
    }

    const deepSeekResponse = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(indicator) },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!deepSeekResponse.ok) {
      const errorText = await deepSeekResponse.text();
      return NextResponse.json(
        {
          success: false,
          message: `DeepSeek API 调用失败: ${deepSeekResponse.status} ${errorText}`,
        },
        { status: 500 },
      );
    }

    const data = (await deepSeekResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const analysis = data.choices?.[0]?.message?.content?.trim();
    if (!analysis) {
      return NextResponse.json(
        { success: false, message: "DeepSeek 返回内容为空" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知错误";
    return NextResponse.json(
      { success: false, message: `服务调用异常: ${message}` },
      { status: 500 },
    );
  }
}
