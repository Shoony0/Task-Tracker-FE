"use client";
import ErrorHandler from '@/components/ErrorHandler';
import React from 'react'

function ErrorPage({ error }: Readonly<{ error: Error }>) {
    return (
        <ErrorHandler error={error} />
    )
}

export default ErrorPage;
