import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";

export async function POST(req:any) {
    try{
    const key=process.env.GEMINI_KEY;
    const genAi=new GoogleGenerativeAI(key??'');
    const model=genAi.getGenerativeModel({model:'gemini-pro'});
    const data =await req.json();
    const prompt=data.prompt;
    const result=await model.generateContent(prompt);
    const response= result.response;
    return NextResponse.json({
        status:200,
        output:response.text()

    }) 
}catch(error){
    return NextResponse.json({
        status:500,
        output:"something went wrong"
        })
}

    
}