"use client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const test: NextPage = () => {
    const { data, status } = useSession()
    
    return (
        <>
            Test Page
            {JSON.stringify(data)}
        </>
    )
}

export default test