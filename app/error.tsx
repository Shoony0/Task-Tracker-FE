"use client";
import ErrorHandler from '@/components/ErrorHandler';
import React from 'react'

function ErrorPage({ error }: { error: Error }) {
    return (
        <ErrorHandler error={error} />
    )
}

export default ErrorPage;
