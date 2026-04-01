import { NextRequest, NextResponse } from "next/server";
import { buildFormattedAnswers } from "@/lib/buildInput";
import { buildMasterPrompt } from "@/lib/prompts/masterPrompt";
import type { AssessmentAnswer } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const answers = body.answers as AssessmentAnswer[] | undefined;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { error: "Missing assessment answers" },
        { status: 400 }
      );
    }

    const formattedAnswers = buildFormattedAnswers(answers);
    const prompt = buildMasterPrompt(formattedAnswers);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4",
        input: prompt
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "OpenAI request failed", details: errorText },
        { status: 500 }
      );
    }

    const data = await response.json();

    const outputText =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "";

    return NextResponse.json({
      result: outputText,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to analyze assessment" },
      { status: 500 }
    );
  }
}