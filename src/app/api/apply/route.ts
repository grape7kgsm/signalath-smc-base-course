import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      agreed,
      registeredViaLink,
      accountNumber,
      discordId,
      tradingViewId,
      depositStatus,
    } = body;

    if (!agreed || !registeredViaLink || !accountNumber || !discordId || !tradingViewId || !depositStatus) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    const notionApiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_APPLY_DB_ID;

    if (!notionApiKey || !databaseId) {
      return NextResponse.json({ error: "サーバー設定エラー", debug: { hasKey: !!notionApiKey, hasDb: !!databaseId } }, { status: 500 });
    }

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          "TradingView ID": {
            title: [{ text: { content: tradingViewId } }],
          },
          "Axon口座番号": {
            rich_text: [{ text: { content: accountNumber } }],
          },
          "Discord ID": {
            rich_text: [{ text: { content: discordId } }],
          },
          "デポジット": {
            select: {
              name: depositStatus === "completed" ? "完了" : "申請後に予定",
            },
          },
          "ステータス": {
            select: { name: "申請受付" },
          },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: "データ保存に失敗しました", debug: err }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Apply API error:", e);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
