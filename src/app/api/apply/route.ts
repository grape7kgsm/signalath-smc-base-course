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
      return NextResponse.json({ error: "サーバー設定エラー" }, { status: 500 });
    }

    // 1. Notion DBに保存
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
      console.error("Notion API error:", err);
      return NextResponse.json({ error: "データ保存に失敗しました" }, { status: 500 });
    }

    // 2. Discordの #申請_指標権限 に自動投稿 → Botが拾って権限付与
    const discordWebhookUrl = process.env.DISCORD_APPLY_WEBHOOK_URL;
    if (discordWebhookUrl) {
      const depositLabel = depositStatus === "completed" ? "入金済み" : "入金予定";
      const discordMessage =
        `📋 **申請フォーム自動送信**\n` +
        `ブローカー：Axon\n` +
        `口座番号：${accountNumber}\n` +
        `TradingView ID：${tradingViewId}\n` +
        `Discord ID：${discordId}\n` +
        `デポジット：${depositLabel}\n` +
        `申請完了`;

      try {
        await fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "申請フォーム",
            content: discordMessage,
          }),
        });
      } catch (webhookErr) {
        // Discord投稿失敗はフォーム送信自体の失敗にはしない
        console.error("Discord webhook error:", webhookErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Apply API error:", e);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
