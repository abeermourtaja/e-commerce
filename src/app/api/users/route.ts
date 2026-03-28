import { NextRequest, NextResponse } from "next/server"

export function GET(req:NextRequest){
    const users=[
        {id:'1',user:'ali'},
        {id:'2',user:'ahmed'},
    ]
    return NextResponse.json({users,status:200})
}
